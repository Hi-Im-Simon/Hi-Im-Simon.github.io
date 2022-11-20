import './Main.css';
import Navigator from './Navigator/Navigator';
import Github from './Github/Github';
import Images from './Images/Images';
import $ from 'jquery';
import { useEffect } from 'react';

const Main = (props) => {
	

	useEffect(() => {
		const observer = new IntersectionObserver((els) => {
			els.forEach((el) => {
				if (el.isIntersecting) {
					el.target.classList.add('show');
				} else {
					el.target.classList.remove('show');
				}
			});
		});

		for (const el of $('.hidden')) {
 			observer.observe(el);
		}
	}, []);

	return (
		<div className='Main'>

			<Navigator />

			<div id='about-me'>
				<Images id='languages' />
				<Github />
				<Images id='frameworks' />
			</div>

			<div id="education">
				<h1>Education</h1>

				<div>
					<p className='hidden'>Current</p>
					<p className='hidden'>Poznań University of Technology</p>
					<p className='hidden'>[2020-TBA] - Computer Science degree (full-time)</p>
				</div>

				<div>
					<p className='hidden'>Completed</p>
					<p className='hidden'>“Bohaterów Monte Cassino” Technical school in Września</p>
					<p className='hidden'>[2016-2020] - IT specialist technical degree</p>
				</div>
			</div>

			<div id="experience">
				<h1>Experience</h1>

				<div>
					<p className='hidden'>IT specialist and Web developer</p>
					<p className='hidden'>2021 – CBiRNT Września</p>
				</div>

				<div>
					<p className='hidden'>IT specialist</p>
					<p className='hidden'>2019 – Urząd Miasta i Gminy Miłosław</p>
				</div>
			</div>
			
			<div id="projects">
				<h1>Projects</h1>
			</div>
			
			<div id="knowledge">
				<h1>Knowledge</h1>
			</div>

		</div>
	);
};

export default Main;