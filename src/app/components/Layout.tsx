"use client";
import Head from "next/head";
import { usePathname } from "next/navigation";

interface IProps {
  children: any;
  title: string;
}

export default function Layout({ children, title }: IProps) {
  const pathname = usePathname();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className={`w-full ${pathname === "/login" ? "" : "p-4"}`}>
        {children}
      </section>
    </>
  );
}
