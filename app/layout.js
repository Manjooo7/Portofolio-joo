import { Press_Start_2P, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BGMPlayer from "./components/BGMPlayer";

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Salman AlFarisi | Front-End Web Developer",
  description:
    "Portofolio web personal Salman AlFarisi — Front-End Web Developer yang passionate dalam membangun antarmuka web yang indah, responsif, dan user-friendly.",
  keywords: [
    "Salman AlFarisi",
    "Front-End Developer",
    "Web Developer",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Salman AlFarisi" }],
  openGraph: {
    title: "Salman AlFarisi | Front-End Web Developer",
    description:
      "Crafting pixel-perfect interfaces, one block at a time.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${pressStart2P.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <BGMPlayer />
      </body>
    </html>
  );
}
