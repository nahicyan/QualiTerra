'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import { useState } from "react";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function LiensOrJudgmentsPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();
    const [selectedChoice, setSelectedChoice] = useState(null);
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle selecting a choice and automatically submitting
    const handleSelectChoice = (choice) => {
        setSelectedChoice(choice);

        // Update survey data
        updateSurveyData("liens_or_judgments", choice);

        // Determine if the user should be disqualified
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        // If the answer is "Yes", set disqualification flag to true
        if (choice === "Yes") {
            disqualificationFlag = true;
        }

        // Update the disqualification flag in the survey context
        updateSurveyData("disqualificationFlag", disqualificationFlag);

        // Log current state for debugging purposes
        console.log("Outstanding Liens or Judgments: ", choice);
        console.log("Disqualification Flag: ", disqualificationFlag);

        // Redirect to the next step if qualified
        router.push("/survey/info");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("Are there any outstanding liens or judgments that will appear on your credit?")}
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handleSelectChoice("Yes")}
                    className={`button ${selectedChoice === "Yes" ? "selected" : ""}`}
                >
                    {t("Yes")}
                </button>
                <button
                    onClick={() => handleSelectChoice("No")}
                    className={`button ${selectedChoice === "No" ? "selected" : ""}`}
                >
                    {t("No")}
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
