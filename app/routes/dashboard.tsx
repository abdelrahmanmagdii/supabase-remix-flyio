import { json, redirect } from "@remix-run/node";
import { useLoaderData, useSubmit, Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Button } from 'flowbite-react';
import { getSupabase } from '~/supabaseClient';

export const loader: LoaderFunction = async ({ request }) => {
    const response = new Response();
    const supabase = getSupabase(request, response);

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return redirect("/login");
    }

    return json(
        { email: session.user.email },
        { headers: response.headers }
    );
};

export const action: ActionFunction = async ({ request }) => {
    const response = new Response();
    const supabase = getSupabase(request, response);

    await supabase.auth.signOut();

    return redirect("/login", {
        headers: response.headers
    });
};

export default function Dashboard() {
    const { email } = useLoaderData<typeof loader>();
    const submit = useSubmit();

    const handleSignOut = () => {
        submit(null, { method: "post" });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
                <p className="text-lg mb-6 text-white">Welcome, {email}!</p>
                <Form method="post">
                    <Button
                        onClick={handleSignOut}
                        type="submit"
                        color="light"
                        className="w-full text-black bg-white hover:bg-gray-200"
                    >
                        Sign Out
                    </Button>
                </Form>
            </div>
        </div>
    );
}