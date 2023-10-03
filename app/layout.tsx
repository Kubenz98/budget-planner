import { RQProvider } from "./providers/QueryClinetProvider";
import { EmotionProvider } from "./providers/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <RQProvider>
            <EmotionProvider>{children}</EmotionProvider>
          </RQProvider>
        </main>
      </body>
    </html>
  );
}
