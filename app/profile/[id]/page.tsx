export default function UserPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                User Page {params.id}
            </h1>
        </div>
    );
}
