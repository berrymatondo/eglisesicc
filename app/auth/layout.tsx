import PageLayout from "@/components/page-layout";

export default function RLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <PageLayout
        
      >
        {children}
      </PageLayout>
   
  );
}

