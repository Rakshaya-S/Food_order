import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams, useLocation } from "react-router-dom";
import Slider from './Slider';
import { toast } from "react-toastify";

function Items(props) {
    const [itemArr, setItem] = useState([]);
    const [searchParams] = useSearchParams();
    const location = useLocation(); // Use this to check the current path

    useEffect(() => {
        async function itemsFunc() {
            const queryString = searchParams.toString();
            console.log(queryString, "queryString");

            const apiUrl = `${process.env.REACT_APP_URL}/items${queryString ? '?' + queryString : ''}`;
            console.log(apiUrl, "apiurl");
            try {
                const res = await axios.get(apiUrl);
                if (res.data.success) {
                    setItem(res.data.data);
                    console.log(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        itemsFunc();
    }, [searchParams]);

    function addItem(item) {
        const exist = props.cartItem.find((items) => {
            return items.id === item.id;
        });
        if (!exist) {
            props.setCartItem((prev) => [...prev, item]);
            toast.success("Item added to cart successfully")
        }
    }

    const isHomePage = location.pathname === '/';

    return (
        <>
            {/* Render Slider and Paragraph only on the homepage */}
            {isHomePage && (
                <>
                    <Slider />
                    <h1 id="products_heading" style={{marginTop:"20px"}}>Explore our menu</h1>
                    <p className="food-intro" style={{width:"70%"}}>
                        Welcome to our delightful collection of mouthwatering dishes! Whether you’re craving something savory, sweet, or refreshing, we have curated a menu to please every palate. From fresh salads and hearty main courses to indulgent desserts and refreshing beverages, each item is prepared with care to offer you an unforgettable culinary experience. Explore our variety of flavors, crafted to satisfy your cravings and make every meal a celebration. Take your pick, add to your cart, and enjoy the joy of good food!
                    </p>
                </>
            )}
            <section id="products" className="container mt-5">
                <div className="row g-4">
                    {itemArr.map((item, ind) => (
                        <div key={ind} className="items col-sm-6 col-md-4 col-lg-4">
                            <div className="card h-100">
                                <img src={item.image} className="card-img-top" />
                                <div className="card-body">
                                    <h4 className="card-title">{item.name}</h4>
                                    <p className="card-text">{item.description}</p>
                                </div>
                                <div className="card-footer" style={{ padding: "0px" }}>
                                    <p className="price">${item.price}</p>
                                    <button className="add-to-cart" onClick={() => addItem(item)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Items;
