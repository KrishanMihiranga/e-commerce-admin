import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/layout.tsx";
import App from "@/App";
import NotFoundPage from "@/pages/NotFoundPage";
import Calendarpage from "@/pages/Calendarpage";

const AppRoutes = () => {
    return (
        <Router>
            <Layout> 
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/calendar" element={<Calendarpage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default AppRoutes;
