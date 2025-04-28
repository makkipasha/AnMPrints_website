import React, { useEffect } from 'react';
import Header from "./Header";
import Footer2 from './Footer2';
import About from './About';
const AboutPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                <About />
            </main>
            <Footer2 />
        </div>
    );
};

export default AboutPage;





<>
<Header /> 

<About />
<Footer2 /> 
</>