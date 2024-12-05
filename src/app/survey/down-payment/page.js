'use client';

import { useSurvey } from "@/app/context/SurveyContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function DownPaymentPage() {
    const router = useRouter();
    const { surveyData, updateSurveyData } = useSurvey();
    const [choices, setChoices] = useState([]);
    const { t } = useTranslation(); // Hook to translate strings based on language

    useEffect(() => {
        // Extract the property price from survey data
        const propertyPrice = surveyData.property_price;

        // If property price is undefined, redirect back to an appropriate page
        if (!propertyPrice) {
            console.error("Property price is not available. Redirecting...");
            router.push("/survey/property-price"); // Adjust this route as needed
            return;
        }

        // Function to format the price with commas
        const formatCurrency = (value) => {
            return parseFloat(value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        };

        // Calculate different down payment percentages
        const downPayments = [
            { percentage: 10, value: formatCurrency(propertyPrice * 0.1) },
            { percentage: 15, value: formatCurrency(propertyPrice * 0.15) },
            { percentage: 20, value: formatCurrency(propertyPrice * 0.2) },
            { percentage: 25, value: formatCurrency(propertyPrice * 0.25) },
            { percentage: "More than 25%", value: "More than 25%" }
        ];

        // Create choice labels dynamically using the formatted property price
        const choicesData = downPayments.map((downPayment) => {
            if (typeof downPayment.percentage === "number") {
                return `${downPayment.percentage}% ($${downPayment.value})`;
            }
            return downPayment.value; // For "More than 25%" option
        });

        setChoices(choicesData);
    }, [surveyData, router]);

    if (!choices.length) {
        return <div>Loading...</div>;
    }

    // Function to handle selection for Down Payment
    const handleDownPaymentSelection = (choice) => {
        updateSurveyData("down_payment", choice);
        console.log("Down payment calculation is: ", choice);

        // Determine if the user should be disqualified
        let disqualificationFlag = surveyData.disqualificationFlag || false;

        if (choice === `10% ($${(parseFloat(surveyData.property_price) * 0.1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`) {
            disqualificationFlag = true;
        }

        updateSurveyData("disqualificationFlag", disqualificationFlag);
        console.log("Disqualification Flag: ", disqualificationFlag);

        router.push("/survey/employment-status");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("How much of a down payment are you able to make?")}
            </h2>
            <div className="element-container">
                {choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => handleDownPaymentSelection(choice)}
                        className="button"
                    >
                        {choice}
                    </button>
                ))}
                
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
