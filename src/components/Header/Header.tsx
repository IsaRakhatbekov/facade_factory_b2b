'use client'
import Image from 'next/image'
import styles from './Header.module.scss'

import logo from '@/public/images/logo.svg'
import { useEffect, useState } from 'react'

const SECTION_IDS = {
	about: 'about',
	clients: 'clients',
	production: 'production',
	workProcess: 'work-process',
	advantages: 'whywe',
	portfolio: 'portfolio',
	partners: 'partners',
	form: 'form',
} as const

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	const scrollToSection = (sectionId: string) => {
		const el = document.getElementById(sectionId)
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		sectionId: string,
	) => {
		e.preventDefault()
		scrollToSection(sectionId)
		closeMenu()
	}

	const handleCalcClick = () => {
		scrollToSection(SECTION_IDS.form)
		closeMenu()
	}

	const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		window.scrollTo({ top: 0, behavior: 'smooth' })
		closeMenu()
	}

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY >= 1)
		}
		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		const handleResize = () => {
			if (window.innerWidth > 768 && isOpen) {
				setIsOpen(false)
			}
		}
		window.addEventListener('resize', handleResize)

		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('resize', handleResize)
		}
	}, [isOpen])

	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	const closeMenu = () => {
		setIsOpen(false)
	}

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
			<div className='container'>
				<nav className={styles.nav}>
					<a
						className={styles.logoWrapper}
						href='#top'
						onClick={scrollToTop}
						aria-label='На главную'
					>
						<Image src={logo} alt='ФАБРИКА ФАСАДОВ' />
					</a>
					<ul className={styles.list}>
						<li className={styles.item}>
							<a
								className={styles.link}
								href={`#${SECTION_IDS.about}`}
								onClick={e => handleNavClick(e, SECTION_IDS.about)}
							>
								Решения
							</a>
						</li>
						<li className={styles.item}>
							<a
								className={styles.link}
								href={`#${SECTION_IDS.clients}`}
								onClick={e => handleNavClick(e, SECTION_IDS.clients)}
							>
								Мебельным производствам
							</a>
						</li>
						<li className={styles.item}>
							<a
								className={styles.link}
								href={`#${SECTION_IDS.production}`}
								onClick={e => handleNavClick(e, SECTION_IDS.production)}
							>
								Дизайнерам и студиям
							</a>
						</li>
						<li className={styles.item}>
							<a
								className={styles.link}
								href={`#${SECTION_IDS.workProcess}`}
								onClick={e => handleNavClick(e, SECTION_IDS.workProcess)}
							>
								Наши стандарты
							</a>
						</li>
					</ul>
					<button className={styles.btn} onClick={handleCalcClick}>
						Связаться с нами
					</button>
					<button className={styles.burger} onClick={handleOpen}>
						<span
							className={`${styles.burgerLine} ${isOpen ? styles.open : ''}`}
						></span>
					</button>
					<div className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}`}>
						<ul className={styles.burgerList}>
							<li className={styles.item}>
								<a
									className={styles.link}
									href={`#${SECTION_IDS.about}`}
									onClick={e => handleNavClick(e, SECTION_IDS.about)}
								>
									Решения
								</a>
							</li>
							<li className={styles.item}>
								<a
									className={styles.link}
									href={`#${SECTION_IDS.clients}`}
									onClick={e => handleNavClick(e, SECTION_IDS.clients)}
								>
									Мебельным производствам
								</a>
							</li>
							<li className={styles.item}>
								<a
									className={styles.link}
									href={`#${SECTION_IDS.production}`}
									onClick={e => handleNavClick(e, SECTION_IDS.production)}
								>
									Дизайнерам и студиям
								</a>
							</li>
							<li className={styles.item}>
								<a
									className={styles.link}
									href={`#${SECTION_IDS.workProcess}`}
									onClick={e => handleNavClick(e, SECTION_IDS.workProcess)}
								>
									Наши стандарты
								</a>
							</li>
							<li className={styles.burgerBtnsWrapper}>
								<button
									className={`${styles.burgerBtn} ${styles.burgerBtnPrimary}`}
									onClick={handleCalcClick}
								>
									Связаться с нами
								</button>
								<button
									className={`${styles.burgerBtn} ${styles.burgerBtnTransparent}`}
									onClick={handleCalcClick}
								>
									Запросить условия сотрудничества
								</button>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default Header
