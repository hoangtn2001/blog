import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "../context/ThemeContext";
import ThemeProvider from "../providers/ThemeProvider";
import AuthProvider from "../providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
