import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Demo credentials (for project purpose)
  const DEMO_EMAIL = "sanika123@gmail.com";
  const DEMO_PASSWORD = "3456";

  const onSubmit = (data) => {
    if (data.email === DEMO_EMAIL && data.password === DEMO_PASSWORD) {
      localStorage.setItem("foodbite_auth", "true");
      alert("Login Successful ");
      console.log(DEMO_EMAIL);
      console.log(DEMO_PASSWORD);
      
      
      reset();
      navigate("/");
    } else {
      alert("Invalid Email or Password ");
    }
  };

  return (
    <div className="section2">
      <div className="container1">
        <h1 className="loginhead">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Minimum 4 characters required",
              },
            })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <button type="submit" id="btn3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
