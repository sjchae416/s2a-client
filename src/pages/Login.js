import React from 'react';
import Box from '@mui/material/Box';

export default function Login() {
	const logIn = async () => {
		window.open(
			`http://localhost:3333/auth/google`,
			// `http://localhost:${process.env.SERVER_PORT}/auth/google/callback`,
			'_self'
		);

		// FIXME try retrieve server port number from the server or have config file in the client folder
		// fetch('http://localhost:3000/server/port')
		// 	.then((response) => response.json())
		// 	.then((data) => console.log(data.port))
		// 	.catch((error) => console.error(error));
	};

	return (
		<Box>
			<br />
			<br />
			<div className="container">
				<div className="card">
					<h1 className="text-center">S2A</h1>

					<div className="card">
						<h1 className="text-center">Log In</h1>
						<div className="card login-card mx-auto">
							<div
								style={{
									alignItems: 'center',
									justifyContent: 'center',
								}}
								className="row"
							>
								<div className="col-6 text-center">
									<button
										onClick={logIn}
										className="btn btn-success"
										id="login-btn"
									>
										Continue with Google Account
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Box>
	);
}
