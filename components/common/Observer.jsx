// import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from "prop-types";

// const Observer = (props) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;

//     const observerOptions = {
//       root: null, // Use the viewport as the root
//       rootMargin: '0px', // No margin around the root
//       threshold: 0.1 // Trigger when at least 10% of the element is visible
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       });
//     }, observerOptions);

//     if (section) {
//       observer.observe(section);
//     }

//     return () => {
//       if (section) {
//         observer.unobserve(section);
//       }
//     };
//   }, []);

//   return (
//     <div className="investment_support">
//       <div className={`wrapper ${isVisible ? 'active' : 'hidden'} ${props?.animationName}`} style={{animationDuration: `${props?.duration}ms`}} ref={sectionRef}>
//         {props?.children}
//       </div>
//     </div>
//   );
// };

// Observer.propTypes = {
//   animationName: PropTypes?.string,
//   duration: PropTypes?.number,
// };

// Observer.defaultProps = {
//   animationName: "",
//   duration: 0,
// };

// export default Observer;

import React, { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from "prop-types";

const Observer = ({ animationName, duration, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibilityPercentage, setVisibilityPercentage] = useState(0);
  const [hasCalculatedPercentage, setHasCalculatedPercentage] = useState(false);
  const sectionRef = useRef(null);

  const observerOptions = useMemo(() => ({
    root: null,
    rootMargin: '0px',
    threshold: Array.from({ length: 100 }, (_, i) => i / 100).filter(item =>item>=0.001)
  }), []);

  const observerCallback = useMemo(() => (entries) => {
    entries.forEach(entry => {
      const visibilityRatio = entry.intersectionRatio;

      if (entry.isIntersecting) {
        setIsVisible(true);
        if (!hasCalculatedPercentage) {
          setVisibilityPercentage(visibilityRatio * 100);
          if (parseFloat((visibilityRatio * 100).toFixed(0)) >= 90) {
            setHasCalculatedPercentage(true);
          }
        }
      } else {
        if (!hasCalculatedPercentage) {
          setVisibilityPercentage(0);
        }
      }
    });
  }, [hasCalculatedPercentage]);

  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [observerCallback, observerOptions]);

  const getVisibilityClass = (percentage) => {
    if (percentage <= 10) return 'visibility-0-10';
    if (percentage <= 20) return 'visibility-11-20';
    if (percentage <= 30) return 'visibility-21-30';
    if (percentage <= 40) return 'visibility-31-40';
    if (percentage <= 50) return 'visibility-41-50';
    if (percentage <= 60) return 'visibility-51-60';
    if (percentage <= 70) return 'visibility-61-70';
    if (percentage <= 80) return 'visibility-71-80';
    if (percentage <= 90) return 'visibility-81-90';
    return 'visibility-91-100';
  };

  return (
    <div className={`investment_support ${className} ${isVisible ? `active-main ${getVisibilityClass(visibilityPercentage)}  ${animationName} ` : 'hidden'}`}>
      <div 
        className={`wrapper ${isVisible ? `active ${getVisibilityClass(visibilityPercentage)}  ${animationName} ` : 'hidden'}`} 
        style={{ animationDuration: `${duration}ms` }} 
        ref={sectionRef}
      >
        {children}
        {/* <div className="visibility-percentage">Visible: {visibilityPercentage.toFixed(2)}%</div> */}
      </div>
    </div>
  );
};

Observer.propTypes = {
  animationName: PropTypes.string,
  className: PropTypes.string,
  duration: PropTypes.number,
  children: PropTypes.node
};

Observer.defaultProps = {
  animationName: "",
  className: "",
  duration: 0,
  children: null
};

export default Observer;