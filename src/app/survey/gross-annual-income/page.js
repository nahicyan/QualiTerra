'use client';

import { useSurvey } from "@/app/context/SurveyContext";
import { useRouter } from "next/navigation";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function GrossAnnualIncomePage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle income selection
    const handleGrossAnnualIncomeSelection = (choice) => {
        updateSurveyData("gross_annual_income", choice);

        // Determine if the user should be disqualified
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        // Set disqualification flag to true based on the income level
        if (choice === "Less than $30,000" || choice === "$30,000 - $50,000" || choice === "$50,000 - $75,000") {
            disqualificationFlag = true;
        }

        // Update the disqualification flag in the survey context
        updateSurveyData("disqualificationFlag", disqualificationFlag);

        // Log current state for debugging purposes
        console.log("Gross Annual Income: ", choice);
        console.log("Disqualification Flag: ", disqualificationFlag);

        // Navigate to the next step
        router.push("/survey/foreclosure-forbearance");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("What is your household gross (before taxes) annual income?")}
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handleGrossAnnualIncomeSelection("Less than $30,000")}
                    className="button"
                >
                    {t("Less than $30,000")}
                </button>
                <button
                    onClick={() => handleGrossAnnualIncomeSelection("$30,000 - $50,000")}
                    className="button"
                >
                    $30,000 - $50,000
                </button>
                <button
                    onClick={() => handleGrossAnnualIncomeSelection("$50,000 - $75,000")}
                    className="button"
                >
                    $50,000 - $75,000
                </button>
                <button
                    onClick={() => handleGrossAnnualIncomeSelection("$75,000 - $100,000")}
                    className="button"
                >
                    $75,000 - $100,000
                </button>
                <button
                    onClick={() => handleGrossAnnualIncomeSelection("$100,000 - $150,000")}
                    className="button"
                >
                    $100,000 - $150,000
                </button>
                <button
                    onClick={() => handleGrossAnnualIncomeSelection("$150,000 - $200,000")}
                    className="button"
                >
                    $150,000 - $200,000
                </button>
                <button
                    onClick={() => handleGrossAnnualIncomeSelection("Over $200,000")}
                    className="button"
                >
                    {t("Over $200,000")}
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
