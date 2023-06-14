/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Header from "components/Header/header";
import StickerPack, { IPackProps } from "components/StickerPack/stickerPack";
import React from "react";
import stickers from "../../../../public/stickers/index";
import Select from "react-select";
import { queryTypes, useQueryStates } from "next-usequerystate";
import Link from "next/link";

const Profile = () => {
  const page = "My profile";
  const Stickers = stickers;
  const packValues: IPackProps[] = [
    {
      title: "Unknown sticker pack",
      author: "User",
      tags: ["gdfg"],
      stickers: Stickers,
    },
    {
      title: "Cute Smiley Pack",
      author: "User",
      tags: ["smiley", "rainbow", "clouds", "sun", "rain"],
      stickers: Stickers,
    },
    {
      title: "Fantasy Pack",
      author: "User",
      tags: ["fantasy", "unicorn", "castle", "rainbow"],
      stickers: Stickers,
    },
  ];

  const testValues = [
    {
      image: "//picsum.photos/200/200",
      id: "1",
    },
    {
      image: "//picsum.photos/160/450",
      id: "2",
    },
    {
      image: "//picsum.photos/450/450",
      link: "3",
    },
    {
      image: "//picsum.photos/300/700",
      link: "4",
    },
  ];

  let [searchParams, setSearchParams] = useQueryStates({
    q: queryTypes.string,
    categories: queryTypes.string,
  });
  const q = searchParams.q;
  const category = searchParams.categories;
  const [categoryChoice, setCategoryChoice] = React.useState(category || null);
  const [searchTerm, setSearchTerm] = React.useState(q || "");

  const categoriesOptions: any = [
    { value: "Date made", label: "Date made DESC" },
    { value: "Date made ASC", label: "Date made ASC" },
    { value: "Pack name A-Z", label: "Pack name A-Z" },
    { value: "Pack name Z-A", label: "Pack name Z-A" },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchParams({ ...searchParams, q: searchTerm });
    } else {
      setSearchParams({ ...searchParams, q: null });
    }
  };

  const handleCategoryChange = (e: any) => {
    setCategoryChoice(e.label);

    if (e.label && e.label !== "none") {
      setSearchParams({ ...searchParams, categories: e.value });
    } else {
      setSearchParams({ ...searchParams, categories: null });
    }
  };

  return (
    <div className=" bg-cover bg-fixed bg-background font-kameron pb-10">
      <div className="h-[40vh] w-full  absolute bg-gradient-to-b from-myYellow"></div>
      <Header page={page}></Header>
      <div className="flex flex-col mx-20 relative z-30">
        <div className="mt-8 mb-8 pl-[57%] text-stone-700  flex items-center hover:text-black">
          <p className="font-bold underline">My Collection</p>
          <p className="mx-2">/</p>
          <Link
            className=" hover:text-black  text-stone-700"
            href="/profile/1/gallery"
          >
            Gallery
          </Link>
        </div>
        <div className="flex justify-between mt-10">
          <div className="w-[27%]">
            <div className="bg-yellow-100  min-h-[190px] mb-5">
              <div className="bg-yellow-200 h-[20px]"></div>
              <div className="flex p-3">
                <img
                  className="rounded-full w-[40px] h-[40px] mr-4"
                  src="/images/kermit.png"
                ></img>
                <div>
                  <p className="font-bold text-md">Username</p>
                  <p>128 characters description</p>
                </div>
              </div>
            </div>
            <div className="text-red-800 text-sm">
              <p className="mb-2">Edit profile</p>
              <p>Settings</p>
            </div>
          </div>
          <div className="flex flex-col items-center w-2/3">
            <div className="w-100% flex justify-center">
              <form
                method="get"
                className="md:w-[300px] bg-white border-myYellow mr-9 rounded-md border-2  flex justify-between"
                onSubmit={handleSubmit}
              >
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name="q"
                  className="md:w-[300px] px-3 rounded-md flex-1 text-sm placeholder-gray-500"
                  placeholder="Search by pack name, tags..."
                ></input>
                {searchTerm ? (
                  <button
                    type="button"
                    className="rounded-md"
                    onClick={() => setSearchTerm("")}
                  >
                    <img
                      className="w-3.5 h-3.5 m-2 opacity-25"
                      src="images/Close_round.png"
                    ></img>
                  </button>
                ) : null}
                <button className="rounded-r-md ">
                  <img
                    className="w-4 h-4 m-2 "
                    src="/images/Search_alt.png"
                  ></img>
                </button>
              </form>

              <form
                method="get"
                className="border-myYellow mr-9 rounded-md border-2 flex z-50"
                name="category"
              >
                <Select
                  className="text-sm min-w-[150px] placeholder-gray-500"
                  value={categoriesOptions.find(
                    (option: any) => option.value === categoryChoice
                  )}
                  placeholder={!categoryChoice ? "Category" : categoryChoice}
                  options={categoriesOptions}
                  onChange={handleCategoryChange}
                />
              </form>
            </div>

            <div className="mt-16 w-full flex">
              {packValues.map((value) => (
                <StickerPack
                  key={value.title}
                  title={value.title}
                  author={value.author}
                  tags={value.tags}
                  stickers={value.stickers}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
