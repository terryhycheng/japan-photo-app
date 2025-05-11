import React, { CSSProperties } from "react";
import Link from "next/link";

interface CustomButtonProps {
  text: string;
  colour?: CSSProperties["backgroundColor"];
  isWhiteText?: boolean;
  icons?: {
    IconLeft?: React.ElementType;
    IconRight?: React.ElementType;
  };
  className?: string;
  href: string;
}

const CustomButton = ({
  text,
  colour = "oklch(0.685 0.169 237.323)",
  isWhiteText = false,
  icons,
  className,
  href,
}: CustomButtonProps) => {
  const darkenColour = `color-mix(in srgb, ${colour} 40%, black)`;
  const borderColour = isWhiteText
    ? `color-mix(in srgb, ${colour} 50%, white)`
    : `color-mix(in srgb, ${colour} 60%, black)`;

  return (
    <Link
      href={href}
      className={`font-kiwimaru flex cursor-pointer items-center justify-center gap-2 rounded-full border-b-4 px-6 py-2 text-xl tracking-wider transition-all duration-300 hover:scale-105 ${className}`}
      style={{
        backgroundColor: colour,
        color: isWhiteText ? "white" : darkenColour,
        borderColor: borderColour,
      }}
    >
      {icons?.IconLeft && (
        <icons.IconLeft
          style={{ color: isWhiteText ? "white" : darkenColour }}
        />
      )}
      <span className="font-kiwimaru tracking-[0.2rem]">{text}</span>
      {icons?.IconRight && (
        <icons.IconRight
          style={{ color: isWhiteText ? "white" : darkenColour }}
        />
      )}
    </Link>
  );
};

export default CustomButton;
