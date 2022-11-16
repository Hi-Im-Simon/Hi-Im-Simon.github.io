import './Main.css';
import { useState } from 'react';
import Github from './Github/Github';
import Images from './Images/Images';

const Main = (props) => {
	const [val, setVal] = useState("This is a test website.");

	return (
		<div className='Main'>
			<div className='top'>
				<Images id='languages' />
				<Github />
				<Images id='frameworks' />
			</div>
		</div>
	);
};

export default Main;