import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/layout.tsx";
import App from "@/App";
import NotFoundPage from "@/pages/NotFoundPage";
import ManageItemsPage from "@/pages/ManageItemsPage";
import NavBar from "@/components/Nav/NavBar";
import Footer from "@/components/Footer/Footer";
import ManageColorsPage from "@/pages/ManageColorsPage";
const AppRoutes = () => {
    return (
        <Router>
            <Layout>
                <NavBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/manage-products" element={<ManageItemsPage />} />
                    <Route path="/manage-colors" element={<ManageColorsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
            </Layout>
        </Router>
    )
}

export default AppRoutes;
