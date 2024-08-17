import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecallAI",
  description: "An AI-powered flashcard app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body style={{ maxHeight: "100vh", }} className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
