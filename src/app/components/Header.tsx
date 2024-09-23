"use client";
import Image from "next/image";
import aikoLogo from "/public/aiko.png";

export default function Header() {
  return (
    <header className="bg-white text-[#003184] ">
      <nav
        aria-label="Global"
        className="flex mx-auto items-center justify-between px-8"
      >
        <div className="flex lg:flex-1 items-center justify-between">
          <a href="#">
            <Image src={aikoLogo} alt="AIKO logo" className="h-9 w-auto my-4" />
          </a>
          <h2 className="mx-4">Acompanhamento de maquinário pesado</h2>
        </div>
      </nav>
      <hr className="h-[2px] bg-[#003184]" />
    </header>
  );
}
