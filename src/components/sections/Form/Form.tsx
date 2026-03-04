import styles from './Form.module.scss'

const Form = () => {
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

				<form className={styles.form}>
					<div className={styles.formGroup}>
						<input
							className={styles.formInput}
							type='text'
							placeholder='Компания*'
						/>
					</div>
					<div className={styles.formGroup}>
						<input
							className={styles.formInput}
							type='email'
							placeholder='Контактное лицо*'
						/>
					</div>
					<div className={styles.formGroup}>
						<input
							className={styles.formInput}
							type='text'
							placeholder='Телефон / WhatsApp*'
						/>
					</div>
					<div className={styles.roleWrapper}>
						<h3 className={styles.roleTitle}>Тип сотрудничества*</h3>
						<div className={styles.roleInner}>
							<button className={`${styles.roleBtn} ${styles.roleBtnActive}`}>
								Производство
							</button>
							<button className={styles.roleBtn}>Дизайнер</button>
						</div>
					</div>
					<div className={styles.formGroup}>
						<textarea
							className={`${styles.formTextarea} ${styles.formInput}`}
							placeholder='Краткое описание задач'
						></textarea>
					</div>

					<p className={styles.agreementText}>
						Нажимая на кнопку, вы соглашаетесь на обработку персональных данных
					</p>
					<button className={styles.formBtn}>Отправить запрос</button>
				</form>
			</div>
		</section>
	)
}

export default Form
