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
          name: data.firstName + " " + data.lastName,
          email: data.email,
          contactNo: data.phone,
          message: "Order Checkout Form Submission",
        },
        "G533phsevBqhFQyIm"
      )
      .then(
        () => {
          alert( "message sent successfully!!!");
          reset();
        },
        () => {
          alert("Failed to send message ");
        }
      );
  };

  return (
    <div className="checkout-container">
      
      <form className="delivery-box" onSubmit={handleSubmit(onSubmit)}>
        <h1>Contact Us</h1>

        <div className="row">
          <input
            placeholder="First Name"
            {...register("firstName", { required: true })}
            className="textbox1"
            style={{
              marginLeft:"8px"
            }}
          />
          
        </div>
        {errors.firstName && <p>First name required</p>}

        <input
          placeholder="Email Address"
          {...register("email", { required: true })}
          className="textbox1"
        />
        {errors.email && <p>Email required</p>}

       

        

     

        <input
          placeholder="Phone Number"
          {...register("phone", {
            required: true,
            pattern: /^[0-9]{10}$/,
          })}
          className="textbox1"
        />
        {errors.phone && <p>Enter valid phone number</p>}
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

{errors.message && (
  <p className="error">{errors.message.message}</p>
)}
<br />
        <button type="submit" className="pay-btn">
          Send Message
        </button>
      </form>

      
        </div>
      
   
  );
};

export default Contact;
