import Footer from '@/src/components/Footer/Footer'
import Header from '@/src/components/Header/Header'
import IntroOverlay from '@/src/components/IntroOverlay/IntroOverlay'
import Hero from '../components/sections/Hero/Hero'

export default function Home() {
	return (
		<div id='top' className='page-layout'>
			<IntroOverlay />
			<Header />
			<main>
				<Hero />
				{/* <ProblemsSolutions /> */}
				{/* <Industries /> */}
				{/* <Designers /> */}
				{/* <Standards /> */}
				{/* <Form /> */}
			</main>
			<Footer />
		</div>
	)
}
