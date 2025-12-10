import React from 'react';
import Section from '../../components/templates/Section';
import { blogData } from './data/blogData';

function Blog() {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-4">
                <Section content={blogData} />
            </div>
        </div>
    );
}

export default Blog;