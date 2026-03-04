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
					<button
						type='button'
						className={`${styles.btn} ${styles.btnFirst}`}
						onClick={handleEnter}
					>
						Я — мебельное производство
					</button>
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
