// app/layout.tsx
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Inter (chính)
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

// Instrument Sans (phụ, dùng riêng)
const instrument = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-instrument",
    display: "swap",
});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body
                className={`${inter.className} ${instrument.variable} font-sans antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
