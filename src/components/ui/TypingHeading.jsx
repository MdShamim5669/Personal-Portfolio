import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const TypingHeading = ({ 
  text, 
  highlightText = "",
  highlightClass = "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500 font-extrabold",
  className = "", 
  speed = 60, 
  deleteSpeed = 35,
  pauseDelay = 2200,
  delay = 0.2, 
  loop = false,
  as: Component = "h2" 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: !loop, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let timer;

    if (!isDeleting) {
      if (displayedText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, displayedText.length === 0 ? delay * 1000 : speed);
      } else if (loop) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, deleteSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [isInView, displayedText, isDeleting, text, speed, deleteSpeed, pauseDelay, delay, loop]);

  const renderContent = () => {
    if (!highlightText || !text.includes(highlightText)) {
      return displayedText;
    }

    const highlightIndex = text.indexOf(highlightText);
    const normalPart = displayedText.slice(0, highlightIndex);
    const highlightPart = displayedText.slice(highlightIndex);

    return (
      <>
        {normalPart}
        {highlightPart && (
          <span className={highlightClass}>
            {highlightPart}
          </span>
        )}
      </>
    );
  };

  return (
    <Component ref={ref} className={className}>
      {renderContent()}
      {isInView && (
        <span className="inline-block w-[3px] h-[0.8em] ml-1 bg-cyan-400 animate-pulse align-baseline" />
      )}
    </Component>
  );
};

export default TypingHeading;
