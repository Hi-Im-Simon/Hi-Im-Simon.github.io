import './Main.css';
import { useState } from 'react';

const Main = (props) => {
	const [val, setVal] = useState("This is a test website.");

	return (
		<div className='Main'>
			<h1>Szymon Stanisławski</h1>
			<h1>{ val }</h1>
			<input type="text" onChange={ (e) => setVal(e.target.value) } />
		</div>
	);
};

export default Main;