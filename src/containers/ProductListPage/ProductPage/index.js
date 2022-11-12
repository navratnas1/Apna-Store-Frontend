import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductPage } from '../../../actions'
import getParams from '../../../utils/getParams';

// react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../Components/UI/Card/index.js';

function ProductPage(props) {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;
    useEffect(() => {
        const params = getParams(props.location.search);
        const payload = {
            params
        }
        dispatch(getProductPage(payload));
    }, [])
    return (
        <div style={{ margin: '0 8px' }}>



            <Carousel
                renderThumbs={() => { }}
                autoPlay='true'
                dynamicHeight='false'
                infiniteLoop='true'
                interval='2000'
            >
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a style={{ display: 'block' }} key={index} href={banner.navigateTo}>
                            <img height='430px' src={banner.img} />
                            {/* <p className="legend">Legend 1</p> */}
                        </a>
                    )
                }
            </Carousel>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '10px 0'
            }}>
                {
                    page.products && page.products.map((prod, index) =>
                        <Card
                            key={index}
                            style={{ width: '400px', height: '200px', margin: '0 5px' }}
                        >
                            <a href={prod.navigateTo}>
                                <img style={{ height: '100%', width: '100%' }} src={prod.img} alt='Iphone' />
                            </a>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}

export default ProductPage
