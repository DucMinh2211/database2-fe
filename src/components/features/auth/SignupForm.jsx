// components/features/users/SignupForm.jsx

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SignupForm({ onSubmit, loading }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !userName.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp.");
            return;
        }

        onSubmit({ userName, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            {/* Trường nhập Username */}
            <div>
                <label
                    htmlFor="signup-username"
                    className="block text-sm font-medium text-gray-700"
                >
                    Tên đăng nhập
                </label>
                <Input
                    id="signup-username" // ID cho accessibility
                    type="text"
                    placeholder="Chọn tên đăng nhập của bạn"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                />
            </div>

            {/* Trường nhập Email */}
            <div>
                <label
                    htmlFor="signup-email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <Input
                    id="signup-email" // ID cho accessibility
                    type="email" // Sử dụng type="email" để có validation cơ bản của HTML5
                    placeholder="Nhập địa chỉ email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                />
            </div>

            {/* Trường nhập Mật khẩu */}
            <div>
                <label
                    htmlFor="signup-password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Mật khẩu
                </label>
                <Input
                    id="signup-password" // ID cho accessibility
                    type="password"
                    placeholder="Tạo mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                />
            </div>

            {/* Trường nhập Xác nhận Mật khẩu */}
            <div>
                <label
                    htmlFor="signup-confirm-password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Xác nhận Mật khẩu
                </label>
                <Input
                    id="signup-confirm-password" // ID cho accessibility
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                />
            </div>

            {/* Nút Submit */}
            <Button
                type="submit" // Đặt type="submit" để kích hoạt sự kiện onSubmit của form
                disabled={loading} // Vô hiệu hóa nút khi đang load
                className="w-full"
            >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>

            {/* Có thể thêm link 'Đã có tài khoản?' ở đây */}
        </form>
    );
}
