import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Divider,
  Modal,
} from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminProfile .css"; // Import external CSS

const { Title, Text } = Typography;

const AdminProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState(null); // Store logged-in admin data

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      form.setFieldsValue(data);
      setAdminData(data);
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      await axios.put("/api/v1/admin/profile", values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Profile updated successfully");
      fetchProfile();
    } catch (error) {
      toast.error("Failed to update profile");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!adminData || !adminData._id) {
      toast.error("Admin ID not found!");
      return;
    }

    try {
      const response = await axios.delete(
        `/api/v1/admin/deleteprofile/${adminData._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success(response.data.message);
      // Optionally, redirect after deletion
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete admin");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-profile-container">
        {/* Profile Form */}
        <Card title="Admin Profile" className="profile-card">
          <Form form={form} layout="vertical" onFinish={handleUpdate}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true }]}
              className="form-item"
            >
              <Input
                size="large"
                placeholder="Enter your name"
                className="input-field"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true }]}
              className="form-item"
            >
              <Input
                size="large"
                placeholder="Enter your email"
                className="input-field"
              />
            </Form.Item>
            <Form.Item className="form-item">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="submit-button"
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Logged-in Admin Details */}
        {adminData && (
          <Card title="Logged-in Admin Details" className="profile-card">
            <Space direction="vertical" size="middle">
              <Title level={5} className="profile-title">
                Name: <Text className="profile-text">{adminData.name}</Text>
              </Title>
              <Divider className="profile-divider" />
              <Title level={5} className="profile-title">
                Email: <Text className="profile-text">{adminData.email}</Text>
              </Title>
              <Divider className="profile-divider" />
              <Title level={5} className="profile-title">
                Admin Status:{" "}
                <Text className="admin-status">
                  {adminData.isAdmin ? "✅ Yes" : "❌ No"}
                </Text>
              </Title>
              <Divider className="profile-divider" />

              {/* Delete Profile Button */}
              <Button
                type="primary"
                danger
                onClick={handleDelete}
                className="delete-button"
              >
                Delete Profile
              </Button>
            </Space>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
