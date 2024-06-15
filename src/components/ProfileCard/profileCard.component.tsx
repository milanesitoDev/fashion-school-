import "./profileCard.component.css"

const ProfileCard: React.FC = () => {
    return (
        <div className="profile-card">
            <div className="profile-card__image">
                <img src="images/profile.jpg" alt="Profile" />
            </div>
            <div className="profile-card__buttons">
                <i className='bx bxs-camera-movie'></i>
                <i className='bx bxs-bell' ></i>
                <i className='bx bxs-envelope' ></i>
                <i className='bx bx-menu' ></i>
            </div>
            <div className="profile-card__name">
                <h2>Juan Carlos</h2>
            </div>
            <div className="profile-card__info">
                <div className="info__wrapper info--main">
                    <p className="info__title">Profesor</p>
                    <div className="info__data">
                        <i className='icon bx bx-location-plus' ></i>
                        <p>DF, México</p>
                    </div>
                </div>
                <div className="info__wrapper">
                <p className="info__title">Telefono</p>
                    <div className="info__data">
                        <i className='icon bx bx-phone' ></i>
                        <p>+12 345 6789 0</p>
                    </div>
                </div>
                <div className="info__wrapper">
                <p className="info__title">Email</p>
                    <div className="info__data">
                        <i className='icon bx bx-envelope' ></i>
                        <p>abc@mail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard