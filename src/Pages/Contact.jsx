import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    emailjs
      .send(
        "service_portfolio001",
        "template_react002",
        {
          name: data.firstName,
          email: data.email,
          contactNo: data.phone,
          message: data.message, 
        },
        "G533phsevBqhFQyIm"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          reset();
        },
        () => {
          alert("Failed to send message");
        }
      );
  };

  return (
    <div className="checkout-container">
    
      <form className="delivery-box" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="contact1">Contact Us</h1>

        <input
          placeholder="First Name"
          {...register("firstName", { required: "First name is required" })}
          className="textbox1"
        />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}

        <input
          placeholder="Email Address"
          {...register("email", { required: "Email is required" })}
          className="textbox1"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          placeholder="Phone Number"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10 digit number",
            },
          })}
          className="textbox1"
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}

        <textarea
          placeholder="Your Message"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
          className="message-box"
        />
        {errors.message && <p className="error">{errors.message.message}</p>}

        <button type="submit" className="pay-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
