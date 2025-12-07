import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert("Form Submitted:");
    console.log(data);
    reset();
  };
  return (
    <>
      <div className="container1">
        <h1 className="loginhead">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="" id="email1">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            id="email2"
            placeholder="Enter Your Email"
            // pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
          />

          {errors.fullname && (
            <p style={{ color: "red", paddingLeft: "150px" }}>
              email is requird
            </p>
          )}
          <br />
          <label htmlFor="pass2" id="pass1">
           Password
          </label>

          <input
            type="password"
            {...register("password", { required: true })}
            id="pass2"
            placeholder="Enter Your Password"
            pattern="^[A-Za-z0-9!@#$%^&*]{6,}$"
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
    </>
  );
};

export default Login;
