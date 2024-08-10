import React from 'react';
import { TextInput, Label, Button, Checkbox, Card, Alert } from 'flowbite-react';
import { Form } from '@remix-run/react';

interface LoginScreenProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    error?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
                                                     email,
                                                     setEmail,
                                                     password,
                                                     setPassword,
                                                     onSubmit,
                                                     error
                                                 }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Welcome</h2>
                <Form className="flex flex-col gap-4" onSubmit={onSubmit} method="post">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder="name@flowbite.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit">Log In</Button>
                </Form>
                {error && (
                    <Alert color="failure" className="mt-4">
                        {error}
                    </Alert>
                )}
            </Card>
        </div>
    );
};

export default LoginScreen;