import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { createServerClient } from "@supabase/auth-helpers-remix";

export const meta: () => { charset: string; viewport: string; title: string } = () => ({
    charset: "utf-8",
    title: "Login App",
    viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: "/styles/global.css" },
];

export const loader = async ({ request }: { request: Request }) => {
    const response = new Response();
    const supabase = createServerClient(
        "https://lsmaidgdcufbngbiutoo.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbWFpZGdkY3VmYm5nYml1dG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODMzNjQsImV4cCI6MjAzNzg1OTM2NH0.KR5Dqn880JhNAqTiPy1w1qE78gAePccHAyPimaP59WI",
        { request, response }
    );

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return json({ session }, { headers: response.headers });
};

export default function App() {
    return (
        <html lang="en">
        <head>
            <Meta />
            <Links />
        </head>
        <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </body>
        </html>
    );
}