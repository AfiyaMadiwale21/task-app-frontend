import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, editingTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");

    // Load values when editing a task
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setDueDate(editingTask.dueDate?.slice(0, 10)); // fix for date input
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, priority, dueDate });

        // Reset fields after submit
        setTitle("");
        setDescription("");
        setPriority("Low");
        setDueDate("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow mb-4"
        >
            <h2 className="text-xl font-bold mb-3">
                {editingTask ? "Edit Task" : "Add Task"}
            </h2>

            <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Description"
                className="w-full p-2 border rounded mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <select
                className="w-full p-2 border rounded mb-3"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <input
                type="date"
                className="w-full p-2 border rounded mb-3"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                {editingTask ? "Update Task" : "Add Task"}
            </button>
        </form>
    );
};

export default TaskForm;
