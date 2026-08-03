import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/** Фавиконка: монограмма «ФФ» фирменным шрифтом на тёмном фоне. */
export default async function Icon() {
	const benzin = await readFile(
		join(process.cwd(), 'public/fonts/Benzin-Semibold.ttf')
	)

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#1f1f1f',
					color: '#ff9934',
					fontFamily: 'Benzin',
					fontSize: 30,
					letterSpacing: '0.02em',
				}}
			>
				ФФ
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
