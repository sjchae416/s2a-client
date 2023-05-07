import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const DashboardApp = ({ runnableApp }) => {
	return (
		<div className="col-3">
			<Link to={{
				pathname: `/runnable-appIds/${runnableApp._id}`,

			}}>
				<Card className="card p-0 text-center" sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{runnableApp.name}
							</Typography>
							<hr />
							<Typography variant="body2" color="text.secondary">
								Last opened: {runnableApp.lastOpenedDate}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Link>
			<br />
		</div>
	);
};

export default DashboardApp;
