import { useEffect, useRef, useState } from 'react';

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  staggerIndex = 0,
  staggerStep = 100,
  duration = 750,
  threshold = 0.12,
  triggerOnce = true,
  className = '',
  style = {},
  as: Component = 'div'
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && observer && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold, triggerOnce]);

  const totalDelay = delay + staggerIndex * staggerStep;

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate3d(0, 32px, 0)';
      case 'down': return 'translate3d(0, -32px, 0)';
      case 'left': return 'translate3d(32px, 0, 0)';
      case 'right': return 'translate3d(-32px, 0, 0)';
      case 'scale': return 'translate3d(0, 16px, 0) scale(0.94)';
      case 'none': return 'translate3d(0, 0, 0)';
      default: return 'translate3d(0, 32px, 0)';
    }
  };

  const combinedStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${totalDelay}ms`,
    willChange: 'opacity, transform',
    ...style,
  };

  return (
    <Component ref={domRef} className={className} style={combinedStyle}>
      {children}
    </Component>
  );
}

