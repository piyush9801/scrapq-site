import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/book-appointment",
    Component: BookAppointmentPage,
  },
  {
    path: "/services/:slug",
    Component: ServiceDetailPage,
  },
]);
