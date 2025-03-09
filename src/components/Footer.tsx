"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="w-full px-10 lg:w-[50%] md:w-[75%] mx-auto py-16">
      <div className="mx-auto md:gap-16 gap-4 flex md:flex-row flex-col items-center justify-content">
        <div className="w-3/12 mt-0 flex items-center justify-center ">
          <p className="text-sm min-w-max">© Designed by Sukh</p>
        </div>
        <div className=" w-full flex flex-row gap-3 items-center md:justify-end justify-center">
          <Link
            href="#"
            target="_blank"
            className="hover:cursor-pointer bg-secondary p-1.5 rounded-lg hover:-translate-y-2 duration-500">
            <FaLinkedin size={25} />
          </Link>
          <Link
            href="https://github.com/Bangerr"
            target="_blank"
            className="hover:cursor-pointer bg-secondary p-1.5 rounded-lg hover:-translate-y-2 duration-500">
            <FaGithub size={25} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
