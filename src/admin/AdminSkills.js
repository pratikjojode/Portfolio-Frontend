import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Select,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import "../styles/skills.css";
import toast from "react-hot-toast";

const { Option } = Select;

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"
  const [form] = Form.useForm();

  const headers = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/skills/getSkills");
      setSkills(response.data);
    } catch (error) {
      toast.error("Failed to fetch skills");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/skills/deleteSkill/${id}`, headers);
      toast.success("Skill deleted successfully");
      fetchSkills();
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  const handleEdit = (record) => {
    setEditingSkill(record);
    form.setFieldsValue({
      name: record.name,
      proficiency: record.proficiency,
    });
    setIsModalVisible(true);
  };

  const handleAddNew = () => {
    setEditingSkill(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("proficiency", values.proficiency);
      if (values.image?.file) {
        formData.append("image", values.image.file);
      } else if (editingSkill?.image) {
        formData.append("existingImage", editingSkill.image);
      }

      if (editingSkill) {
        await axios.put(
          `/api/v1/skills/updateSkill/${editingSkill._id}`,
          formData,
          headers
        );
        toast.success("Skill updated successfully");
      } else {
        await axios.post("/api/v1/skills/postSkill", formData, headers);
        toast.success("Skill added successfully");
      }

      setIsModalVisible(false);
      fetchSkills();
    } catch (error) {
      message.error("Operation failed");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Proficiency", dataIndex: "proficiency", key: "proficiency" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) =>
        text ? (
          <img src={text} alt="Skill" className="skill-image" />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="action-buttons">
          <Button onClick={() => handleEdit(record)} className="edit-button">
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record._id)}
            className="delete-button"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-skills-container">
        <div className="actions">
          <Button
            type="primary"
            onClick={handleAddNew}
            icon={<PlusOutlined />}
            className="add-skill-button"
          >
            Add Skill
          </Button>
          <Button
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          >
            {viewMode === "grid"
              ? "Switch to Table View"
              : "Switch to Grid View"}
          </Button>
        </div>

        {viewMode === "grid" ? (
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill._id} className="skill-card">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="skill-image"
                />
                <h3>{skill.name}</h3>
                <p>{skill.proficiency}</p>
                <div className="action-buttons">
                  <Button
                    onClick={() => handleEdit(skill)}
                    className="edit-button"
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    onClick={() => handleDelete(skill._id)}
                    className="delete-button"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={skills}
            rowKey="_id"
            loading={loading}
            className="skills-table"
          />
        )}
      </div>

      <Modal
        title={editingSkill ? "Edit Skill" : "Add Skill"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Skill Name"
            rules={[{ required: true, message: "Please enter skill name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="proficiency"
            label="Proficiency Level"
            rules={[
              { required: true, message: "Please select a proficiency level!" },
            ]}
          >
            <Select>
              <Option value="Beginner">Beginner</Option>
              <Option value="Intermediate">Intermediate</Option>
              <Option value="Expert">Expert</Option>
            </Select>
          </Form.Item>

          <Form.Item name="image" label="Upload Image">
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingSkill ? "Update" : "Add"} Skill
          </Button>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminSkills;
