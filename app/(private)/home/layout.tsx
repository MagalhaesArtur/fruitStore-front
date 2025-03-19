"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full overflow-x-hidden max-h-screen p-2">{children}</div>
  );
}
