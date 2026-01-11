import React, { useRef, useLayoutEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 600);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

export default function Header() {
  const indicatorRef = useRef();
  const navRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    if (isMobile) return;

    let animationFrame;
    let fontLoadListener;

    function updateIndicator() {
      const activeIdx = navItems.findIndex(
        (item) =>
          item.to === (location.pathname === "/" ? "/" : location.pathname)
      );
      const activeLink = navRefs.current[activeIdx];
      const navBg = activeLink?.parentElement;
      if (activeLink && navBg && indicatorRef.current) {
        const navRect = navBg.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        // Set a minimum width (e.g., 60px) to prevent shrinking
        const minWidth = 60;
        const width = Math.max(linkRect.width, minWidth);
        indicatorRef.current.style.left = linkRect.left - navRect.left + "px";
        indicatorRef.current.style.width = width + "px";
      }
    }

    function handleUpdate() {
      // Use requestAnimationFrame to ensure layout is stable
      animationFrame = requestAnimationFrame(updateIndicator);
    }

    // Initial update
    handleUpdate();
    // Update on window resize
    window.addEventListener("resize", handleUpdate);

    // Update after fonts are loaded (if browser supports it)
    if (document.fonts && document.fonts.ready) {
      fontLoadListener = () => handleUpdate();
      document.fonts.ready.then(fontLoadListener);
    }

    return () => {
      window.removeEventListener("resize", handleUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      // No need to remove fontLoadListener as it's a one-time promise
    };
  }, [location.pathname, isMobile]);

  // Get current page title
  const currentItem = navItems.find(
    (item) => item.to === (location.pathname === "/" ? "/" : location.pathname)
  );
  const currentTitle = currentItem ? currentItem.label : "";

  if (isMobile) {
    return (
      <div className="nav-wrapper mobile-nav-wrapper">
        <nav className="nav-bg mobile-nav-bg">
          <div className="mobile-pill">
            <span className="mobile-pill-title">{currentTitle}</span>
            <button
              className="mobile-hamburger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-dropdown">
              {navItems.map((item) => {
                // Custom active logic for Projects
                let isActive = false;
                if (item.to === "/projects") {
                  isActive = location.pathname === "/projects" || location.pathname.startsWith("/projects/");
                } else {
                  isActive = item.to === location.pathname;
                }
                return (
                  <button
                    key={item.to}
                    className={
                      "mobile-dropdown-link" + (isActive ? " active" : "")
                    }
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(item.to);
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </nav>
      </div>
    );
  }

  // Desktop nav
  return (
    <div className="nav-wrapper">
      <nav className="nav-bg" role="navigation" aria-label="Main navigation">
        <div className="nav-indicator" ref={indicatorRef} aria-hidden="true"></div>
        {navItems.map((item, idx) => {
          // Custom active logic for Projects
          let isActive = false;
          if (item.to === "/projects") {
            isActive = location.pathname === "/projects" || location.pathname.startsWith("/projects/");
          } else {
            isActive = item.to === location.pathname;
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={"nav-link" + (isActive ? " active" : "")}
              ref={(el) => (navRefs.current[idx] = el)}
              end={item.to === "/"}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
} 