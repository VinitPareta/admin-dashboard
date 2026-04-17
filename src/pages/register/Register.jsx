import React from 'react';
import { Link } from 'react-router-dom';

import Widget from '../../components/Widget';

const Register = () => (
  <div className="container-fluid py-5">
    <div className="row justify-content-center">
      <div className="col-xl-5 col-lg-6">
        <Widget title="Registration is intentionally lightweight">
          <p className="mb-3">
            This template focuses on the front-end platform. Demo auth is local-only so you
            can plug in your own identity provider or backend without fighting legacy code.
          </p>
          <p className="mb-4">
            Keep the current sign-in flow for demos, or replace it with your production auth
            layer when integrating the template into a real product.
          </p>
          <Link className="btn btn-danger" to="/login">
            Back to login
          </Link>
        </Widget>
      </div>
    </div>
  </div>
);

export default Register;
