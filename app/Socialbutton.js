import SocialLogin from "react-social-login";
import React from "react";

const SocialButton = ({ children, triggerLogin, ...props }) => {
  const handleClick = () => {
    triggerLogin();
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default SocialLogin(SocialButton);
