import React from "react";
import { authService } from "../../fbase";
import Button from "./Button";

const Profile = (props) => {
  const logInOutHandler = (e) => {
    authService.signOut();
  };
  return (
    <Button
      onclick={logInOutHandler}
      name={props.isLoggedIn ? "로그아웃" : "로그인"}
      className="header-logInOut"
    />
  );
};

export default Profile;
