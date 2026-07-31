import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./AmanahCursor.css";

const CORNER_SIZE = 16;
const CORNER_GAP = 3;
const TARGET_BUFFER = 18;

export default function AmanahCursor({
  targetSelector = "a, button, summary",
  donateSelector = ".primary-button, .bp-header-actions a, .choice-total a, .footer-cta a",
  crescentColor = "#c9a15a",
  cornerColor = "#00a3da",
  rippleColor = "rgba(201, 161, 90, 0.55)",
}) {
  const cursorRef = useRef(null);
  const crescentRef = useRef(null);
  const cornersRef = useRef([]);
  const activeTargetRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px)");
    const sync = () => setEnabled(finePointer.matches);
    sync();
    finePointer.addEventListener("change", sync);
    return () => finePointer.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || !cursorRef.current || !crescentRef.current) return;

    const cursor = cursorRef.current;
    const crescent = crescentRef.current;
    const corners = cornersRef.current.filter(Boolean);
    const targetNodes = Array.from(document.querySelectorAll(targetSelector));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionDuration = reducedMotion ? 0 : 0.28;

    document.documentElement.classList.add("amanah-cursor-active");
    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
    });
    gsap.set(corners, { opacity: 0, scale: 0.35 });

    const spin = reducedMotion
      ? null
      : gsap.to(crescent, { rotation: 360, duration: 8, repeat: -1, ease: "none" });

    const hideCorners = () => {
      activeTargetRef.current = null;
      gsap.to(crescent, {
        opacity: 1,
        scale: 1,
        duration: motionDuration,
        overwrite: true,
      });
      gsap.to(corners, {
        opacity: 0,
        scale: 0.35,
        duration: motionDuration,
        stagger: reducedMotion ? 0 : 0.02,
        overwrite: true,
      });
    };

    const positionCorners = (target, x, y, entering = false) => {
      const rect = target.getBoundingClientRect();
      const points = [
        { x: rect.left - x - CORNER_GAP, y: rect.top - y - CORNER_GAP },
        { x: rect.right - x - CORNER_SIZE + CORNER_GAP, y: rect.top - y - CORNER_GAP },
        {
          x: rect.right - x - CORNER_SIZE + CORNER_GAP,
          y: rect.bottom - y - CORNER_SIZE + CORNER_GAP,
        },
        { x: rect.left - x - CORNER_GAP, y: rect.bottom - y - CORNER_SIZE + CORNER_GAP },
      ];

      corners.forEach((corner, index) => {
        gsap.to(corner, {
          x: points[index].x,
          y: points[index].y,
          opacity: 1,
          scale: 1,
          duration: motionDuration,
          delay: entering && !reducedMotion ? index * 0.025 : 0,
          ease: reducedMotion ? "none" : "power3.out",
          overwrite: true,
        });
      });
    };

    const activateTarget = (target, x, y) => {
      if (!target || target === activeTargetRef.current) return;
      activeTargetRef.current = target;
      gsap.to(crescent, {
        opacity: 0.62,
        scale: 0.62,
        duration: motionDuration,
        overwrite: true,
      });
      positionCorners(target, x, y, true);
    };

    const getTargetAt = (x, y) => {
      const directTarget = document.elementFromPoint(x, y)?.closest?.(targetSelector);
      if (directTarget) return directTarget;

      let nearestTarget = null;
      let nearestDistance = Number.POSITIVE_INFINITY;
      targetNodes.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const withinBuffer =
          x >= rect.left - TARGET_BUFFER &&
          x <= rect.right + TARGET_BUFFER &&
          y >= rect.top - TARGET_BUFFER &&
          y <= rect.bottom + TARGET_BUFFER;
        if (!withinBuffer) return;
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
        const distance = (centerX - x) ** 2 + (centerY - y) ** 2;
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestTarget = target;
        }
      });
      return nearestTarget;
    };

    const onMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        autoAlpha: 1,
        duration: reducedMotion ? 0 : 0.12,
        ease: "power3.out",
        overwrite: true,
      });

      const hoveredTarget = getTargetAt(event.clientX, event.clientY);
      if (hoveredTarget && hoveredTarget !== activeTargetRef.current) {
        activateTarget(hoveredTarget, event.clientX, event.clientY);
      } else if (!hoveredTarget && activeTargetRef.current) {
        hideCorners();
      } else if (activeTargetRef.current) {
        positionCorners(activeTargetRef.current, event.clientX, event.clientY);
      }
    };

    const onOver = (event) => {
      const target = getTargetAt(pointerRef.current.x, pointerRef.current.y) || event.target.closest?.(targetSelector);
      activateTarget(target, pointerRef.current.x, pointerRef.current.y);
    };

    const onOut = (event) => {
      const activeTarget = activeTargetRef.current;
      if (!activeTarget || activeTarget.contains(event.relatedTarget)) return;
      const nextTarget = getTargetAt(pointerRef.current.x, pointerRef.current.y);
      if (nextTarget === activeTarget) return;
      hideCorners();
    };

    const onScroll = () => {
      const activeTarget = activeTargetRef.current;
      if (!activeTarget) return;
      const { x, y } = pointerRef.current;
      const underPointer = getTargetAt(x, y);
      if (underPointer !== activeTarget) {
        hideCorners();
        return;
      }
      positionCorners(activeTarget, x, y);
    };

    const onDown = () => {
      gsap.to(crescent, {
        scale: 0.72,
        duration: reducedMotion ? 0 : 0.16,
        overwrite: true,
      });
    };

    const onUp = () => {
      gsap.to(crescent, {
        scale: activeTargetRef.current ? 0.62 : 1,
        duration: reducedMotion ? 0 : 0.25,
        ease: "back.out(2)",
        overwrite: true,
      });
    };

    const onClick = (event) => {
      if (!event.target.closest?.(donateSelector)) return;
      const ripple = document.createElement("span");
      ripple.className = "amanah-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      ripple.style.background = rippleColor;
      document.body.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.9 },
        {
          scale: 1,
          opacity: 0,
          duration: reducedMotion ? 0.01 : 0.7,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("click", onClick);
      document.documentElement.classList.remove("amanah-cursor-active");
      spin?.kill();
      gsap.killTweensOf([cursor, crescent, ...corners]);
      document.querySelectorAll(".amanah-ripple").forEach((ripple) => ripple.remove());
    };
  }, [donateSelector, enabled, rippleColor, targetSelector]);

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="amanah-cursor-wrapper" aria-hidden="true">
      <svg
        ref={crescentRef}
        className="amanah-crescent"
        viewBox="0 0 20 20"
        style={{ color: crescentColor }}
      >
        <path d="M12.5 2.3a8 8 0 1 0 0 15.4 9.2 9.2 0 0 1 0-15.4z" fill="currentColor" />
        <circle cx="15.2" cy="4.6" r="1" fill="currentColor" />
      </svg>
      {["corner-tl", "corner-tr", "corner-br", "corner-bl"].map((position, index) => (
        <span
          key={position}
          ref={(node) => {
            cornersRef.current[index] = node;
          }}
          className={`amanah-corner ${position}`}
          style={{ borderColor: cornerColor }}
        />
      ))}
    </div>
  );
}
