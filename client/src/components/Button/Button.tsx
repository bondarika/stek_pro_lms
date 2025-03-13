import { ReactElement } from "react";
import { ButtonProps } from "./types";
import "./Button.scss";

const Button = ({ children, ...props }: ButtonProps): ReactElement => {
  return <button {...props}>{children}</button>;
};

export default Button;
