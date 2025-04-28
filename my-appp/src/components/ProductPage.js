import React, { useEffect } from 'react';
import Header from "./Header";
import Product from './Product';

import Footer2 from "./Footer2"; 

const ProductPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <>
            <Header /> {/* Add Header at the top */}
     
           <Product />
            <Footer2 /> {/* Use Footer2 instead of Footer */}
        </>
    );
};

export default ProductPage;
