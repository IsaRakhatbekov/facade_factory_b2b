import { NextRequest, NextResponse } from 'next/server'
import { getFormData } from '../send-to-telegram/form-store'

const TELEGRAM_API = 'https://api.telegram.org/bot'

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
}

export async function POST(request: NextRequest) {
	try {
		const update = (await request.json()) as {
			callback_query?: {
				id: string
				data: string
				message?: { chat: { id: number }; message_id: number }
			}
		}
		const cq = update.callback_query
		if (!cq || cq.data !== 'copyall') {
			return NextResponse.json({ ok: true })
		}
		const chatId = cq.message?.chat?.id
		const messageId = cq.message?.message_id
		if (chatId == null || messageId == null) {
			return NextResponse.json({ ok: true })
		}

		const botToken = process.env.BOT_TOKEN?.trim().replace(/^["']|["']$/g, '')
		if (!botToken) {
			return NextResponse.json({ ok: true })
		}

		const data = getFormData(chatId, messageId)
		if (!data) {
			await answerCallback(botToken, cq.id, 'Данные уже недоступны.')
			return NextResponse.json({ ok: true })
		}

		const raw = (s: string | undefined) => s || '—'
		const copyText = [
			...(data.source ? [`Источник: ${data.source}`] : []),
			`Имя: ${raw(data.name)}`,
			`Телефон / WhatsApp: ${raw(data.phone)}`,
			`Комментарий: ${raw(data.message)}`,
			`Кого представляет: ${raw(data.role)}`,
		].join('\n')

		const url = `${TELEGRAM_API}${botToken}/sendMessage`
		await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: '<code>' + escapeHtml(copyText) + '</code>',
				parse_mode: 'HTML',
			}),
		})
		await answerCallback(botToken, cq.id)
		return NextResponse.json({ ok: true })
	} catch (e) {
		console.error('telegram-webhook:', e)
		return NextResponse.json({ ok: true })
	}
}

async function answerCallback(
	botToken: string,
	callbackQueryId: string,
	text?: string
) {
	await fetch(`${TELEGRAM_API}${botToken}/answerCallbackQuery`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			callback_query_id: callbackQueryId,
			...(text && { text }),
		}),
	})
}
