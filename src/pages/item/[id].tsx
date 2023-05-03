import Header from "../../Components/Header/header";
import StickerPack, {
  IPackProps,
} from "../../Components/StickerPack/stickerPack";
import React from "react";
import Profile from "../../Images/kermit.png";
const SingleItem = () => {
  const page = "SingleItem";
  const [comments, setComments] = React.useState([]);
  const packValues: IPackProps = {
    title: "Unknown sticker pack",
    author: "User",
    tags: ["unknown", "notMadeYet", "blank", "europskaUnija"],
  };
  return (
    <div className=" bg-cover bg-fixed bg-background font-kameron pb-10">
      <div className="h-[40vh] w-full  absolute bg-gradient-to-b from-myYellow"></div>
      <Header page={page}></Header>
      <div className="flex justify-evenly px-28 mt-16 ">
        <div className="flex max-w-[165px] p-3">
          <StickerPack
            title={packValues.title}
            author={packValues.author}
            tags={packValues.tags}
          ></StickerPack>
        </div>

        <div className="w-1/3 p-3">
          <div className="flex justify-start my-4">
            <button className="px-2  mr-3 py-0.5 rounded-lg text-sm bg-myYellow">
              Add to your collection
            </button>
            <button className="px-2 mr-3 py-0.5 rounded-lg text-sm bg-yellow-100">
              ☆ 99
            </button>
          </div>
          <div>
            <div className="flex bg-yellow-100 px-3 py-2 items-center  mb-4">
              <img
                className="rounded-full w-[40px] h-[40px] mr-4"
                src={Profile}
              ></img>
              <p>Username</p>
            </div>
            <h1 className="text-lg">Comments</h1>
            {comments.length !== 0 ? (
              comments?.map((comment) => (
                <div>
                  <p>{comment}</p>
                </div>
              ))
            ) : (
              <p className="text-lg text-slate-500">No one commented yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
