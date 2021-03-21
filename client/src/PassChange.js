import React, {useState} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {Form, Button, Col, InputGroup, Alert} from 'react-bootstrap';
import axios from 'axios';
import history from './history';
import userProfile from './UserProfile'

function PassChangeForm() {
  const [IfPresent, setIfPresent] = useState(true);
  const [show, setShow] = useState(null);
  return (
    <div>
    <Formik
      initialValues={{ fname: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
        axios
          .post('passchange', values)
          .then((response) => {
            console.log('Values sent ' + response.status)
            if (response.status = 200)
            {
              console.log("LOGGED IN");
              userProfile.setFname(response.data.fname);
            }
            history.push('/login')
          })
          .catch(err => {
            if (err.status = 404)
            {
              setIfPresent(false);
              setShow(true);
            }
            console.error(err);
          });

      }}
      validationSchema={Yup.object().shape({
        fname: Yup.string()
          .required("Invalid fname"),
        password: Yup.string()
          .required("Invalid password")
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
        }
      ) => (
  				<div>
  					<br/>
  					<br/>
  					<div className="titlemain"> Hammoq Assignment</div>
  					<br />
  					<br />
  					<br />
  					<br />
  					<div className="desc2"> Change your password</div>
  					<br />

  	        <Form onSubmit={handleSubmit}>

  						<Form.Row className="justify-content-md-center">
  							<Form.Group  as={Col} md="4" xs="11" controlId="validationCustomUsername">
  							<InputGroup>
  								<InputGroup.Prepend>
  									<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
  								</InputGroup.Prepend>
  								<Form.Control
  										name="fname"
  										type="text"
  										placeholder="Enter your first name"
  										value={values.fname}
  										onChange={handleChange}
  										onBlur={handleBlur}
  										isInvalid={errors.fname && touched.fname}
  								/>
  								<Form.Control.Feedback type="invalid">
  									{errors.fname}
  								</Form.Control.Feedback>
  							</InputGroup>
  						</Form.Group>
  					</Form.Row>

          <Form.Row className="justify-content-md-center">
            <Form.Group  as={Col} md="4" xs="11" controlId="validationCustomPassword">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.password && touched.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>

          <Form.Row className="justify-content-md-center">
            <Button type="submit">Change password</Button>
          </Form.Row>
          <br />
          <Form.Row className="justify-content-md-center">
            <pre className="hlink"> <a onClick={() => history.push('/')}> Want to create a new account instead? Click here to sign-up. </a></pre>
          </Form.Row>
          <Form.Row className="justify-content-md-center">

          </Form.Row>
  	        </Form>
  				</div>
      )}
    </Formik>
  </div>
  )
}

export default PassChangeForm;
