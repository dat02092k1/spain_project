import React from 'react'
import { Button, Form, Input, InputNumber } from 'antd';
import { signup } from '../../repository/auth';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = (values: any) => {
  console.log(values);
  signup(values.user);
};

function Signup_form() {
  return (
    <>
    <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    validateMessages={validateMessages}
  > 
    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true, min: 6, max: 10 }]}>
      <Input />
    </Form.Item>
      

    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <button className='bg-[#1576ff] text-[#ffffff] p-4'>
        Signup
      </button>
    </Form.Item>
  </Form>
    </>
  )
}

export default Signup_form