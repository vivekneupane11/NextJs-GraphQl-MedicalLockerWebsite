import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const StickyHeader: NextPage = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) setScrolled(true);
    else setScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section>
      <nav
        className={`sticky top-0 ${
          scrolled && "shadow-md"
        } flex justify-between py-5 px-10`}
      >
        <Image
          className="w-40"
          src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/monday-logo-x2.png"
        />
        <button className=" flex justify-evenly items-center rounded-full bg-indigo-500 text-gray-100 px-5 py-2 font-light text-sm border-none">
          Get Started <AiOutlineArrowRight size={20} className="pl-1" />
        </button>
      </nav>
    </section>
  );
};

export default StickyHeader;
