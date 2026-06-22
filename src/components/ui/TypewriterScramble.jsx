import React, { useState, useEffect } from 'react';

export const TypewriterScramble = ({ phrases, delay = 100, deleteDelay = 60, pauseTime = 1500 }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const phrase = phrases[currentIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(phrase.substring(0, displayText.length - 1));
      }, deleteDelay);
    } else {
      timer = setTimeout(() => {
        setDisplayText(phrase.substring(0, displayText.length + 1));
      }, delay);
    }

    if (!isDeleting && displayText === phrase) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDeleting(false);
      setCurrentIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIdx, phrases, delay, deleteDelay, pauseTime]);

  return (
    <span className="text-gradient font-bold tracking-tight">
      {displayText}
      <span className="animate-[ping_1.2s_infinite] ml-1 font-extralight text-indigo-400">|</span>
    </span>
  );
};
