import localFont from 'next/font/local'
import ReactDOM from 'react-dom'
import type { Metadata, Viewport } from 'next'

import { Manrope } from 'next/font/google'
import JsonLd from '@/src/components/JsonLd/JsonLd'
import {
	CONTACTS,
	SITE_DESCRIPTION,
	SITE_KEYWORDS,
	SITE_NAME,
	SITE_TITLE,
	SITE_URL,
} from '@/src/lib/seo'
import '../styles/global.scss'
import '../styles/reset.scss'

export const metadata: Metadata = {
	// Базовый URL — без него canonical и og:image остаются относительными и не работают.
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_TITLE,
		template: `%s — ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	applicationName: SITE_NAME,
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	category: 'Производство мебельных фасадов',
	// Схлопывает www/не-www и адреса с UTM-метками в один индексируемый URL.
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		url: SITE_URL,
		siteName: SITE_NAME,
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		locale: 'ru_RU',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	// Телефон кликабелен на мобильных — важно для заявок.
	formatDetection: {
		telephone: true,
		address: false,
		email: false,
	},
	// Коды подтверждения задаются переменными окружения в Vercel.
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
		yandex:
			process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? 'dc884fc2a5231c00',
	},
}

export const viewport: Viewport = {
	themeColor: '#1f1f1f',
	width: 'device-width',
	initialScale: 1,
}

const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-manrope',
	display: 'swap',
})

const benzin = localFont({
	src: [
		{
			path: '../../public/fonts/Benzin-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Benzin-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Benzin-Semibold.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/benzin-bold.otf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-benzin',
	display: 'swap',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	// Фон первого экрана — LCP-элемент, грузим его как можно раньше.
	ReactDOM.preload('/images/heroBg.webp', {
		as: 'image',
		type: 'image/webp',
		fetchPriority: 'high',
	})

	return (
		<html lang='ru' className={`${manrope.variable} ${benzin.variable}`}>
			<head>
				<meta name='geo.region' content='KG-GB' />
				<meta name='geo.placename' content={CONTACTS.city} />
			</head>
			<body>
				<JsonLd />
				{children}
			</body>
		</html>
	)
}
