// hooks/useTypingEffect.ts
import { useEffect, useState } from "react";

export const useTypingEffect = (text: string, speed = 20) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;

      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};
