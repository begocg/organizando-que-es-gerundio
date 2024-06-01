import React from "react";
import blank from "../../img/blank.jpg";
import blankMobile from "../../img/blankMobile.jpg";
import { useMediaQuery } from 'react-responsive';


export const Blank = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      <img
      src={isMobile ? blankMobile : blank}
      style={{ width: "80%", height: "auto" }}         
 alt="Imagen para indicar que la pestaña está en construcción. Sale un muñeco con un casco de obra amarillo y un ordenador sobre las rodillas. A su derecha, aparece en un cartel de obra que reza así: Sitio web en construcción" />
    </div>
  );
};
