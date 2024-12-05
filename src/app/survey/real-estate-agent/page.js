'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import MotionContainer from "@/components/MotionContainer";
import { useTranslation } from "react-i18next"; // Importing The Translation Module


export default function RealEstateAgentPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language
    
    // Function to handle selection of real estate agent option
    const handleRealEstateAgentSelection = (hasAgent) => {
        updateSurveyData('real_estate_agent', hasAgent);
        console.log("Real Estate Agent: ", hasAgent);

        // Redirect to the next page
        router.push("/survey/home-purchase-timing");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("Do you have a Real Estate Agent?")}
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handleRealEstateAgentSelection("Yes")}
                    className="button"
                >
                    {t("Yes")}
                </button>
                <button
                    onClick={() => handleRealEstateAgentSelection("No")}
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
