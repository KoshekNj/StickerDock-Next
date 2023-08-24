/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Header from "components/Header/header";
import Masonry from "@mui/lab/Masonry";
import React from "react";
import { useRouter } from "next/router";
import { usegetPublishedItemTrending } from "services/getPublishedItemTrending";
import { useGetPublishedItemFollow } from "services/getPublishedItemFollow";

const Trending = () => {
  const router = useRouter();
  let id = 1;
  const page = "Feed";

  type tabName = "Trending" | "Following";

  const tabs: tabName[] = ["Trending", "Following"];
  const [selectedTab, setSelectedTab] = React.useState<tabName>("Trending");

  const { data: trendingData, isLoading } = usegetPublishedItemTrending();
  const { data: followingData } = useGetPublishedItemFollow(Number(id));
  const testValues = [
    [
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
    ],
    [
      {
        image: "//picsum.photos/200/200",
        id: "1",
      },
      {
        image: "//picsum.photos/160/450",
        id: "2",
      },
      {
        image: "//picsum.photos/300/700",
        link: "4",
      },
      {
        image: "//picsum.photos/450/450",
        link: "3",
      },
    ],
  ];

  return (
    <div className=" bg-cover bg-fixed bg-background font-kameron pb-10">
      <div className="h-[40vh] w-full  absolute bg-gradient-to-b from-myYellow"></div>
      <Header page={page}></Header>
      {}
      <div className="flex flex-col items-center z-20 relative">
        <div className="mt-8 text-stone-700  flex  items-center hover:text-black">
          {tabs.map((tab) =>
            tab == selectedTab ? (
              <>
                <p className="font-bold underline mx-4">{tab}</p>
                {tab === tabs[tabs.length - 1] ? <></> : <p>/</p>}
              </>
            ) : (
              <>
                <p
                  className="mx-4 cursor-pointer"
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </p>
                {tab === tabs[tabs.length - 1] ? <></> : <p>/</p>}
              </>
            )
          )}
        </div>
        {selectedTab === "Trending" && (
          <div className="mt-16 w-[60%]">
            <Masonry columns={3} spacing={5}>
              {testValues[0].map((value) => (
                <img
                  key={trendingData?.id}
                  className="shadow"
                  src={trendingData?.imageUrl}
                  onClick={() => {
                    router.push(`/item/${value.id}`);
                  }}
                ></img>
              ))}
            </Masonry>
          </div>
        )}

        {selectedTab === "Following" && (
          <div className="mt-16 w-[60%]">
            <Masonry columns={3} spacing={5}>
              {testValues[1].map((value) => (
                <img
                  key={followingData?.id}
                  className="shadow"
                  src={followingData?.imageUrl}
                  onClick={() => {
                    router.push(`/item/${value.id}`);
                  }}
                ></img>
              ))}
            </Masonry>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
