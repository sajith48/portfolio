import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const AnimatedCounter = ({ value, prefix = '', suffix = '', decimals = 0, duration = 2.5, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <span ref={ref} className={className}>
      {isInView ? (
        <CountUp
          start={0}
          end={value}
          duration={duration}
          separator=","
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          useEasing={true}
        />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </span>
  );
};
