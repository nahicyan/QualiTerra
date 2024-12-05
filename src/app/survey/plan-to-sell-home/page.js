'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function PlanToSellHomePage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle selection for "Plan to Sell Home"
    const handlePlanToSellHomeSelection = (choice) => {
        updateSurveyData("plan_to_sell_home", choice);
        console.log("Plan to sell home: ", choice);

        // Redirect to the next page
        router.push("/survey/current-on-all-payments");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("Do you plan to sell your home?")}
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handlePlanToSellHomeSelection("Yes")}
                    className="button"
                >
                    {t("Yes")}
                </button>
                <button
                    onClick={() => handlePlanToSellHomeSelection("No")}
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
