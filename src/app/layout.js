import "./globals.css";

export const metadata = {
  title: "Do Zero ao Next - O melhor curso de programação",
  description:
    "Aprenda desde os conceitos básicos da programação até conceitos avançados do next.js para se tornar um mestre do desenvolvimento web!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
