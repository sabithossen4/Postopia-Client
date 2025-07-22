
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { use, useRef, useState } from "react";



const Login = () => {
   const { signIn,googleSignIn,forgetPassword } = use(AuthContext);
  // console.log(user)

  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState(false);
  const emailRef = useRef();

  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email,password);

    if (password.length < 8) {
      setEmailError("Password should be more 8 character");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setEmailError("Password must 1 uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setEmailError("Password must 1 lowercase letter.");
      return;
    }     
     if (!/[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+/.test(password)) {
      setEmailError("Password must 1 special character.");
      return;
    }
    else {
      setEmailError("");
    }

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Login Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // setError(errorCode)
        setEmailError(errorMessage);
        toast.error(errorCode);
      });
  };

  const handelGoogleLogin = () =>{
    googleSignIn()
    .then(result => {
      const user = result.user;
        // console.log(user);
      navigate(`${location.state ? location.state : "/"}`);
      toast.success("Google SignIn Successfully");
    })
    .catch(error => {
      toast.error(error.message);
    })
  }


  const handleForgetPassword = () => {
    console.log(emailRef.current.value);
    const email = emailRef.current.value;

    setEmailError('');

    forgetPassword(email)
    .then(() =>{
      toast.info('A password reset email is sent. Please check your email.')
    })
    .catch(error =>{
      setEmailError(error.message)
    });
  };
  const togglePasswordVisibility = () => {
    setPassword(!password);
  };
  return (
     <div>
      <title> Login Page</title>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl text-center m-auto mt-10">
        <h1 className="text-3xl font-bold">Please Login</h1>
        <form onSubmit={handelLogin} className="card-body">
          <div className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="input"
              placeholder="Email"
              required
            />
            <label className="label">Password</label>
             <div className="mb-6 relative">            
            <input
              type={password? "text" : "password"}
              name="password"
              className="input input-bordered w-full"
              placeholder="Password"
              required
            />
            <div
              className="absolute right-3 top-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {password ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
            <div onClick={handleForgetPassword}>
              <a className="link link-hover">Forgot password?</a>
            </div>
            {emailError && (
              <p className="text-red-500 font-bold">{emailError}</p>
            )}

            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
          </div>
        </form>
        <p>
          New to this site ? please{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
        {/* Google */}
        <button onClick={handelGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] mt-4">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
    
  );
};

export default Login;
