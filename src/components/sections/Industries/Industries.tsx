import IndustriesImg from '@/public/images/IndustriesImg.png'
import Image from 'next/image'
import styles from './Industries.module.scss'

const Industries = () => {
	return (
		<section id='clients' className={styles.Industries}>
			<div className={`${styles.container} container`}>
				<div className={styles.titleWrapper}>
					<h2 className={`${styles.title} def-title`}>
						Мебельным производствам
					</h2>
					<p className={styles.subtitle}>
						Берём на себя изготовление фасадов, чтобы вы сосредоточились на
						сборке и продажах. Работаем с серийными и индивидуальными заказами.
					</p>
				</div>

				<ul className={styles.list}>
					<li className={styles.item}>
						<div className={styles.circle}></div>
						<p className={styles.text}>Стабильные партии</p>
					</li>
					<li className={styles.item}>
						<div className={styles.circle}></div>
						<p className={styles.text}>Понятные расчёты</p>
					</li>
					<li className={styles.item}>
						<div className={styles.circle}></div>
						<p className={styles.text}>Удобная логистика заказов</p>
					</li>
					<li className={styles.item}>
						<div className={styles.circle}></div>
						<p className={styles.text}>Долгосрочное сотрудничество</p>
					</li>
				</ul>
				<div className={styles.imgWrapper}>
					<Image src={IndustriesImg} alt='Industries' />
				</div>
				<a href='#form' className={styles.btn}>
					Запросить прайс и условия
				</a>
			</div>
		</section>
	)
}

export default Industries
