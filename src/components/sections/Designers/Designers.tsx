import DesignersImg from '@/public/images/DesignersImg.webp'
import Image from 'next/image'
import styles from './Designers.module.scss'

const Designers = () => {
	return (
		<section id='production' className={styles.Designers}>
			<div className={`${styles.container} container`}>
				<div className={styles.titleWrapper}>
					<h2 className={`${styles.title} def-title`}>
						Дизайнерам и архитектурным бюро
					</h2>
					<p className={styles.subtitle}>
						Помогаем реализовывать сложные и нестандартные проекты без упрощений
						и компромиссов.
					</p>
				</div>

				<div className={styles.wrapper}>
					<ul className={styles.list}>
						<li className={styles.item}>
							<div className={styles.circle}></div>
							<p className={styles.text}>Эксклюзивная фрезеровка</p>
						</li>
						<li className={styles.item}>
							<div className={styles.circle}></div>
							<p className={styles.text}>точное попадание в цвет</p>
						</li>
						<li className={styles.item}>
							<div className={styles.circle}></div>
							<p className={styles.text}>
								реализация идей «как в визуализации»
							</p>
						</li>
						<li className={styles.item}>
							<div className={styles.circle}></div>
							<p className={styles.text}>сопровождение проекта</p>
						</li>
					</ul>
					<div className={styles.imgWrapper}>
						<Image src={DesignersImg} alt='Industries' />
					</div>
				</div>

				<a href='#form' className={styles.btn}>
					Обсудить проект
				</a>
			</div>
		</section>
	)
}

export default Designers
