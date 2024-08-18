import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const name = params.name || "World";
    const message = `Greetings, ${name}!`;

    return json({ message, name });
};

export default function Greeting() {
    const { message, name } = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>{message}</h1>
            <p>Hello {name}!</p>
        </div>
    );
}