import { json, redirect } from "@remix-run/node";
import { useLoaderData, useSubmit, Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Button } from 'flowbite-react';
import { getSupabase } from '~/supabaseClient';

export const loader: LoaderFunction = async ({ request }) => {
    const response = new Response();
    const supabase = getSupabase(request, response);

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (!session) {
        return redirect("/login");
    }

    if (sessionError) {
        console.error('Error fetching session:', sessionError);
        return json({ error: sessionError.message }, { headers: response.headers });
    }

    const userInfo = session.user;

    return json(
        { email: userInfo.email, userId: userInfo.id },
        { headers: response.headers }
    );
};

export const action: ActionFunction = async ({ request }) => {
    const response = new Response();
    const supabase = getSupabase(request, response);

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out:', error);
        return json({ error: error.message }, { headers: response.headers });
    }

    return redirect("/login", { headers: response.headers });
};

export default function Dashboard() {
    const { email, userId, error } = useLoaderData<typeof loader>();
    const submit = useSubmit();

    const handleSignOut = () => {
        submit(null, { method: "post" });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
                {error ? (
                    <p className="text-red-500 mb-4">{error}</p>
                ) : (
                    <>
                        <p className="text-lg mb-2 text-white">Welcome, {email}!</p>
                        <p className="text-sm mb-6 text-gray-300">
                            User ID: {userId || 'Not available'}
                        </p>
                    </>
                )}
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