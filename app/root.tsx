import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./tailwind.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export function Layout({ children }: { children: React.ReactNode }) {
    console.log("Layout rendered");
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <body>
        <Header />
        <div>{children}</div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    console.log("App rendered");
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}
