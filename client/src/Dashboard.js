import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Col, Container, Row, Image, ListGroup, Modal, Card } from 'react-bootstrap';
import axios from 'axios';
import history from './history';
import userProfile from './UserProfile';

const Dashboard = () => {
		const [fileURL, setFileURL] = useState();
		const [placeholder, setPlaceholder] = useState('Click here to select files');
		const [fileSelected, setFileSelected] = useState(false);
		const [file, setFile] = useState();
		const [updated, isUpdated] = useState(0);

		const [data, getData] = useState('');
		const showData = () => {
			let a = userProfile.getFname();
			axios
				.post('dashboard', { fname : a })
				.then((response) => {
					console.log(response.data);
					const b = response.data;
					getData(b);
				})
		}

		useEffect(() => {
			showData();
		}, []);

		// An event listener function to show file info in the Form.File component
		function AddFile(event) {
			console.log(event.target.files);
			setFile(event.target.files);
			if (!event.target.files[0]) {
				setPlaceholder('Please select a file');
				setFileSelected(false);
			}
			else {
				setPlaceholder('File selected (' + event.target.files[0].name + ')');
				setFileSelected(true);
			}
		}

		// Logs out the user from the session
		function logoutUser() {
			history.push('/login');
			userProfile.delFname();
		}
		// Function to delete data
		function delData(z) {
			 axios
				.post('delData', {d: z, id: data.fname})
				.then(function() {showData()})
				.catch(function(error) {console.log(error);})
		}

		// Dashboard when the user is not logged in
		function SessionInActive() {
			return (
				<div>
					<Container className='err401'>
						Unauthorized!
						<br/>
						<div className='errDesc'>
							<a onClick={() => history.push('/login')}> Click here to login and try again.</a>
						</div>
					</Container>
				</div>
			)
		}
		// Dashboard when the user is logged in
		function SessionActive()
		{
			return (
				<div>
	        <Navbar bg="primary" variant="dark">
	            <Navbar.Brand>Hammoq Assignment</Navbar.Brand>
	            <Navbar.Toggle aria-controls="basic-navbar-nav" />
	            <Navbar.Collapse id="basic-navbar-nav">
	                <Nav className="mr-auto"> </Nav>
									<Button variant="primary" onClick={() => logoutUser()}> Logout </Button>
	            </Navbar.Collapse>
	        </Navbar><br/><br/>
				<Card style={{ width: '10rem' }}>
						<Card.Img variant="top" src={`data:image/jpeg;base64,${data.img}`} />
						<Card.Body>
							<Card.Text>
								Profile Picture
							</Card.Text>
						</Card.Body>
					</Card>
					<br />
					<ListGroup >
					  <ListGroup.Item>First Name : {data.fname} <div class= "btn float-right"> <Button variant="outline-primary" size="sm" onClick = {() => history.push('/passchange')}>Change Password</Button> </div></ListGroup.Item>
					  <ListGroup.Item>Last Name : {data.lname} <div class= "btn float-right"> <Button variant="outline-danger" size="sm" onClick = {()=> delData('lname')}>Delete</Button> </div></ListGroup.Item>
					  <ListGroup.Item>Email Id : {data.email} <div class= "btn float-right"> <Button variant="outline-danger" size="sm" onClick = {()=> delData('email')}>Delete</Button> </div></ListGroup.Item>
					  <ListGroup.Item>Phone No : {data.phNumber} <div class= "btn float-right"> <Button variant="outline-danger" size="sm" onClick = {()=> delData('phNumber')}>Delete</Button> </div></ListGroup.Item>
					  <ListGroup.Item>Date of birth : {data.dob} <div class= "btn float-right"> <Button variant="outline-danger" size="sm" onClick = {()=> delData('dob')}>Delete</Button> </div></ListGroup.Item>
					</ListGroup>
				</div>
			)
		}
		function renderIt() {
			if (!userProfile.getFname()) {
				return SessionInActive();
			}
			else {
				return SessionActive();
			}
		}
		return (
			<div>
				{
					renderIt()
				}
			</div>
		);
};

export default Dashboard;
