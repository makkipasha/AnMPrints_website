import React, { useEffect } from 'react';
import Header from "./Header";
import Category5 from './Category5';

import Footer2 from "./Footer2"; 

const Category5Page = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
            <Category5 />
        </main>
        <Footer2 />
    </div>
    );
};

export default Category5Page;
