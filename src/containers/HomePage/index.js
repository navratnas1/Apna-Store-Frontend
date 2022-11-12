import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Header from '../../Components/Header';
import Layout from '../../Components/Layout';
import MenuHeader from '../../Components/MenuHeader';
import { api } from '../../urlConfig';
import './style.css';
function HomePage() {
    return (
        <Layout>
            <div className='container1'>
                <Carousel
                    renderThumbs={() => { }}
                    autoPlay='true'
                    dynamicHeight='false'
                    infiniteLoop='true'
                    interval='3000'
                >
                    <div>
                        <img height='430px' src={api + '/public/' + '0Kw4CXQCw-Apple banner 1.jpg'} />
                    </div>
                    <div>
                        <img height='430px' src={api + '/public/' + 'h2T60J2rID-Apple banner 2.jpg'} />
                    </div>
                </Carousel>
                <h2 style={{ color: 'red' }}> Select products according to their Categories from the Sub-Header</h2>
            </div>
        </Layout>
    )
}

export default HomePage
