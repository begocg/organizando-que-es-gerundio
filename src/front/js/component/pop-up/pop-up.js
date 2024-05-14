import React, { useState } from "react";
import "./pop-up.scss";


const Popup = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null); // Nuevo estado para el contenido del Popup
  
    // Función para abrir el Popup y establecer el contenido
    const openPopup = (content) => {
      setIsOpen(true);
      setContent(content);
    };
  
    // Función para cerrar el Popup
    const closePopup = () => {
      setIsOpen(false);
      setContent(null);
    };
  
    // Renderizar el Popup
    return (
      <>
        {trigger && React.cloneElement(trigger, { onClick: () => openPopup(children) })}
        {isOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="popup-close" onClick={closePopup}>Cerrar</button>
              {content}
            </div>
          </div>
        )}
      </>
    );
  };

export default Popup;