import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JUST DO IT. | Nike-Inspired Campaign",
  description: "Bold. Minimal. Powerful. Emotional. Performance-driven. An elite cinematic digital experience.",
  keywords: ["Nike", "Just Do It", "Athletic", "Sports", "Performance", "Cinematic"],
  authors: [{ name: "Elite Design" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "JUST DO IT. | Elite Campaign",
    description: "Bold. Minimal. Powerful. Emotional. Performance-driven.",
    url: "https://chat.z.ai",
    siteName: "Elite Campaign",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JUST DO IT. | Elite Campaign",
    description: "Bold. Minimal. Powerful. Emotional. Performance-driven.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeToggle />
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
