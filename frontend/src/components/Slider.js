import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function Slider() {
    const images = [img1, img2, img3];
    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "520px",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return (
        <div className="slider-content" style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}>
            <Slide duration={5000} transitionDuration={1500} infinite={true} arrows={true}>
                {images.map((image, ind) => (
                    <div key={ind}>
                        <div style={{ ...divStyle, backgroundImage: `url(${image})` }}></div>
                    </div>
                ))}
            </Slide>
        </div>
    );
}

export default Slider;
