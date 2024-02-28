import Image from "next/image"

export const Body = () => {
    return (
        <>
            <div className="text-6xl font-extrabold py-[60px] text-center">
                <h1>The Best Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-sky-900">
                    <p>Poll creating And Voting</p>
                </div>
            </div>
            {/* <div className="flex items-center justify-center h-full">
                <Link href={"/dashboard"} className="bg-sky-700 text-lg hover:bg-sky-400 flex items-center space-x-2 justify-center px-5 py-2 rounded-lg">
                    <p className="text-white">Get started</p>
                    <HiArrowRight className="text-white" />
                </Link>
            </div> */}
            <div className="flex justify-center">
                <Image src="/image1.png" alt="bg-image" width={400} height={400} />
            </div>
        </>
    )
}