'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "../context/SurveyContext";
import MotionContainer from "@/components/MotionContainer";
import { useTranslationContext } from "@/app/context/TranslationContext";
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function SurveyPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();
    const { changeLanguage } = useTranslationContext();
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to handle button click for language selection
    const handleLanguageSelection = (language) => {
        updateSurveyData('language', language);
        changeLanguage(language === "English" ? 'en' : 'es');
        console.log("Language: ", language);

        router.push("/survey/property-price");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
                Choose Your Language
            </h2>
            <div className="element-container">
                <button
                    onClick={() => handleLanguageSelection("English")}
                    className="button"
                >
                    English
                </button>
                <button
                    onClick={() => handleLanguageSelection("Spanish")}
                    className="button"
                >
                    Español
                </button>
            </div>
        </MotionContainer>
    );
}

