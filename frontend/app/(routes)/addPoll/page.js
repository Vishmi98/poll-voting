"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddPoll() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question || !options) {
            alert('Poll and options are required');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/poll', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ question: question, options: options.split('\n') })
            });

            if (res.ok) {
                router.push("/dashboard")
            } else {
                throw new Error("Failed to create a poll");
            }
        } catch (error) {
            console.log(error);
            alert('Failed to create a poll. Please try again later.');
        }
    }

    return (
        <div className="flex flex-col gap-3 mx-auto">
            <h1 className="font-bold text-xl">
                Create your poll
            </h1>
            <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
                <label htmlFor="">Question</label>
                <input
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                    type="text"
                    className="border border-slate-400 px-8 py-2 rounded  p-2 mb-3 border-none bg-gray-100"
                    placeholder="Eg: What is your favourite color?"
                />
                <label htmlFor="">Options 1</label>
                {/* <input
                    onChange={(e) => setOptions(e.target.value)}
                    value={options}
                    type="text"
                    className="border border-slate-400 px-8 py-2 rounded  p-2 mb-3 border-none bg-gray-100"
                    placeholder="Eg: Red"
                /> */}
                <textarea
                    onChange={(e) => setOptions(e.target.value)}
                    value={options}
                    className="border border-slate-400 px-8 py-2 rounded  p-2 mb-3 border-none bg-gray-100"
                    placeholder="Eg: Red"
                />
                <button
                    type="submit"
                    className="bg-sky-600 rounded-lg font-bold text-white py-2 mt-5 px-4 w-fit"
                >
                    Create your poll
                </button>
            </form>
        </div>
    )
}