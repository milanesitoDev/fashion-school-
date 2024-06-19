import React from "react";

import Navbar from "../../components/navbar/navbar.component";

import "./home.page.css";
import Slider from "../../components/slider/slider";
import Gallery from "../../components/gallery/gallery";
import DateCalendarValue from "../calendar/calendar.page";
import SliderTeam from "../../components/slider/slider-team";
import BlogCard from "../blog/blog-card";

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
      <section className="carrousel">
        <SliderTeam />
      </section>
      <section className="calendar">
        <DateCalendarValue />
      </section>
      <section className="notices">
        <img src="images/megaphone.png" alt="Megaphone" />
      </section>

      <section className="blog">
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
