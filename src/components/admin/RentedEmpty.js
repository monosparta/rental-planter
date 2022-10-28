import emailIcon from "../../assets/img3.png";
import humidIMG from "../../assets/humid.png";
import lightIMG from "../../assets/light.png";
import deleteIMG from "../../assets/deleteIcon.png";

const RentedEmpty = (props) => {
  return (
      <div
          className={`border border-[#D7D7D7] bg-white shadow-lg rounded-3xl flex flex-col desktop:gap-4 tablet:gap-4 gap-2 relative desktop:px-8 tablet:px-8 px-4 py-4 ${props.display}`}
      >
          <div className="flex gap-4">
              <div className="flex justify-center items-center desktop:w-20 desktop:h-20 tablet:w-[72px] tablet:h-[72px] w-16 h-16 rounded-full flex-none bg-gray-300 ">
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
              <div className="flex flex-col items-start justify-center flex-auto gap-1">
                  <label className="desktop:text-[24px] tablet:text-[24px] text-[16px] w-full truncate">
                      <div className="desktop:h-4 h-3  bg-gray-300 rounded-full w-3/5"></div>
                  </label>
                  <label className="desktop:text-[20px] tablet:text-[20px] text-[14px] w-full truncate">
                      <div className="desktop:h-3.5 h-2 bg-gray-300 rounded-full w-2/5"></div>
                  </label>
              </div>
              <div className="inline-flex justify-center items-center bg-transparent flex-none">
                  <button className="">
                      <img
                          src={emailIcon}
                          className="w-6 h-6"
                          alt="email"
                      ></img>
                  </button>
              </div>
              <div className="inline-flex justify-center items-center bg-transparent flex-none">
                  <button className="inline-flex justify-center items-center bg-transparent flex-none hover:bg-gray-300 rounded-full">
                      <img
                          src={deleteIMG}
                          className="h-6 w-6"
                          alt="delete"
                      ></img>
                  </button>
              </div>
          </div>
          <div className="flex px-2 justify-center">
              <div className="flex flex-none">
                  <img
                      src={humidIMG}
                      className="h-[28px] w-[28px] mr-1"
                      alt="humid"
                  ></img>
                  <label className="desktop:text-[20px] tablet:text-[20px] text-[16px]">
                      --.--%
                  </label>
              </div>
              <div className="flex flex-none">
                  <img
                      src={lightIMG}
                      className="h-[28px] w-[28px] mr-1"
                      alt="light"
                  ></img>
                  <label className="desktop:text-[20px] tablet:text-[20px] text-[16px]">
                      --- lx
                  </label>
              </div>
          </div>
      </div>
  );
};

export { RentedEmpty };
