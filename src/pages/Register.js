import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import "../styles/Register.css"; // Import external CSS

const Register = () => {
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const { name, email, password, isAdmin } = values;

      // Call the registration API
      const response = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        isAdmin: isAdmin || false,
      });

      if (response.data.message === "User registered successfully") {
        toast.success("Registration Successful!");
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration Failed");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="register-container">
        <div className="register-box">
          <h1 className="register-title">Create an Account</h1>
          <Form
            form={form}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="register-form"
          >
            {/* Name Field */}
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email Address" />
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
                Register
              </Button>
            </Form.Item>
          </Form>

          {/* Footer */}
          <p className="register-footer">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
