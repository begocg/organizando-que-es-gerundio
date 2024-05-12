import React, { useState } from "react";
import "./pop-up.scss";


const Popup = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {trigger && React.cloneElement(trigger, { onClick: togglePopup })}
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="popup-close" onClick={togglePopup}>Cerrar</button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;