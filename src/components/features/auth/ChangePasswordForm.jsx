// components/features/auth/ChangePasswordForm.jsx
import React, { useState } from "react";
import { Button, Input } from "@/components/ui";

export default function ChangePasswordForm({ onSubmit, loading, error }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [validationError, setValidationError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setValidationError("");

        if (
            !oldPassword.trim() ||
            !newPassword.trim() ||
            !confirmNewPassword.trim()
        ) {
            setValidationError("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setValidationError("Mật khẩu không khớp với xác nhận");
            return;
        }

        // Nếu validation thành công, gọi hàm 'onSubmit' từ component cha
        onSubmit({ oldPassword, newPassword });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
            <h2 className="text-lg font-bold text-center">Đổi mật khẩu</h2>

            {/* Hiển thị lỗi validation client */}
            {validationError && (
                <div className="text-red-500 text-sm text-center">
                    {validationError}
                </div>
            )}
            {/* Hiển thị lỗi từ API (nếu có, truyền từ component cha) */}
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            {/* Trường nhập Mật khẩu cũ */}
            <div>
                <label
                    htmlFor="old-password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Mật khẩu cũ
                </label>
                <Input
                    id="old-password"
                    type="password"
                    placeholder="Nhập mật khẩu cũ của bạn"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                />
            </div>

            {/* Trường nhập Mật khẩu mới */}
            <div>
                <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Mật khẩu mới
                </label>
                <Input
                    id="new-password"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                />
            </div>

            {/* Trường nhập Xác nhận mật khẩu mới */}
            <div>
                <label
                    htmlFor="confirm-new-password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Xác nhận mật khẩu mới
                </label>
                <Input
                    id="confirm-new-password"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="mt-1 block w-full"
                    disabled={loading}
                />
            </div>

            {/* Nút Submit */}
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
            </Button>
        </form>
    );
}
