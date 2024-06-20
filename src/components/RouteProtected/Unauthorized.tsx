import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface UnauthorizedProps {}


const Unauthorized: FC<UnauthorizedProps> = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
     
        <section>
               
            <h1>Acceso no autorizado!</h1>
            <br />
            <p>No tienes permiso para visitar este apartado.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Regresar</button>
            </div>
        </section>
    );
}

export default Unauthorized;