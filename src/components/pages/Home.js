import React from "react";
import { useNavigate } from "react-router-dom";
// import { DeviceDeviceFrame } from "./DeviceDeviceFrame";
import "../stylesheets/home.css";
// import logo from "../../assets/lion.png";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.avif";

const Home = ({ username }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="element-onboarding">
        <div className="overlap">

        <div style={{width: 428, height: 926, left: 0, top: 0, position: 'absolute', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
               <div style={{alignSelf: 'stretch', height: 824, background: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                   <div style={{width: 628, height: 407, position: 'relative'}}>
                       <img style={{width: 200, height: 407, left: 0, top: -45, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img6} alt="img" />
                       <img style={{width: 200, height: 407, left: 214, top: -154, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img5} alt="img" />
                       <img style={{width: 200, height: 407, left: 428, top: -45, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img2} alt="img" />
                   </div>
                   <div style={{width: 628, height: 407, position: 'relative'}}>
                       <img style={{width: 200, height: 407, left: 0, top: -45, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img3} alt="img" />
                       <img style={{width: 200, height: 407, left: 214, top: -154, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img1} alt="img" />
                       <img style={{width: 200, height: 407, left: 428, top: -45, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img4} alt="img" />
                   </div>
               </div>
           </div>

          <div className="frame-2">
            <div className="frame-3">
              <div className="welcome-to-folk-raas">
                Welcome to <br />
                Folk Raas
              </div>
              <p className="discover-book-and">
                Discover, Book, and Experience! Your gateway to a world of
                thrilling events awaits. Let&#39;s get started on your event
                journey today.
              </p>
              <div className="frame-4">
                <div className="rectangle-4" />
                <div className="ellipse" />
              </div>
              <div className="frame-5">
                {/* <div onClick={() => (navigate("/cards"))} className="label-text">Skip</div> */}
                {/* <div onClick={() => {username === "lokin" ? (navigate("/cards"): navigate("/get-cards")) }} className="label-text">Skip</div> */}

                <div
                  onClick={() => {
                    username === "lokin"
                      ? navigate("/cards")
                      : username === "viraj"
                      ? navigate("/get-cards")
                      : navigate("/login");
                  }}
                  className="label-text"
                >
                  Skip
                </div>

                <button onClick={() => navigate("/1")} className="button">
                  <div className="state-layer">
                    <div className="btn-text">Next</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="rectangle-5" />
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
