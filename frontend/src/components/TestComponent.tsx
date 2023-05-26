'use client'
import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

type LottieAnimationProps = {
  animationData: any;
};

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, []);

  return <div ref={container} />;
};

export default LottieAnimation;
