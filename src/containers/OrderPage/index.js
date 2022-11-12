import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../Components/Layout";
import Card from "../../Components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import "./style.css";
import { Breed } from "../../Components/MaterialUI";
import { api } from "../../urlConfig";

const OrderPage = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    const findOrderStatus = (orderStatus) => {
        for (let i = 3; i >= 0; i--) {
            if (orderStatus[i].isCompleted) {
                return orderStatus[i].type;
            }
        }
    }

    console.log(user);

    return (
        <Layout>
            <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
                <Breed
                    breed={[
                        { name: "Home", href: "/" },
                        { name: "My Account", href: "/account" },
                        { name: "My Orders", href: "/account/orders" },
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {user.orders.map((order) => {
                    return order.items.map((item) => (
                        <Card style={{ display: "block", margin: "5px 0" }}>
                            <Link
                                to={`/order_details/${order._id}`}
                                className="orderItemContainer"
                            >
                                <div className="orderImgContainer">
                                    <img
                                        className="orderImg"
                                        src={api + '/public/' + item.productId.productPictures[0].img}
                                    />
                                </div>
                                <div className="orderRow">
                                    <div className="orderName">{item.productId.name}</div>
                                    <div className="orderPrice">
                                        <BiRupee />
                                        {item.payablePrice * item.purchasedQty}
                                    </div>
                                    <div>{findOrderStatus(order.orderStatus)}</div>
                                </div>
                            </Link>
                        </Card>
                    ));
                })}
            </div>
        </Layout>
    );
};

export default OrderPage;