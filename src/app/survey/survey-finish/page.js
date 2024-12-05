'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import axios from "axios";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function SurveyFinishPage() {

    const router = useRouter();
    const { surveyData } = useSurvey();
    const { t } = useTranslation(); // Hook to translate strings based on language
    const [isLoading, setIsLoading] = useState(true); // Loading state for 4 seconds
    const [qualified, setQualified] = useState(null); // Qualified or disqualified status
    const firstName = surveyData?.first_name; // Getting the first Name

    useEffect(() => {
        if (surveyData) {
            // Set a 4-second timeout to simulate evaluation process
            const timer = setTimeout(() => {
                const disqualificationFlag = surveyData.disqualificationFlag || false;

                // Set the qualification state based on disqualificationFlag
                setQualified(!disqualificationFlag);
                setIsLoading(false);

                // Send the survey data email
                sendSurveyData();
            }, 4000);

            // Cleanup the timeout if component unmounts early
            return () => clearTimeout(timer);
        }
    }, [surveyData]);

    // Function to send the survey data
    const sendSurveyData = async () => {
        try {
            // Send POST request to your API route to send email
            await axios.post("/api/send-survey-result", { surveyData });
            console.log("Survey data sent successfully!");
        } catch (error) {
            console.error("Failed to send survey data:", error);
        }
    };

    return (
        <MotionContainer>
            <div className="survey-finish-container">
                {isLoading ? (
                    <>
                        <h2 className="heading">{t("Evaluating Your Application...")}</h2>
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                    </>
                ) : (
                    <>
                        {qualified ? (
                            <div>
                                <h2 className="heading">{t("Congratulations")} {firstName}! {t("You have completed the application!")}</h2>
                                <p className="paragraph">
                                {t("We will review your application and reach out to you soon.")}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="heading">{t("Sorry")} {firstName}, {t("You Do Not Qualify For Our Seller Finance Program")}</h2>
                                <p className="paragraph">{t("Thank you for your interest.")}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MotionContainer>
    );
}
