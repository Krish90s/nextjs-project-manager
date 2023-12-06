"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiInternetcomputer } from "react-icons/si";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Projects", link: "/projects" },
    { label: "Admin Panel", link: "/admin" },
  ];

  return (
    <nav className="flex space-x-5 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <SiInternetcomputer />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li>
            <Link
              key={link.link}
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
    </nav>
  );
};

export default Navbar;
