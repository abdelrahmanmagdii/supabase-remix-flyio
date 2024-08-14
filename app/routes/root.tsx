import type { LinksFunction, MetaFunction, LoaderFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { useState, createContext, useContext, ReactNode } from "react";
import { createClient } from "@supabase/supabase-js";

// Define types
type Theme = 'light' | 'dark';
type SupabaseClient = ReturnType<typeof createClient>;

// Create contexts
export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);
export const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

// Environment variables
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const meta: () => { charset: string; viewport: string; title: string } = () => ({
    charset: "utf-8",
    title: "Login App",
    viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: "/styles/global.css" },
];

export const loader: LoaderFunction = async ({ request }) => {
    const response = new Response();
    const supabaseServer = createServerClient(supabaseUrl, supabaseAnonKey, { request, response });

    const {
        data: { session },
    } = await supabaseServer.auth.getSession();

    return json({ session }, { headers: response.headers });
};

// ThemeProvider component
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default function App() {
    const { session } = useLoaderData();
    const [supabase] = useState(() => createClient(supabaseUrl, supabaseAnonKey));

    return (
        <html lang="en">
        <head>
            <Meta />
            <Links />
        </head>
        <body>
        <SupabaseContext.Provider value={supabase}>
            <ThemeProvider>
                <Outlet />
            </ThemeProvider>
        </SupabaseContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </body>
        </html>
    );
}

// Custom hooks for using Supabase and Theme contexts
export function useSupabase() {
    const context = useContext(SupabaseContext);
    if (context === undefined) {
        throw new Error('useSupabase must be used within a SupabaseProvider');
    }
    return context;
}
