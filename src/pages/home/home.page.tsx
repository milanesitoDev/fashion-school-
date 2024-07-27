import React from "react";

import Navbar from "../../components/navbar/navbar.component";

import "./home.page.css";
import Slider from "../../components/slider/slider";
import Gallery from "../../components/gallery/gallery";
import imgEvent from '/images/image 120.png'
import UsTeam from "../us/us";


const Home: React.FC = () => {
  return (
    <>
      <header className="header">
        <Navbar />
        <section>
          <div className="header__text">
            <p>Somos los numeros uno en</p>
            <p className="text__bold">una escuela de moda México</p>
          </div>
          <div>
            <Slider />
          </div>
        </section>
      </header>
      <section className="gallery">
        <Gallery />
      </section>

      <section className="">
        <UsTeam/>
      </section>
      <section>
        
      </section>
      <section className="calendar">
      <div className="header__text__calendar">
            <p className="text__bold__calendar">Eventos</p>
            <p className="text__calendar">Elaboraremos un proyecto académico basado en la <br/>Semana de la Moda de Roma. Esto podría incluir un <br/>ensayo, una presentación o incluso la creación de <br/> una colección de moda inspirada en lo que has visto y aprendido.</p>
          </div>
      <div className="eventCalendar">
        
                

        <img src={imgEvent} alt="" className="imgEvent" />
      </div>

      </section>
      <section className="notices">
        <div className="notices_container">
         <img src="images/megaphone.png" alt="Megaphone" />
        </div>

      </section>

      <section className="blog">
                <div className="blog__card">
                    <img src="images/gallery.jpg" alt="Gallery" />
                </div>
                <div className="blog__container">
                    <img src="images/gallery.jpg" alt="Gallery" />
                </div>
                <div className="blog__card">
                    <img src="images/gallery.jpg" alt="Gallery" />
                </div>
            </section>


      <footer className="footer">
        <div className="footer__form">
          <p>Hola, te interesa recibir informacion de nuestros cursos</p>
          <form action="">
            <input type="email" name="email" placeholder="E-mail" required />
            <input type="submit" value={"Suscribete"} />
          </form>
        </div>
        <div className="footer__links">
          <ul>
            <li>
              <p className="footer__link">Soporte escolar</p>
            </li>
            <li>
              <p className="footer__link">Contacto</p>
            </li>
            <li>
              <p className="footer__link">Instagram</p>
            </li>
            <li>
              <p className="footer__link">Facebook</p>
            </li>
            <li>
              <p className="footer__link">Youtube</p>
            </li>
            <li>
              <p className="footer__link">Tik Tok</p>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Home;
