import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthProvider';
import { use, useState } from 'react';

const Register = () => {
  const [emailError,setEmailError] = useState("");
  
  const location = useLocation();
  // console.log(location);

  const navigate = useNavigate();
 

  const {createUser,setUser, updateUser,googleSignIn} = use(AuthContext);

  const handelRegister = (e)=>{
    e.preventDefault();
    const form = e.target;
    const name=form.name.value;
    const photo =form.photo.value;
    const email=form.email.value;
    const password =form.password.value;
    const confirmPassword = form.confirmPassword.value;
    // console.log(name,photo,email,password,confirmPassword);

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
    if (password !== confirmPassword) {
      setEmailError("Password and Confirm Password must match");
      return;
    }
   
    else{setEmailError("");}

    createUser(email,password).then((result) => {       
      const user = result.user;  
      // console.log(user);
      navigate(`${location.state? location.state : "/"}`);  
      updateUser({displayName: name,photoURL:photo}).then(() => {
        setUser({...user,displayName: name,photoURL:photo});
        toast.success("Register Successfully");
      }).catch((error) =>{
        console.log(error);
        setUser(user)
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorCode,errorMessage);
});
};

const handelGoogleLogin = () =>{
  googleSignIn()
  .then(result => {
    const user = result.user;
      // console.log(user);
    navigate(`${location.state ? location.state : "/"}`);
  })
  .catch(error => {
    console.log(error)
  })
}

  return (
    <div className="hero bg-base-200 min-h-screen">
      <title>Register Page</title>
  <div className="hero-content flex-col lg:flex-row-reverse">
   
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
         <h1 className="text-5xl font-bold">Register now!</h1>
        <form onSubmit={handelRegister}  className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input" name='name' placeholder="Name" required  />

          <label className="label">Photo URL</label>
          <input type="text" name='photo'  className="input" placeholder="Photo URL" required />

          <label className="label">Email</label>
          <input type="email" className="input" name='email' placeholder="Email" required />
        

          <label className="label">Password</label>
          <input type="password" className="input" name='password' placeholder="Password" required />

           <label className="label">Confirm Password</label>
              <input type="password" className="input" name="confirmPassword" placeholder="Confirm Password" required />
              
          {
            emailError && <p className='text-red-500 font-bold'>{emailError}</p>
          }
          <div>            
          </div>
          <button type='submit' className="btn btn-neutral mt-4">Register</button>
        </form>
        <p>Already Have an account ? please <Link to='/login' className='text-blue-500 underline'>Login</Link></p>
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
  </div>
</div>
  );
};

export default Register;