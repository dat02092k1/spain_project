import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { signup } from "../../repository/auth";
import { useStoreActions, useStoreState } from "../../store/hook";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Signup_form() {
  const setUserInfo = useStoreActions((actions) => actions.setUserInfo);
  const currentUser = useStoreState((state) => state.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.loggedIn) {
        navigate('/book');
      }
}, [currentUser?.loggedIn, navigate]);

  const onFinish = async (values: any) => {
    try {
      await signup(values.user);
      setUserInfo({ email: values.user.email, password: values.user.password, loggedIn: true });
    } catch (error) {
      console.log(error);
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Tài khoản đã tồn tại`,
        showConfirmButton: true,
      });
    }
  };
  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[{ required: true, min: 6, max: 10 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <button className="bg-[#1576ff] text-[#ffffff] p-4">Signup</button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Signup_form;
