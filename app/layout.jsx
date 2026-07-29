export const metadata = {
  title: "Turnexa",
  description: "Software de reservas para tu negocio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
