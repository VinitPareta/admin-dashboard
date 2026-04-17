import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import {
  Check2Circle,
  ExclamationTriangleFill,
  Facebook,
  GeoAltFill,
  Globe2,
  List as ListIcon,
  TreeFill,
} from 'react-bootstrap-icons';

import Widget from '../../components/Widget';

const toggleSelectedValue = (values, selected) =>
  values.includes(selected)
    ? values.filter((value) => value !== selected)
    : [...values, selected];

const Buttons = () => {
  const [dropdownState, setDropdownState] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [checkboxGroupOne, setCheckboxGroupOne] = useState([2]);
  const [checkboxGroupTwo, setCheckboxGroupTwo] = useState([1, 3]);
  const [radioGroupOne, setRadioGroupOne] = useState(null);
  const [radioGroupTwo, setRadioGroupTwo] = useState(2);

  const toggleDropdown = (key) => {
    setDropdownState((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>UI Buttons</BreadcrumbItem>
      </Breadcrumb>

      <h1 className="page-title">
        Buttons - <span className="fw-semi-bold">Styles</span>
      </h1>

      <Row>
        <Col md={6} sm={12} xs={12}>
          <Widget title={<h5>Color <span className="fw-semi-bold">Options</span></h5>} close collapse>
            <div>
              <p className="fs-mini text-muted">
                Use any of the available button classes to quickly create a styled button.
                Semantically distinguishable beauty.
              </p>
              <p className="text-start">
                <Button className="w-100 mb-2 me-2" color="default">Default</Button>
                <Button className="w-100 mb-2 me-2" color="primary">Primary</Button>
                <Button className="w-100 mb-2 me-2" color="info">Info</Button>
                <Button className="w-100 mb-2 me-2" color="success">Success</Button>
                <Button className="w-100 mb-2 me-2" color="warning">Warning</Button>
                <Button className="w-100 mb-2 me-2" color="danger">Danger</Button>
                <Button className="w-100 mb-2 me-2" color="gray">Gray</Button>
                <Button className="w-100 mb-2 me-2" color="inverse">Inverse</Button>
              </p>
            </div>
          </Widget>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Widget title={<h5>Size <span className="fw-semi-bold">Variants</span></h5>} close collapse>
            <div>
              <p className="fs-mini text-muted">
                Fancy larger or smaller buttons? Separate sizes are available for all use cases,
                from tiny inline actions to large CTAs.
              </p>
              <p>
                <Button className="mb-2 me-2" color="default" size="lg">Large button</Button>
                <Button className="mb-2 me-2" color="primary">Default button</Button>
                <Button className="mb-2 me-2" color="info" size="sm">Small button</Button>
                <Button className="mb-2 me-2 px-2 py-1 small" color="success">Compact button</Button>
              </p>
            </div>
          </Widget>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Widget title={<h5>Outline <span className="fw-semi-bold">Buttons</span></h5>} close collapse>
            <div>
              <p className="fs-mini">
                In need of a button, but not the hefty background colors they bring?
                Use the <code>outline</code> variant to keep contrast without visual weight.
              </p>
              <p>
                <Button className="w-100 mb-2 me-2" color="default" outline>Default</Button>
                <Button className="w-100 mb-2 me-2" color="primary" outline>Primary</Button>
                <Button className="w-100 mb-2 me-2" color="info" outline>Info</Button>
                <Button className="w-100 mb-2 me-2" color="success" outline>Success</Button>
                <Button className="w-100 mb-2 me-2" color="warning" outline>Warning</Button>
                <Button className="w-100 mb-2 me-2" color="danger" outline>Danger</Button>
                <Button className="w-100 mb-2 me-2" color="gray" outline>Gray</Button>
                <Button className="w-100 mb-2 me-2" color="inverse" outline>Inverse</Button>
              </p>
            </div>
          </Widget>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Widget title={<h5>Rounded <span className="fw-semi-bold">Buttons</span></h5>} close collapse>
            <div>
              <p className="fs-mini">
                Use the rounded utility variants to create softer controls for modern dashboards.
              </p>
              <p>
                <Button className="btn-rounded-f w-100 mb-2 me-2" color="default">Default</Button>
                <Button className="btn-rounded-f w-100 mb-2 me-2" color="primary">Primary</Button>
                <Button className="btn-rounded-f w-100 mb-2 me-2" color="info">Info</Button>
                <Button className="btn-rounded-f w-100 mb-2 me-2" color="success">Success</Button>
                <Button className="btn-rounded w-100 mb-2 me-2" color="warning" outline>Warning</Button>
                <Button className="btn-rounded w-100 mb-2 me-2" color="danger" outline>Danger</Button>
                <Button className="btn-rounded w-100 mb-2 me-2" color="gray" outline>Gray</Button>
                <Button className="btn-rounded w-100 mb-2 me-2" color="inverse" outline>Inverse</Button>
              </p>
            </div>
          </Widget>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Widget title={<h5>Block <span className="fw-semi-bold">Buttons</span></h5>} close collapse>
            <div>
              <p className="fs-mini text-muted">
                Create full-width buttons that span the parent container. They work well for
                menus, stacked forms, and social sign-ins.
              </p>
              <Button className="d-block w-100 mb-2" color="info">Block Button</Button>
              <Button className="d-flex w-100 mb-2 align-items-center justify-content-between" color="default">
                <span>Show Menu</span>
                <ListIcon />
              </Button>
              <Button className="d-flex w-100 mb-2 align-items-center justify-content-center gap-2" color="primary">
                <Facebook />
                <span>Login with Facebook</span>
              </Button>
              <Button className="d-block w-100 mb-2" color="warning">Are you sure?</Button>
            </div>
          </Widget>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Widget title={<h5>Disabled <span className="fw-semi-bold">Buttons</span></h5>} close collapse>
            <div>
              <p className="fs-mini text-muted">
                Make buttons look unclickable by fading them back. Add the <code>disabled</code>
                prop to <code>&lt;Button&gt;</code>.
              </p>
              <p>
                <Button className="me-2" color="primary" disabled>Primary button</Button>
                <Button className="me-2" color="default" disabled>Button</Button>
              </p>
              <p>
                <Button className="me-2" color="success" disabled size="sm">Primary Link</Button>
                <Button className="me-2" color="default" disabled size="sm">Link</Button>
              </p>
            </div>
          </Widget>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Widget title={<h5>Button <span className="fw-semi-bold">Groups</span></h5>} close collapse>
            <div>
              <p className="fs-mini text-muted">
                Group a series of buttons together on a single line with button groups and
                toolbars.
              </p>
              <ButtonGroup className="mb-2">
                <Button color="default">Left</Button>
                <Button color="default">Middle</Button>
                <Button color="default">Right</Button>
              </ButtonGroup>

              <ButtonToolbar className="mb-2 gap-2">
                <ButtonGroup>
                  <Button color="default">1</Button>
                  <Button color="default">2</Button>
                  <Button color="default">3</Button>
                  <Button color="default">4</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button color="default">5</Button>
                  <Button color="default">6</Button>
                  <Button color="default">7</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button color="default">8</Button>
                </ButtonGroup>
              </ButtonToolbar>
            </div>
          </Widget>
        </Col>

        <Col md={6} sm={12} xs={12}>
          <Widget title={<h5>Button <span className="fw-semi-bold">Dropdowns</span></h5>} close collapse>
            <div>
              <p className="fs-mini text-muted">
                Add dropdown menus to nearly anything with the standard dropdown primitives.
                Both solid and segmented dropdown options are available.
              </p>

              <div className="mb-2">
                <ButtonDropdown className="me-2" isOpen={dropdownState.one} toggle={() => toggleDropdown('one')}>
                  <DropdownToggle caret color="danger">
                    One
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Separated link</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>

                <ButtonDropdown isOpen={dropdownState.two} toggle={() => toggleDropdown('two')}>
                  <DropdownToggle caret color="gray" size="sm">
                    One
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Separated link</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
              <div className="mb-2">
                <ButtonDropdown className="me-2" isOpen={dropdownState.three} toggle={() => toggleDropdown('three')}>
                  <Button color="primary" id="dropdownThree">Primary</Button>
                  <DropdownToggle caret className="dropdown-toggle-split" color="primary" />
                  <DropdownMenu>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Separated link</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown isOpen={dropdownState.four} toggle={() => toggleDropdown('four')}>
                  <Button color="gray" id="dropdownFour" size="sm">Gray</Button>
                  <DropdownToggle caret className="dropdown-toggle-split" color="gray" size="sm" />
                  <DropdownMenu>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Separated link</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            </div>
          </Widget>
        </Col>
      </Row>

      <Row>
        <Col md={12} sm={12} xs={12}>
          <Widget title={<h6>Button <span className="fw-semi-bold">Options</span></h6>} close collapse>
            <Row>
              <Col md={4} sm={6} xs={12}>
                <h4>Button <span className="fw-semi-bold">Checkboxes</span></h4>
                <p className="fs-mini text-muted">
                  Use button groups to create multi-select controls for dashboard filters and
                  segmented actions.
                </p>
                <div className="mb-2">
                  <ButtonGroup>
                    <Button
                      active={checkboxGroupOne.includes(1)}
                      color="default"
                      onClick={() => setCheckboxGroupOne((current) => toggleSelectedValue(current, 1))}
                    >
                      Left way
                    </Button>
                    <Button
                      active={checkboxGroupOne.includes(2)}
                      color="default"
                      onClick={() => setCheckboxGroupOne((current) => toggleSelectedValue(current, 2))}
                    >
                      Middle way
                    </Button>
                    <Button
                      active={checkboxGroupOne.includes(3)}
                      color="default"
                      onClick={() => setCheckboxGroupOne((current) => toggleSelectedValue(current, 3))}
                    >
                      Right way
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="mb-2">
                  <ButtonGroup>
                    <Button
                      active={checkboxGroupTwo.includes(1)}
                      color="default"
                      onClick={() => setCheckboxGroupTwo((current) => toggleSelectedValue(current, 1))}
                      size="sm"
                    >
                      Left way
                    </Button>
                    <Button
                      active={checkboxGroupTwo.includes(2)}
                      color="default"
                      onClick={() => setCheckboxGroupTwo((current) => toggleSelectedValue(current, 2))}
                      size="sm"
                    >
                      Middle way
                    </Button>
                    <Button
                      active={checkboxGroupTwo.includes(3)}
                      color="default"
                      onClick={() => setCheckboxGroupTwo((current) => toggleSelectedValue(current, 3))}
                      size="sm"
                    >
                      Right way
                    </Button>
                  </ButtonGroup>
                </div>
              </Col>

              <Col md={4} sm={12} xs={12}>
                <h4>Button <span className="fw-semi-bold">Radios</span></h4>
                <p className="fs-mini text-muted">
                  Single-select button groups work well for dense toolbar controls and compact
                  filter pickers.
                </p>
                <div className="mb-2">
                  <ButtonGroup>
                    <Button active={radioGroupOne === 1} color="default" onClick={() => setRadioGroupOne(1)}>
                      Left way
                    </Button>
                    <Button active={radioGroupOne === 2} color="default" onClick={() => setRadioGroupOne(2)}>
                      Middle way
                    </Button>
                    <Button active={radioGroupOne === 3} color="default" onClick={() => setRadioGroupOne(3)}>
                      Right way
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="mb-2">
                  <ButtonGroup>
                    <Button active={radioGroupTwo === 1} color="default" onClick={() => setRadioGroupTwo(1)} size="sm">
                      Left way
                    </Button>
                    <Button active={radioGroupTwo === 2} color="default" onClick={() => setRadioGroupTwo(2)} size="sm">
                      Middle way
                    </Button>
                    <Button active={radioGroupTwo === 3} color="default" onClick={() => setRadioGroupTwo(3)} size="sm">
                      Right way
                    </Button>
                  </ButtonGroup>
                </div>
              </Col>

              <Col md={4} sm={12} xs={12}>
                <h4>Use with <span className="fw-semi-bold">Icons</span></h4>
                <p className="fs-mini text-muted">
                  React icon components stay lightweight and tree-shakeable. Use them in
                  toolbars, quick actions, and status controls without shipping legacy font files.
                </p>
                <div className="text-center mb-sm">
                  <Button className="w-100 me-2 mb-2" color="default">
                    <TreeFill className="text-success me-2" />
                    Forest
                  </Button>
                  <Button className="w-100 me-2 mb-2" color="default">
                    <Check2Circle className="text-danger me-2" />
                    Submit
                  </Button>
                  <Button className="w-100 me-2 mb-2" color="default">
                    <Facebook className="text-primary me-2" />
                    Login
                  </Button>
                </div>
                <div className="text-center">
                  <Button className="w-100 me-2 mb-2" color="inverse">
                    <ExclamationTriangleFill className="text-warning me-2" />
                    Error
                  </Button>
                  <Button className="w-100 me-2 mb-2" color="inverse">
                    <Globe2 className="text-info me-2" />
                    <span className="text-info">Globe</span>
                  </Button>
                  <Button className="w-100 me-2 mb-2" color="inverse">
                    <span className="circle bg-white me-2">
                      <GeoAltFill className="text-gray" />
                    </span>
                    Map
                  </Button>
                </div>
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Buttons;
