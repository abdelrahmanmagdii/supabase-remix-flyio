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
import { getSupabase } from '~/supabaseClient';

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
    const supabase = getSupabase(request, response);

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