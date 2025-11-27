import React from "react";

const TaskItem = ({ task, onDelete, onEdit, onToggleDone }) => {
    return (
        <div className="backdrop-blur-xl bg-white/50 p-5 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl hover:scale-[1.01] transition mb-4">

            <div className="flex justify-between items-start">

                {/* LEFT SECTION */}
                <div>
                    <h3 className={`text-xl font-bold text-gray-800 ${task.completed ? "line-through opacity-60" : ""}`}>
                        {task.title}
                    </h3>

                    <p className="text-gray-700 mt-1">{task.description}</p>

                    {/* BADGES */}
                    <div className="flex gap-3 mt-3 flex-wrap">

                        {/* Priority Badge */}
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                            ${task.priority === "High"
                                    ? "bg-red-200 text-red-700"
                                    : task.priority === "Medium"
                                        ? "bg-yellow-200 text-yellow-700"
                                        : "bg-green-200 text-green-700"
                                }`}
                        >
                            {task.priority}
                        </span>

                        {/* Status Badge */}
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                            ${task.completed
                                    ? "bg-green-200 text-green-700"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {task.completed ? "Done" : "Pending"}
                        </span>

                        {/* Due Date Badge */}
                        <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-sm font-semibold">
                            Due: {task.dueDate?.slice(0, 10)}
                        </span>
                    </div>
                </div>

                {/* RIGHT SECTION — BUTTONS */}
                <div className="flex flex-col gap-2">

                    <button
                        onClick={() => onToggleDone(task._id)}
                        className={`px-4 py-1 rounded-lg text-white shadow transition 
                        ${task.completed
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                    >
                        {task.completed ? "Undo" : "Done"}
                    </button>

                    <button
                        onClick={() => onEdit(task)}
                        className="px-4 py-1 rounded-lg bg-purple-500 hover:bg-purple-600 text-white shadow transition"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(task._id)}
                        className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow transition"
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TaskItem;
