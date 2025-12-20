import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("submiited!!!!");
  };

  return (
    <div className="contactsection">
      <div className="contactus">
        <h1 style={{ paddingTop: "40px" }}>CONTACT US</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder=" Name"
            {...register("Name", { required: true })}
            style={{
              marginBottom: "10px",
              paddingBottom: "20PX",
              width: "350PX",
              borderRadius: "5PX",
              borderStyle: "double",
            }}
          />
          {errors.Name && <p> name is required</p>}

          <br />

          <input
            placeholder="Contact Number"
            {...register("contactNo", {
              required: true,
              pattern: /^[0-9]{10}$/,
            })}
            style={{
              marginBottom: "10px",
              paddingBottom: "20PX",
              width: "350PX",
              borderRadius: "5PX",
              borderStyle: "double",
            }}
          />
          {errors.contactNo && <p>Enter valid 10-digit contact number</p>}

          <br />
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            style={{
              marginBottom: "10px",
              paddingBottom: "20PX",
              width: "350PX",
              borderRadius: "5PX",
              borderStyle: "double",
            }}
          />
          {errors.email && <p>Enter a valid email</p>}

          <br />
          <textarea
            placeholder="Message"
            {...register("message", {
              required: true,
              minLength: 10,
            })}
            style={{
              marginBottom: "10px",
              paddingBottom: "40PX",
              width: "350PX",
              borderRadius: "5PX",
              borderStyle: "double",
            }}
          />
          {errors.message && <p>Message must be at least 10 characters</p>}

          <br />

          <button
            type="submit"
            className="feed"
            style={{
              marginBottom: "50px",
              paddingBottom: "9PX",
              width: "350PX",
              borderRadius: "5PX",
              borderStyle: "double",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
