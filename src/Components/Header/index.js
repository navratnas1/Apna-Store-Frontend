import React, { useEffect, useState } from "react";
import "./style.css";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";

const Header = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const [signup, setSignup] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const userSignup = () => {
        const user = { firstName, lastName, email, password };
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === ""
        ) {
            return;
        }

        dispatch(_signup(user));
    };

    const userLogin = () => {
        if (signup) {
            userSignup();
        } else {
            dispatch(login({ email, password }));
        }
    };

    const logout = () => {
        dispatch(signout());
    };

    useEffect(() => {
        if (auth.authenticate) {
            setLoginModal(false);
        }
    }, [auth.authenticate]);

    const renderLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={<a className="fullName">{auth.user.fullName}</a>}
                menus={[
                    { label: "My Profile", href: "/profile", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                    },
                    { label: "Cart", href: "/cart", icon: null },
                    { label: "Logout", href: "", icon: null, onClick: logout },
                ]}
            />
        );
    };

    const renderNonLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a
                        className="loginButton"
                        onClick={() => {
                            setSignup(false);
                            setLoginModal(true);
                        }}
                    >
                        Login
                    </a>
                }
                menus={[
                    {
                        label: "My Profile",
                        href: "",
                        icon: null,
                        onClick: () => {
                            !auth.authenticate && setLoginModal(true);
                        },
                    },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                        onClick: () => {
                            !auth.authenticate && setLoginModal(true);
                        },
                    },
                    {
                        label: "Wishlist",
                        href: "",
                        icon: null,
                        onClick: () => {
                            !auth.authenticate && setLoginModal(true);
                        },
                    },
                    {
                        label: "Rewards",
                        href: "",
                        icon: null,
                        onClick: () => {
                            !auth.authenticate && setLoginModal(true);
                        },
                    },
                    {
                        label: "Gift Cards",
                        href: "",
                        icon: null,
                        onClick: () => {
                            !auth.authenticate && setLoginModal(true);
                        },
                    },
                ]}
                firstMenu={
                    <div className="firstmenu">
                        <span>New Customer?</span>
                        <a
                            onClick={() => {
                                setLoginModal(true);
                                setSignup(true);
                            }}
                            style={{ color: "#2874f0" }}
                        >
                            Sign Up
                        </a>
                    </div>
                }
            />
        );
    };

    return (
        <div className="header">
            <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Get access to our Products, Membership and Recommendations</p>
                        </div>
                        <div className="rightspace">
                            <div className="loginInputContainer">
                                {auth.error && (
                                    <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                                )}
                                {signup && (
                                    <MaterialInput
                                        type="text"
                                        label="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                )}
                                {signup && (
                                    <MaterialInput
                                        type="text"
                                        label="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                )}

                                <MaterialInput
                                    type="text"
                                    label="Email/Mobile Number"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MaterialInput
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <MaterialButton
                                    title={signup ? "Register" : "Login"}
                                    bgColor="#fb641b"
                                    textColor="#ffffff"
                                    style={{
                                        margin: "40px 0 20px 0",
                                    }}
                                    onClick={userLogin}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="subHeader">
                {/* Logo  */}
                <div className="logo">
                    <a style={{ textDecoration: 'none', color: 'white' }} href="">
                        ApnaStore
                    </a>

                </div>
                <div
                    style={{
                        padding: "0 10px",
                    }}
                >
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={"search for products, brands and more"}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch
                                style={{
                                    color: "#2874f0",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="rightMenu">
                    {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
                    {
                        auth.authenticate ? (
                            <div>
                                <a href={`/account/orders`} style={{ textDecoration: 'none' }} className="cart">
                                    <span style={{ margin: "0 10px" }}>Orders</span>
                                </a>
                            </div>
                        ) : null
                    }

                    <div>
                        <a href={`/cart`} style={{ textDecoration: 'none' }} className="cart">
                            <Cart count={Object.keys(cart.cartItems).length} />
                            <span style={{ margin: "0 10px" }}>Cart</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
