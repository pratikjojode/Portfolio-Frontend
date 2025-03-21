import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import "../styles/AdminIssues.css";
import { Button, message } from "antd";

const AdminIssues = () => {
  const [issues, setIssues] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get("/api/v1/issues/getIssue");

      setIssues(res.data.issues || res.data || []);
    } catch (error) {
      toast.error("Error fetching issues!");
      setIssues([]); // Prevent undefined errors
    }
  };

  const deleteIssues = async (id) => {
    if (!id) return alert("Invalid issue ID");

    try {
      const res = await axios.delete(`/api/v1/issues/deleteIssue/${id}`);
      if (res.data.success) {
        toast.success("Issue deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error deleting issue:", error);
    }
  };

  const markResolved = async (id) => {
    try {
      await axios.put(`/api/v1/issues/markResolved/${id}`);
      toast.success("Issue marked as resolved!");
      fetchIssues();
    } catch (error) {
      toast.error("Error updating issue status!");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-issues-container">
        {/* View Toggle Buttons */}
        <div className="view-toggle">
          <button
            className={viewMode === "table" ? "active" : ""}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
        </div>

        {/* Table View */}
        {viewMode === "table" && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Title</th>
                <th>Description</th>
                <th>Code Snippet</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
                <th>solutions</th>
              </tr>
            </thead>
            <tbody>
              {issues.length > 0 ? (
                issues.map((issue) => (
                  <tr key={issue._id}>
                    <td>{issue.name}</td>
                    <td>{issue.email}</td>
                    <td>{issue.title}</td>
                    <td>{issue.description}</td>
                    <td>
                      <pre>{issue.codeSnippet || "N/A"}</pre>
                    </td>
                    <td>{issue.category}</td>
                    <td
                      className={
                        issue.status === "Pending" ? "status" : "resolved"
                      }
                    >
                      {issue.status}
                    </td>
                    <td>{new Date(issue.createdAt).toLocaleString()}</td>
                    <td>
                      <Button onClick={() => deleteIssues(issue._id)}>
                        Delete
                      </Button>
                    </td>

                    <td>
                      {issue.status === "Pending" && (
                        <button onClick={() => markResolved(issue._id)}>
                          Mark Resolved
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No issues found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="issue-grid">
            {issues.length > 0 ? (
              issues.map((issue) => (
                <div key={issue._id} className="issue-card">
                  <h3>{issue.title}</h3>
                  <p>
                    <strong>Name:</strong> {issue.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {issue.email}
                  </p>
                  <p>
                    <strong>Category:</strong> {issue.category}
                  </p>
                  <p>
                    <strong>Description:</strong> {issue.description}
                  </p>
                  <p>
                    <strong>Code Snippet:</strong>{" "}
                    <pre>{issue.codeSnippet || "N/A"}</pre>
                  </p>
                  <p
                    className={
                      issue.status === "Pending" ? "status" : "resolved"
                    }
                  >
                    <strong>Status:</strong> {issue.status}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(issue.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <Button onClick={() => deleteIssues(issue._id)}>
                      Delete
                    </Button>
                  </p>
                  {issue.status === "Pending" && (
                    <button onClick={() => markResolved(issue._id)}>
                      Mark Resolved
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No issues found.</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminIssues;
