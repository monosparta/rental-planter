const ShowPlant = (props) => {
  const plantIMG = `${process.env.REACT_APP_BACKEND_HOST || ""}/${
    props.data.plant.imgPath
  }`;
  return (
    <div className="flex justify-center mx-auto">
      <div className="rounded-2xl border border-[#E5E7EB] flex flex-col justify-start h-full items-center gap-6 p-8">
        <img
          src={plantIMG}
          className="h-[240px] w-[240px] object-cover rounded-lg"
          alt="plant"
        ></img>
        <div className="font-semibold desktop:text-[24px] text-[16px]">
          {props.data.plant.name}
        </div>
        <div className="text-[#6B7280] desktop:text-[18px] text-[14px]">
          {props.data.plant.nickname}
        </div>
        <div className="text-left desktop:text-[16px] text-[14px] flex-[1_0_auto] whitespace-pre-line">
          {props.data.plant.intro}
        </div>
      </div>
    </div>
  );
};

export default ShowPlant;
