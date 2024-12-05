'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // Importing The Translation Module
import MotionContainer from "@/components/MotionContainer";

export default function PropertyPricePage() {
    const router = useRouter();
    const { updateSurveyData, surveyData } = useSurvey();
    const [propertyPrice, setPropertyPrice] = useState("");
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Formatting function to add dollar sign and commas
    const formatCurrency = (value) => {
        if (!value) return "";
        value = value.replace(/[^0-9]/g, ""); // Remove any non-numeric characters
        return value ? "$" + parseFloat(value).toLocaleString() : "";
    };

    // Function to handle changes to the input field
    const handleChange = (e) => {
        const formattedValue = formatCurrency(e.target.value);
        setPropertyPrice(formattedValue);
    };

    // Function to get the raw numeric value without formatting
    const getRawValue = (value) => {
        return value.replace(/[^0-9]/g, "");
    };

    // Handle form submission
    const handleSubmit = () => {
        if (!propertyPrice) {
            alert(t("Please enter a property price to proceed."));
            return;
        }

        // Store raw value for backend or further processing
        const rawValue = getRawValue(propertyPrice);
        updateSurveyData("property_price", rawValue);

        console.log("Current Survey Data:", { ...surveyData, property_price: rawValue });

        // Redirect to the next page
        router.push("/survey/home-usage");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
                {t("Enter the price of your desired property")}
            </h2>
            <input
                type="text"
                placeholder={t("Enter amount in USD")}
                value={propertyPrice}
                onChange={handleChange}
                className="input-field"
            />
            <div>
                <button
                    onClick={handleSubmit}
                    className="button"
                >
                    {t("Next")}
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
