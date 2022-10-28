import emailIcon from "../../assets/img3.png";
import humidIMG from "../../assets/humid.png";
import lightIMG from "../../assets/light.png";
import deleteIMG from "../../assets/deleteIcon.png";
import plant1 from "../../assets/card1.png";
import { useState, useEffect } from "react";
import webSocket from "socket.io-client";
import { deleteRented } from "../../Api";
import { PopUpModal } from "../modal/PopUpModal";

const Rented = (props) => {
  const [showPopUpModal, setShowPopUpModal] = useState(false);

  const deleteInfo = (rentId) => {
    //delete user info
    deleteRented(rentId)
      .then((res) => {
        if (res.status === 200) {
          props.onDeleteRent();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });
  };

  // websocket
  const [realtimeData, setRealtimeData] = useState({
    soilHumid: "--.--",
    light: "---",
  });
  const [ws, setWs] = useState(null);

  const registerDisconnectHandler = () => {
    ws.on("disconnect", () => {
      console.log("Disconnected");
      ws.close();
    });
  };

  if (props.path !== `${window.location.origin}/admin`) {
    registerDisconnectHandler();
  }

  useEffect(() => {
    if (ws) {
      initWebSocket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  //soilHumid
  const initWebSocket = () => {
    ws.on("Plant/Data", (data) => {
      if (data.container === props.rentedInfo.container) {
        setRealtimeData(data);
      }
    });

    ws.emit("lastData", props.rentedInfo.container);
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
  }, []);

  const plantIMG = props.rentedInfo.plantIMG
    ? `${process.env.REACT_APP_BACKEND_HOST || ""}/${props.rentedInfo.plantIMG}`
    : plant1;
  return (
      <div className="border border-[#D7D7D7] bg-white shadow-lg rounded-3xl flex flex-col desktop:gap-4 tablet:gap-4 gap-2 relative desktop:px-8 tablet:px-8 px-4 py-4">
          <div className="flex gap-4">
              <img
                  src={plantIMG}
                  className="desktop:w-20 desktop:h-20 tablet:w-[72px] tablet:h-[72px] w-16 h-16 rounded-full flex-none object-cover"
                  alt="plant"
              ></img>
              <div className="flex flex-col items-start justify-center flex-auto">
                  <label className="desktop:text-[24px] tablet:text-[24px] text-[16px] w-full truncate">
                      {props.rentedInfo.name}
                  </label>
                  <label
                      className={`desktop:text-[20px] tablet:text-[20px] text-[14px] w-full truncate ${
                          props.rentedInfo.plantName ? "" : "text-yellow-500"
                      }`}
                  >
                      {props.rentedInfo.plantName || "尚未填寫"}
                  </label>
              </div>
              <div className="inline-flex justify-center items-center bg-transparent flex-none">
                  <button
                      className=""
                      onClick={() =>
                          (window.location = `mailto:${props.rentedInfo.email}`)
                      }
                  >
                      <img
                          src={emailIcon}
                          className="w-6 h-6"
                          alt="email"
                      ></img>
                  </button>
              </div>
              <div className="inline-flex justify-center items-center bg-transparent flex-none">
                  <button
                      onClick={() => setShowPopUpModal(true)}
                      className="inline-flex justify-center items-center bg-transparent flex-none hover:bg-gray-300 rounded-full"
                  >
                      <img
                          src={deleteIMG}
                          className="h-6 w-6"
                          alt="delete"
                      ></img>
                  </button>
              </div>

              {/* 刪除按鈕 */}

              <PopUpModal
                  text={`是否刪除 ${props.rentedInfo.name} 的租借資料「${props.rentedInfo.plantName || '尚未填寫'}」？`}
                  color="red"
                  show={showPopUpModal}
                  img={deleteIMG}
                  onConfirm={() => deleteInfo(props.rentedInfo.id)}
                  onCancel={() => setShowPopUpModal(false)}
              />
          </div>
          <div className="flex px-2 justify-center">
              <div className="flex flex-none">
                  <img
                      src={humidIMG}
                      className="h-[28px] w-[28px] mr-1"
                      alt="humid"
                  ></img>
                  <label className="desktop:text-[20px] tablet:text-[20px] text-[16px]">
                      {realtimeData.soilHumid}%
                  </label>
              </div>
              <div className="flex flex-none">
                  <img
                      src={lightIMG}
                      className="h-[28px] w-[28px] mr-1"
                      alt="light"
                  ></img>
                  <label className="desktop:text-[20px] tablet:text-[20px] text-[16px]">{realtimeData.light} lx</label>
              </div>
          </div>
      </div>
  );
};

export { Rented };
