import '@ant-design/v5-patch-for-react-19'
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from '../components/ThemeToggle'
import { Providers } from '@/app/providers'

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Task Form",
  description: "Task Form",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          <ThemeToggle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
