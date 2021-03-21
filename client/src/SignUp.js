import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import history from './history';
import userProfile from './UserProfile';

// const ValidatedSignuptooForm = () => {
function ValidatedSignupForm() {

	return(
		<div>
			<Formik
				initialValues = {{ lname:"", fname: "", password: "" }}
				onSubmit = {(values, { setSubmitting }) => {
					setTimeout(() => {
						console.log('Submitted these - ', values);
						// setSubmitting(false);
					}, 500);
					userProfile.setFname(values.fname);
					axios
						.post('register', values)
						.then(() => {
							console.log('Values sent');
							})
						.catch(err => {
							console.error(err);
						});
					history.push('/uploadimg')
				}}
				validationSchema = {Yup.object().shape({
					dob: Yup.string()
						.required('Date of birth is required'),
					fname: Yup.string()
						.required('First name is required'),
					password: Yup.string()
						.required('Please provide a password')
						.min(8, 'Password too short - must atleast have 8 characters')
						.matches(/(?=.*[0-9])/, 'Password must contain a number.')
				})}
			>
			{(
				{
					values,
					touched,
					errors,
					isSubmitting,
					handleChange,
					handleBlur,
					handleSubmit,
					isValid,
				}
			) => (
				<div>
					<br/>
					<br/>
					<div className="titlemain"> Hammoq Assignment </div>
					<br />
					<br />
					<div className="desc2"> Create a new account</div>
					<br />

	        <Form noValidate onSubmit={handleSubmit}>

							<Form.Row className="justify-content-md-center">
								<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomUsername">
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id="inputGroupPrepend">a</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
											type="text"
											name="lname"
											placeholder="Enter your last name"
											value={values.name}
											onChange={handleChange}
											onBlur={handleBlur}
											isInvalid={errors.name && touched.name}
											isValid={!errors.name && touched.name}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.name}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>


						<Form.Row className="justify-content-md-center">
							<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomfname">
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">a</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
										name="fname"
										type="text"
										placeholder="Enter your first name"
										value={values.fname}
										onChange={handleChange}
										onBlur={handleBlur}
										isInvalid={!!errors.fname && touched.fname}
										isValid={!errors.fname && touched.fname}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.fname}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Form.Row>


								<Form.Row className="justify-content-md-center">
									<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomEmail">
									<InputGroup>
										<InputGroup.Prepend>
											<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
												type="text"
												name="email"
												placeholder="Enter your email address"
												value={values.name}
												onChange={handleChange}
												onBlur={handleBlur}
												isInvalid={errors.name && touched.name}
												isValid={!errors.name && touched.name}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.name}
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Form.Row>

							<Form.Row className="justify-content-md-center">
								<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomPhNumber">
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id="inputGroupPrepend">+91</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
											type="text"
											name="phNumber"
											placeholder="Enter your phone number"
											value={values.name}
											onChange={handleChange}
											onBlur={handleBlur}
											isInvalid={errors.name && touched.name}
											isValid={!errors.name && touched.name}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.name}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>

						<Form.Row className="justify-content-md-center">
							<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomDob">
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">/</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
										name="dob"
										type="text"
										placeholder="Enter your date of birth"
										value={values.dob}
										onChange={handleChange}
										onBlur={handleBlur}
										isInvalid={!!errors.dob && touched.dob}
										isValid={!errors.dob && touched.dob}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.dob}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Form.Row>

					<Form.Row className="justify-content-md-center">
						<Form.Group  as={Col} md="3" xs="11" controlId="validationCustomPassword">
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
									name="password"
									type="password"
									placeholder="Enter a strong password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									isInvalid={errors.password && touched.password}
									isValid={!errors.password && touched.password}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.password}
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
				</Form.Row>

				<Form.Row className="justify-content-md-center">
					<Button type="submit" disabled = {(errors.name || errors.fname || errors.password) || !(touched.name || touched.fname || touched.password)}>Sign Up</Button>
				</Form.Row>
        <br />
        <Form.Row className="justify-content-md-center">
          <pre className="hlink"> <a onClick={() => history.push('/login')}> Already signed-up? Click here to login. </a></pre>
        </Form.Row>

      </Form>
			</div>
			)}
			</Formik>
		</div>
	)
}
export default ValidatedSignupForm;
