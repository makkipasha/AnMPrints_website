import React, { useEffect } from 'react';
import Header from "./Header";
import Footer2 from './Footer2';
import Cart from './Cart';

const CartPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                <Cart />
            </main>
            <Footer2 />
        </div>
    );
};

export default CartPage;
