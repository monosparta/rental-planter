import lamu from "../assets/img1.png";
import img2 from "../assets/img2.png";
import { RentedCard } from "../components/admin/RentedCard";
import { WaitLine } from "../components/admin/WaitLine";
import { WaitEmpty } from "../components/admin/WaitEmpty";
import { Rented } from "../components/admin/Rented";
import { RentedEmpty } from "../components/admin/RentedEmpty";
import { useState, useEffect } from "react";
import { Toast } from "../components/modal/Toast";
import { AddAdminModal } from "../components/modal/AddAdminModal";
import {
  getUser,
  getRentedAmount,
  getWaitList,
  getRentedInfo,
} from "../Api.js";
import { NavBar } from "../components/NavBar";
import { EmptyStateCover } from "../components/EmptyStateCover";

const Admin = () => {
  const [waitListLoading, setWaitListLoading] = useState(true);
  const [rentedLoading, setRentedLoading] = useState(true);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const url = window.location.href;
  const [amount, setAmount] = useState({ data: { remain: '--', rented: '--' } });
  const [waitList, setWaitList] = useState({ data: [] });
  const [rentInfo, setRentInfo] = useState({ data: [] });

  // 接收api資料
  useEffect(() => {
    //get user info
    getUser()
      .then((response) => {
        if (response.data.user.role !== 1) {
          window.location.replace("/");
        }
        getData();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });
  }, []);

  const getData = () => {
    getRentedAmount()
      .then((response) => {
        if (response.status === 200) {
          setAmount(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });

    // 候補清單
    getWaitList()
      .then((response) => {
        if (response.status === 200) {
          setWaitList(response.data);
          setWaitListLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });

    getRentedInfo()
      .then((response) => {
        if (response.status === 200) {
          setRentInfo(response.data);
          setRentedLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });
  };

  // 已租借清單
  const data = [
    {
      img: img2,
      amount: amount.data.remain,
      bgColor: "#FFC700",
      state: "未租",
    },
    {
      img: lamu,
      amount: amount.data.rented,
      bgColor: "#519E75",
      state: "已租",
    },
  ];
  const info = waitList.data;

  const rentedInfo = rentInfo.data.map((x) => {
    return {
      id: x.id,
      name: x.owner.name,
      email: x.owner.email,
      plantName: x.plant?.name,
      plantIMG: x.plant?.imgPath,
      container: x.container,
    };
  });

  const navBarItems = [
    {
      title: "盆栽管理",
      onClick: () => { },
      isCurrent: true,
    },
    {
      title: "新增管理員",
      onClick: () => setShowAddAdminModal(true),
    },
  ];

  const onAdminSuccess = () => {
    setShowAddAdminModal(false);
    setToastMsg("成功新增管理員！");
    setShowToast(true);
  };

  const onDeleteRent = () => {
    setToastMsg("刪除成功！");
    setShowToast(true);
    setWaitListLoading(true);
    setRentedLoading(true);
    getData();
  }

  return (
    //navbar
    <div id="admin" className="flex flex-col items-center desktop:h-screen">
      <NavBar onLogoClick={() => { }} navItems={navBarItems} />
      <div className="desktop:h-24 tablet:h-20 h-16 flex-none" />
      {/* 新增管理員modal */}
      <AddAdminModal
        show={showAddAdminModal}
        onSuccess={onAdminSuccess}
        onCancel={() => setShowAddAdminModal(false)}
      />

      <div
        id="content"
        className="w-full flex justify-center desktop:flex-auto relative"
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          type="success"
          text={toastMsg}
        />
        <div className="w-full h-full desktop:max-w-[1560px] tablet:max-w-[768px] max-w-[375px] grid grid-cols-12 gap-4">
          {/* 左半邊 */}
          <div className="desktop:col-span-5 col-span-12 flex flex-col">
            <div className="flex flex-col items-center justify-center gap-4 p-8 flex-none">
              <h1 className="text-[28px] text-center">租借數量</h1>
              <div className="flex desktop:flex-row tablet:flex-row flex-col w-full items-center justify-center gap-12">
                {data.map((item) => (
                  <RentedCard
                    key={item.state}
                    data={item}
                  ></RentedCard>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 p-8 flex-auto">
              <h1 className="text-[28px] text-center flex-none">
                候補名單
              </h1>
              <div
                className={`scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg bg-[#F9F9F9] border border-[#F9F9F9] rounded-3xl shadow-md overflow-y-${info.length === 0 ? "hidden" : "scroll"
                  } overflow-x-hidden p-4 flex flex-col gap-1 desktop:h-0 min-h-[45vh] desktop:flex-auto relative`}
              >
                {info.length === 0 ? (
                  <EmptyStateCover loading={waitListLoading} title="候補名單為空" />
                ) : undefined}
                {info.length === 0
                  ? [
                    "flex",
                    "flex",
                    "flex",
                    "flex",
                    "flex",
                    "desktop:flex tablet:flex hidden",
                    "desktop:flex tablet:flex hidden",
                    "desktop:flex hidden",
                  ].map((item, index) => (
                    <WaitEmpty key={index} display={item} />
                  ))
                  : info.map((item) => (
                    <WaitLine
                      key={item.index}
                      data={item}
                    ></WaitLine>
                  ))}
              </div>
            </div>
          </div>
          {/* 右半邊 */}
          <div className="flex flex-col desktop:col-span-7 col-span-12 h-full gap-4 p-8">
            <h1 className="text-[28px] text-center flex-none">
              已租資訊
            </h1>
            <div
              className={`scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg overflow-y-${rentedInfo.length === 0 ? "hidden" : "scroll"
                } overflow-x-hidden bg-[#F9F9F9] border-[#F9F9F9] rounded-3xl shadow-md grid desktop:grid-cols-2 grid-cols-1 auto-rows-min desktop:flex-auto desktop:h-0 desktop:gap-10 desktop:p-10 gap-4 p-4 relative`}
            >
              {rentedInfo.length === 0 ? (
                <EmptyStateCover loading={rentedLoading} title="還沒有人租借盆器" />
              ) : undefined}
              {rentedInfo.length === 0
                ? [
                  "flex",
                  "flex",
                  "flex",
                  "desktop:flex hidden",
                  "desktop:flex hidden",
                  "desktop:flex hidden",
                  "desktop:flex hidden",
                  "desktop:flex hidden",
                ].map((item, index) => (
                  <RentedEmpty key={index} display={item} />
                ))
                : rentedInfo.map((item) => (
                  <Rented
                    key={item.id}
                    rentedInfo={item}
                    path={url}
                    onDeleteRent={onDeleteRent}
                  ></Rented>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
