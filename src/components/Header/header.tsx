/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import Link from "next/link";
interface IHeaderProps {
  page: string;
}

const Header = ({ page }: IHeaderProps) => {
  const links = [
    {
      label: "Editor",
      link: `/`,
    },
    {
      label: "Feed",
      link: `/feed/`,
    },
    {
      label: "My profile",
      link: `/profile/1`,
    },
  ];
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-b relative z-1 from-myYellow px-10 pt-5 font-kameron justify-between">
      <div className="flex justify-center align-center">
        <Link href="/">
          <img
            className="w-[240px] h-[52px] md:w-[270px] md:h-[61px]"
            src={"/images/StickerTitle.png"}
            alt="title"
          ></img>
        </Link>
        <h1 className="text-stone-700 text-2xl leading-[60px] ml-7">DOCK</h1>
      </div>
      <div className="flex mt-5 md:mt-0 md:w-1/3 justify-evenly flex-grow items-center">
        {links.map((link, i) =>
          link.label === page ? (
            <div key={link.label}>
              <Link
                key={link.label}
                className=" text-stone-700 font-bold underline "
                href={link.link}
              >
                {link.label}
              </Link>
            </div>
          ) : (
            <Link
              key={link.label}
              className=" hover:text-black  text-stone-700 "
              href={link.link}
            >
              {link.label}
            </Link>
          )
        )}
      </div>
      {/* <img
        className="w-[27px] h-[27px] self-center"
        src={HelpIcon}
        alt="Help Icon"
      ></img> */}
    </div>
  );
};

export default Header;
