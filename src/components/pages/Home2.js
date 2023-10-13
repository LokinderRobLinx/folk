import React from 'react'
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.avif";
import { useNavigate } from 'react-router-dom';
import "../stylesheets/home.css"

const Home = ({username}) => {

    const navigate = useNavigate();

  return (
    <>
      <div className="element-onboarding">
        <div className="overlap">
         
           <div style={{width: 428, height: 926, left: 0, top: 0, position: 'absolute', background: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
               <div style={{alignSelf: 'stretch', height: 824, background: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                   <div style={{width: 628, height: 407, position: 'relative'}}>
                       <img style={{width: 200, height: 407, left: 0, top: -45, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img3} alt="img" />
                       <img style={{width: 200, height: 407, left: 214, top: -154, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img2} alt="img" />
                       <img style={{width: 200, height: 407, left: 428, top: -45, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img6} alt="img" />
                   </div>
                   <div style={{width: 628, height: 407, position: 'relative'}}>
                       <img style={{width: 200, height: 407, left: 0, top: -45, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img4} alt="img" />
                       <img style={{width: 200, height: 407, left: 214, top: -154, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img5} alt="img" />
                       <img style={{width: 200, height: 407, left: 428, top: -45, position: 'absolute', background: 'linear-gradient(0deg, #757575 0%, #757575 100%)', borderRadius: 30}} src={img1} alt="img" />
                   </div>
               </div>
           </div>
        
          <div className="frame-2">
            <div className="frame-3">
            <div className="welcome-to-folk-raas">
              Favorites events for <br />
                 Easy Access
                </div>
                <p className="discover-book-and">
                Personalize your event experience! Save and organize your favorite events in one place for quick and
                convenient access whenever you&#39;re ready to book or explore.
                </p>
              <div className="frame-4">
                <div className="ellipse" />
                <div className="rectangle-4" />
              </div>
              <div className="frame-5">
                {/* <div onClick={() => (navigate("/login"))} className="label-text">Skip</div> */}
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

                <button onClick={() => (navigate("/"))} className="button">
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
  )
}

export default Home