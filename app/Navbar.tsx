"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SiInternetcomputer } from "react-icons/si";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <SiInternetcomputer />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Projects", link: "/projects/list" },
    { label: "Admin Panel", link: "/admin" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.link}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.link === currentPath,
            })}
            href={link.link}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    () => (
      <Link className="nav-link" href="api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="api/auth/signout">Sign Out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default Navbar;
