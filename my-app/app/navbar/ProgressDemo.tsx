"use client";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Fade } from "react-awesome-reveal";

interface ProgressDemoProps {
  totalPrice: number;
}

const ProgressDemo: React.FC<ProgressDemoProps> = ({ totalPrice }) => {
  const [progress, setProgress] = useState<number>(0);
  const percentage = Math.min((totalPrice / 250) * 100, 100);
  const [ShowTextFlag, setShowTextFlag] = useState<boolean>(false);

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(
          oldProgress + percentage / 100,
          percentage
        );
        if (newProgress < percentage) {
          animationFrameId = requestAnimationFrame(updateProgress);
        }
        return newProgress;
      });
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    setShowTextFlag(true);

    return () => cancelAnimationFrame(animationFrameId);
  }, [percentage]);

  return (
    <div className="my-2">
      {ShowTextFlag ? (
        <>
          <Fade>
            {totalPrice >= 250 ? (
              <div className="text-xs text-center my-2">
                Yayi! You&apos;re Qualified For{" "}
                <span className="font-medium">FREE SHIPPING</span> Within The
                US.
              </div>
            ) : (
              <div className="text-xs text-center my-2">
                You&apos;re {250 - totalPrice}$ Away From Free Standart
                Shipping!
              </div>
            )}
          </Fade>
        </>
      ) : null}
      <Progress value={progress} max={100} className="w-[60%] mx-auto" />
    </div>
  );
};
export default ProgressDemo;
