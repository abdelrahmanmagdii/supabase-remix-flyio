import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSubmit, Form } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import LoginScreen from "../components/LoginScreen";

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
            <LoginScreen
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSubmit={handleSubmit}
                error={actionData?.error}
            />
        </div>
    );
}