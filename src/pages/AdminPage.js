import React, { useState, useEffect } from 'react';

export default function AdminPage({
	developers,
	setDevelopers,
	fetchDevelopers,
}) {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		fetchDevelopers();
	}, []);

	// TODO abstract into client API
	const addDeveloper = async () => {
		try {
			const response = await fetch('http://localhost:3333/admin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setMessage(data.message);
			setEmail('');
			fetchDevelopers();
		} catch (error) {
			setMessage('Failed to add developer.');
			console.error('Fetch Error:', error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addDeveloper();
	};

	return (
		<div>
			<h1>Add Developer</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit">Add Developer</button>
			</form>
			{message && <p>{message}</p>}
			<h2>List of Developers</h2>
			<ul>
				{developers.map((developer) => (
					<li key={developer._id}>{developer.email}</li>
				))}
			</ul>
		</div>
	);
}
