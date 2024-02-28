import Link from "next/link";

export default function Header () {
    return (
        <nav className="flex justify-between items-center bg-sky-600 px-8 py-3">
            <Link href={"/"} className="text-white font-bold">PollMe</Link>
            <Link href={"/addPoll"} className="bg-white p-2">Add Poll</Link>
        </nav>
    )
}