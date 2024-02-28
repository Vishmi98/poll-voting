"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditPollForm({ id, question, options }) {
    const [newQuestion, setNewQuestion] = useState(question);
    const [newOptions, setNewOptions] = useState(options);
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/polls/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newQuestion, newOptions })
            });

            if (!res.ok) {
                throw new Error("Failed to create a poll");
            } 

            router.push("/dashboard");
            
        } catch (error) {
            console.log(error);
            alert('Failed to create a poll. Please try again later.');
        }
    }

    return (
        <div className="flex flex-col gap-3 mx-auto">
            <h1>
                Update your poll
            </h1>
            <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
                <label htmlFor="">Poll question</label>
                <input
                    onChange={(e) => setNewQuestion(e.target.value)}
                    value={newQuestion}
                    type="text"
                    className="border border-slate-400 px-8 py-2 rounded  p-2 mb-3 border-none bg-gray-100"
                    placeholder="Eg: What is your favourite color?"
                />
                <label htmlFor="">Poll question</label>
                <textarea
                    onChange={(e) => setNewOptions(e.target.value)}
                    value={newOptions}
                    className="border border-slate-400 px-8 py-2 rounded  p-2 mb-3 border-none bg-gray-100"
                    placeholder="Eg: Red"
                />
                <button
                    type="submit"
                    className="bg-sky-600 rounded-lg font-bold text-white py-2 mt-5 px-4 w-fit"
                >
                    Update your poll
                </button>
            </form>
        </div>
    )
}