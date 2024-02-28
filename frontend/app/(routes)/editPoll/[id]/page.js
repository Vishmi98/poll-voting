import EditPollForm from "@/components/EditPollForm";

const getPollById = async(id) => {
    try {
        const res = await fetch(`http://localhost:3000/polls/${id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch poll")
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export default async function EditPoll({ params }) {
    const { id } = params;
    

    const pollObj = await getPollById(id);
    const { question, options } = pollObj;

    return (
        <EditPollForm id={id} question={question} options={options} />
    )
}

