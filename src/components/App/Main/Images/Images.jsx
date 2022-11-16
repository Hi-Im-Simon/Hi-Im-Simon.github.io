import './Images.css';
import { useEffect } from 'react';

function importAll(r) {
	let images = [];
	r.keys().map(item => images.push(r(item)));
	return images;
}

const pngs = {
	'languages': importAll(require.context('../../../../assets/languages', false, /\.(png|jpe?g|svg)$/)),
	'frameworks': importAll(require.context('../../../../assets/frameworks', false, /\.(png|jpe?g|svg)$/)),
}

const Images = (props) => {

	useEffect(() => {
		const element = document.getElementsByClassName(props.id)[0].children;
		for (let i = 0; i < element.length; i++) {
			setTimeout(() => element[i].classList.add('show'), 250 * i);
		}
	}, [props.id]);

	// window.onload = (event) => showImages();

	return (
		<div className={ `Images ${ props.id }` }>
			{
				pngs[props.id].map(img =>
						<img className='noselect' key={ img } src={ img } alt="" />
				)
			}
		</div>
	);
};

export default Images;