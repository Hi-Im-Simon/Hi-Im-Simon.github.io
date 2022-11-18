import './Main.css';
// import { useState, useEffect } from 'react';
// import $ from 'jquery';
import Navigator from './Navigator/Navigator';
import Github from './Github/Github';
import Images from './Images/Images';




const Main = (props) => {
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