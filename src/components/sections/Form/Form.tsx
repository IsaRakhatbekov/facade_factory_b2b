'use client'

import { FormEvent, useEffect, useState } from 'react'
import styles from './Form.module.scss'

const ROLES = ['Производство', 'Дизайнер'] as const

const NAME_MIN_LETTERS = 2
const PHONE_MIN_DIGITS = 10
const PHONE_MAX_DIGITS = 12
const MESSAGE_MAX_LENGTH = 500

function validateCompany(value: string): string | null {
	const trimmed = value.trim()
	if (trimmed.length < NAME_MIN_LETTERS)
		return `Минимум ${NAME_MIN_LETTERS} символа`
	return null
}

function validateName(value: string): string | null {
	const trimmed = value.trim()
	if (trimmed.length < NAME_MIN_LETTERS)
		return `Минимум ${NAME_MIN_LETTERS} буквы`
	const letters = trimmed.replace(/[^а-яёa-z\s]/gi, '').replace(/\s/g, '')
	if (letters.length < NAME_MIN_LETTERS)
		return `Минимум ${NAME_MIN_LETTERS} буквы`
	return null
}

function validatePhone(value: string): string | null {
	const digits = value.replace(/\D/g, '')
	if (digits.length < PHONE_MIN_DIGITS)
		return `Введите номер: только цифры, минимум ${PHONE_MIN_DIGITS}`
	if (digits.length > PHONE_MAX_DIGITS)
		return `Не более ${PHONE_MAX_DIGITS} цифр`
	return null
}

function validateMessage(value: string): string | null {
	if (value.length > MESSAGE_MAX_LENGTH)
		return `Максимум ${MESSAGE_MAX_LENGTH} символов`
	return null
}

const Form = () => {
	const [company, setCompany] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	const [role, setRole] = useState<(typeof ROLES)[number]>('Производство')
	const [status, setStatus] = useState<
		'idle' | 'sending' | 'success' | 'error'
	>('idle')
	const [errorText, setErrorText] = useState('')
	const [fieldErrors, setFieldErrors] = useState<{
		company?: string
		name?: string
		phone?: string
		message?: string
	}>({})

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value
		if (v !== '' && !/^\+?\d*$/.test(v)) return
		const digits = v.replace(/\D/g, '')
		if (digits.length > PHONE_MAX_DIGITS) return
		setPhone(v)
		if (fieldErrors.phone)
			setFieldErrors(prev => ({ ...prev, phone: undefined }))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setErrorText('')
		const companyErr = validateCompany(company)
		const nameErr = validateName(name)
		const phoneErr = validatePhone(phone)
		const messageErr = validateMessage(message)
		setFieldErrors({
			company: companyErr ?? undefined,
			name: nameErr ?? undefined,
			phone: phoneErr ?? undefined,
			message: messageErr ?? undefined,
		})
		if (companyErr || nameErr || phoneErr || messageErr) return

		setStatus('sending')
		try {
			const res = await fetch('/api/send-to-telegram', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					company: company.trim(),
					name: name.trim(),
					phone: phone.trim(),
					message: message.trim(),
					role,
					source: 'b2b',
				}),
			})
			const data = await res.json().catch(() => ({}))
			if (!res.ok) {
				setErrorText(data.error || 'Не удалось отправить заявку')
				setStatus('error')
				return
			}
			setStatus('success')
			setCompany('')
			setName('')
			setPhone('')
			setMessage('')
			setRole('Производство')
			setFieldErrors({})
		} catch {
			setErrorText('Ошибка сети. Попробуйте позже.')
			setStatus('error')
		}
	}

	useEffect(() => {
		if (status !== 'success') return
		const t = setTimeout(() => setStatus('idle'), 5000)
		return () => clearTimeout(t)
	}, [status])

	return (
		<section id='form' className={styles.Form}>
			<div className={`${styles.container} container`}>
				<h2 className={`${styles.title} def-title`}>
					Заявка на сотрудничество
				</h2>
				<p className={styles.text}>
					Оставьте заявку на сотрудничество и мы свяжемся с вами и предложим
					оптимальные условия сотрудничества.
				</p>

				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<input
							className={`${styles.formInput} ${fieldErrors.company ? styles.formInputError : ''}`}
							type='text'
							id='company'
							name='company'
							placeholder='Компания*'
							value={company}
							onChange={e => {
								setCompany(e.target.value)
								if (fieldErrors.company)
									setFieldErrors(prev => ({ ...prev, company: undefined }))
							}}
							required
							minLength={NAME_MIN_LETTERS}
							aria-invalid={!!fieldErrors.company}
						/>
						{fieldErrors.company && (
							<p className={styles.fieldError} role='alert'>
								{fieldErrors.company}
							</p>
						)}
					</div>

					<div className={styles.formGroup}>
						<input
							className={`${styles.formInput} ${fieldErrors.name ? styles.formInputError : ''}`}
							type='text'
							id='name'
							name='name'
							placeholder='Контактное лицо*'
							value={name}
							onChange={e => {
								setName(e.target.value)
								if (fieldErrors.name)
									setFieldErrors(prev => ({ ...prev, name: undefined }))
							}}
							required
							minLength={NAME_MIN_LETTERS}
							aria-invalid={!!fieldErrors.name}
						/>
						{fieldErrors.name && (
							<p className={styles.fieldError} role='alert'>
								{fieldErrors.name}
							</p>
						)}
					</div>

					<div className={styles.formGroup}>
						<input
							className={`${styles.formInput} ${fieldErrors.phone ? styles.formInputError : ''}`}
							type='tel'
							id='phone'
							name='phone'
							placeholder='Телефон / WhatsApp*'
							value={phone}
							onChange={handlePhoneChange}
							required
							inputMode='numeric'
							autoComplete='tel'
							aria-invalid={!!fieldErrors.phone}
						/>
						{fieldErrors.phone && (
							<p className={styles.fieldError} role='alert'>
								{fieldErrors.phone}
							</p>
						)}
					</div>

					<div className={styles.roleWrapper}>
						<h3 className={styles.roleTitle}>Тип сотрудничества*</h3>
						<div className={styles.roleInner}>
							{ROLES.map(r => (
								<button
									key={r}
									type='button'
									className={`${styles.roleBtn} ${role === r ? styles.roleBtnActive : ''}`}
									onClick={() => setRole(r)}
								>
									{r}
								</button>
							))}
						</div>
					</div>

					<div className={styles.formGroup}>
						<textarea
							className={`${styles.formTextarea} ${styles.formInput} ${fieldErrors.message ? styles.formInputError : ''}`}
							id='message'
							name='message'
							placeholder='Краткое описание задач'
							value={message}
							onChange={e => {
								setMessage(e.target.value)
								if (fieldErrors.message)
									setFieldErrors(prev => ({ ...prev, message: undefined }))
							}}
							maxLength={MESSAGE_MAX_LENGTH}
							aria-invalid={!!fieldErrors.message}
						/>
						{fieldErrors.message && (
							<p className={styles.fieldError} role='alert'>
								{fieldErrors.message}
							</p>
						)}
						{!fieldErrors.message && message.length > 0 && (
							<p className={styles.charCount}>
								{message.length} / {MESSAGE_MAX_LENGTH}
							</p>
						)}
					</div>

					{errorText && (
						<p className={styles.formStatus} style={{ color: '#c00' }}>
							{errorText}
						</p>
					)}

					<p className={styles.agreementText}>
						Нажимая на кнопку, вы соглашаетесь на обработку персональных данных
					</p>
					<button
						type='submit'
						className={styles.formBtn}
						disabled={status === 'sending'}
					>
						{status === 'sending' ? 'Отправка…' : 'Отправить запрос'}
					</button>

					{status === 'success' && (
						<div className={styles.statusSuccess}>
							<div className={styles.iconWrapper}>
								<svg
									width='96'
									height='69'
									viewBox='0 0 96 69'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M94.1995 6.51197L33.1995 67.512C32.8454 67.8664 32.4249 68.1476 31.9621 68.3395C31.4992 68.5314 31.0031 68.6301 30.5021 68.6301C30.0011 68.6301 29.505 68.5314 29.0422 68.3395C28.5793 68.1476 28.1589 67.8664 27.8048 67.512L1.11728 40.8245C0.401896 40.1091 0 39.1388 0 38.1271C0 37.1154 0.401896 36.1452 1.11728 35.4298C1.83266 34.7144 2.80292 34.3125 3.81462 34.3125C4.82632 34.3125 5.79658 34.7144 6.51196 35.4298L30.5021 59.4247L88.8048 1.11727C89.5202 0.401894 90.4904 -7.53775e-09 91.5021 0C92.5138 7.53776e-09 93.4841 0.401894 94.1995 1.11727C94.9148 1.83265 95.3167 2.80292 95.3167 3.81462C95.3167 4.82632 94.9148 5.79659 94.1995 6.51197Z'
										fill='#FF9934'
									/>
								</svg>
							</div>
							<p className={styles.statusSuccessTitle}>Заявка принята</p>
							<p className={styles.statusSuccessText}>
								Ожидайте, с вами свяжутся
							</p>
						</div>
					)}
				</form>
			</div>
		</section>
	)
}

export default Form
