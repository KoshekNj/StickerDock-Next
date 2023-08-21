import { Sticker } from "components/Sticker/sticker";
import Link from "next/link";

const NewStickerPack = () => {
  return (
    <div className="relative w-[156px] font-kameron mr-8">
      <div className=" h-[395px] w-[165px] flex flex-col relative z-30 bg-stone-300 drop-shadow ">
        <div className="h-[18%] drop-shadow bg-slate-300 flex flex-col justify-center items-center">
          <p className="w-fit text-sm bold">Unknow new pack</p>
          <p className="w-fit text-sm">created by: You</p>
        </div>
        <div className="text-center self-center mt-20">
          <p>Want to create a new pack?</p>
          <Link
            href="/create"
            className=" hover:underline text-red-500 m-4 px-2 py-1"
          >
            Click here
          </Link>
        </div>
      </div>

      <div className="h-[395px] w-[165px] bg-stone-300 drop-shadow z-20 m-1 absolute left-0 top-0 flex flex-col">
        <div className="h-[18%] drop-shadow bg-slate-300"></div>
      </div>
      <div className="h-[395px] w-[165px] bg-stone-300 drop-shadow z-10 m-1 absolute left-1 top-1 flex flex-col">
        <div className="h-[18%] drop-shadow bg-slate-300"></div>
      </div>
    </div>
  );
};

export default NewStickerPack;
