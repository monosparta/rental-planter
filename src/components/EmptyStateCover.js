import lamu from "../assets/img1.png";
import { Loading } from "./Loading";

const EmptyStateCover = (props) => (
  <div className="absolute m-0 left-0 top-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-10">
    {props.loading ? (
      <Loading />
    ) : (
      <div className="flex flex-col justify-center items-center gap-6">
        <img src={lamu} alt="" />
        <h1 className="font-semibold desktop:text-[36px] tablet:text-[24px] text-[20px] tracking-widest">
          {props.title}
        </h1>
        <div className="text-[#6B7280] desktop:text-[20px] tablet:text-[16px] text-[14px]">
          {props.subtitle}
        </div>
      </div>
    )}
  </div>
);

export { EmptyStateCover };