import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { ZookeeperDashboard } from "./pages/ZookeeperDashboard";
import { VetDashboard } from "./pages/VetDashboard";
import { ForestOfficerDashboard } from "./pages/ForestOfficerDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Layout } from "./components/Layout";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/zookeeper",
        element: <ZookeeperDashboard />,
      },
      {
        path: "/vet",
        element: <VetDashboard />,
      },
      {
        path: "/forest-officer",
        element: <ForestOfficerDashboard />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);