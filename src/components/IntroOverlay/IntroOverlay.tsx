'use client'

import { useState } from 'react'
import styles from './IntroOverlay.module.scss'

export default function IntroOverlay() {
	const [isClosed, setIsClosed] = useState(false)

	const handleEnter = () => {
		setIsClosed(true)
	}

	return (
		<div
			className={`${styles.overlay} ${isClosed ? styles.closed : ''}`}
			aria-hidden={isClosed}
		>
			<div className={styles.content}>
				<p className={styles.subtitle}>
					ФАБРИКА <br /> ФАСАДОВ
				</p>
				<div className={styles.buttons}>
					<a
						href='https://b2c.fasady.kg/'
						className={`${styles.btn} ${styles.btnFirst}`}
						target='_self'
					>
						Я — мебельное производство
					</a>
					<button
						type='button'
						className={`${styles.btn} ${styles.btnSecond}`}
						onClick={handleEnter}
					>
						Я — дизайнер / архитектор
					</button>
				</div>
			</div>
		</div>
	)
}
