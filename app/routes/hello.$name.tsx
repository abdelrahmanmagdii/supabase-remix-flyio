import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const name = params.name || "World";
        console.log("Params received:", params);

        const response = await fetch(
            "https://lsmaidgdcufbngbiutoo.supabase.co/functions/v1/hello-world",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({ name }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response from Supabase:", data);

        return json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return json({ error: "Failed to fetch data" }, { status: 500 });
    }
};

export default function Hello() {
    const data = useLoaderData<typeof loader>();
    const params = useParams();
    console.log("Component rendering started");
    console.log("Data in component:", data);
    console.log("Params in component:", params);

    return (
        <div>
            <h1>Hello Component</h1>
            {data && 'message' in data ? (
                <p>{data.message}</p>
            ) : (
                <p>Loading...</p>
            )}
            <p>URL parameter: {params.name}</p>
        </div>
    );
}
