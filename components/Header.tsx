"use client";

import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn(className, "header")}>
      <Link href={"/"}>
        <Image
          src={"/assets/icons/logo.svg"}
          alt="logo"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image
          src={"/assets/icons/logo-icon.svg"}
          alt="logo"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>

      {children}

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-2 lg:gap-4">
          Notifications
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default Header;
