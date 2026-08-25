import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/consult")({
  component: ConsultLayout,
});

function ConsultLayout() {
  return <Outlet />;
}
