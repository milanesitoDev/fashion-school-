import React from 'react'

import Navbar from '../../components/navbar/navbar.component'
import ArticleCard from '../../components/articleCard/articleCard.component'

import './home.page.css'

const Home: React.FC = () => {
    return(
        <>
            <header className="header">
                <Navbar />
                <section>
                    <div className="header__text">
                        <p>Somos los numeros uno en</p>
                        <p className='text__bold'>una escuela de moda México</p>
                    </div>
                    <div className="header__slider">
                        <div className="slider__articles-wrapper">
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </div>
                </section>
            </header>
            <section className="gallery">
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
            </section>
            <section className="carrousel"></section>
            <section className="calendar"></section>
            <section className="notices">
                <img src="images/megaphone.png" alt="Megaphone"/>
            </section>
            <section className="blog">
                <div className="blog__card">
                    <img src="images/gallery.jpg" alt="Gallery" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis expedita debitis sit at voluptates provident corrupti, quo neque culpa vitae id deleniti accusantium. Excepturi reiciendis ad repellat tempora, ipsam quis!</p>
                </div>
                <div className="blog__card">
                    <img src="images/gallery.jpg" alt="Gallery" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis expedita debitis sit at voluptates provident corrupti, quo neque culpa vitae id deleniti accusantium. Excepturi reiciendis ad repellat tempora, ipsam quis!</p>
                </div>
                <div className="blog__card">
                    <img src="images/gallery.jpg" alt="Gallery" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis expedita debitis sit at voluptates provident corrupti, quo neque culpa vitae id deleniti accusantium. Excepturi reiciendis ad repellat tempora, ipsam quis!</p>
                </div>
            </section>
            <footer className="footer">
                <div className="footer__form">
                    <p>Hola, te interesa recibir informacion de nuestros cursos</p>
                    <form action="">
                        <input type="email" name="email" placeholder='E-mail' required/>
                        <input type="submit" value={"Suscribete"} />
                    </form>
                </div>
                <div className="footer__links">
                    <ul>
                        <li>
                            <p className='footer__link'>Soporte escolar</p>
                        </li>
                        <li>
                            <p className='footer__link'>Contacto</p>
                        </li>
                        <li>
                            <p className='footer__link'>Instagram</p>
                        </li>
                        <li>
                            <p className='footer__link'>Facebook</p>
                        </li>
                        <li>
                            <p className='footer__link'>Youtube</p>
                        </li>
                        <li>
                            <p className='footer__link'>Tik Tok</p>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Home