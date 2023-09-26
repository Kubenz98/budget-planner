import { RQProvider } from "./providers/QueryClinetProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <RQProvider>{children}</RQProvider>
        </main>
      </body>
    </html>
  );
}
