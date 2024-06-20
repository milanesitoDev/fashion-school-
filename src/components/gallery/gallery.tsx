import React from 'react';
import './gallery.css';

// Importa las imágenes que deseas mostrar
import image1 from '../../../public/images/tienda-sopela-moda-arte-knPC-U21025324478DAH-1200x840@El Correo.webp';
import image2 from '../../../public/images/fondogallery.jpg';
import image3 from '../../../public/images/fondogallery.jpg';
import image4 from '../../../public/images/tienda-sopela-moda-arte-knPC-U21025324478DAH-1200x840@El Correo.webp';

const Gallery: React.FC = () => {
  return (
    <>
      <div className="header__text">
        <p>Toma uno de nuestros</p>
        <p className="text__bold">mas recientes cursos</p>
      </div>
      <div className="grid">
        <div className="col-span-1">
          <img src={image1} alt="Image 1" className="img1" />
        </div>
        <div className="col-span-2">
          <img src={image2} alt="Image 2" className="img2" />
        </div>
        <div className="col-span-2">
          <img src={image3} alt="Image 3" className="img3" />
        </div>
        <div className="col-span-1">
          <img src={image4} alt="Image 4" className="img4" />
        </div>
      </div>
    </>
  );
};

export default Gallery;
