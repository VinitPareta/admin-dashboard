import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonDropdown,
  ButtonGroup,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  Progress,
  Row,
  Table,
} from "reactstrap";
import {
  Bell,
  ChatDots,
  Cloud,
  Eye,
  Person,
  Telephone,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts } from "../../features/posts/postsSlice";
import Widget from "../../components/Widget";
import s from "./Dashboard.module.scss";

const chartData = [
  { name: "Prospect", value: 30 },
  { name: "Qualified", value: 80 },
  { name: "Proposal", value: 36 },
  { name: "Closed", value: 48 },
];

const ticketData = [
  { name: "Open", value: 549 },
  { name: "Closed", value: 163 },
  { name: "Pending", value: 89 },
  { name: "Resolved", value: 187 },
];

const chartData2 = [
  { name: "Monday", value: 45 },
  { name: "Tuesday", value: 57 },
  { name: " Wednesday", value: 78 },
  { name: "Thursday", value: 65 },
  { name: "Friday", value: 88 },
];

const COLORS = ["#facc15", "#ef4444", "#8b5cf6", "#10b981"];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.items);
  const fetchStatus = useAppSelector((state) => state.posts.fetchStatus);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  useEffect(() => {
    if (fetchStatus === "idle" && posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchStatus, posts.length]);

  const recentPosts = useMemo(() => posts.slice(0, 5), [posts]);

  return (
    <div className={s.root}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem active>Dashboard</BreadcrumbItem>
      </Breadcrumb>

      <h1 className="mb-lg">Dashboard</h1>

      {/* new section that we add */}
      <Row>
        <Col md={6}>
          <motion.div
            className={s.cardHover}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Widget title="Conversion">
              <ResponsiveContainer width="100%" height={200}>
                {/* this is the for the first graph with prospect and qualified */}
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Widget>
          </motion.div>
        </Col>

        <Col md={6}>
          <motion.div
            className={s.cardHover}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Widget title="Product Performance">
              <div>Revenue</div>
              <Progress animated color="warning" value={80}>
                {/* progress component gives us the horizontal bar graph */}
                $8,450
              </Progress>

              <div className="mt-3">Orders</div>
              <Progress animated color="danger" value={60}>
                2,250
              </Progress>

              <div className="mt-3">Conversion</div>
              <Progress animated color="success" value={70}>
                +56.7%
              </Progress>
            </Widget>
          </motion.div>
        </Col>
      </Row>

      <Row className="mt-lg">
        <Col md={6}>
          <motion.div
            className={s.cardHover}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Widget title="Support Tickets">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  {/* this is the pie chart */}
                  <Pie data={ticketData} dataKey="value" outerRadius={80}>
                    {ticketData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Widget>
          </motion.div>
        </Col>

        <Col md={6}>
          <motion.div className={s.cardHover}>
            <Widget title="User Profit">
              <ResponsiveContainer width="100%" height={200}>
                {/* this is the for profit data */}
                <BarChart data={chartData2}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Widget>
          </motion.div>
        </Col>
      </Row>

      {/*not change already existing table*/}
      <Row className="mt-lg">
        <Col md={6}>
          <motion.div className={s.cardHover}>
            <Widget title="Users">
              <Table borderless responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1", "Alice", "alice@email.com", "active", "success"],
                    ["2", "Bob", "bob@email.com", "delayed", "warning"],
                    ["3", "Duck", "duck@email.com", "active", "success"],
                  ].map(([id, username, email, status, color]) => (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>
                        <span className={`badge bg-${color}`}>{status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Widget>
          </motion.div>
        </Col>

        <Col md={6}>
          <motion.div className={s.cardHover}>
            <Widget title="Alerts">
              <Alert color="warning">Warning message</Alert>
              <Alert color="success">Success message</Alert>
              <Alert color="info">Info message</Alert>
            </Widget>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
