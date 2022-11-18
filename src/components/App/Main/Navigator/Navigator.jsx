import './Navigator.css';
import Option from './Option/Option';

const Navigator = (props) => {
	return (
		<div className='Navigator'>
			<Option title='About me' href='#about-me' />
			<Option title='Education' href='#education' />
			<Option title='Experience' href='#experience' />
			<Option title='Projects' href='#projects' />
			<Option title='Knowledge' href='#knowledge' />
		</div>
	);
};

export default Navigator;