import React, { useEffect } from 'react';
import Header from "./Header";
import Category2 from './Category2';

import Footer2 from "./Footer2"; 

const Category2Page = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
            <Category2 />
        </main>
        <Footer2 />
    </div>
    );
};

export default Category2Page;
