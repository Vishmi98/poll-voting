"use client";

import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveBtn({ id }) {
    const router = useRouter();
    const removePoll = async () => {
        const confirmed = confirm('Are you sure?');

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/polls/${id}`, {
                method: "DELETE"
            })
            if (res.ok) {
                router.refresh()
            }
        }
    }
    return (
        <button onClick={removePoll} className="text-red-500">
            <HiOutlineTrash size={24} />
        </button>
    )
}