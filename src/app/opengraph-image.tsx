import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { CONTACTS, SITE_TITLE } from '@/src/lib/seo'

export const alt = SITE_TITLE
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Превью для WhatsApp, Telegram и соцсетей — генерируется на этапе сборки. */
export default async function OpengraphImage() {
	const [benzin, logo] = await Promise.all([
		readFile(join(process.cwd(), 'public/fonts/Benzin-Semibold.ttf')),
		readFile(join(process.cwd(), 'public/images/logo.svg')),
	])

	const logoSrc = `data:image/svg+xml;base64,${logo.toString('base64')}`

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: '#1f1f1f',
					padding: '72px 80px',
					fontFamily: 'Benzin',
				}}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={logoSrc} width={298} height={82} alt='' />

				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div
						style={{
							fontSize: 76,
							color: '#fff',
							lineHeight: 1.1,
							letterSpacing: '0.01em',
						}}
					>
						Мебельные фасады
					</div>
					<div
						style={{
							fontSize: 76,
							color: '#ff9934',
							lineHeight: 1.1,
							letterSpacing: '0.01em',
						}}
					>
						на ЧПУ в Бишкеке
					</div>
					<div
						style={{
							marginTop: 28,
							fontSize: 30,
							color: '#eee',
							lineHeight: 1.35,
						}}
					>
						Фрезеровка · Покраска по RAL и NCS · Стабильные партии
					</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div
						style={{
							width: 96,
							height: 6,
							backgroundColor: '#ff9934',
							marginRight: 28,
						}}
					/>
					<div style={{ fontSize: 32, color: '#fff' }}>
						{CONTACTS.phoneDisplay}
					</div>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Benzin',
					data: benzin,
					style: 'normal',
					weight: 600,
				},
			],
		}
	)
}
