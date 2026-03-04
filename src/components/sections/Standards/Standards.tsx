import StandardsImg from '@/public/images/StandardsImg.webp'
import Image from 'next/image'
import styles from './Standards.module.scss'

const Standards = () => {
	return (
		<section id='work-process' className={styles.Standards}>
			<div className={`${styles.container} container`}>
				<div className={styles.titleWrapper}>
					<div className={styles.titleInner}>
						<div className={styles.titleLine}></div>
						<h2 className={styles.title}>Работаем по стандартам</h2>
					</div>
					<p className={styles.subtitle}>
						Мы привыкли работать с документацией и понимаем, что в B2B нет
						мелочей.
					</p>
				</div>

				<ul className={styles.list}>
					<li className={styles.item}>
						<h3 className={styles.innerTitle}>Технические задания</h3>
					</li>
					<li className={styles.item}>
						<h3 className={styles.innerTitle}>Чертежи</h3>
					</li>
					<li className={styles.item}>
						<h3 className={styles.innerTitle}>Спецификации</h3>
					</li>
					<li className={styles.item}>
						<h3 className={styles.innerTitle}>Каталоги цветов RAL / NCS</h3>
					</li>
				</ul>

				<div className={styles.imgWrapper}>
					<Image src={StandardsImg} alt='Standards' />
				</div>
			</div>
		</section>
	)
}

export default Standards
