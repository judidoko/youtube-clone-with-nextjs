import VidoeIdNav from "@/components/VideoIdNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VidoeIdNav />
      {children}
    </>
  );
}
