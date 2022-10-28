import emailIcon from "../../assets/img3.png";

const WaitEmpty = (props) => {
  return (
      <div className={`w-full rounded-[48px] hover:bg-white px-8 py-4 ${props.display}`}>
          {/* 資訊 */}
          <div className="flex flex-col justify-center gap-1 grow">
              <label className="flex desktop:justify-start tablet:justify-start justify-center">
                  <div className="desktop:h-3.5 h-2 bg-gray-300 rounded-full desktop:w-2/5 tablet:w-2/5 w-4/5"></div>
              </label>
              <label className="desktop:block tablet:block hidden">
                  <div className="desktop:h-4 h-3 bg-gray-200 rounded-full w-3/5"></div>
              </label>
          </div>
          <button className="flex items-center justify-center">
              <img src={emailIcon} alt="email"></img>
          </button>
      </div>
  );
};

export { WaitEmpty };
