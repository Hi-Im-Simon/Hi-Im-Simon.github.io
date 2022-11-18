import './Main.css';
// import { useState, useEffect } from 'react';
// import $ from 'jquery';
import Navigator from './Navigator/Navigator';
import Github from './Github/Github';
import Images from './Images/Images';




const Main = (props) => {
	// const [val, setVal] = useState("This is a test website.");


	// useEffect(() => {
	// 	// document.getElementsByClassName('content')[0].scrollIntoView();
	// 	const el0 = $('.top');
	// 	const el1 = $('.content');
	// 	const el2 = $('.cos');
		
	// 	let lastScroll = -1;
	// 	let lastTarget;

	// 	$('.Main').on('scroll', () => {
	// 		let newScroll = $('.Main').scrollTop();
			
	// 		// scroll down
	// 		if (!(lastTarget === el1) && newScroll > lastScroll && el0.offset().top > -200 && 2 > el0.offset().top) {
	// 			console.log('down')
	// 			$('.Main').animate({
	// 				scrollTop: el1.offset().top
	// 			}, 1000);
	// 			lastTarget = el1;
	// 		}
	// 		// scroll up
	// 		else if (!(lastTarget === el0) && newScroll < lastScroll && el1.offset().top > -2 && 200 > el1.offset().top) {
	// 			console.log('up')
	// 			$('.Main').animate({
	// 				scrollTop: el0.offset().top
	// 			}, 1000);
	// 			lastTarget = el0;
	// 		}
	// 		lastScroll = newScroll;
	// 	});
	// }, []);

	return (
		<div className='Main'>
			<Navigator />

			<div id='about-me'>
				<Images id='languages' />
				<Github />
				<Images id='frameworks' />
			</div>

			<div id="education">TBD</div>
			<div id="experience">TBD</div>
			<div id="projects">TBD</div>
			<div id="knowledge">TBD</div>
		</div>
	);
};

export default Main;