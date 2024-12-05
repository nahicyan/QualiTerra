'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import MotionContainer from "@/components/MotionContainer";
import { useTranslation } from "react-i18next"; // Importing The Translation Module


export default function HomeUsagePage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle the selection of a home usage option
    const handleHomeUsageSelection = (usage) => {
        updateSurveyData("home_usage", usage);
        console.log("Home Usage Answer: ", usage);

        // Redirect to the next page
        router.push("/survey/real-estate-agent");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("How will you use your new land?")}
            </h2>
            <div className="element-container">
            <button
                    onClick={() => handleHomeUsageSelection("To build a primary residence")}
                    className="button"
                >
                    {t("To build a primary residence")}
                </button>
                <button
                    onClick={() => handleHomeUsageSelection("Secondary/Vacation Land")}
                    className="button"
                >
                    {t("Secondary/Vacation Land")}
                </button>
                <button
                    onClick={() => handleHomeUsageSelection("Investment Property")}
                    className="button"
                >
                    {t("Investment Property")}
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
