// components/features/users/LoginForm.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginForm({ onSubmit, loading }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert("Vui lòng nhập đầy đủ email và mật khẩu");
            return;
        }

        onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <div>
                <label
                    htmlFor="login-email"
                    classname="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <Input
                    id="login-email"
                    type="text"
                    placeholder="Nhập email hoặc tên đăng nhập của bạn"
                    value="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                ></Input>
            </div>
            <div>
                <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Mật Khẩu
                </label>
                <Input
                    id="login-password"
                    type="password"
                    placeholder="Nhập mật khẩu của bạn"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                ></Input>
            </div>
            <div>
                <Button type="submit" disabled={loading} classname="w-full">
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
            </div>
            {/* TODO: add Signup and Forget Password links */}
        </form>
    );
}
