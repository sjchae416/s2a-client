import React from 'react';
import {
	MDBBtn,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody
  }
  from 'mdb-react-ui-kit';

export default function LoginPage() {
	return (
		<MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

		<MDBRow>
  
		  <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
  
			<h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
			  S2A<br />
			  <span style={{color: 'hsl(218, 81%, 75%)'}}>Login to your account</span>
			</h1>
  
			<p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
			 A framework for developing spreadsheet-based apps that pull information from one or more spreadsheets.
			</p>
  
		  </MDBCol>
  
		  <MDBCol md='6' className='position-relative'>
  
			<MDBCard className='my-5 bg-glass'>
			  <MDBCardBody className='p-5'>
  
				<MDBBtn href="http://localhost:3333/auth/google" className='w-100 mb-4' size='md'>Sign in with Google</MDBBtn>
  
			  </MDBCardBody>
			</MDBCard>
  
		  </MDBCol>
  
		</MDBRow>
  
	  </MDBContainer>
	);
  }
