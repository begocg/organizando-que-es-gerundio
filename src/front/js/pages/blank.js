import React from "react";
import blank from "../../img/blank.jpg";

export const Blank = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <img src={blank} alt="Imagen para indicar que la pestaña está en construcción. Sale un muñeco con un casco de obra amarillo y un ordenador sobre las rodillas. A su derecha, aparece en un cartel de obra que reza así: Sitio web en construcción" />
    </div>
  );
};
