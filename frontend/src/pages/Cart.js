import React, { useState } from "react";
import { toast } from "react-toastify";



function Cart(props) {
    console.log(props.cartItem);
    const [complete, setcomplete] = useState(false)
    function increaseQyt(item) {
        const newItem = props.cartItem.map((i) => {
            if (i.id == item.id) {
                i.qty++;
            }
            return i;
        })
        props.setCartItem(newItem);
    }
    function decreaseQyt(item) {
        if (item.qty > 1) {
            const newItem = props.cartItem.map((i) => {
                if (i.id == item.id) {
                    i.qty--;
                }
                return i;
            })
            props.setCartItem(newItem);
        }
    }
    function removeItemCart(item) {
        const newItem = props.cartItem.filter((i) => {
            if (i.id !== item.id) {
                return true;
            }
        })
        props.setCartItem(newItem);
    }
    function placeOrder() {
        fetch(process.env.REACT_APP_API_URL + "/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(props.cartItem)
        }).
            then(() => {
                props.setCartItem([]);
                setcomplete(true);
                toast.success("Order Success!")
            })
    }
    return (
        props.cartItem.length > 0 ? <>
            <div className="container container-fluid">
                <h2 className="mt-5">Your Cart: <b>{props.cartItem.length}</b></h2>
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {props.cartItem.map((items) => (
                            <>
                                {console.log(items)}

                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={items.image} alt={items.name} height="90" width="115" />
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <p>{items.name}</p>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">${items.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" style={{ background: "gainsboro", border: "gainsboro", color: "gray" }} onClick={() => decreaseQyt(items)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={items.qty} readOnly />

                                                <span className="btn btn-primary plus" style={{ background: "gray", border: "gray" }} onClick={() => increaseQyt(items)}>+</span>
                                            </div>
                                        </div>
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <button id="delete_cart_item" onClick={() => removeItemCart(items)}>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </>
                        ))}

                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{props.cartItem.reduce((acc, item) => (acc + item.qty), 0)}</span></p>
                            <p>Est. total: <span className="order-summary-values">${Number(props.cartItem.reduce((acc, item) => (acc + (item.price * item.qty)), 0)).toFixed(2)}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
            :
            (!complete ? <h2 className="mt-2">Your Cart is empty</h2> :
                <><h2 className="mt-2">Your Order has been placed successfully</h2></>
            )
    )
}

export default Cart;