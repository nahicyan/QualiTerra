'use client';

import { useSurvey } from "@/app/context/SurveyContext";
import { useRouter } from "next/navigation";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function DeclaredBankruptcyPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle bankruptcy selection
    const handleBankruptcySelection = (choice) => {
        updateSurveyData("declared_bankruptcy", choice);

        // Determine if the user should be disqualified
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        // Set disqualification flag to true if the user has declared bankruptcy
        if (choice === "Yes") {
            disqualificationFlag = true;
        }

        // Update the disqualification flag in the survey context
        updateSurveyData("disqualificationFlag", disqualificationFlag);

        // Log current state for debugging purposes
        console.log("Declared Bankruptcy: ", choice);
        console.log("Disqualification Flag: ", disqualificationFlag);

        // Navigate to the next step
        router.push("/survey/current-credit-score");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("Have you declared bankruptcy in the last 4 years?")}
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handleBankruptcySelection("Yes")}
                    className="button"
                >
                    {t("Yes")}
                </button>
                <button
                    onClick={() => handleBankruptcySelection("No")}
                    className="button"
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
