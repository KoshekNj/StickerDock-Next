/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Header from "components/Header/header";
import React from "react";

import Select from "react-select";
import Masonry from "@mui/lab/Masonry";
import { queryTypes, useQueryStates } from "next-usequerystate";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetPublishedItemsByUserId } from "services/getPublishedItemsByUserId";
import { useGetUserById } from "services/getUserById";
import { deleteFollow } from "services/deleteFollow";
import { createFollow } from "services/createFollow";
import { useGetFollowers } from "services/getFollowerById";

const Gallery = () => {
  const router = useRouter();
  const { id } = router.query;
  const page = "My profile";
  let userId: string | null = null;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("id");
  }
  const { data: follower, refetch } = useGetFollowers(
    Number(userId),
    Number(id),
    {
      enabled: Boolean(id),
    }
  );
  const { data: postValue } = useGetPublishedItemsByUserId(Number(id));
  const { data: user, isLoading } = useGetUserById(Number(id));

  return (
    <div className=" bg-cover bg-fixed bg-background font-kameron pb-10 h-screen">
      <div className="h-[18vh] md:h-[20vh] lg:h-[40vh] w-full  absolute bg-gradient-to-b from-myYellow"></div>
      <Header page={page}></Header>
      <div className="flex flex-col ml-6 lg:mx-20 relative z-30">
        <div className="mt-8 mb-8 justify-center md:justify-start md:pl-[50%] lg:pl-[57%] text-stone-700  flex items-center hover:text-black">
          <Link
            className="hover:text-black  text-stone-700"
            href={`/profile/${Number(userId)}`}
          >
            My Collection
          </Link>
          <p className="mx-2">/</p>
          <p className=" font-bold underline">Gallery</p>
        </div>
        <div className="flex justify-between mt-10">
          <div className="w-[27%] hidden md:block">
            <div className="bg-yellow-100  min-h-[190px] mb-5">
              <div className="bg-yellow-200 h-[20px]"></div>
              <div className="flex p-3">
                <img
                  className="rounded-full w-[40px] h-[40px] mr-4"
                  src={"/images/kermit.png"}
                ></img>
                <div>
                  <p className="font-bold text-md">{user?.username}</p>
                  <p>{user?.description}</p>
                </div>
              </div>
            </div>
            {Number(userId) === Number(id) ? (
              <div className="text-red-800 text-sm">
                <Link
                  className="block hover:underline"
                  href={`/profile/${router.query.id}/settings`}
                >
                  Settings
                </Link>
                <Link
                  className="block hover:underline"
                  href={`/login`}
                  onClick={() => localStorage.clear()}
                >
                  Log off
                </Link>
              </div>
            ) : follower ? (
              <button
                onClick={() =>
                  deleteFollow({
                    userId: Number(userId),
                    followerId: Number(id),
                  }).then(() => refetch())
                }
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() =>
                  createFollow({
                    userId: Number(userId),
                    followerId: Number(id),
                  }).then(() => refetch())
                }
              >
                Follow
              </button>
            )}
          </div>
          <div className="flex flex-wrap w-2/3 gap-4">
            {postValue?.map((value: any) => (
              <div
                key={value.id}
                className="lg:hover:bg-yellow-50 p-3 max-w-[200px]"
              >
                <img
                  className="shadow"
                  src={value?.image?.imageUrl}
                  onClick={() => {
                    router.push(`/item/${value.id}`);
                  }}
                ></img>
                <div className="mt-4  flex justify-between m-0">
                  <p>{value.id}</p>
                  <button className="px-2  py-0.5 rounded-lg text-sm flex flex-nowrap bg-yellow-100">
                    ☆ {value.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
