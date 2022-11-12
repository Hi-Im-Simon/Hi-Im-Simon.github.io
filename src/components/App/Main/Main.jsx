import './Main.css';
import { useState } from 'react';

const Main = (props) => {
	const [val, setVal] = useState(10);

	return (
		<div className='Main'>
			<h1>Szymon Stanisławski</h1>
			<h1>{ val }</h1>
			<input type="text" onChange={ (e) => setVal(e.target.value) } />
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
			<h1>hi</h1>
		</div>
	);
};

export default Main;