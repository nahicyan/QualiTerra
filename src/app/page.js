'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MotionContainer from "@/components/MotionContainer"; // Import MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function Home() {
    const router = useRouter();
    const { t } = useTranslation(); // Hook to translate strings based on language

    useEffect(() => {
        // Redirect to /survey automatically when the Home component loads after a short delay
        const timer = setTimeout(() => {
            router.push("/survey");
        }, 1000); // 1-second delay for better UX

        return () => clearTimeout(timer); // Cleanup on component unmount
    }, [router]);

    return (
        <MotionContainer>
            <div className="loading-card">
                <h1 className="heading">Preparing Your Application.</h1>
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            </div>
        </MotionContainer>
    );
}
