import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Button,
  Switch,
  Tooltip,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  GithubOutlined,
  LinkOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";

const { TextArea } = Input;

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProject, setEditingProject] = useState(null);
  const [fileList, setFileList] = useState([]); // For image upload

  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/projects/getProject", headers);
      setProjects(response.data.projects);
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/projects/deleteProject/${id}`, headers);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const showModal = (project = null) => {
    setEditingProject(project);
    form.setFieldsValue(
      project || {
        title: "",
        description: "",
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        image: "",
      }
    );
    setFileList(
      project
        ? [{ uid: "-1", name: "image.png", status: "done", url: project.image }]
        : []
    ); // Pre-fill image if editing
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Append all form fields
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Append the image file
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj || fileList[0]; // Ensure correct file
        formData.append("image", file);
      }

      if (editingProject) {
        await axios.put(
          `/api/v1/projects/updateProject/${editingProject._id}`,
          formData,
          {
            headers: {
              ...headers.headers,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Project updated successfully");
      } else {
        await axios.post("/api/v1/projects/postProject", formData, {
          headers: {
            ...headers.headers,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Project created successfully");
      }

      setIsModalVisible(false);
      fetchProjects();
    } catch (error) {
      toast.error("Failed to save project");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProject(null);
    setFileList([]); // Clear file list on cancel
  };

  // Upload component props
  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
      return true;
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
    listType: "picture",
    maxCount: 1,
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Technologies", dataIndex: "technologies", key: "technologies" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Live Demo">
            <Button type="link" href={record.liveUrl} target="_blank">
              <LinkOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="GitHub">
            <Button type="link" href={record.githubUrl} target="_blank">
              <GithubOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="link" onClick={() => showModal(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button danger onClick={() => handleDelete(record._id)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            style={{ marginRight: 16 }}
          >
            Add Project
          </Button>
          <Switch
            checkedChildren="Grid View"
            unCheckedChildren="Table View"
            checked={gridView}
            onChange={() => setGridView(!gridView)}
          />
        </div>
      </div>

      {gridView ? (
        <Row gutter={[16, 16]}>
          {projects.map((project) => (
            <Col xs={24} sm={12} md={8} lg={6} key={project._id}>
              <Card
                className="projects"
                hoverable
                cover={
                  <img
                    alt={project.title}
                    src={project.image ? `${project.image}` : ""}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                actions={[
                  <Tooltip title="Live Demo">
                    <Button type="link" href={project.liveUrl} target="_blank">
                      <LinkOutlined />
                    </Button>
                  </Tooltip>,
                  <Tooltip title="GitHub">
                    <Button
                      type="link"
                      href={project.githubUrl}
                      target="_blank"
                    >
                      <GithubOutlined />
                    </Button>
                  </Tooltip>,
                  <Tooltip title="Edit">
                    <Button type="link" onClick={() => showModal(project)}>
                      <EditOutlined />
                    </Button>
                  </Tooltip>,
                  <Tooltip title="Delete">
                    <Button danger onClick={() => handleDelete(project._id)}>
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  title={project.title}
                  description={project.description}
                />
                <p>
                  <strong>Technologies:</strong> {project.technologies}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="_id"
          loading={loading}
        />
      )}

      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="liveUrl"
            label="Live URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="githubUrl"
            label="GitHub URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Upload Image">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminProjects;
