import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Authentication = () => {
  return (
    <div>
      <h1>This is the signin page</h1>
      <div className="forms-container">
        <div className="form-container">
          <SignInForm />
        </div>
        <div className="form-container">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
