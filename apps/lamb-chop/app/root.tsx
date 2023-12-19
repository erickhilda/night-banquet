import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
// eslint-disable-next-line import/no-unresolved
import "~/styles/tailwind.css";

import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LiveReload, useSWEffect } from "@remix-pwa/sw";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { getGeolocation } from "./utils";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  useSWEffect;

  getGeolocation()
    .then((position) => {
      console.log(
        `Latitude: ${position.latitude}, Longitude: ${position.longitude}`
      );
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}
