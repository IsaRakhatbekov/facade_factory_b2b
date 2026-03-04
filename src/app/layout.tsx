import localFont from 'next/font/local'

import { Manrope } from 'next/font/google'
import '../styles/global.scss'
import '../styles/reset.scss'

export const metadata = {
	title: 'Фабрика фасадов — Фасады для мебели на ЧПУ',
	description:
		'Производство мебельных фасадов на ЧПУ с профессиональной покраской. Фасады кухонь, шкафов и другой мебели. Точно, красиво, в срок.',
	keywords: [
		'фасады для мебели',
		'мебельные фасады',
		'фасады на заказ',
		'производство фасадов',
		'фасады на ЧПУ',
	],
	openGraph: {
		title: 'Фабрика фасадов — Фасады для мебели на ЧПУ',
		description:
			'Производство мебельных фасадов на ЧПУ с профессиональной покраской. Фасады кухонь, шкафов и другой мебели.',
		locale: 'ru_RU',
	},
	robots: {
		index: true,
		follow: true,
	},
}

const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-manrope',
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
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' className={`${manrope.variable} ${benzin.variable}`}>
			<body>{children}</body>
		</html>
	)
}
