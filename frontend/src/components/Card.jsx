import React from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const id = cookies.get("id");
  const token = cookies.get("token");
  const navigate = useNavigate();

  async function handlePayment() {
    if (!id && !token) {
      return navigate("/signin");
    } else {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_API, // Replace with your actual Razorpay key
        currency: "INR",
        amount: props.data.price * 100, // Amount in paise (1 INR = 100 paise)
        name: "Lms",
        handler: async function (response) {
          const payment_details = {
            course_name: props.data.course_name,
            price: props.data.price,
            payment_id: response.razorpay_payment_id,
            img: props.data.img,
          };

          const result = await axios.put(
            `${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/update-payment/${id}`,
            { payment_details },
            { withcredentials: true }
          );
          console.log(result);
        },
      };
      // Initialize and open the Razorpay payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      navigate('/student-dashboard/invoice')
    }
  }

  return (
    <div className="">
      <div className="card bg-base-100 w-96 shadow-sm bg-gray-700 rounded-[20px] text-[white] h-[350px] w-[350px] mt-[50px]">
        <figure>
          <img
            className="w-[100%] object-cover"
            src={props?.data.img}
            alt={props?.data.course_name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">{props?.data.course_name}</h2>
          <h1>Duration :- {props?.data.duration} Months</h1>
          <h1>Price :-{props?.data.price} /-</h1>
          <h1>Mode :- {props?.data.mode} </h1>
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn bg-[green] text-[white] border-none "
            onClick={handlePayment}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
