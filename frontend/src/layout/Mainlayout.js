import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../page/home/Home";

const MainLayout = () => {
    return (
        <div className="site">
            <Header />
            <Home></Home>
            <div className="site-body">
                <main className="site-content">
                    <Outlet /> {/* 👈 render route con ở đây */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
