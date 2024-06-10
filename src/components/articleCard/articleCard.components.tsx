import React from 'react'

import'./articleCard.components.css'

const ArticleCard: React.FC = () =>{
    return(
        <>
        <div className='article-card'>
            <p className='article-card_title'>Casting</p>
            <i className='bx bx-right-arrow-alt'></i>
        </div>
        </>
    )
}

export default ArticleCard