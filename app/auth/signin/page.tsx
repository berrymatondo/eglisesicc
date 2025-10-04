import SigninForm from "@/components/form/signin-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <SigninForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {" Don't have an account? "}
          <Link
            href="/auth/signup"
            className="font-semibold text-blue-800 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SigninPage;
