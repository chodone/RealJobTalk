import UnderNav from "@/components/UnderNav";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    company: string;
    enterpriseId: number;
  };
}) {
  return (
    <>
      <UnderNav params={params} />

      <div className="flex-grow"></div>

      <hr />
      <div>{children}</div>
    </>
  );
}
