import './Main.css';
import { useState } from 'react';
import Github from './Github/Github';

const Main = (props) => {
	const [val, setVal] = useState("This is a test website.");

	return (
		<div className='Main'>
			<Github />
		</div>
	);
};

export default Main;