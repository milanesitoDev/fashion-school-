import React from "react";
import { Link } from "react-router-dom";
import './invoicing.css'

const Invoicing: React.FC = () => {

    const plans = [
        {
            name: "VISUAL MERCHANDISING",
            price: 12,
            features: [
                "El visual merchandising es la práctica en la industria minorista de optimizar la presentación de productos y servicios para resaltar mejor sus características y beneficios",
            ],
        },
        {
            name: "FOTOGRAFÍA DE MODA INTENSIVO",
            price: 35,
            features: [
                "Para esta capacitación deberás saber manejo de cámara réflex y traer su radio. En esta capacitación no se enseñará retoque fotográfico solo se dan algunos consejos de su uso.En todas las clases hay una parte  teórica y práctica. Podrás aprender desde la práctica constante ya que en eamoda contamos con un",
            ],
        },
        {
            name: "PERIODISMO Y COMUNICACIÓN DE MODA",
            price: 60,
            features: [
                "stas clases se dictarán de manera online a distancia, a través de la plataforma de google classroom, un aula que eamoda preparo para tus clases online. El alumno recibirá un instructivo para poder ser parte de la comunidad virtual de eamoda. Los días y horarios que se darán las clases son los que figuran en este sitio. ",
            ],
        },
    ];

    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='text-white text-3xl font-semibold sm:text-4xl'>
                    Selección de curso
                    </h3>
                    <div className='mt-3 max-w-x text-white'>
                        <p>
                           Elige uno de nuestros mejores cursos
                        </p>
                    </div>
                    
                </div>
                <div className='mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    {plans.map((item, idx) => (
                        <div key={idx} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2 bg-white'>
                            <div>
                                <span className='text-black font-medium'>
                                    {item.name}
                                </span>
                                <div className='mt-4 text-gray-800 text-3xl font-semibold'>
                                    ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
                                </div>
                            </div>
                            <ul className='py-8 space-y-3'>
                                {item.features.map((featureItem, idx) => (
                                    <li key={idx} className='flex items-center gap-5'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 text-indigo-600'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'>
                                            <path
                                                fillRule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clipRule='evenodd'></path>
                                        </svg>
                                        {featureItem}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex-1 flex items-end">
                                <Link className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-[#002b3b] hover:bg-indigo-500 active:bg-indigo-700'
                                to={"/InvoiceOrders"}>
                                    Get Started
                                </Link>
                            </div>
                            
                        </div>
                        
                    ))}

                </div>
                
            </div>
           
        </section>
    );
};

export default Invoicing;
