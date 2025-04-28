import React, { useEffect } from 'react';
import Header from "./Header";
import Category3 from './Category3';

import Footer2 from "./Footer2"; 

const Category3Page = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
            <Category3 />
        </main>
        <Footer2 />
    </div>
    );
};

export default Category3Page;
