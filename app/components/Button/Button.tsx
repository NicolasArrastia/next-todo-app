import { ColorsEnum, CustomColors } from "@/app/constants";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

export enum ButtonVariantEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

const Button = ({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick: () => void;
  type: "primary" | "secondary";
}) => {
  const {
    settings: { color },
  } = useGlobalContext();

  const bgColor = CustomColors[color as ColorsEnum].base;
  const hoverColor = CustomColors[color as ColorsEnum].hover;
  const borderColor = CustomColors[color as ColorsEnum].border;

  const primaryClasses = `${bgColor} ${hoverColor}`;
  const secondaryClasses = `${borderColor} border-2`;

  const buttonClasses = {
    primary: primaryClasses,
    secondary: secondaryClasses,
  };

  return (
    <button
      className={`${buttonClasses[type]} px-2 py-1 rounded-md dark:text-neutral-100`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
