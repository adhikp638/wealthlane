import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  opacity: 0;
  transition: opacity 0.5s ease;

  &.fade-in {
    opacity: 1;
  }
`;

const FadeInView = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const { current } = ref;
      if (current) {
        const { top, bottom } = current.getBoundingClientRect();
        const isVisible = top < window.innerHeight && bottom >= 0;
        if (isVisible) {
          current.classList.add("fade-in");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check visibility on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <Wrapper ref={ref}>{children}</Wrapper>;
};

export default FadeInView;
