"use client";

import Link from "next/link";
import { Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type HeaderProps = {
  user: any;
};
export function HeaderClient({ user }: HeaderProps) {
  const [open, setOpen] = useState(false);
  //  const [user, setUser] = useState<any | undefined>(undefined);
  const router = useRouter();

  const navigationLinks = [
    { href: "/continents", label: "Continents" },
    { href: "/groupes", label: "Groupes" },
  ];

  /*   useEffect(() => {
    const fetchSession = async () => {
      const sessionUser = await authClient.getSession(); // ✅ direct server action
      setUser(sessionUser?.data?.user);
      //console.log("user in header:", sessionUser?.data?.user);
    };

    fetchSession();
  }, []); */

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg"
        >
          {/*           <Image
            src={"/LOGO-GRIS.png"}
            alt="logo ICC"
            width={8}
            height={8}
            className="object-cover w-full h-full"
          /> */}
          <span className="hidden sm:inline-block">Eglises ICC</span>
          <span className="sm:hidden">Eglises ICC</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 text-lg font-medium transition-colors hover:text-primary py-2"
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  className="px-4 py-2 text-lg font-medium"
                  href="/auth/signup"
                  onClick={() => setOpen(false)}
                >
                  S'enregistrer
                </Link>
              )}

              {!user && (
                <Link
                  className="px-4 py-2 text-lg font-medium"
                  href="/auth/signin"
                  onClick={() => setOpen(false)}
                >
                  Se Connecter
                </Link>
              )}

              {user && (
                <div
                  className="px-4 py-2 text-lg font-medium text-red-600 hover:cursor-pointer"
                  onClick={async () => {
                    setOpen(false);
                    await authClient.signOut();
                    router.replace("/");
                    router.refresh();
                    // window.location.href = "/";
                    /*                     await authClient.signOut({
                      // redirect yourself after a successful logout:
                      fetchOptions: {
                        onSuccess: () => router.replace("/"),
                      },
                    }); */
                  }}
                >
                  Se Déconnecter
                </div>
              )}
              {/*               <Button
                onClick={() => {
                  setOpen(false);
                  router.push("/auth/signup");
                }}
              >
                Sign up
              </Button> */}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
