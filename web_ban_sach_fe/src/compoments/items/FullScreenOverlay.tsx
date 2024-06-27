import React from "react";

interface FullScreenOverlayProps {
    isVisible: boolean;
    children: React.ReactNode;
}

export const FullScreenOverlay  : React.FC<FullScreenOverlayProps> = ({ isVisible, children }) => {
    if (!isVisible) return null;

    return (
        <div className="full-screen-overlay">
            {children}
        </div>
    );
};