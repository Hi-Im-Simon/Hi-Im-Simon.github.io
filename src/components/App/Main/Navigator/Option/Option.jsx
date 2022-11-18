import './Option.css';
import $ from 'jquery';

const Option = (props) => {
	return (
		<button className='Option' 
			onClick={ () => $(props.href)[0].scrollIntoView({ behavior: 'smooth' }) }
		>
			{ props.title }
		</button>
	);
};

export default Option;