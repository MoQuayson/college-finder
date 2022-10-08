import React from 'react';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import FinderAppSection from './components/FinderAppSection';
import HeroSection from './components/HeroSection';
import { ScrollTop } from 'primereact/scrolltop';

export default function App(){

    return(
        <>
        <AppHeader/>
        <HeroSection/>
        <ScrollTop threshold={200} />
        <FinderAppSection/>
        <AppFooter/>
        </>
    )
}