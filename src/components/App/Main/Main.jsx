import './Main.css';
import { useState } from 'react';
import Github from './Github/Github';

const Main = (props) => {
	const [val, setVal] = useState("This is a test website.");

	return (
		<div className='Main'>
			<Github />
			<h1>{ val }</h1>
			<input type="text" onChange={(e) => setVal(e.target.value)} />
		</div>
	);
};

export default Main;