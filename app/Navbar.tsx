import Link from "next/link";
import React from "react";
import { SiInternetcomputer } from "react-icons/si";

const Navbar = () => {
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
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
