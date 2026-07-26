import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import Home from "../features/landing/pages/Home";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import PublicBooking from "../features/public-booking/pages/PublicBooking";
import Verify from "../features/auth/pages/Verify";
import PublicReview from "../features/reviews/pages/PublicReview";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/reservar/:slug" element={<PublicBooking />} />
                <Route path="/reseña" element={<PublicReview />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
