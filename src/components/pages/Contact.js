import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    email: "",
    msg: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    alert(
      `My name is ${data.fullname}.My mobile number is ${data.phone} and email is ${data.email}, Here is what is whant to say : ${data.msg} `
    );

    navigate("/");
  };

  return (
    <>
      <div className="row col-md-12">

        <div className="col-md-5 m-4 ">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_twijbubv.json"
            background="transparent"
            speed="1"
            // style="width: 300px; height: 300px;"
            loop
            autoplay
          ></lottie-player>
        </div>

        <form className="formCP col-md-5 m-4 " onSubmit={formSubmit}>
          <h1 style={{ fontSize: 30 }}>Contact Us</h1>
          <p style={{ fontSize: 20 }}>Enter Your Details </p>

          <div className="mb-1">
            <label htmlFor="name" className="px-3 h5">
              Name*:
            </label>
            <input
              type="text"
              // class="form-control"
              // id="exampleFormControlInput1"
              id="name"
              name="fullname"
              value={data.fullname}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-1">
            <label className="px-3 h5">Phone:</label>
            <input
              type="number"
              // class="form-control"
              // id="exampleFormControlInput1"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Your mobile number"
            />
          </div>

          <div className="mb-1">
            <label className="px-3 h5">Email*:</label>
            <input
              type="email"
              // className="form-control"
              // id="exampleFormControlInput1"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mt-3">
            <label className="px-1 h5">Message*</label>
            <textarea
              // className=" w-75 "
              // id="exampleFormControlTextarea1"
              rows="3"
              name="msg"
              value={data.msg}
              onChange={handleChange}
              placeholder="Enter Your Message Here"
              required
            />
          </div>

          {/* <button className="btn btn-outline-primary" type="submit">Submit form</button> */}
          <button className="btn my-4" type="submit">
            Submit form
          </button>
        </form>

      </div>
    </>
  );
};

export default Contact;
