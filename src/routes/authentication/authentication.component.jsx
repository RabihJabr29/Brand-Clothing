import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authentication.route.scss";

const Authentication = () => {
  return (
    <div>
      <div className="authentication-container">
        <div>
          <SignInForm />
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
