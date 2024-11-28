import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Routers/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const { createUser } = useContext(AuthContext);
  const [showPssword, handleShowPasssword] = useState(false)
  const navigate = useNavigate();
  
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // const name = form.get("name")
    const email = form.get("email");
    const password = form.get("password");
    console.log(e);
    //  e.target.name.value = '';
    //  e.target.email.value = '';
    //  e.target.password.value = '';
    createUser(email, password)
      .then((result) => {
        console.log(result);
        navigate("/logIn");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  


  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <div className="flex flex-col justify-center items-center mx-auto ">
      <h1 className="mt-10 lg:mt-16 mb-6 text-4xl md:text-5xl lg:text-5xl font-bold">
        Register Now !
      </h1>
      <form
        action=""
        onSubmit={handleRegister}
        className="flex flex-col gap-5 min-w-[350px] md:w-1/3 lg:w-1/3 px-5 py-10 mx-3 border border-red-600 rounded-xl"
      >
        <div>
          <h2 className="text-lg font-semibold mb-1">Your name</h2>
          <input
            type="text"
            name="name"
            {...register("name", { required: true })}
            placeholder="Enter name"
            className="input input-bordered input-md w-full "
          />
          {errors.name && (
            <span className="text-red-600">*Please enter your name</span>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-1">Your Email</h2>
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            placeholder="Enter email"
            className="input input-bordered input-md w-full "
          />
          {errors.email && (
            <span className="text-red-600">*Please enter your email</span>
          )}
        </div>
        <div >
          <h2 className="text-lg font-semibold mb-1">Your Password</h2>
          <div className="flex items-center justify-between ">
            <input
            type={ showPssword? "text":"password"}
            name="password"
            {...register("password", { required: true })}
            placeholder="Enter password"
            className="input input-bordered input-md w-full"
          />
          {errors.password && (
            <span className="text-red-600">*Please enter your password</span>
          )}
          <span onClick={()=> handleShowPasssword(!showPssword)} className="relative right-8 cursor-pointer text-xl" >
            { showPssword? <FaEye></FaEye> :<FaEyeSlash></FaEyeSlash> }
          </span>
          </div>
          
        </div>
        <label>
          <input type="checkbox" checked /> Accept our 
          <a href="#" className="italic underline text-blue-500">
             terms and condition
          </a>
        </label>

        <input className="btn" type="submit" value={"Register"} />
      </form>
      <p className="font-semibold text-lg">
        Alraedy have an account? Please{" "}
        <NavLink to={"/logIn"} className="text-blue-600 font-semibold text-xl">
          LogIn
        </NavLink>
      </p>
    </div>
  );
};

export default Register;
