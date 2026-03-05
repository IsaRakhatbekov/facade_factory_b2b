// Храним последние заявки по chat_id:message_id для кнопки «Скопировать всё»
const store = new Map<
	string,
	{ name: string; phone: string; message: string; role: string; source?: string }
>()

export function setFormData(
	chatId: string | number,
	messageId: number,
	data: {
		name: string
		phone: string
		message: string
		role: string
		source?: string
	}
) {
	store.set(`${chatId}:${messageId}`, data)
	if (store.size > 50) {
		const keys = Array.from(store.keys()).slice(0, store.size - 50)
		keys.forEach((k) => store.delete(k))
	}
}

export function getFormData(chatId: string | number, messageId: number) {
	return store.get(`${chatId}:${messageId}`)
}
