import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import {
  signInAuthWithEmailAndPassword,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGoogleRedirect();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      alert("Password should be at least 6 characters");
    } else {
      try {
        await signInAuthWithEmailAndPassword(email, password);
        resetFormFields();
      } catch (error) {
        switch (error.code) {
          case "auth/wrong-password":
            alert("Incorrect password for email");
            break;

          case "auth/user-not-found":
            alert("Email is incorrect");
            break;

          default:
            console.log(error);
        }
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          minLength={6}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPES_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
