import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSubmit, Form } from "@remix-run/react";
import LoginScreen from "../components/LoginScreen";
import { getSupabase } from '~/supabaseClient';

export const action = async ({ request }: { request: Request }) => {
    const response = new Response();
    const supabase = getSupabase(request, response);

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