"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface TransitionWrapperProps {
  children: ReactNode;
}

export default function TransitionWrapper({ children }: TransitionWrapperProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstLoad(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={isFirstLoad ? false : { opacity: 0, scale: 0.99, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }
        }}
        exit={{
          opacity: 0,
          scale: 0.99,
          filter: "blur(4px)",
          transition: {
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

