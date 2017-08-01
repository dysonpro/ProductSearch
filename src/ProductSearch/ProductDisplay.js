import React from 'react'
import './ProductDisplay.css'

const ProductDisplay = (props) => {
    const name = props.data ? props.data.name : "";

    if (name === ""){
        return <div className='ProductDisplay-container'></div>
    } else {
        return (
            <div className='ProductDisplay-container'>
                Click to visit this company's web site:
                <button onClick={e=>props.onClick(e,props.data)} 
                    className='ProductDisplay-button'>{name}</button>
            </div>
        )
    }

}
export default ProductDisplay;