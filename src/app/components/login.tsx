"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Form, Input, Image, message } from 'antd';
import { useState } from "react";

type FieldType = {
    userName?: string;
    password?: string;
    remember?: string;
};

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: any) => {
        setLoading(true);

        const res = await signIn("credentials", {
            userName: values.userName,
            password: values.password,
            redirect: false,
            callbackUrl: '/'
        });
        setLoading(false);
        if (res?.status === 401) {
            message.error('Username or password is incorrect - please try again', 1.5)
        }
        if (!res?.error) {
            message.success('Login Authenticated', 1.5)
            router.push("http://localhost:3000");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='login'>
            <div className="logo">
                <Image
                    width={"65px"}
                    src="/images/login.webp"
                    preview={false}
                    alt="no-image"
                />
            </div>
            <h3 className='title'>Sign In</h3>
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 800 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="userName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 0, span: 24 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 24 }} style={{ width: "100%" }}>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;