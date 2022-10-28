import lightImg from "../../assets/light.png";
import humid from "../../assets/humid.png";
import { Button } from "../Button";
import { EmptyStateCover } from "../EmptyStateCover";

const StateEmpty = (props) => {
  return (
    <div className="w-full desktop:gap-30 gap-4 desktop:px-20 desktop:my-20 tablet:px-10 px-16 my-10 grid desktop:grid-cols-4 tablet:grid-cols-3 grid-cols-1 relative">
      {/* States skeletons */}
      <div className="flex flex-col justify-center gap-8 desktop:p-0 tablet:p-0 px-8 col-span-1">
        <div className="flex flex-row gap-4">
          <img
            src={humid}
            className="desktop:w-[72px] desktop:h-[72px] w-12 h-12"
            alt="humid"
          ></img>
          <div className="w-full">
            <h2 className="font-bold desktop:text-[48px] tablet:text-[24px] text-[20px]">
              --.--%
            </h2>
            <h5 className="desktop:text-[20px] tablet:text-[14px] text-[12px]">
              土壤濕度
            </h5>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <img
            src={lightImg}
            className="desktop:w-[72px] desktop:h-[72px] w-12 h-12"
            alt="light"
          ></img>
          <div className="w-full">
            <h2 className="font-bold desktop:text-[48px] tablet:text-[24px] text-[20px]">
              --- lx
            </h2>
            <h5 className="desktop:text-[20px] tablet:text-[14px] text-[12px]">
              光照強度
            </h5>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center desktop:col-span-2 col-span-1">
        <div className="flex justify-center items-center desktop:w-[412px] desktop:h-[320px] tablet:w-[240px] tablet:h-[184.59px] w-[200px] h-[153.82px] rounded-[24px]  bg-gray-300 ">
          <svg
            className="w-12 h-12 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col justify-center desltop:gap-8 tablet:gap-2.5 gap-4 relative desktop:p-0 tablet:px-4 col-span-1">
        <div className="grid grid-cols-2 desktop:gap-4 gap-2">
          <div className="desktop:h-[32px] tablet:h-[20px] h-[16px] flex items-center">
            <div className="desktop:h-6 tablet:h-4 h-3.5 bg-gray-300 rounded-full w-full"></div>
          </div>
          <div className="desktop:h-[32px] tablet:h-[20px] h-[16px] flex items-center">
            <div className="desktop:h-5 tablet:h-3.5 h-2.5 bg-gray-200 rounded-full w-full"></div>
          </div>
        </div>
        <div className="h-full w-full">
          <div role="status" className="space-y-2.5">
            <div className="flex items-center space-x-2 w-full">
              <div className="desktop:h-4 h-3 bg-gray-200 rounded-full w-32"></div>
              <div className="desktop:h-4 h-3 bg-gray-300 rounded-full w-24"></div>
              <div className="desktop:h-4 h-3 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2">
              <div className="desktop:h-4 h-3 bg-gray-200 rounded-full w-full"></div>
              <div className="desktop:h-4 h-3 bg-gray-300 rounded-full w-full"></div>
              <div className="desktop:h-4 h-3 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2">
              <div className="desktop:h-4 h-3 bg-gray-300 rounded-full w-full"></div>
              <div className="desktop:h-4 h-3 bg-gray-200 rounded-full w-80"></div>
              <div className="desktop:h-4 h-3 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2">
              <div className="desktop:h-4 h-3 bg-gray-200 rounded-full w-full"></div>
              <div className="desktop:h-4 h-3 bg-gray-300 rounded-full w-full"></div>
              <div className="desktop:h-4 h-3 bg-gray-300 rounded-full w-24"></div>
            </div>
          </div>
        </div>
        <Button
          color="yellow"
          text="編輯"
          className="absolute right-0 bottom-0 "
          disabled={true}
        />
      </div>
      <EmptyStateCover
        loading={props.loading}
        title="您目前還沒有使用中的盆器"
        subtitle="現在就租借你的盆器！"
      />
    </div>
  );
};

export { StateEmpty };
