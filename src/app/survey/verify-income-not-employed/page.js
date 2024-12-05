'use client';

import { useSurvey } from "@/app/context/SurveyContext";
import { useRouter } from "next/navigation";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module


export default function VerifyIncomeSelfEmployedPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle income verification selection
    const handleIncomeVerificationSelection = (choice) => {
        updateSurveyData("verify_income", choice);

        // Determine if the user should be disqualified
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        // Set disqualification flag to true if the user has no other source of income
        if (choice === "No, I don't") {
            disqualificationFlag = true;
        }

        // Update the disqualification flag in the survey context
        updateSurveyData("disqualificationFlag", disqualificationFlag);

        // Log current state for debugging purposes
        console.log("Verify Income Non-Employed: ", choice);
        console.log("Disqualification Flag: ", disqualificationFlag);

        // Navigate to the next step
        router.push("/survey/income-history");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("Do you have another source of income?")}
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handleIncomeVerificationSelection("Yes, I do")}
                    className="button"
                >
                {t("Yes, I do")}
                </button>
                <button
                    onClick={() => handleIncomeVerificationSelection("No, I don't")}
                    className="button"
                >
                {t("No, I don't")}
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
