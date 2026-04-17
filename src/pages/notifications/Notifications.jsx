import React, { useEffect, useEffectEvent, useState } from 'react';
import {
  Button,
  Col,
  Row,
} from 'reactstrap';
import { toast } from 'react-toastify';

import Widget from '../../components/Widget';
import s from './Notifications.module.scss';

const Notifications = () => {
  const [options, setOptions] = useState({
    position: 'top-right',
    autoClose: 5000,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
  });

  const showWelcomeToast = useEffectEvent(() => {
    toast.success('Thanks for checking out Messenger!', {
      position: 'bottom-right',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  });

  useEffect(() => {
    showWelcomeToast();
  }, []);

  const addSuccessNotification = () =>
    toast.success('Showing a success message worked as expected.', options);

  const addInfoNotification = () => {
    const id = crypto.randomUUID();

    toast.info(
      <div className="d-flex flex-column align-items-center">
        Launching thermonuclear war...
        <Button
          className="width-100 mb-xs mr-xs mt-1 ml-4"
          color="default"
          onClick={() =>
            toast.update(id, {
              ...options,
              render: 'Thermonuclear war averted',
              type: toast.TYPE.SUCCESS,
            })
          }
          outline
          size="sm"
        >
          Cancel launch
        </Button>
      </div>,
      { ...options, toastId: id }
    );
  };

  const addErrorNotification = () => {
    const id = crypto.randomUUID();

    toast.error(
      <div className="d-flex flex-column align-items-center">
        Error destroying alien planet
        <Button
          className="width-100 mb-xs mr-xs mt-1 ml-4"
          color="default"
          onClick={() =>
            toast.update(id, {
              ...options,
              render: 'Alien planet destroyed!',
              type: toast.TYPE.SUCCESS,
            })
          }
          outline
          size="sm"
        >
          Retry
        </Button>
      </div>,
      { ...options, toastId: id }
    );
  };

  return (
    <div className={s.root}>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">YOU ARE HERE</li>
        <li className="breadcrumb-item active">UI Notifications</li>
      </ol>
      <h1 className="page-title">
        Messages - <span className="fw-semi-bold">Notifications</span>
      </h1>

      <Widget title={<h6>Messenger</h6>}>
        <Row>
          <Col lg="4" xs="12">
            <h5 className="m-t-1">Layout options</h5>
            <p>
              Click any position hot-spot to update the placement of future notifications.
            </p>
            <div className="location-selector">
              {[
                ['top-left', 'bit top left'],
                ['top-right', 'bit top right'],
                ['top-center', 'bit top'],
                ['bottom-left', 'bit bottom left'],
                ['bottom-right', 'bit bottom right'],
                ['bottom-center', 'bit bottom'],
              ].map(([position, className]) => (
                <div
                  className={className}
                  key={position}
                  onClick={() => setOptions((current) => ({ ...current, position }))}
                />
              ))}
            </div>
          </Col>

          <Col lg="4" xs="12">
            <h5 className="m-t-1">Notification Types</h5>
            <p>Use success, info, and retry flows to validate the toast container.</p>
            <p>
              <Button color="info" id="show-info-message" onClick={addInfoNotification}>
                Info message
              </Button>
            </p>
            <p>
              <Button color="danger" id="show-error-message" onClick={addErrorNotification}>
                Error + Retry
              </Button>
            </p>
            <p>
              <Button color="success" id="show-success-message" onClick={addSuccessNotification}>
                Success message
              </Button>
            </p>
          </Col>

          <Col lg="4" xs="12">
            <h5 className="m-t-1">Dead simple usage</h5>
            <p>Minimal toast example:</p>
            <pre><code>{'toast("Thanks for checking out Messenger!");'}</code></pre>
            <p>More complex example:</p>
            <pre>
              <code>
                {
                  '\ntoast.success("Build completed", {\n  position: "top-right",\n  autoClose: 5000,\n  draggable: true,\n});\n'
                }
              </code>
            </pre>
          </Col>
        </Row>
      </Widget>
    </div>
  );
};

export default Notifications;
