"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { staggerContainer } from "@/lib/motion";

interface StaggerGroupProps extends HTMLMotionProps<"div"> {
  stagger?: number;
}

export function StaggerGroup({ stagger = 0.07, ...props }: StaggerGroupProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    />
  );
}
