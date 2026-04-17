import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import Widget from '../../components/Widget';

import s from './Profile.module.scss';

const initialFormState = {
  name: '',
  email: '',
  password: '',
  remember: false,
};

const Profile = () => {
  const [formState, setFormState] = useState(initialFormState);

  const handleFieldChange = (event) => {
    const { checked, name, type, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Profile</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="mb-lg">Profile</h1>
      <Row>
        <Col sm={6}>
          <Widget
            title={
              <h5>
                Edit Profile <span className="fw-semi-bold">Form</span>
              </h5>
            }
          >
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="input-name">Name</Label>
                <Input
                  bsSize="lg"
                  id="input-name"
                  name="name"
                  onChange={handleFieldChange}
                  type="text"
                  value={formState.name}
                />
              </FormGroup>
              <FormGroup>
                <Label for="input-email">Email</Label>
                <Input
                  bsSize="lg"
                  id="input-email"
                  name="email"
                  onChange={handleFieldChange}
                  type="email"
                  value={formState.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="input-password">Password</Label>
                <Input
                  bsSize="lg"
                  id="input-password"
                  name="password"
                  onChange={handleFieldChange}
                  type="password"
                  value={formState.password}
                />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                <FormGroup check className="mb-0">
                  <Input
                    checked={formState.remember}
                    id="remember-me"
                    name="remember"
                    onChange={handleFieldChange}
                    type="checkbox"
                  />
                  <Label check for="remember-me">
                    Remember me
                  </Label>
                </FormGroup>
                <ButtonGroup className="ms-auto">
                  <Button color="default" onClick={() => setFormState(initialFormState)} type="button">
                    Cancel
                  </Button>
                  <Button color="danger" type="submit">
                    Save
                  </Button>
                </ButtonGroup>
              </div>
            </Form>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
