import React, { useEffect, useState } from 'react';
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturedThemes from "./FeaturedThemes";
import FeaturedThemes_2 from "./FeaturedThemes_2";
import PopularCategories from "./PopularCategories";
import FeaturedDesigns from "./FeaturedDesigns";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Footer2 from "./Footer2";
import FooterTop from './FooterTop';
import HeadlineSlider from './HeadlineSlider';
import Profile from './Profile'; // import your Profile component
import "./Style/drawer.css";

const HomePage = () => {
    const [showProfileDrawer, setShowProfileDrawer] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <>
            <Header onProfileClick={() => setShowProfileDrawer(true)} />
            <HeadlineSlider />
            <HeroSection />
            <FeaturedThemes />
            <FeaturedThemes_2 />
            <PopularCategories />
            <FeaturedDesigns />
            <Testimonials />
            <CallToAction />
            <FooterTop />
            <Footer2 /> 




        </>
    );
};

export default HomePage;

