"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiInternetcomputer } from "react-icons/si";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Projects", link: "/projects/list" },
    { label: "Admin Panel", link: "/admin" },
  ];

  return (
    <nav className="flex space-x-5 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <SiInternetcomputer />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.link}>
            <Link
              className={classNames({
                "text-zinc-900": link.link === currentPath,
                "text-zinc-500": link.link !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.link}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="api/auth/signout">Sign Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
