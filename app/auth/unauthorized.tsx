import PageLayout from "@/components/page-layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import React from "react";

const UnauthoriedPage = () => {
  return (
    <PageLayout>
      <Alert>
        <AlertTitle>You need to be logged to see this page</AlertTitle>
      </Alert>
    </PageLayout>
  );
};

export default UnauthoriedPage;
