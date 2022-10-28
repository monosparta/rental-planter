import lightImg from "../../assets/light.png";
import humid from "../../assets/humid.png";
import { useState, useEffect } from "react";
import webSocket from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

const StatePlant = (props) => {
  let navigate = useNavigate();
  // websocket
  const [realtimeData, setRealtimeData] = useState({
    soilHumid: "--.--",
    light: "---",
  });
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (ws) {
      initWebSocket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  //soilHumid
  const initWebSocket = () => {
    ws.on("Plant/Data", (data) => {
      if (data.container === props.rent.container) {
        setRealtimeData(data);
      }
    });

    ws.emit("lastData", props.rent.container);
  };

  useEffect(() => {
    setWs(
      webSocket(
        process.env.REACT_APP_BACKEND_HOST || `${window.location.origin}/`,
        {
          transports: ["websocket"],
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerDisconnectHandler = () => {
    ws.on("disconnect", () => {
      console.log("Disconnected");
      ws.close();
    });
  };

  if (props.path !== `${window.location.origin}/main`) {
    registerDisconnectHandler();
  }

  const plantIMG = `${process.env.REACT_APP_BACKEND_HOST || ""}/${
    props.rent.plant.imgPath
  }`;

  return (
    <div className="w-full desktop:gap-30 gap-4 desktop:px-20 desktop:my-20 tablet:px-10 px-16 my-10 grid desktop:grid-cols-4 tablet:grid-cols-3 grid-cols-1">
      <div className="flex flex-col justify-center gap-8 desktop:p-0 tablet:p-0 px-8 col-span-1">
        <div className="flex flex-row gap-4">
          <img src={humid} className="desktop:w-[72px] desktop:h-[72px] w-12 h-12" alt="humid"></img>
          <div className="w-full">
            <h2 className="font-bold desktop:text-[48px] tablet:text-[24px] text-[20px]">
              {realtimeData.soilHumid}%
            </h2>
            <h5 className="desktop:text-[20px] tablet:text-[14px] text-[12px]">
              土壤濕度
            </h5>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <img src={lightImg} className="desktop:w-[72px] desktop:h-[72px] w-12 h-12" alt="light"></img>
          <div className="w-full">
            <h2 className="font-bold desktop:text-[48px] tablet:text-[24px] text-[20px]">
              {realtimeData.light} lx
            </h2>
            <h5 className="desktop:text-[20px] tablet:text-[14px] text-[12px]">
              光照強度
            </h5>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center desktop:col-span-2 col-span-1">
        <img
          src={plantIMG}
          className="desktop:w-[412px] desktop:h-[320px] tablet:w-[240px] tablet:h-[184.59px] w-[200px] h-[153.82px] rounded-[24px] object-cover"
          alt="plant"
        ></img>
      </div>
      <div className="flex flex-col justify-center desltop:gap-8 tablet:gap-2.5 gap-4 relative desktop:p-0 tablet:px-4 col-span-1">
        <div className="grid grid-cols-2 desktop:gap-4 gap-2">
          <div className="font-bold desktop:text-[32px] tablet:text-[20px] text-[16px] desktop:text-left tablet:text-left text-right">
            {props.rent.plant.name}
          </div>
          <div className="text-[#6B7280] desktop:text-[24px] tablet:text-[14px] text-[14px]">
            {props.rent.plant.nickname}
          </div>
        </div>
        <div className="h-full w-full text-[#6B7280] desktop:text-[20px] text-[14px] truncate whitespace-pre-line">
          {props.rent.plant.intro}
        </div>
        <Button onClick={() => navigate(`/rent/edit/${props.rent.id}`)} color="yellow" text="編輯" className="absolute right-0 bottom-0" />
      </div>
    </div>
  );
};

export default StatePlant;
