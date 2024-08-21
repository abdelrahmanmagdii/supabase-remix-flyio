import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/supabaseClient";

export const loader = async () => {
    const { data, error } = await supabase.rpc('get_greeting');

    if (error) {
        console.error("Error fetching greeting:", error);
        return json({ greeting: "An error occurred while fetching the greeting." });
    }

    return json({ greeting: data });
};

export default function Greeting() {
    const { greeting } = useLoaderData<typeof loader>();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Greeting</h1>
                <p className="text-lg">{greeting}</p>
            </div>
        </div>
    );
}