import React from "react";
import Blog from "./Blog";
import Footer2 from "./Footer2";
import Header from "./Header";

const BlogPage = () => {
    return (
        <div style={{ paddingTop: '70px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Fixed Header */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: '#fff', // or your preferred color
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                <Header />
            </div>

            {/* Main Content */}
            <main style={{ flex: 1 }}>
                <Blog />
            </main>

            <Footer2 />
        </div>
    );
};

export default BlogPage;
