import './Images.css';

function importAll(r) {
	let images = [];
	r.keys().map((item, index) => { images.push(r(item)); });
	return images;
}

const imgs = {
	'languages': importAll(require.context('../../../../assets/languages', false, /\.(png|jpe?g|svg)$/)),
	'frameworks': importAll(require.context('../../../../assets/frameworks', false, /\.(png|jpe?g|svg)$/)),
}

const Images = (props) => {
	return (
		<div className={ `Images ${ props.id }` }>
			<img src={ imgs[props.id][0] } alt="" />
		</div>
	);
};

export default Images;