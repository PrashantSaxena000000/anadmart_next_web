import "./globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Providers from "./components/redux/providers";

export const metadata = {
  title: "Anadmart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers children={children}></Providers>
      </body>
    </html>
  );
}
