export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-full bg-red-100">
      {children}
    </div>
  );
}
