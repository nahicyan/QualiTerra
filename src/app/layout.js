import localFont from "next/font/local";
import "./globals.css";
import { SurveyProvider } from "./context/SurveyContext";
import { TranslationProvider } from "./context/TranslationContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Seller Finance Qualification",
  description: "Qualify to get your dream land today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationProvider>
          <SurveyProvider>
            {children}
          </SurveyProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
