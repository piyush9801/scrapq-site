import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/book-appointment",
    Component: BookAppointmentPage,
  },
]);
