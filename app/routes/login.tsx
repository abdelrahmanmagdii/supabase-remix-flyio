import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSubmit, Form } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";

export const action = async ({ request }: { request: Request }) => {
    const response = new Response();
    const supabase = createServerClient(
        "https://lsmaidgdcufbngbiutoo.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbWFpZGdkY3VmYm5nYml1dG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODMzNjQsImV4cCI6MjAzNzg1OTM2NH0.KR5Dqn880JhNAqTiPy1w1qE78gAePccHAyPimaP59WI",
        { request, response }
    );

    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return json({ error: "Invalid email or password. Please try again." });
    }

    return redirect("/dashboard", { headers: response.headers });
};

export default function Login() {
    const actionData = useActionData<typeof action>();
    const submit = useSubmit();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submit(event.currentTarget, { replace: true });
    };

    return (
        <div className="login-container">
            <h1>Welcome</h1>
            <Form method="post" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Log In</button>
            </Form>
            {actionData?.error && (
                <p className="error-message">{actionData?.error}</p>
            )}
        </div>
    );
}