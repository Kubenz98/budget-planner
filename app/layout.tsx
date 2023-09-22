import { RQProvider } from "./providers/QueryClinetProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RQProvider>{children}</RQProvider>
      </body>
    </html>
  );
}
