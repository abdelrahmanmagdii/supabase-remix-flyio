import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
    try {
        const response = await fetch(
            "https://lsmaidgdcufbngbiutoo.supabase.co/functions/v1/hello-world",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({ name: "Mohamed" }),
            }
        );

        // console.log("Response status:", response.status);
        // console.log("Response headers:", Object.fromEntries(response.headers));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Response data:", data);
        return json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        // console.error("Detailed fetch error:", error);
        return json({ error: "Failed to fetch data" }, { status: 500 });
    }
};

export default function Hello() {
    const data = useLoaderData<typeof loader>();

    if ('error' in data) {
        return <div>Error: {data.error}</div>;
    }

    return (
        <div>
            <h1>Hello World</h1>
            <p>{data.message}</p>
        </div>
    );
}