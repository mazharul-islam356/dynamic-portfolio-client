import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:['100', '200', '300', '400', '500', '600', '700']
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dynamic Portfolio",
  description: "A dynamic portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} antialiased`}
      >
    <ToastContainer></ToastContainer>

        {children}
      </body>
    </html>
  );
}
