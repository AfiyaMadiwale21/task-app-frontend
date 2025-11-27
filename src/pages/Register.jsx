import React from "react";
import { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });



        const data = await res.json();
        alert(data.message);

        if (res.ok) window.location.href = "/login";
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 ">
            <form className="bg-white p-8 shadow-md rounded w-80"
                onSubmit={handleRegister}>

                <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

                <input
                    className="w-full mb-3 p-2 border rounded"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="w-full mb-3 p-2 border rounded"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="w-full mb-3 p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded">
                    Register
                </button>

                <p className="mt-3 text-center">
                    Already have an account?
                    <a className="text-blue-600" href="/login"> Login</a>
                </p>
            </form>
        </div>
    );
}
