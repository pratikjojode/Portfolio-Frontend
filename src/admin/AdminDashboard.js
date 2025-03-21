import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin } from "antd";
import {
  ProjectOutlined,
  UserOutlined,
  CodeOutlined,
  TeamOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    users: 0,
    collaborations: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    fetchStatistics();

    // Set up the real-time clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const fetchStatistics = async () => {
    try {
      const [projectsRes, skillsRes, usersRes, collaborationsRes, blogsRes] =
        await Promise.all([
          axios.get("/api/v1/projects/getProject"),
          axios.get("/api/v1/skills/getSkills"),
          axios.get("/api/v1/admin/users", headers),
          axios.get("/api/v1/collaboration/getCollaboration"),
          axios.get("/api/v1/blogs/getBlogs"),
        ]);

      setStats({
        projects: projectsRes.data?.projects?.length ?? 0,
        skills: skillsRes.data?.length ?? 0,
        users: usersRes.data?.users?.length ?? 0,
        collaborations: collaborationsRes.data?.collaborations?.length ?? 0,
        blogs: blogsRes.data?.length ?? 0,
      });
    } catch (error) {
      toast.error("Failed to fetch dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  // Data for charts
  const barData = [
    { name: "Projects", count: stats.projects },
    { name: "Skills", count: stats.skills },
    { name: "Blogs", count: stats.blogs },
  ];

  const pieData = [
    { name: "Users", value: stats.users },
    { name: "Collaborations", value: stats.collaborations },
  ];

  const lineData = [
    { name: "Jan", count: 40 },
    { name: "Feb", count: 30 },
    { name: "Mar", count: 50 },
    { name: "Apr", count: 45 },
  ];

  const areaData = [
    { name: "Jan", users: 20, collaborations: 10 },
    { name: "Feb", users: 30, collaborations: 15 },
    { name: "Mar", users: 40, collaborations: 20 },
    { name: "Apr", users: 35, collaborations: 25 },
  ];

  const COLORS = ["#0077b6", "#00c49f"];

  return (
    <AdminLayout>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
            <Col xs={24} sm={12} md={6}>
              <Card
                title="Total Projects"
                bordered={false}
                className="dashboard-card"
              >
                <ProjectOutlined className="dashboard-icon" />
                <h2 className="dashboard-stat">{stats.projects}</h2>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                title="Total Skills"
                bordered={false}
                className="dashboard-card"
              >
                <CodeOutlined className="dashboard-icon" />
                <h2 className="dashboard-stat">{stats.skills}</h2>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                title="Total Users"
                bordered={false}
                className="dashboard-card"
              >
                <UserOutlined className="dashboard-icon" />
                <h2 className="dashboard-stat">{stats.users}</h2>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                title="Total Blogs"
                bordered={false}
                className="dashboard-card"
              >
                <BookOutlined className="dashboard-icon" />
                <h2 className="dashboard-stat">{stats.blogs}</h2>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                title="Collaboration Requests"
                bordered={false}
                className="dashboard-card"
              >
                <TeamOutlined className="dashboard-icon" />
                <h2 className="dashboard-stat">{stats.collaborations}</h2>
              </Card>
            </Col>

            {/* Real-Time Clock Card */}
            <Col xs={24} sm={12} md={6}>
              <Card
                title="Current Time"
                bordered={false}
                className="dashboard-card"
              >
                <ClockCircleOutlined className="dashboard-icon" />
                <h2 className="dashboard-stat">
                  {currentTime.toLocaleTimeString()}
                </h2>
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row gutter={[16, 16]} className="dashboard-chart-container">
            <Col xs={24} md={8}>
              <Card
                title="Projects, Skills & Blogs Overview"
                bordered={false}
                className="dashboard-chart-card"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" stroke="#333333" />
                    <YAxis stroke="#333333" />
                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #ddd",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#0077b6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                title="Users & Collaborations"
                bordered={false}
                className="dashboard-chart-card"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #ddd",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Line Chart */}
            <Col xs={24} md={8}>
              <Card
                title="Monthly Activity"
                bordered={false}
                className="dashboard-chart-card"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#333333" />
                    <YAxis stroke="#333333" />
                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #ddd",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#0077b6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Area Chart */}
            <Col xs={24} md={8}>
              <Card
                title="Users & Collaborations Over Time"
                bordered={false}
                className="dashboard-chart-card"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#333333" />
                    <YAxis stroke="#333333" />
                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #ddd",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#0077b6"
                      fill="#0077b6"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="collaborations"
                      stroke="#00c49f"
                      fill="#00c49f"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
