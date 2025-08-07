import React, { useState } from "react";
import axios from "axios";
import signup_validate from "../../validate/SignUpValidate";
function Signup() {
  const [error, setError] = useState("");
  const [color, setColor] = useState("red");
  const [signupData, setsignUpData] = useState({
    name: "",
    email: "",
    ph_no: "",
    password: "",
    confirm_password: "",
  });

  async function handleSignUp() {
    const result = signup_validate(
      signupData.name,
      signupData.email,
      signupData.ph_no,
      signupData.password,
      signupData.confirm_password
    );
    if (result) {
      setColor("red");
      setError(result);
    } else {
      setColor("green");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/signup`,
          signupData
        );
        console.log(response);
        if (response) {
          setColor("green");
          setError("signup successful");
        } else {
          setColor("red");
          setError("Sign up failed!");
        }
      } catch {
        setError("Frontend error!");
      }
    }
  }
  return (
    <div className=" flex mt-[63px] h-[520px] bg-gray-800 w-[800px] m-[auto] text-[white]">
      <div className="w-[50%] border-2   p-6 rounded-[10px] h-[100%]">
        
    <p>
  Welcome to a platform where learning becomes a journey, not just a task. <br /><br />
  Whether you're a student looking to upskill, a professional aiming to grow, or a curious mind hungry for knowledge — you're in the right place. Our Learning Management System offers interactive lessons, expert instructors, real-time feedback, and certifications that open doors. <br /><br />
  Learn at your own pace. <br />
  You’re not just signing up — you’re stepping into a world of opportunity. <br /><br />
  🎓 Education. 💡 Inspiration. 🚀 Transformation. <br /><br />
  Don’t wait for change. Be the change. Let’s begin your journey — today.
</p>



      </div>
      <div className=" w-[50%] border-2   p-6 rounded-[10px] h-[100%]  ">
        <h1 className="text-[30px]">Let's get signUp here !</h1>
        <fieldset className="fieldset  ">
          <legend className="fieldset-legend text-[white] ">What is your name?</legend>
          <input
            type="text"
            className="input h-[30px] h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={signupData.name}
            onChange={(x) => {
              setsignUpData({ ...signupData, name: x.target.value });
            }}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend text-[white]">What is your Email?</legend>
          <input
            type="email"
            className="input h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={signupData.email}
            onChange={(x) => {
              setsignUpData({ ...signupData, email: x.target.value });
            }}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend text-[white] ">
            What is your mobile number?
          </legend>
          <input
            type="number"
            className="input h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={signupData.ph_no}
            onChange={(x) => {
              setsignUpData({ ...signupData, ph_no: x.target.value });
            }}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend text-[white] ">create your password</legend>
          <input
            type="password"
            className="input h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={signupData.password}
            onChange={(x) => {
              setsignUpData({ ...signupData, password: x.target.value });
            }}
          />
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend text-[white] ">Confirm your password</legend>
          <input
            type="password"
            className="input h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={signupData.confirm_password}
            onChange={(x) => {
              setsignUpData({
                ...signupData,
                confirm_password: x.target.value,
              });
            }}
          />
        </fieldset>
        <p className={`text-center text-[${color}]`}>{error}</p>
        <button
          className={"btn btn-primary curser-pointer w-[100%] h-[30px] mt-5 mb-2"}
          onClick={handleSignUp}
        >
         
          Create Account
        </button>
        <p className="text-center">
          Already have an account ?
          <a className="text-[cyan] " href="/signin">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
