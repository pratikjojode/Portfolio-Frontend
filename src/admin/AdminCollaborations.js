import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Card, Row, Col, Switch } from "antd";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import toast from "react-hot-toast";
import styles from "../styles/AdminCollaborations.css";

const AdminCollaborations = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [gridView, setGridView] = useState(false); // Toggle between Grid and Table

  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/api/v1/collaboration/getCollaboration",
        headers
      );
      setCollaborations(response.data.collaborations);
    } catch (error) {
      toast.error("Failed to fetch collaboration requests");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `/api/v1/collaboration/deleteCollaboration/${id}`,
        headers
      );
      toast.success("Collaboration request deleted successfully");
      fetchCollaborations();
    } catch (error) {
      toast.error("Failed to delete collaboration request");
    }
  };

  const handleView = (record) => {
    setSelectedCollab(record);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Project Idea",
      dataIndex: "projectIdea",
      key: "projectIdea",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button onClick={() => handleView(record)}>View</Button>
          <Button
            danger
            onClick={() => handleDelete(record._id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </Button>
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
        <Switch
          checkedChildren="Grid View"
          unCheckedChildren="Table View"
          checked={gridView}
          onChange={() => setGridView(!gridView)}
        />
      </div>

      {gridView ? (
        <Row
          gutter={[16, 16]}
          style={{ padding: "10px", display: "flex", justifyContent: "center" }}
        >
          {collaborations.map((collab) => (
            <Col xs={24} sm={12} md={8} lg={6} key={collab._id}>
              <Card
                title={
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {collab.name}
                  </span>
                }
                extra={
                  <Button type="primary" onClick={() => handleView(collab)}>
                    View
                  </Button>
                }
                actions={[
                  <Button danger onClick={() => handleDelete(collab._id)}>
                    Delete
                  </Button>,
                ]}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease-in-out",
                  cursor: "pointer",
                }}
                hoverable
              >
                <p>
                  <strong>Email:</strong> {collab.email}
                </p>
                <p
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <strong>Project Idea:</strong> {collab.projectIdea}
                </p>
                <p>
                  <strong>Contact:</strong> {collab.contact}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Table
          columns={columns}
          dataSource={collaborations}
          rowKey="_id"
          loading={loading}
        />
      )}

      <Modal
        title="Collaboration Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedCollab && (
          <div>
            <p>
              <strong>Name:</strong> {selectedCollab.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCollab.email}
            </p>
            <p>
              <strong>Contact:</strong> {selectedCollab.contact}
            </p>
            <p>
              <strong>Project Idea:</strong> {selectedCollab.projectIdea}
            </p>
            <p>
              <strong>Qualifications:</strong> {selectedCollab.qualifications}
            </p>
            <p>
              <strong>Additional Details:</strong>{" "}
              {selectedCollab.additionalDetails}
            </p>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default AdminCollaborations;
