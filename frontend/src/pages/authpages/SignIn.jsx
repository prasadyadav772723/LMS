import React,{useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignIn() {

const [error, setError] = useState("");
  const [color, setColor] = useState("red");
const navigate=useNavigate()
  const [signInData, setsignInData] = useState({
    email: "prasad@gmail.com",
    password: "1234567"
  });


  async function handleSignIn() {
    try{const response=await axios.post(`${import.meta.env.VITE_BACKEND_ORIGIN}/api/auth/signin`,signInData,{withCredentials:true})
    if(response){
      navigate('/')
      window.location.reload()

    }
    else{
      setColor("red")
      setError("Sign in failed ")

    }}
    catch{
      setColor("red")
      setError("Sign in failed ")
    }
    
  }
   return (
    <div className='mt-[63px]' >
      
      <div className=" mx-auto mt-5 border-2   p-6 rounded-[10px] h-[350px] w-[350px] bg-gray-800 ">
        <h1 className="text-[30px] text-[white] ">Let's get signUp here !</h1>
        <fieldset className="fieldset ">
          <legend className="fieldset-legend text-[white] ">Email?</legend>
          <input
            type="text"
            className="input h-[30px] h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={signInData.email}
            onChange={(x) => {
              setsignInData({ ...signInData, email: x.target.value });
            }}
            
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-[white]">Password?</legend>
          <input
            type="password"
            className="input h-[30px] w-[100%] text-[black]"
            placeholder="Type here"
            value={signInData.password}
            onChange={(x) => {
              setsignInData({ ...signInData, password: x.target.value });
            }}
            
          />
        </fieldset>
        
        <p className={`text-center text-[${color}]`}>{error}</p>
        <button
          className={"btn bg-blue-500 border-none text-[white] curser-pointer w-[100%] h-[30px] mt-5 mb-2"}
          onClick={handleSignIn}
        >
         
          SignIn
        </button>
        <p className="text-center text-[white]">
          Don't  have an account ?
          <a className="text-[cyan] " href="/signup">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn