import React, {useEffect} from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { FieldType, IUser } from "../../types/interface";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../repository/auth";
import { useStoreActions, useStoreState } from "../../store/hook";

function Signin_form() {
  const setUserInfo = useStoreActions((actions) => actions.setUserInfo);
  const currentUser = useStoreState((state) => state.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.loggedIn) {
        console.log('User has logged in:', currentUser?.loggedIn);
        navigate('/book');
      }
}, [currentUser?.loggedIn, navigate]);

  const onFinish = async (values: any) => {
    try {
      const user: IUser = {
        email: values.username,
        password: values.password,
      };
    
      const res = await signin(user);
      console.log(res);
      setUserInfo({ email: user.email, password: user.password, loggedIn: true });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="mt-[300px]">
        <Form
          className="m-auto"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="flex gap-3">
              <button className="bg-[#1576ff] text-[#ffffff] p-4">
                Signin
              </button>

              <button className="p-4 bg-red-500 text-[#ffffff]">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Signin_form;