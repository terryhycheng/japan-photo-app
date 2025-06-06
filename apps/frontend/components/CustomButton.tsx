import React, { CSSProperties } from "react";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";

interface CustomButtonProps {
  text?: string;
  colour?: CSSProperties["backgroundColor"];
  isWhiteText?: boolean;
  icons?: {
    IconLeft?: React.ElementType;
    IconRight?: React.ElementType;
  };
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  isDarkenText?: boolean;
}

const CustomButton = ({
  text,
  colour = "var(--main-color)",
  isWhiteText = true,
  icons,
  className,
  href,
  onClick,
  disabled = false,
  isDarkenText = false,
}: CustomButtonProps) => {
  const darkenColour = `color-mix(in srgb, ${colour} 40%, black)`;
  const borderColour = !isDarkenText
    ? `color-mix(in srgb, ${colour} 50%, white)`
    : `color-mix(in srgb, ${colour} 60%, black)`;

  const iconColour = isDarkenText
    ? darkenColour
    : isWhiteText
      ? "white"
      : colour;

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "font-kiwimaru gap- flex cursor-pointer items-center justify-center rounded-full border-b-4 px-6 py-2 text-xl tracking-wider transition-all duration-300 hover:scale-105",
          className,
        )}
        style={{
          backgroundColor: colour,
          color: isDarkenText ? darkenColour : isWhiteText ? "white" : colour,
          borderColor: borderColour,
        }}
      >
        {icons?.IconLeft && <icons.IconLeft style={{ color: iconColour }} />}
        {text && (
          <span className="font-kiwimaru tracking-[0.2rem]">{text}</span>
        )}
        {icons?.IconRight && <icons.IconRight style={{ color: iconColour }} />}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "font-kiwimaru flex cursor-pointer items-center justify-center gap-2 rounded-full border-b-4 px-6 py-2 text-xl tracking-wider transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-none",
        className,
      )}
      style={{
        backgroundColor: colour,
        color: isWhiteText ? "white" : colour,
        borderColor: borderColour,
      }}
      disabled={disabled}
    >
      {icons?.IconLeft && <icons.IconLeft style={{ color: iconColour }} />}
      {text && <span className="font-kiwimaru tracking-[0.2rem]">{text}</span>}
      {icons?.IconRight && <icons.IconRight style={{ color: iconColour }} />}
    </button>
  );
};

export default CustomButton;
