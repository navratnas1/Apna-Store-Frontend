import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions';
import { api } from '../../../urlConfig';
import './style.css';
import { Link } from 'react-router-dom'

function ProductStore(props) {
    console.log(props);
    const dispatch = useDispatch();
    const product = useSelector(state => state.product)
    useEffect(() => {
        dispatch(getProductsBySlug(props.match.params.slug));
    }, [])
    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    if (product.productsByPrice[key].length > 0) {
                        return (

                            <div key={key} className='card'>
                                <div className='cardHeader'>
                                    <div className='cardTitle'>
                                        Under {String(key).substring(5)}
                                    </div>
                                    {/* <button className='button_viewall'>VIEW ALL</button> */}
                                </div>
                                <div className='cardBody'>
                                    {
                                        product.productsByPrice[key].map((prod, ind) => {
                                            return (
                                                <Link to={`/${prod.slug}/${prod._id}/p`} style={{ display: 'block', textDecoration: 'none' }} key={ind} className='productContainer'>
                                                    <div className='productImageContainer'>
                                                        {prod.productPictures[0] ? (<img src={api + '/public/' + prod.productPictures[0].img} alt='Product Image' />) : null}

                                                    </div>
                                                    <div className='productInfo'>
                                                        <div className='productName'>{prod.name}</div>
                                                        <div className='productRating'>
                                                            <span className='productRatingValue'>4.{Math.floor(Math.random() * 10)}⭐</span>
                                                            <span> ({4000 + Math.floor(Math.random() * 5000)})</span>
                                                        </div>
                                                        <div className='productPrice'>₹{prod.price}</div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        )
                    }
                })
            }
        </>
    )
}

export default ProductStore;
