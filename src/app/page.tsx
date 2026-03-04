import Footer from '@/src/components/Footer/Footer'
import Header from '@/src/components/Header/Header'
import IntroOverlay from '@/src/components/IntroOverlay/IntroOverlay'
import Designers from '../components/sections/Designers/Designers'
import Form from '../components/sections/Form/Form'
import Hero from '../components/sections/Hero/Hero'
import Industries from '../components/sections/Industries/Industries'
import ProblemsSolutions from '../components/sections/ProblemsSolutions/ProblemsSolutions'
import Standards from '../components/sections/Standards/Standards'

export default function Home() {
	return (
		<div id='top' className='page-layout'>
			<IntroOverlay />
			<Header />
			<main>
				<Hero />
				<ProblemsSolutions />
				<Industries />
				<Designers />
				<Standards />
				<Form />
			</main>
			<Footer />
		</div>
	)
}
