import { NextRequest, NextResponse } from 'next/server'
import { setFormData } from './form-store'

const TELEGRAM_API = 'https://api.telegram.org/bot'

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { name, phone, message, role, source } = body as {
			name?: string
			phone?: string
			message?: string
			role?: string
			source?: string
		}
		const sourceNorm = source === 'b2b' ? 'B2B' : 'B2C'

		const botToken = process.env.BOT_TOKEN?.trim().replace(/^["']|["']$/g, '')
		const chatId = process.env.CHAT_ID?.trim().replace(/^["']|["']$/g, '')

		if (!botToken || !chatId) {
			return NextResponse.json(
				{
					error: !chatId
						? 'В .env не задан CHAT_ID. Узнайте его через getUpdates (см. инструкцию).'
						: 'BOT_TOKEN или CHAT_ID не заданы в .env',
				},
				{ status: 500 }
			)
		}

		const safe = (s: string | undefined) =>
			escapeHtml(String(s ?? '').trim()) || '—'

		const text = [
			'<b>🆕 Новая заявка</b> · <b>' + sourceNorm + '</b>',
			'',
			'<i>Нажмите на значение, чтобы скопировать</i>',
			'',
			'<b>Имя:</b> <code>' + safe(name) + '</code>',
			'',
			'<b>Телефон / WhatsApp:</b> <code>' + safe(phone) + '</code>',
			'',
			'<b>Комментарий:</b> <code>' + safe(message) + '</code>',
			'',
			'<b>Кого представляет:</b> <code>' + safe(role) + '</code>',
		].join('\n')

		const url = `${TELEGRAM_API}${botToken}/sendMessage`
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId.includes('-') ? chatId : Number(chatId),
				text,
				parse_mode: 'HTML',
				reply_markup: {
					inline_keyboard: [
						[{ text: '📋 Скопировать всё', callback_data: 'copyall' }],
					],
				},
			}),
		})

		const data = (await res.json().catch(() => ({}))) as {
			ok?: boolean
			result?: { message_id?: number }
			description?: string
		}
		if (!res.ok) {
			return NextResponse.json(
				{ error: data.description || 'Ошибка Telegram API' },
				{ status: res.status }
			)
		}
		const messageId = data.result?.message_id
		if (messageId != null) {
			setFormData(chatId, messageId, {
				name: String(name ?? '').trim(),
				phone: String(phone ?? '').trim(),
				message: String(message ?? '').trim(),
				role: String(role ?? '').trim(),
				source: sourceNorm,
			})
		}

		return NextResponse.json({ ok: true })
	} catch (e) {
		console.error('send-to-telegram:', e)
		return NextResponse.json(
			{ error: 'Ошибка при отправке заявки' },
			{ status: 500 }
		)
	}
}
