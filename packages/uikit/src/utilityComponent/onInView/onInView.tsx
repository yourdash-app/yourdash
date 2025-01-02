/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC, useEffect, useRef } from "react";

const OnInView: FC<{
  className?: string;
  onEnterView?: (direction: "up" | "down" | "left" | "right") => void;
  onLeaveView?: (direction: "up" | "down" | "left" | "right") => void;
}> = ({ className, onEnterView, onLeaveView }) => {
  const isInView = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const current = ref.current;

    const handleScroll = () => {
      const { top, bottom, left, right } = current.getBoundingClientRect();

      if (!isInView.current) {
        if (top < 0) {
          onEnterView?.("up");
          isInView.current = true;
          return;
        } else if (bottom > window.innerHeight) {
          onEnterView?.("down");
          isInView.current = true;
          return;
        } else if (left < 0) {
          onEnterView?.("left");
          isInView.current = true;
          return;
        } else if (right > window.innerWidth) {
          onEnterView?.("right");
          isInView.current = true;
          return;
        }
      }

      if (top > window.innerHeight) {
        onLeaveView?.("down");
        isInView.current = false;
        return;
      } else if (bottom < 0) {
        onLeaveView?.("up");
        isInView.current = false;
        return;
      } else if (left > window.innerWidth) {
        onLeaveView?.("right");
        isInView.current = false;
        return;
      } else if (right < 0) {
        onLeaveView?.("left");
        isInView.current = false;
        return;
      }
    };

    const observer = new IntersectionObserver(() => {
      handleScroll();
    });

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ height: 1, width: 1 }}
      className={className}
    />
  );
};

export default OnInView;
