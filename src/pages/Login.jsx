// import React from "react";
// import { useState } from "react";

// export default function Login() {
//     const [form, setForm] = useState({ email: "", password: "" });

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         const res = await fetch("http://localhost:5000/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(form),
//         });



//         const data = await res.json();

//         if (!res.ok) return alert(data.message);

//         localStorage.setItem("token", data.token);
//         window.location.href = "/dashboard";
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <form className="bg-white p-8 shadow-md rounded w-80"
//                 onSubmit={handleLogin}>

//                 <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

//                 <input className="w-full mb-3 p-2 border rounded"
//                     placeholder="Email"
//                     onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />

//                 <input className="w-full mb-3 p-2 border rounded"
//                     type="password"
//                     placeholder="Password"
//                     onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 />

//                 <button className="w-full bg-green-600 text-white p-2 rounded">
//                     Login
//                 </button>

//                 <p className="mt-3 text-center">
//                     No account?
//                     <a className="text-blue-600" href="/"> Register</a>
//                 </p>

//             </form>
//         </div>
//     );
// }


import React, { useState } from "react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                return alert(data.message || "Login failed");
            }

            if (!data.token) {
                return alert("No token returned. Login failed.");
            }

            // Store token in localStorage
            localStorage.setItem("token", data.token);

            // Navigate to dashboard
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred while logging in.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 ">
            <form
                className="bg-white p-8 shadow-md rounded w-80"
                onSubmit={handleLogin}
            >
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

                <input
                    className="w-full mb-3 p-2 border rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="w-full mb-3 p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="w-full bg-green-600 hover:bg-green-500 text-white p-2 rounded">
                    Login
                </button>

                <p className="mt-3 text-center">
                    No account? <a className="text-blue-600" href="/">Register</a>
                </p>
            </form>
        </div>
    );
}
