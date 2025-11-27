import React, { useState, useEffect } from "react";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "Low",
        dueDate: "",
    });
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("token");

    // Fetch tasks
    const getTasks = async () => {
        try {
            const res = await fetch("http://localhost:5000/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            console.log("TASKS RESPONSE --->", data);

            // Ensure tasks is always an array
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                console.error("Expected an array but got:", data);
                alert(data.message || "Failed to fetch tasks");
                setTasks([]); // prevents .map() crash
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editId
            ? `http://localhost:5000/tasks/${editId}`
            : `http://localhost:5000/tasks`;

        const method = editId ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        });

        setForm({ title: "", description: "", priority: "Low", dueDate: "" });
        setEditId(null);
        getTasks();
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        getTasks();
    };

    const toggleDone = async (task) => {
        await fetch(`http://localhost:5000/tasks/${task._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...task, completed: !task.completed }),
        });

        getTasks();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">

            <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                Task Manager
            </h1>

            {/* FORM CARD */}
            <form
                className="max-w-xl mx-auto backdrop-blur-lg bg-white/40 p-6 rounded-2xl shadow-xl border border-white/20"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    {editId ? "Update Your Task" : "Add New Task"}
                </h2>

                <input
                    className="border p-3 w-full mb-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                    placeholder="Task Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <textarea
                    className="border p-3 w-full mb-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                    placeholder="Task Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <select
                    className="border p-3 w-full mb-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <input
                    type="date"
                    className="border p-3 w-full mb-4 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition">
                    {editId ? "Save Changes" : "Add Task"}
                </button>
            </form>

            {/* TASK LIST */}
            <div className="mt-10 max-w-3xl mx-auto space-y-4">
                {Array.isArray(tasks) && tasks.map((task) => (
                    <div
                        key={task._id}
                        className="backdrop-blur-xl bg-white/50 p-5 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl hover:scale-[1.01] transition"
                    >
                        <div className="flex justify-between items-start">

                            {/* Left Side */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                                <p className="text-gray-700">{task.description}</p>

                                <div className="flex gap-3 mt-2">

                                    {/* Priority badge */}
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                    ${task.priority === "High"
                                            ? "bg-red-200 text-red-700"
                                            : task.priority === "Medium"
                                                ? "bg-yellow-200 text-yellow-700"
                                                : "bg-green-200 text-green-700"
                                        }`}
                                    >
                                        {task.priority}
                                    </span>

                                    {/* Status badge */}
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                    ${task.completed
                                            ? "bg-green-200 text-green-700"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {task.completed ? "Done" : "Pending"}
                                    </span>

                                    {/* Due date badge */}
                                    <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm font-semibold">
                                        Due: {task.dueDate}
                                    </span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-2">

                                <button
                                    className="px-4 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 shadow"
                                    onClick={() => toggleDone(task)}
                                >
                                    {task.completed ? "Undo" : "Done"}
                                </button>

                                <button
                                    className="px-4 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 shadow"
                                    onClick={() => {
                                        setForm(task);
                                        setEditId(task._id);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="px-4 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow"
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}
