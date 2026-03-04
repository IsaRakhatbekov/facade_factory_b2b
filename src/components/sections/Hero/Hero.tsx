import styles from './Hero.module.scss'

const Hero = () => {
	return (
		<section className={styles.Hero}>
			<div className={`${styles.container} container`}>
				<h1 className={styles.title}>
					Фасады для мебельных компаний и дизайн-бюро
				</h1>
				<p className={styles.text}>
					Мы не «просто фабрика». <br /> Мы — производственный партнёр, который
					соблюдает сроки, повторяет партии и понимает ТЗ.
				</p>
				<a href='#form' className={styles.btn}>
					Запросить условия сотрудничества
				</a>
			</div>
		</section>
	)
}

export default Hero
