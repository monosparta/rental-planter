import emailIcon from "../../assets/img3.png";

const WaitLine = (props) => {
  return (
      <div className="flex w-full rounded-[48px] hover:bg-white px-8 py-4">
          {/* 資訊 */}
          <div className="flex flex-col justify-center gap-1 grow">
              <label className="font-semibold desktop:text-left tablet:text-left text-center text-xl">{props.data.name}</label>
              <label className="desktop:block tablet:block hidden text-2xl">{props.data.email}</label>
          </div>
          <button
              className="flex items-center justify-center"
              onClick={() =>
                  window.open(`mailto:${props.data.email}`, "_blank")
              }
          >
              <img src={emailIcon} alt="email"></img>
          </button>
      </div>
  );
};

export { WaitLine };
