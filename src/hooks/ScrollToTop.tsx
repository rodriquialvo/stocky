// ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Establece el scroll en la posición superior
  }, [pathname]);

  return null;
}

export default ScrollToTop;
