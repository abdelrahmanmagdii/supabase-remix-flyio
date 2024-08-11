import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { supabase } from '~/supabaseClient';
import { useState } from 'react';

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return json({ error: error.message });
    }

    return redirect("/dashboard");
};

export default function Login() {
    const actionData = useActionData<typeof action>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            setEmailError('Email is required');
        } else if (!re.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    // const validatePassword = (password: string) => {
    //     if (!password) {
    //         setPasswordError('Password is required');
    //     } else if (password.length < 6) {
    //         setPasswordError('Password must be at least 6 characters long');
    //     } else {
    //         setPasswordError('');
    //     }
    // };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-white text-center">
                    Login to your account
                </h2>
                {actionData?.error && (
                    <Alert color="failure" className="mb-4">
                        {actionData.error}
                    </Alert>
                )}
                <Form method="post" className="space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" className="text-white" />
                        </div>
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            className="text-black bg-white"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                            color={emailError ? "failure" : undefined}
                            helperText={emailError}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" className="text-white" />
                        </div>
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="text-black bg-white"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                // validatePassword(e.target.value);
                            }}
                            color={passwordError ? "failure" : undefined}
                            helperText={passwordError}
                        />
                    </div>
                    <div className="w-full">
                        <Button type="submit" className="w-full">
                            Log in to your account
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}