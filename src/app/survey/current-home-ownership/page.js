'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import MotionContainer from "@/components/MotionContainer"; // Import the reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function CurrentHomeOwnershipPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle selection of current home ownership
    const handleHomeOwnershipSelection = (ownershipStatus) => {
        updateSurveyData("current_home_ownership", ownershipStatus);
        console.log("Current Home Ownership: ", ownershipStatus);
            router.push("/survey/current-on-all-payments");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("Do you currently own a home?")}
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handleHomeOwnershipSelection("Yes. I currently own a home")}
                    className="button"
                >
                    {t("Yes. I currently own a home")}
                </button>
                <button
                    onClick={() => handleHomeOwnershipSelection("No. I am currently renting")}
                    className="button"
                >
                    {t("No. I am currently renting")}
                </button>
                <button
                    onClick={() => handleHomeOwnershipSelection("No. I have other living arrangements")}
                    className="button"
                >
                    {t("No. I have other living arrangements")}
                </button>
            </div>
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => router.back()}
                    className="button-back"
                >
                    {t("Back")}
                </button>
            </div>
        </MotionContainer>
    );
}
