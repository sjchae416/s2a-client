import React from 'react';

export default function LoginPage() {
	return (
		<div>
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
									<button className="btn btn-success" id="login-btn">
										<a href="http://localhost:3333/auth/google">
											Log in with Google
										</a>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
