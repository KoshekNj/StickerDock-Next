export interface IPackProps {
  title: string;
  author: string;
  tags: Array<string>;
}

const StickerPack = ({ title, author, tags }: IPackProps) => {
  return (
    <div className="relative w-[60%] font-kameron">
      <div className=" h-[395px] w-[165px] flex flex-col relative z-30 bg-orange-100 drop-shadow ">
        <div className="h-[18%] drop-shadow bg-slate-300 flex flex-col justify-center items-center">
          <p className="w-fit text-sm bold">{title}</p>
          <p className="w-fit text-sm">created by: {author}</p>
        </div>
        <div className=""></div>
      </div>
      <div className="h-[395px] w-[165px] bg-orange-100 drop-shadow z-20 m-1 absolute left-0 top-0 flex flex-col">
        <div className="h-[18%] drop-shadow bg-slate-300"></div>
      </div>
      <div className="h-[395px] w-[165px] bg-orange-100 drop-shadow z-10 m-1 absolute left-1 top-1 flex flex-col">
        <div className="h-[18%] drop-shadow bg-slate-300"></div>
      </div>
      <div className="mt-2 min-w-[165px] flex flex-wrap">
        {tags.map((tag) => (
          <p className="text-xs w-fit" key={tag}>
            #{tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default StickerPack;
