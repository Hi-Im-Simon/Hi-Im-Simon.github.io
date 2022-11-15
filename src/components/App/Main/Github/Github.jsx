import './Github.css';
// import {  } from 'react';

const userName = 'Hi-Im-Simon';
let userData = {};
await fetch(`https://api.github.com/users/${ userName }`)
	.then(response => response.json())
	.then(data => { 
		Object.keys(data).map(key => {
			userData[key] = data[key];
		})
	}
);

const Github = (props) => {
	console.log(userData)
	return (
		<div className='Github'>
			<a href="https://github.com/Hi-Im-Simon" target="new">
				<img className='profile-picture' src="https://avatars.githubusercontent.com/hi-im-simon" alt="Myself" />
			</a>
			<h1>{ user.name }</h1>
		</div>
	);
};

export default Github;