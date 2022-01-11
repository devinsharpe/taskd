import React, { MouseEventHandler, PropsWithChildren } from "react";

import Loader from "./loader";
import { motion } from "framer-motion";

export interface ButtonProps {
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
  isGhost?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  scaleOnHover?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isGhost,
  isLoading,
  onClick,
  scaleOnHover,
  type,
  variant,
}) => {
  if (scaleOnHover) {
    return (
      <motion.button
        type={type}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${variant} ${
          isGhost ? "ghost" : ""
        }  flex items-center justify-center relative ${className}`}
        onClick={onClick}
        aria-busy={isLoading}
      >
        {isLoading && (
          <Loader
            size={"sm"}
            className={`absolute transform -translate-x-1/2 left-1/2`}
          />
        )}
        <span className={`${isLoading ? "invisible" : ""} text-inherit`}>
          {children}
        </span>
      </motion.button>
    );
  } else {
    return (
      <button
        className={`${className} ${variant} ${
          isGhost ? "ghost" : ""
        }  flex items-center justify-center relative`}
        onClick={onClick}
      >
        {isLoading && (
          <Loader
            size={"sm"}
            className={`absolute transform -translate-x-1/2 left-1/2`}
          />
        )}
        <span className={`${isLoading ? "invisible" : ""} text-inherit`}>
          {children}
        </span>
      </button>
    );
  }
};

Button.defaultProps = {
  type: "button",
  variant: "primary",
  isGhost: false,
  isLoading: false,
  onClick: () => null,
  scaleOnHover: false,
  className: "",
};

export default Button;
