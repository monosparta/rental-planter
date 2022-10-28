const RentedCard = (props) => {
  return (
      <div
          className={`rounded-[48px] h-[120px] w-[240px] flex items-center justify-center gap-6 p-2 bg-[${props.data.bgColor}] shadow-lg`}
      >
          <img
              className="h-[88px] w-[88px] object-cover"
              src={props.data.img}
              alt="card icon"
          ></img>
          <div className="text-white flex flex-col justify-center items-center px-2">
              <span className="text-[24px]">{props.data.state}</span>
              <span className="text-[64px] leading-none">
                  {props.data.amount}
              </span>
          </div>
      </div>
  );
}

export { RentedCard };
