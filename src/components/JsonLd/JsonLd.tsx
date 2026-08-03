import {
	B2C_URL,
	CONTACTS,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_TITLE,
	SITE_URL,
} from '@/src/lib/seo'

/**
 * Структурированные данные Schema.org (JSON-LD).
 * Один @graph со связанными сущностями — так Google понимает,
 * что Organization, LocalBusiness и WebSite описывают один бизнес.
 */
const JsonLd = () => {
	const graph = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${SITE_URL}/#organization`,
				name: SITE_NAME,
				alternateName: 'Fasady.kg',
				url: SITE_URL,
				logo: {
					'@type': 'ImageObject',
					'@id': `${SITE_URL}/#logo`,
					url: `${SITE_URL}/images/logo.svg`,
					caption: SITE_NAME,
				},
				image: { '@id': `${SITE_URL}/#logo` },
				description: SITE_DESCRIPTION,
				telephone: CONTACTS.phone,
				address: {
					'@type': 'PostalAddress',
					streetAddress: CONTACTS.street,
					addressLocality: CONTACTS.city,
					addressCountry: CONTACTS.country,
				},
				contactPoint: [
					{
						'@type': 'ContactPoint',
						telephone: CONTACTS.phone,
						contactType: 'sales',
						areaServed: 'KG',
						availableLanguage: ['ru', 'ky'],
					},
				],
				sameAs: [CONTACTS.whatsapp, CONTACTS.telegram, B2C_URL],
			},
			{
				'@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
				'@id': `${SITE_URL}/#localbusiness`,
				name: SITE_NAME,
				url: SITE_URL,
				image: { '@id': `${SITE_URL}/#logo` },
				description: SITE_DESCRIPTION,
				telephone: CONTACTS.phone,
				parentOrganization: { '@id': `${SITE_URL}/#organization` },
				address: {
					'@type': 'PostalAddress',
					streetAddress: CONTACTS.street,
					addressLocality: CONTACTS.city,
					addressCountry: CONTACTS.country,
				},
				areaServed: [
					{ '@type': 'City', name: 'Бишкек' },
					{ '@type': 'Country', name: 'Кыргызстан' },
				],
				currenciesAccepted: 'KGS',
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Производство мебельных фасадов',
					itemListElement: [
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'Фрезеровка фасадов на ЧПУ',
								description:
									'Фрезеровка мебельных фасадов из МДФ на станках с ЧПУ, включая эксклюзивные и повторяющиеся партии.',
							},
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'Покраска фасадов по RAL и NCS',
								description:
									'Профессиональная покраска мебельных фасадов с точным попаданием в цвет по каталогам RAL и NCS.',
							},
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'Фасады для мебельных производств',
								description:
									'Серийные и индивидуальные заказы фасадов для мебельных фабрик: стабильные партии, понятные расчёты, логистика.',
							},
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: 'Фасады для дизайнеров и архитекторов',
								description:
									'Изготовление фасадов по проектам дизайн-бюро: работа по ТЗ и чертежам, сопровождение проекта.',
							},
						},
					],
				},
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: SITE_URL,
				name: SITE_TITLE,
				description: SITE_DESCRIPTION,
				publisher: { '@id': `${SITE_URL}/#organization` },
				inLanguage: 'ru-RU',
			},
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}/#webpage`,
				url: SITE_URL,
				name: SITE_TITLE,
				description: SITE_DESCRIPTION,
				isPartOf: { '@id': `${SITE_URL}/#website` },
				about: { '@id': `${SITE_URL}/#organization` },
				primaryImageOfPage: { '@id': `${SITE_URL}/#logo` },
				inLanguage: 'ru-RU',
			},
		],
	}

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
		/>
	)
}

export default JsonLd
