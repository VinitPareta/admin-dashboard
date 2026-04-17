import React, { useState } from 'react';
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import image1 from '../../images/tables/1.jpg';
import image2 from '../../images/tables/2.jpg';
import image3 from '../../images/tables/3.jpg';
import image4 from '../../images/tables/4.jpg';
import image5 from '../../images/tables/5.jpg';
import Widget from '../../components/Widget';
import s from './Static.module.scss';

const tableStyleRows = [
  {
    id: 1,
    picture: image1,
    description: 'Palo Alto',
    info: {
      type: 'JPEG',
      dimensions: '200x150',
    },
    date: new Date('September 14, 2012'),
    size: '45.6 KB',
    progress: {
      percent: 29,
      colorClass: 'success',
    },
  },
  {
    id: 2,
    picture: image2,
    description: 'The Sky',
    info: {
      type: 'PSD',
      dimensions: '2400x1455',
    },
    date: new Date('November 14, 2012'),
    size: '15.3 MB',
    progress: {
      percent: 33,
      colorClass: 'warning',
    },
  },
  {
    id: 3,
    picture: image3,
    description: 'Down the road',
    label: {
      colorClass: 'success',
      text: 'INFO!',
    },
    info: {
      type: 'JPEG',
      dimensions: '200x150',
    },
    date: new Date('September 14, 2012'),
    size: '49.0 KB',
    progress: {
      percent: 38,
      colorClass: 'inverse',
    },
  },
  {
    id: 4,
    picture: image4,
    description: 'The Edge',
    info: {
      type: 'PNG',
      dimensions: '210x160',
    },
    date: new Date('September 15, 2012'),
    size: '69.1 KB',
    progress: {
      percent: 17,
      colorClass: 'danger',
    },
  },
  {
    id: 5,
    picture: image5,
    description: 'Fortress',
    info: {
      type: 'JPEG',
      dimensions: '1452x1320',
    },
    date: new Date('October 1, 2012'),
    size: '2.3 MB',
    progress: {
      percent: 41,
      colorClass: 'primary',
    },
  },
];

const stripedRows = [
  { firstName: 'Mark', lastName: 'Otto', status: { color: 'danger', label: 'Online' } },
  {
    firstName: 'Jacob',
    lastName: 'Thornton',
    firstNameBadge: { color: 'warning', label: 'ALERT!', textClassName: 'text-gray-dark' },
    status: { color: 'gray', label: 'Away', useSpan: true },
  },
  { firstName: 'Larry', lastName: 'the Bird', status: { color: 'danger', label: 'Construct' } },
];

const hoverRows = [
  { id: 1, firstName: 'Mark', lastName: 'Otto', email: 'ottoto@example.com', status: 'Pending' },
  { id: 2, firstName: 'Jacob', lastName: 'Thornton', email: 'fat.thor@example.com', status: 'Unconfirmed' },
  { id: 3, firstName: 'Larry', lastName: 'the Bird', email: 'larry@example.com', status: 'New' },
  { id: 4, firstName: 'Peter', lastName: 'Horadnia', email: 'peter@example.com', status: 'Active' },
];

const productRows = [
  { name: 'On the Road', price: '$25 224.2', sales: [13, 14, 16, 15, 4, 14, 20], color: '#618fb0' },
  { name: 'HP Core i7', price: '$87 346.1', sales: [14, 12, 16, 11, 17, 19, 16], color: '#999999' },
  { name: "Let's Dance", price: '$57 944.6', sales: [11, 17, 19, 16, 14, 12, 16], color: '#f0b518' },
  { name: 'Air Pro', price: '$118 533.1', sales: [13, 14, 20, 16, 15, 4, 14], color: '#e5603b' },
  { name: 'Version Control', price: '$72 854.5', sales: [16, 15, 4, 14, 13, 14, 20], color: '#618fb0' },
];

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);

const MiniBars = ({ color, data }) => {
  const maxValue = Math.max(...data, 1);

  return (
    <div
      aria-label="sales trend"
      className="d-inline-flex align-items-end gap-1"
      role="img"
      style={{ width: 44, height: 20 }}
    >
      {data.map((value, index) => (
        <span
          key={`${color}-${index}`}
          style={{
            width: 4,
            height: `${Math.max((value / maxValue) * 100, 18)}%`,
            backgroundColor: color,
            borderRadius: 999,
            display: 'block',
          }}
        />
      ))}
    </div>
  );
};

const SelectionCheckbox = ({ checked, id, onChange }) => (
  <div className={s.selectionCheck}>
    <input
      aria-label={`Toggle ${id}`}
      checked={checked}
      className={s.selectionInput}
      id={id}
      onChange={onChange}
      type="checkbox"
    />
  </div>
);

const toggleSingleSelection = (setSelections, index) => (event) => {
  const { checked } = event.target;

  setSelections((current) =>
    current.map((value, currentIndex) => (currentIndex === index ? checked : value))
  );
};

const toggleAllSelections = (setSelections, size) => (event) => {
  setSelections(new Array(size).fill(event.target.checked));
};

const Tables = () => {
  const [stripedSelections, setStripedSelections] = useState([true, false, false]);
  const [borderedSelections, setBorderedSelections] = useState([false, false, false, false, false]);
  const [overflowSelections, setOverflowSelections] = useState([false, false, false, false, false]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Tables Basic</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="page-title mb-lg">
        Tables - <span className="fw-semi-bold">Basic</span>
      </h1>
      <Row>
        <Col sm={12}>
          <Widget title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close>
            <Table borderless className={s.mainTable}>
              <thead>
                <tr>
                  <th className="hidden-sm-down">#</th>
                  <th>Picture</th>
                  <th>Description</th>
                  <th className="hidden-sm-down">Info</th>
                  <th className="hidden-sm-down">Date</th>
                  <th className="hidden-sm-down">Size</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {tableStyleRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      <img alt="" className="img-rounded" height="60" src={row.picture} />
                    </td>
                    <td>
                      {row.description}
                      {row.label ? (
                        <div>
                          <Badge color={row.label.colorClass}>{row.label.text}</Badge>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <p className="mb-0">
                        <small>
                          <span className="fw-semi-bold">Type:</span>
                          <span className="text-muted">&nbsp; {row.info.type}</span>
                        </small>
                      </p>
                      <p>
                        <small>
                          <span className="fw-semi-bold">Dimensions:</span>
                          <span className="text-muted">&nbsp; {row.info.dimensions}</span>
                        </small>
                      </p>
                    </td>
                    <td className="text-semi-muted">{formatDate(row.date)}</td>
                    <td className="text-semi-muted">{row.size}</td>
                    <td className="width-150">
                      <Progress
                        className="progress-sm mb-xs rounded mt-xs"
                        color={row.progress.colorClass}
                        style={{ height: '7px' }}
                        value={row.progress.percent}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="clearfix">
              <div className="d-flex justify-content-end flex-wrap gap-2">
                <Button color="danger" size="sm">Send to...</Button>
                <UncontrolledButtonDropdown>
                  <DropdownToggle caret color="default" size="sm">
                    Clear
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>Clear</DropdownItem>
                    <DropdownItem>Move ...</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Separated link</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <p>Basic table with styled content</p>
            </div>
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Widget title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close>
            <h3>Stripped <span className="fw-semi-bold">Table</span></h3>
            <p>
              Each row is highlighted. You will never get lost there. Just use
              <code> .table-striped</code>.
            </p>
            <Table className="table-striped">
              <thead>
                <tr>
                  <th>
                    <SelectionCheckbox
                      checked={stripedSelections.every(Boolean)}
                      id="striped-all"
                      onChange={toggleAllSelections(setStripedSelections, stripedRows.length)}
                    />
                  </th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                {stripedRows.map((row, index) => (
                  <tr key={`${row.firstName}-${row.lastName}`}>
                    <td>
                      <SelectionCheckbox
                        checked={stripedSelections[index]}
                        id={`striped-${index}`}
                        onChange={toggleSingleSelection(setStripedSelections, index)}
                      />
                    </td>
                    <td>
                      {row.firstName}
                      {row.firstNameBadge ? (
                        <Badge className={row.firstNameBadge.textClassName} color={row.firstNameBadge.color}>
                          {row.firstNameBadge.label}
                        </Badge>
                      ) : null}
                    </td>
                    <td>{row.lastName}</td>
                    <td>
                      {row.status.useSpan ? (
                        <span className="badge bg-gray">{row.status.label}</span>
                      ) : (
                        <Badge color={row.status.color}>{row.status.label}</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <br />
            <br />
            <h3>Hover <span className="fw-semi-bold">Table</span></h3>
            <p>
              Trace only what&apos;s really important. <code>.table-hover</code> is made for it.
            </p>
            <div className="table-responsive">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hoverRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>
                        <a href={`mailto:${row.email}`}>{row.email}</a>
                      </td>
                      <td>
                        <Badge className="text-gray-light" color="gray" pill>
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Widget>
        </Col>
        <Col lg={6}>
          <Widget title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close>
            <h3>Bordered <span className="fw-semi-bold">Table</span></h3>
            <p>
              Each row is highlighted. This is the classic table treatment. Add
              <code> .table-bordered</code> when you want stronger structure.
            </p>
            <Table className="table-bordered table-lg mt-lg mb-0">
              <thead className="text-uppercase">
                <tr>
                  <th>
                    <SelectionCheckbox
                      checked={borderedSelections.every(Boolean)}
                      id="bordered-all"
                      onChange={toggleAllSelections(setBorderedSelections, productRows.length)}
                    />
                  </th>
                  <th>Product</th>
                  <th className="text-end">Price</th>
                  <th className="text-center">Sales</th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((row, index) => (
                  <tr key={`${row.name}-bordered`}>
                    <td>
                      <SelectionCheckbox
                        checked={borderedSelections[index]}
                        id={`bordered-${index}`}
                        onChange={toggleSingleSelection(setBorderedSelections, index)}
                      />
                    </td>
                    <td>{row.name}</td>
                    <td className="text-end">{row.price}</td>
                    <td className="text-center">
                      <MiniBars color={row.color} data={row.sales} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Widget>
          <Widget title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>}>
            <h3>Overflow <span className="fw-semi-bold">Table</span></h3>
            <p>
              Add any non-bordered table within a widget for a seamless design. Wrap the table
              with <code>.widget-table-overflow</code> for an edge-to-edge layout.
            </p>
            <div className="widget-table-overflow">
              <Table className="table-striped table-lg mt-lg mb-0">
                <thead>
                  <tr>
                    <th>
                      <SelectionCheckbox
                        checked={overflowSelections.every(Boolean)}
                        id="overflow-all"
                        onChange={toggleAllSelections(setOverflowSelections, productRows.length)}
                      />
                    </th>
                    <th>Product</th>
                    <th className="text-end">Price</th>
                    <th className="text-center">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row, index) => (
                    <tr key={`${row.name}-overflow`}>
                      <td>
                        <SelectionCheckbox
                          checked={overflowSelections[index]}
                          id={`overflow-${index}`}
                          onChange={toggleSingleSelection(setOverflowSelections, index)}
                        />
                      </td>
                      <td>{row.name}</td>
                      <td className="text-end">{row.price}</td>
                      <td className="text-center">
                        <MiniBars color={row.color} data={row.sales} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Tables;
