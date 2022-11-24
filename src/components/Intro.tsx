import '../styles/Intro.css';
import IntroGame from './IntroGame';

const Intro = () => {
	return (
		<div className='Intro'>
			<div className="main-title">
				<h1>Szymon Stanisławski</h1>
				<h2>Hi-Im-Simon</h2>
			</div>
			
			<IntroGame />
			<IntroGame />
			<IntroGame />
			<IntroGame />
		</div>
	);
};

export default Intro;