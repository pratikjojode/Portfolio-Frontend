import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import React Hot Toast
import "../styles/Login.css"; // Import the external CSS file

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { email, password } = values;
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (response.data.message === "Login Successful") {
        toast.success("Login Successful!");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (response.data.user && response.data.user.isAdmin === true) {
          toast.success("Redirecting to Admin Dashboard...");
          navigate("/admin-dashboard");
        } else {
          toast.success("Redirecting to Home...");
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login Failed");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">Login</h1>
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="login-form"
          >
            {/* Email Field */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>

          {/* Footer Links */}
          <div className="login-footer">
            Don't have an account? <a href="/register">Register</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
