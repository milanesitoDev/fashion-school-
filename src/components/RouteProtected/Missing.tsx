import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Missing: FC = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Parece que no tienes suficientes privilegios para acceder a esta sección</p>
            <div className="flexGrow">
                <Link to="/login">Iniciar sesión</Link>
            </div>
        </article>
    );
}

export default Missing;