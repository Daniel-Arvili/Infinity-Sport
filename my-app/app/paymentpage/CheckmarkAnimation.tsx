import { useTheme } from "next-themes";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CheckmarkCircleProps {
  setFinishAnimation: Dispatch<SetStateAction<boolean>>;
}

const CheckmarkCircle = ({ setFinishAnimation }: CheckmarkCircleProps) => {
  const [animate, setAnimate] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      setAnimate(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }
  }, [mounted, theme]);

  useEffect(() => {
    setMounted(true);
    const totalAnimationTime = 3500;
    const timer = setTimeout(() => {
      setFinishAnimation(true);
    }, totalAnimationTime);
    return () => clearTimeout(timer);
  }, [setFinishAnimation]);

  const Color = theme === "dark" ? "#9ffd32" : "#7395AE";

  const svgStyles = {
    width: "180px",
    height: "180px",
  };

  const baseStyle = {
    strokeDasharray: 285,
    strokeDashoffset: animate ? "0" : "285",
    transition: "stroke-dashoffset 1s ease-in-out",
    transitionDelay: "0.5s",
  };

  if (!mounted) {
    return null;
  }
  return (
    <>
      <style>
        {`
          @keyframes drawCircle {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes drawCheckmark {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fadeUp {
            to {
              opacity: 0;
              transform: translateY(-100px);
            }
          }
          .circlePath {
            stroke-dasharray: 285;
            stroke-dashoffset: 285;
            transform: rotate(-180deg);
            transform-origin: center; 
            animation: drawCircle 0.6s ease-in-out forwards;
          }
          .checkmarkPath {
            stroke-dasharray: 285;
            stroke-dashoffset: 285;
            animation: drawCheckmark 0.8s 0.9s ease-in-out forwards;
          }
          .animatedSvg {
            animation: fadeUp 1s 2s ease-in-out forwards;
          }
        `}
      </style>
      <svg
        className="animatedSvg"
        style={{ width: "150px", height: "150px" }}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Checkmark Animation"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={Color}
          strokeWidth="7"
          className="circlePath"
        />
        <path
          fill="none"
          stroke={Color}
          strokeWidth="7"
          d="M25,50 l20,20 l35,-40"
          className="checkmarkPath"
        />
      </svg>
    </>
  );
};

export default CheckmarkCircle;
