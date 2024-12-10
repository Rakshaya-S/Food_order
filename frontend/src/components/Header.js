import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


function Header(props) {
    const [keyword, setKeyword] = useState("")
    const navigate=useNavigate();
    function searchHandler() {
        if (keyword.trim() !== "") {
            navigate("/search?keyword="+encodeURIComponent(keyword))
        }
    }
    function handleKeypress(event){
        if(event.key=="Enter"){
            searchHandler();
        }
    }
    return (
        <>
            <div id="header">
                <div>
                    <Link to="/"><h1>TastyBites</h1></Link>
                </div>
                <div className="input-group" style={{ width: "500px" }}>
                    <input type="text" value={keyword} className="form-control" onKeyDown={handleKeypress} placeholder="Search here ..." onChange={(e) => { setKeyword(e.target.value) }} />
                    <button className="input-group-text" onClick={searchHandler}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <a href="#products">Food Menu</a>
                <Link to="/cart"><p style={{marginTop:"10px",marginRight:"20px"}}>Cart {props.cartItem.length}</p></Link>
            </div>
        </>
    );
}

export default Header;