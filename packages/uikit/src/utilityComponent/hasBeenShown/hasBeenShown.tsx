/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC, useEffect, useRef, useState } from "react";

const HasBeenShown: FC<{
  className?: string;
  onSeen: () => void;
}> = ({ className, onSeen }) => {
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const current = ref.current;

    const observer = new IntersectionObserver((interaction) => {
      if (interaction[0].isIntersecting) {
        onSeen();
        observer.disconnect();
        setHasBeenSeen(true);
      }
    });

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (hasBeenSeen) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={className}
    />
  );
};

export default HasBeenShown;
