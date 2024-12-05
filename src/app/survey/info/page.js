'use client';

import { useRouter } from "next/navigation";
import { useSurvey } from "@/app/context/SurveyContext";
import { useState } from "react";
import MotionContainer from "@/components/MotionContainer"; // Import reusable MotionContainer component
import { useTranslation } from "react-i18next"; // Importing The Translation Module

export default function TotalMonthlyPaymentsPage() {
    const router = useRouter();
    const { t } = useTranslation(); // Hook to translate strings based on language
    const { updateSurveyData } = useSurvey();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    });

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = () => {
        const { first_name, last_name, email, phone } = formData;

        // Check if all fields are filled
        if (!first_name || !last_name || !email || !phone) {
            alert("Please fill in all fields.");
            return;
        }

        // Update the survey context with all collected data
        updateSurveyData("first_name", first_name);
        updateSurveyData("last_name", last_name);
        updateSurveyData("email", email);
        updateSurveyData("phone", phone);

        console.log("Collected Personal Information: ", formData);

        // Redirect to the next page, e.g., survey-finish page
        router.push("/survey/survey-finish");
    };

    return (
        <MotionContainer>
            <h2 className="heading">{t("Give us a way to reach you")}</h2>
            <div className="element-container">
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={t("First Name")}
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={t("Last Name")}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={t("Email Address")}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={t("Phone Number")}
                    required
                />
            </div>
            <div className="element-container">
                <button
                    onClick={handleSubmit}
                    className="button"
                >
                    {t("Submit Application")}
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
