import './Github.css';
// import {  } from 'react';

const userName = 'Hi-Im-Simon';
let userData = await fetch(`https://api.github.com/users/${ userName }`)
	.then(response => response.json())
	.then(data => { return data }
);

const Github = (props) => {
	return (
		<div className='Github center'>
			<a href={userData.html_url} target="new"><img className='profile-picture' src={userData.avatar_url} alt="Myself" /></a>

			<div className='section'>
				<span className='name block'>{ userData.name }</span>
				<span className='login block'><a href={ userData.html_url } target='new'>{ userData.login }</a></span>
			</div>

			<div className='section'>
				<span className='bio'>{ userData.bio }</span>
			</div>

			<table><tbody>
				<tr className='location'>
					<td><svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg></td>
					<td><a href={ `https://www.google.com/maps/place/${ userData.location }` } target='new'>{ userData.location }</a></td>
				</tr>
				<tr className='mail'>
					<td><svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M1.75 2A1.75 1.75 0 000 3.75v.736a.75.75 0 000 .027v7.737C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H1.75zM14.5 4.07v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88l6.5-3.81zm-13 1.74v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809z"></path></svg></td>
					<td><a href="mailto:stanislawskiszymon1407@gmail.com">stanislawskiszymon1407@gmail.com</a></td>
				</tr>
			</tbody></table>
		</div>
	);
};

export default Github;