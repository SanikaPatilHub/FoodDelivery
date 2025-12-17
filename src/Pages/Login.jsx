import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const Email = "sanika123@gmail.com";
  const Password = "3456";

  const onSubmit = (data) => {
    if (data.email === Email && data.password === Password) {
      
      localStorage.setItem("foodbite_auth", "true");

      alert("Login Successful!");
      console.log(Email);
      console.log(Password);
      
      
      navigate("/");
      reset();
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <>
      <div className="section2">
        <div className="container1">
          <h1 className="loginhead">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label id="email1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              id="email2"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <p style={{ color: "red", paddingLeft: "150px" }}>
                Email is required
              </p>
            )}
            <br />
            <label id="pass1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              id="pass2"
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <p style={{ color: "red", paddingLeft: "150px" }}>
                Password is required
              </p>
            )}
            <button type="submit" id="btn3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
