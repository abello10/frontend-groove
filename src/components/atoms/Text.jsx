import React from 'react';

function Text({ children, variant = 'p', className, ...props }) {
    const Tag = variant;
    return <Tag className={className} {...props}>{children}</Tag>;
}

export default Text;