'use client';

import { motion } from "framer-motion";

export default function MotionContainer({ children }) {
    return (
        <motion.div
            className="motion-container"
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{ type: "spring", stiffness: 50 }}
        >
            {children}
        </motion.div>
    );
}
