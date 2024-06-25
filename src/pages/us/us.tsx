import './us.css';

const UsTeam: React.FC = () => {
  return (
    <>
      <div className="us__back">
        <h1>Un poco de Nosotros</h1>
        <p>
        En Sain Private Collage, creemos que la moda es más que una industria: es una forma de expresión, una pasión y un estilo de vida. Únete a nosotros y descubre tu potencial creativo en el apasionante mundo de la moda. ¡Inscríbete hoy y haz que tus sueños de moda se hagan realidad en
        </p>
        <div className='blogg__container'>
          <div className='blog__container'>
            <img src="images/image 118.png" alt="Gallery" />
          </div>
          <div className='blog__container'>
            <img src="images/image 117.png" alt="Gallery" />
          </div>
          <div className='blog__container'>
            <img src="images/image 119.png" alt="Gallery" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsTeam;
