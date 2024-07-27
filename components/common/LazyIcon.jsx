import React, { useEffect, useRef, useState } from 'react';

const LazyIcon = ({ iconUrl, style, className, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const iconRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.style.setProperty('--icon-url', `url(${iconUrl})`);
          setLoaded(true);
          observer.unobserve(element);
        }
      });
    });

    if (iconRef.current) {
      observer.observe(iconRef.current);
    }

    return () => {
      if (iconRef.current) {
        observer.unobserve(iconRef.current);
      }
    };
  }, [iconUrl]);

  const Icon = () =>{
    return(
      <i
        ref={iconRef}
        onClick={onClick}
        className={`${className} ${loaded ? 'loaded' : ''}`}
        style={style}
      />
    )
  }
  return (
    Icon()
  );
};

export default LazyIcon;
