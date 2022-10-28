import background from "../assets/work.png";
import plant from "../assets/plant.png";
import StatePlant from "../components/main/StatePlant";
import ShowPlant from "../components/main/ShowPlant";
import lamu from "../assets/img1.png";
import { useState, useEffect } from "react";
import { getUser, getOtherPlant, registerRent } from "../Api.js";
import { Button } from "../components/Button";
import { Toast } from "../components/modal/Toast";
import { PopUpModal } from "../components/modal/PopUpModal";
import { StateEmpty } from "../components/main/StateEmpty";
import { EmptyPlant } from "../components/main/EmptyPlant";
import { NavBar } from "../components/NavBar";
import "flowbite";
import { EmptyStateCover } from "../components/EmptyStateCover";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const url = window.location.href;
  const [user, setUser] = useState({ user: {}, rents: [] });
  const [otherPlant, setOtherPlant] = useState({ data: [] });

  useEffect(() => {
    //get user info
    getUser()
      .then((response) => {
        if (response.data.user.role !== 0) {
          window.location.replace("/");
          return;
        }
        setUser(response.data);
        getOthers();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });
  }, []);

  const getOthers = () => {
    getOtherPlant()
      .then((response) => {
        if (response.status === 200) {
          setOtherPlant(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });
  };

  const successModal = () => {
    registerRent()
      .then((response) => {
        if (response.status === 200) {
          scrollToAnchor("top");
          if (!response.data.waiting) {
            setToastMsg("恭喜您登記成功!請至信箱查看信件!");
          } else {
            setToastMsg("目前已無空盆器，已將您排至候補!");
          }
          setShowToast(true);
          setShowPopUpModal(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        } else {
          console.error(error);
        }
      });
  };

  //錨點設定
  const scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };
  const navBarItems = [
    {
      title: "系統介紹",
      onClick: () => scrollToAnchor("introduce")
    },
    {
      title: "盆栽狀態",
      onClick: () => scrollToAnchor("state")
    },
    {
      title: "會員植物",
      onClick: () => scrollToAnchor("showPlant")
    },
  ];

  return (
    <div id="top" className="flex flex-col items-center">
      <NavBar
        onLogoClick={() => scrollToAnchor("top")}
        navItems={navBarItems}
      />

      {/* 登記表單 */}
      <PopUpModal
        text="是否要登記盆器？"
        color="green"
        show={showPopUpModal}
        img={lamu}
        onConfirm={successModal}
        onCancel={() => setShowPopUpModal(false)}
      />
      {/* 區塊2 */}
      <div
        id="mainArea"
        className="p-0 desktop:mt-24 tablet:mt-20 mt-16 m-0 w-full relative"
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          type="success"
          text={toastMsg}
        />
        <div
          className="w-full desktop:h-[720px] tablet:h-[432px] h-[360px] flex justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="grid desktop:grid-cols-12 tablet:grid-cols-12 grid-cols-3 gap-2 w-full desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px] ">
            <div className="desktop:col-span-5 tablet:col-span-5 col-span-1"></div>
            <div className="desktop:col-span-7 tablet:col-span-7 col-span-2 desktop:mt-[229px] tablet:mt-[124.29px] mt-[128px] flex flex-col items-start gap-4">
              <div className="desktop:text-[100px] tablet:text-[54px] text-[32px] text-white w-full">
                Rental Planter
              </div>
              <div className="desktop:text-[20px] tablet:text-[16px] text-[12px] text-white w-full">
                用心愛護你的植物
              </div>
              <Button
                onClick={() => setShowPopUpModal(true)}
                color="green"
                text="立即登記"
              />
            </div>
          </div>
        </div>
        {/* Intro */}
        <div
          id="introduce"
          className="w-full flex justify-center desktop:scroll-mt-24 tablet:scroll-mt-20 scroll-mt-16"
        >
          <div className="grid grid-cols-2 w-full desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px] desktop:p-20 p-4 desktop:gap-20 gap-10">
            <div className="desktop:col-span-1 tablet:col-span-1 col-span-2 flex justify-center items-center">
              <img
                src={plant}
                className="desktop:h-[500.45px] desktop:w-[640px] tablet:w-[280px] tablet:h-[218.95px] w-[240px] h-[187.67px]"
                alt="plant"
              ></img>
            </div>
            <div className="desktop:col-span-1 tablet:col-span-1 col-span-2 flex flex-col justify-center desktop:items-start tablet:items-start items-center desktop:px-5 tablet:px-5 px-10">
              <div className="Nova Flat w-full desktop:text-[28px] tablet:text-[12px] text-[12px] desktop:text-left tablet:text-left text-center">
                Monospace
              </div>
              <div className="font-extrabold w-full desktop:text-[44px] tablet:text-[20px] text-[18px] desktop:text-left tablet:text-left text-center">
                盆器租借系統
              </div>
              <div className="mt-6 w-full text-[#9D9D9D] desktop:text-[20px] tablet:text-[14px] text-[14px]">
                打造自動化系統，隨時檢測植物生長環境，讓你的植物安心生長。
              </div>
              <ul className="list-disc mt-6 pl-6  desktop:leading-10 text-gray-500  desktop:text-[20px] tablet:text-[14px] tablet:leading-7 text-[14px] leading-5">
                <li>土壤溼度感測</li>
                <li>光照強度感測</li>
                <li>光照開關控制</li>
                <li>預約盆器租借</li>
                <li>租借盆器遞補通知</li>
              </ul>
            </div>
          </div>
        </div>
        {/* State */}
        <div
          id="state"
          className="w-full flex justify-center desktop:scroll-mt-24 tablet:scroll-mt-20 scroll-mt-16"
        >
          <div className="desktop:mt-[60px] tablet:mt-5 mt-4 w-full desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px]">
            <h1 className="text-center font-extrabold text-[44px] tablet:text-[20px] phone:text-[18px]">
              盆栽狀態
            </h1>
            {user.rents.filter((x) => x.plant !== null).length === 0 ? (
              <StateEmpty loading={loading} />
            ) : (
              user.rents
                .filter((x) => x.plant !== null)
                .map((x) => (
                  <StatePlant key={x.id} rent={x} path={url}></StatePlant>
                ))
            )}
          </div>
        </div>
        {/* Other Plant */}
        <div
          id="showPlant"
          className="w-full flex justify-center desktop:scroll-mt-24 tablet:scroll-mt-20 scroll-mt-16"
        >
          <div className="desktop:mt-[60px] tablet:mt-5 mt-4 w-full desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px]">
            <h1 className="text-center font-extrabold text-[44px] tablet:text-[20px] phone:text-[18px]">
              會員植物
            </h1>
            <div className="flex justify-center desktop:px-20 desktop:my-20 tablet:px-10 my-10 relative">
              {otherPlant.data.filter((item) => item.plant !== null).length ===
                0 ? (
                <EmptyStateCover loading={loading} title="目前還沒有其他會員的植物" />
              ) : undefined}
              <div className="flex justify-center flex-wrap desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px] text-center gap-10">
                {otherPlant.data.filter((item) => item.plant !== null)
                  .length === 0
                  ? [
                    "flex",
                    "desktop:flex tablet:flex hidden",
                    "desktop:flex hidden",
                    "desktop:flex hidden",
                  ].map((item, index) => (
                    <EmptyPlant key={index} display={item} />
                  ))
                  : otherPlant.data
                    .filter((item) => item.plant !== null)
                    .map((item) => (
                      <ShowPlant key={item.container} data={item} />
                    ))}
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div
          id="footer"
          className="w-full flex justify-center bg-[#F9FAFB] desktop:py-24 py-12"
        >
          <div className="flex flex-col items-center gap-6">
            <h1 className="font-extrabold desktop:text-[36px] tablet:text-[24px] text-[20px] tracking-widest">
              現在就租借你的盆器
            </h1>
            <div className="text-[#6B7280] desktop:text-[20px] tablet:text-[16px] text-[14px]">
              用心愛護你的植物
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => setShowPopUpModal(true)}
                color="green"
                text="立即登記"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
