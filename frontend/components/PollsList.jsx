"use client";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import React, { useState, useEffect } from "react";

const getPolls = async () => {
    try {
        const res = await fetch('http://localhost:3000/polls');

        if (!res.ok) {
            throw new Error("Failed to fetch polls")
        }

        return res.json()
    } catch (error) {
        console.log("Error loading polls: ", error);
        return [];
    }
}

export default function PollsList() {
    const [polls, setPolls] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({}); // Object to store selected options for each question

    useEffect(() => {
        const fetchData = async () => {
            const pollsData = await getPolls();
            setPolls(pollsData);
        };

        fetchData();
    }, []);

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: option
        }));
    };

    return (
        <>
            {polls.map((p, index) => (
                <form key={index} className="p-4 border border-slate-300 my-3 space-y-3">
                    <div className="flex justify-between items-start">
                        <div className="w-full space-y-2">
                            <h2 className="font-bold text-2xl">{p.question}</h2>
                            <ul className="w-full space-y-1 flex flex-col">
                                {p.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center border p-2 space-x-2">
                                        <input
                                            type="radio"
                                            id={`option${optionIndex}`}
                                            name={`options_${index}`}
                                            value={option}
                                            checked={selectedOptions[p._id] === option} // Check if the option is selected
                                            onChange={() => handleOptionChange(p._id, option)} // Pass the question ID and selected option to the handler
                                        />
                                        <label htmlFor={`option${optionIndex}`} className="flex">{option}</label>
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-2">
                            <RemoveBtn id={p._id} />
                            <Link href={`/editPoll/${p._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded-lg">
                            Submit
                        </button>
                    </div>
                </form>
            ))}
        </>
    )
}
