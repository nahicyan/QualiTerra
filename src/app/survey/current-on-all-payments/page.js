'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function CurrentOnAllPaymentsPage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle selection for "Current On All Payments"
    const handleCurrentOnAllPaymentsSelection = (choice) => {
        updateSurveyData("current_on_all_payments", choice);
        console.log("Current On All Payments: ", choice);

        // Determine if the user should be disqualified
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        if (choice === "No") {
            disqualificationFlag = true;
        }

        updateSurveyData("disqualificationFlag", disqualificationFlag);
        console.log("Disqualification Flag: ", disqualificationFlag);

        // Redirect to the next page
        router.push("/survey/down-payment");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("Have you been current on all rent or housing/land payments over the last 12 months?")}
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handleCurrentOnAllPaymentsSelection("Yes")}
                    className="button"
                >
                    {t("Yes")}
                </button>
                <button
                    onClick={() => handleCurrentOnAllPaymentsSelection("No")}
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
