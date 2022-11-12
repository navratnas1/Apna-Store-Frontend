import React from 'react';
import { useSelector } from 'react-redux';
import Layout from "../../Components/Layout";
import './style.css';
function Profile() {
    const auth = useSelector(state => state.auth)
    const { user } = auth;
    return (
        <Layout>
            <div className='container'>
                <table>
                    <tbody>
                        <tr>
                            <td className='key'>First Name: </td>
                            <td className='value'>{user.firstName}</td>
                        </tr>
                        <tr>
                            <td className='key'>Last Name: </td>
                            <td className='value'>{user.lastName}</td>
                        </tr>
                        <tr>
                            <td className='key'>Full Name: </td>
                            <td className='value'>{user.fullName}</td>
                        </tr>
                        <tr>
                            <td className='key'>Email: </td>
                            <td className='value'>{user.email}</td>
                        </tr>
                        <tr>
                            <td className='key'><a href='/account/orders'>Orders</a></td>
                        </tr>
                        <tr>
                            <td className='key'><a href='/cart'>Cart</a></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </Layout>
    )
}

export default Profile
