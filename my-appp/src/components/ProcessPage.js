import React, { useEffect } from 'react';
import Header from "./Header";
import Footer2 from './Footer2';
import ProductDetail from './ProductDetail';
import Process from './Process';
import Cart from './Cart';
const ProcessPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
            <Process />
        </main>
        <Footer2 />
    </div>
    );
};

export default ProcessPage;
