import type { MetaFunction } from "@remix-run/node";
import { Welcome } from "~/components/welcome/welcome";
import { ColorSchemeToggle } from "~/components/color-scheme-toggle/color-scheme-toggle";
import { Camera } from "~/components/camera";

export const meta: MetaFunction = () => {
  return [
    { title: "Mantine Remix App" },
    { name: "description", content: "Welcome to Mantine!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Welcome />
      <Camera />
      <ColorSchemeToggle />
    </div>
  );
}
