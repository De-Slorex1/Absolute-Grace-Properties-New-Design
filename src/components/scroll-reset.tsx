"use client";

import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  return null;
}