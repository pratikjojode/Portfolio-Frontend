import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Button,
  Switch,
  Tooltip,
  Typography,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import "../styles/AdminBlogs.css"; // ✅ Import CSS

const { Title, Text } = Typography;

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false); // ✅ State for view modal
  const [selectedBlog, setSelectedBlog] = useState(null); // ✅ Store selected blog for viewing
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/blogs/getBlogs", headers);
      setBlogs(response.data);
    } catch (error) {
      toast.error("Failed to fetch blogs");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/blogs/deleteBlog/${id}`, headers);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const handleCreate = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.post("/api/v1/blogs/createBlog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Blog created successfully!");
      setIsModalOpen(false);
      form.resetFields();
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to create blog");
    }
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setViewModalOpen(true);
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title", width: 200 },
    { title: "Content", dataIndex: "content", key: "content", ellipsis: true },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="admin-blog-actions">
          <Tooltip title="View">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              onClick={() => handleDelete(record._id)}
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-blogs-header">
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            style={{ marginRight: "10px" }}
          >
            Create Blog
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
        <Row gutter={[24, 24]} style={{ marginTop: 20 }}>
          {blogs.map((blog) => (
            <Col xs={24} sm={12} md={8} lg={6} key={blog._id}>
              <Card
                hoverable
                className="admin-blog-card"
                cover={
                  <img
                    alt={blog.title}
                    src={blog.image ? `${blog.image}` : "/default-blog.png"}
                  />
                }
              >
                <Title level={4}>Title:{blog.title}</Title>
                <Text type="secondary" className="admin-blog-content">
                  {blog.content.substring(0, 100)}...
                </Text>
                <div className="admin-blog-actions">
                  <Tooltip title="View">
                    <Button
                      type="primary"
                      icon={<EyeOutlined />}
                      onClick={() => handleView(blog)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button
                      danger
                      onClick={() => handleDelete(blog._id)}
                      icon={<DeleteOutlined />}
                    />
                  </Tooltip>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="_id"
          loading={loading}
          bordered
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 20 }}
        />
      )}

      {/* ✅ Modal for Viewing a Blog */}
      <Modal
        title={selectedBlog?.title}
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
      >
        {selectedBlog && (
          <div>
            <img
              src={
                selectedBlog.image ? selectedBlog.image : "/default-blog.png"
              }
              alt={selectedBlog.title}
              style={{
                width: "100%",
                height: "auto",
                marginBottom: "15px",
                borderRadius: "5px",
              }}
            />
            <Text>{selectedBlog.content}</Text>
          </div>
        )}
      </Modal>

      {/* ✅ Modal for Creating a Blog */}
      <Modal
        title="Create Blog"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleCreate}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Enter blog title" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Content is required" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter blog content" />
          </Form.Item>
          <Form.Item label="Upload Image">
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={(file) => {
                setImageFile(file);
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminBlogs;
