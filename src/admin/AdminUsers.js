import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Switch } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminUsers.css"; // Import CSS

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [view, setView] = useState("grid"); // Grid or Table View

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Authorization Token
        const response = await axios.get("/api/v1/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Open Edit Modal
  const openEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    setIsModalOpen(true);
  };

  // Handle Update User
  const handleUpdateUser = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/v1/admin/users/${editingUser._id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? response.data.updatedUser : user
        )
      );
      toast.success("User updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  // Handle Delete User
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // Table Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (isAdmin ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (user) => (
        <>
          <Button
            onClick={() => openEditModal(user)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(user._id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-users-container">
        {/* Toggle Buttons for Grid/Table View */}
        <div className="view-toggle">
          <button onClick={() => setView("grid")}>Grid View</button>
          <button onClick={() => setView("table")}>Table View</button>
        </div>

        {/* Grid View */}
        {view === "grid" && (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-actions">
                  <button onClick={() => openEditModal(user)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey="_id"
            className="users-table"
          />
        )}

        {/* Edit User Modal */}
        <Modal
          title="Edit User"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={handleUpdateUser}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, type: "email", message: "Enter valid email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="isAdmin" label="Admin" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
