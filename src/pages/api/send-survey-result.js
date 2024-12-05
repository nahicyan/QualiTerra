import nodemailer from "nodemailer";
import puppeteer from "puppeteer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { surveyData } = req.body;

    // Function to format the property price with dollar sign and commas
    const formatCurrency = (value) => {
        if (!value) return "";
        return `$${parseInt(value, 10).toLocaleString()}`;
    };

    // Format property price for the subject line
    const formattedPropertyPrice = formatCurrency(surveyData.property_price);
    const rawPropertyPrice = surveyData.property_price; // Raw property price value for PDF name
    const firstName = surveyData.first_name || "Applicant";
    const lastName = surveyData.last_name || "";

    // Set the subject line based on disqualification flag
    const disqualificationFlag = surveyData.disqualificationFlag;
    const qualificationStatus = disqualificationFlag ? "Failed" : "Passed";

    const subjectLine = `Landers-Investment: ${firstName} ${lastName} ${qualificationStatus} Pre-Qualification for ${formattedPropertyPrice}`;

    // Create a transporter object using SMTP settings
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465, // true for port 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // SMTP username
            pass: process.env.SMTP_PASS, // SMTP password
        },
    });

    // HTML content for the email body and PDF
    const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="text-align: center; color: #333;">Landers Investment Seller Finance Qualification</h2>
                <p>Hi,</p>
                <p>A New Seller Finance Qualification has been submitted by ${surveyData.first_name} ${surveyData.last_name} for ${formattedPropertyPrice}. Below are the details</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Field</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Language</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.language}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Property Price</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${formattedPropertyPrice}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Land Usage</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.home_usage}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Real Estate Agent</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.real_estate_agent}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Land Purchase Timing</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.home_purchase_timing}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Current Home Ownership</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.current_home_ownership}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Current on All Payments</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.current_on_all_payments}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Down Payment</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.down_payment}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Employment Status</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.employment_status}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Verify Income</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.verify_income}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Income History</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.income_history}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Open Credit Lines</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.open_credit_lines}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Total Monthly Payments</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">$${surveyData.total_monthly_payments}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Gross Annual Income</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.gross_annual_income}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Foreclosure or Forbearance</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.foreclosure_forbearance}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Declared Bankruptcy</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.declared_bankruptcy}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Current Credit Score</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.current_credit_score}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Liens or Judgments</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.liens_or_judgments}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">First Name</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.first_name}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Last Name</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.last_name}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Email</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.email}</td>
                        </tr>
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">Phone</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${surveyData.phone}</td>
                        </tr>
                    </tbody>
                </table>
                <p>Regards,</p>
                <p>Your Server Admin</p>
            </div>
    `;

    // Function to generate a PDF buffer from HTML using Puppeteer
    const generatePDFBuffer = async (html) => {
        const browser = await puppeteer.launch({
            headless: true, // Ensure headless mode for server environments
            args: [
                "--no-sandbox", // These arguments help bypass restrictions when running in certain environments
                "--disable-setuid-sandbox"
            ]
        });
    
        const page = await browser.newPage();
    
        // Set the HTML content
        await page.setContent(html);
    
        // Generate PDF from the page content
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
    
        await browser.close();
        return pdfBuffer;
    };

    try {
        // Generate PDF buffer using Puppeteer
        const pdfBuffer = await generatePDFBuffer(htmlContent);

        // Compose the email content
        const mailOptions = {
            from: process.env.SMTP_FROM, // sender address
            to: process.env.SMTP_TO, // list of receivers
            subject: subjectLine,
            html: htmlContent, // Email HTML body
            attachments: [
                {
                    filename: `LandersInvestment_${firstName}_${lastName}_${qualificationStatus}_For_${rawPropertyPrice}_Seller_Finance.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                },
            ],
        };

        // Send email using the transporter
        await transporter.sendMail(mailOptions);
        console.log("Survey data sent successfully via email.");
        res.status(200).json({ message: "Survey data sent successfully via email." });
    } catch (error) {
        console.error("Failed to send survey data via email:", error);
        res.status(500).json({ message: "Failed to send survey data. Please try again.", errorDetails: error.message });
    }
}
