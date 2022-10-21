import background from "../assets/work.png";
import plant from "../assets/plant.png";
import StatePlant from "../components/main/StatePlant";
import logo from "../assets/logo.png";
import ShowPlant from "../components/main/ShowPlant";
import lamu from "../assets/img1.png";
import { useState, useEffect } from "react";
import { getUser, getOtherPlant, registerRent } from "../Api.js";
import { Button } from "../components/Button";
import { Toast } from "../components/modal/Toast";
import { PopUpModal } from "../components/modal/PopUpModal";
import { StateEmpty } from "../components/main/StateEmpty";
import { EmptyPlant } from "../components/main/EmptyPlant";

const Main = () => {
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const url = window.location.href;
  const [user, setUser] = useState({
    user: {
      id: "",
      name: "",
      email: "",
    },
    rents: [],
  });
  const [otherPlant, setOtherPlant] = useState({
    data: [
      {
        plant: { name: "", intro: "", imgPath: "", nickName: "", minHumid: 0 },
        container: null,
      },
    ],
  });

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
          console.log(response.data);
          setOtherPlant(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });
  };

  // 顯示sidebar
  const show = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
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

  const logout = () => {
    localStorage.clear();
    console.log("logout");
    window.location.replace("/");
  };

  return (
    <div id="top" className="flex flex-col items-center">
      <nav className="w-full desktop:max-w-[1560px] tablet:max-w-[768px]">
        <div className="desktop:px-[140px] tablet:px-9 px-4 my-6 flex flex-row flex-wrap justify-between items-center ">
          <img
            src={logo}
            className="desktop:mr-3 desktop:h-6 tablet:w-[74px] tablet:h-[45.71px] w-12 h-[34.29px]"
            alt="Logo"
          />
          <button
            id="hambar"
            onClick={show}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center text-sm text-gray-500 rounded-lg desktop:hidden tablet:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 justify-end"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                data-name="立即租借"
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            id="sidebar"
            className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 desktop:hidden tablet:hidden absolute right-0 top-12"
            style={{ display: "none" }}
          >
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToAnchor("introduce")}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">系統介紹</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor("state")}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">盆栽狀態</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor("showPlant")}
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap ">會員植物</span>
                </button>
              </li>
              <li>
                <button
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span onClick={logout} className="flex-1 ml-3 whitespace-nowrap">
                    登出
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div className="items-center text-[20px] tablet:text-[16px] hidden desktop:flex tablet:flex">
            <button onClick={() => scrollToAnchor("introduce")} className="mr-8  ">
              系統介紹
            </button>
            <button onClick={() => scrollToAnchor("state")} className="mr-8">
              盆栽狀態
            </button>
            <button onClick={() => scrollToAnchor("showPlant")} className="">
              會員植物
            </button>
          </div>
          <button
            onClick={logout}
            className="bg-[#8B8B8B] text-white w-[56px] h-10 rounded-lg hidden desktop:block tablet:block"
          >
            登出
          </button>
        </div>
      </nav>
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
      <div id="mainArea" className="p-0 m-0 w-full relative">
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
        <div id="introduce" className="w-full flex justify-center">
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
        <div id="state" className="w-full flex justify-center">
          <div className="desktop:mt-[60px] tablet:mt-5 mt-4 w-full desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px]">
            <h1 className="text-center font-extrabold text-[44px] tablet:text-[20px] phone:text-[18px]">
              盆栽狀態
            </h1>
            {user.rents.filter((x) => x.plant !== null).length === 0 ? (
              <StateEmpty />
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
        <div id="showPlant" className="w-full flex justify-center">
          <div className="desktop:mt-[60px] tablet:mt-5 mt-4 w-full desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px]">
            <h1 className="text-center font-extrabold text-[44px] tablet:text-[20px] phone:text-[18px]">
              會員植物
            </h1>
            <div className="flex justify-center desktop:px-20 desktop:my-20 tablet:px-10 my-10 relative">
              {otherPlant.data.filter((item) => item.plant !== null).length ===
              0 ? (
                <div className="absolute m-0 left-0 top-0 w-full h-full bg-white bg-opacity-80 flex flex-col justify-center items-center gap-6">
                  <img src={lamu} alt="" />
                  <h1 className="font-semibold desktop:text-[36px] tablet:text-[24px] text-[20px] tracking-widest">
                    目前還沒有其他會員的植物
                  </h1>
                </div>
              ) : undefined}
              <div className="flex justify-center flex-wrap desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px] text-center gap-10">
                {otherPlant.data.filter((item) => item.plant !== null)
                  .length === 0
                  ? [
                      "flex",
                      "desktop:flex tablet:flex hidden",
                      "desktop:flex hidden",
                      "desktop:flex hidden",
                    ].map((item, index) => <EmptyPlant key={index} display={item} />)
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
