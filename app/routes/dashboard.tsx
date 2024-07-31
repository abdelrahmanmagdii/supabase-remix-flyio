import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";

export const loader = async ({ request }: { request: Request }) => {
    const response = new Response();
    const supabase = createServerClient(
        "https://lsmaidgdcufbngbiutoo.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbWFpZGdkY3VmYm5nYml1dG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODMzNjQsImV4cCI6MjAzNzg1OTM2NH0.KR5Dqn880JhNAqTiPy1w1qE78gAePccHAyPimaP59WI",
        { request, response }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return redirect("/login", { headers: response.headers });
    }

    return json({ email: session.user.email }, { headers: response.headers });
};

export default function Dashboard() {
    const { email } = useLoaderData<typeof loader>();

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1>Hello World</h1>
            <p>Welcome, {email}!</p>
        </div>
    );
}
