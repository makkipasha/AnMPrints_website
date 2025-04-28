import React, { useEffect } from 'react';
import Header from "./Header";
import Category1 from './Category1';

import Footer2 from "./Footer2"; 

const Category1Page = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
            <Category1 />
        </main>
        <Footer2 />
    </div>
    );
};

export default Category1Page;
