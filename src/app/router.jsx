import { BrowserRouter, Routes, Route, useOutletContext } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import Home from "../features/landing/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import PublicBooking from "../features/public-booking/pages/PublicBooking";
import Verify from "../features/auth/pages/Verify";
import PublicReview from "../features/reviews/pages/PublicReview";
import PublicBusinessReviews from "../features/reviews/pages/PublicBusinessReviews";
import Summary from "../features/dashboard/pages/Summary";
import ServicesPanel from "../features/services/components/ServicesPanel";
import EmployeesPanel from "../features/employees/components/EmployeesPanel";
import BookingsPanel from "../features/bookings/components/BookingsPanel";
import SchedulesPanel from "../features/schedules/components/SchedulesPanel";
import ReviewsPanel from "../features/reviews/components/ReviewsPanel";

function DashboardSummary() {
    const { user, refreshUser } = useOutletContext();
    return <Summary user={user} onUserUpdate={refreshUser} />;
}

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/reservar/:slug" element={<PublicBooking />} />
                <Route path="/reservar/:slug/reseñas" element={<PublicBusinessReviews />} />
                <Route path="/reseña" element={<PublicReview />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardSummary />} />
                    <Route path="servicios" element={<ServicesPanel />} />
                    <Route path="empleados" element={<EmployeesPanel />} />
                    <Route path="reservas" element={<BookingsPanel />} />
                    <Route path="horarios" element={<SchedulesPanel />} />
                    <Route path="reseñas" element={<ReviewsPanel />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
