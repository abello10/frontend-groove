import React from 'react';
import Section from '../../components/templates/Section';
import { homeData } from './data/homeData';

function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Section content={homeData} />
        </div>
    );
}

export default Home;