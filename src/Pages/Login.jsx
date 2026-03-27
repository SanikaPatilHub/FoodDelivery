// Login.jsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ Call login API
      const res = await axios.post("http://localhost:5000/api/auth/login", data);

      // ✅ Store JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      // Optional: store user info if backend sends it
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");
      reset();

      // ✅ Reload app so PrivateRoute detects token immediately
      window.location.href = "/"; // redirect to home or wherever you want
    } catch (error) {
      // Show backend error message or default
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="section2">
      <div className="container1">
        <h1 className="loginhead">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <label>Email</label>
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
          {errors.email && <span className="error">{errors.email.message}</span>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: "Minimum 4 characters required" },
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}

          <button type="submit" id="btn3">
            Login
          </button>

          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
