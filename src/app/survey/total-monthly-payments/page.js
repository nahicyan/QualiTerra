'use client';

import { useSurvey } from "@/app/context/SurveyContext";
import { useRouter } from "next/navigation";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module
import { useState } from "react";

export default function TotalMonthlyPaymentsPage() {
    const router = useRouter();
    const { updateSurveyData } = useSurvey();
    const [totalPayments, setTotalPayments] = useState("");
    const { t } = useTranslation(); // Hook to translate strings based on language

    // Function to format the input value in real-time
    const formatCurrency = (value) => {
        if (!value) return "";
        // Remove any non-numeric characters except digits
        value = value.replace(/[^0-9]/g, "");
        // Format the value with dollar sign and commas
        return "$" + parseFloat(value).toLocaleString();
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        const formattedValue = formatCurrency(e.target.value);
        setTotalPayments(formattedValue);
    };

    // Function to get raw numeric value without formatting
    const getRawValue = (value) => {
        return value.replace(/[^0-9]/g, "");
    };

    // Function to handle submission
    const handleSubmit = () => {
        // Store the raw value for backend or further processing
        const rawValue = getRawValue(totalPayments);
        updateSurveyData("total_monthly_payments", rawValue);
        console.log("Total Monthly Payments (Raw): ", rawValue);

        // Navigate to the next page
        router.push("/survey/gross-annual-income");
    };

    return (
        <MotionContainer>
            <h2 className="heading">
            {t("What are the total monthly payments?")}
            </h2>
            <div className="element-container">
                <input
                    type="text"
                    value={totalPayments}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="$"
                    required
                />
            </div>
            <div className="element-container">
                <button
                    onClick={handleSubmit}
                    className="button"
                    disabled={!totalPayments} // Disable the button if input is empty
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
