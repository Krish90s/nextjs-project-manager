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
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Projects", link: "/projects/list" },
    { label: "Admin Panel", link: "/admin" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>
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
            {status === "unauthenticated" && (
              <Link href="api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
