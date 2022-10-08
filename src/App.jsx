import React from 'react';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import FinderAppSection from './components/FinderAppSection';
import HeroSection from './components/HeroSection';

export default function App(){

    return(
        <>
        <AppHeader/>
        <HeroSection/>
        <FinderAppSection/>
        <AppFooter/>
        </>
    )
}