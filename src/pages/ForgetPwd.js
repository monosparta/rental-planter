import Background from "../assets/skyBgIMG.png";
import plantIMG from "../assets/bg2.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { forgetPassword } from "../Api.js";

const ForgetPwd = () => {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const email = useRef(undefined);
  function forgetPwd() {
    forgetPassword({ email: email.current.value })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("請求成功，請檢查電子郵件！");
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMsg("請輸入電子郵件！");
        } else if (error.response.status === 404) {
          setErrorMsg("請求失敗");
        }
      });
  }

  return (
    <div
      className="relative bg-cover flex justify-center items-center tablet:flex-col phone:flex-col"
      style={{ backgroundImage: `url(${Background})`, height: "100vh" }}
    >
      <div className="rounded-3xl bg-white flex flex-row h-3/5 w-4/5 tablet:flex-col tablet:w-3/5 phone:flex-col phone:w-4/5">
        <img
          src={plantIMG}
          className="desktop:rounded-l-3xl object-cover w-2/5 tablet:w-full tablet:h-2/5 tablet:rounded-t-3xl phone:w-full phone:h-2/5 phone:rounded-t-3xl"
          alt="plant"
        ></img>
        <div className="flex flex-wrap flex-row py-12 w-3/5 space-y-12 overflow-y-auto tablet:w-full phone:w-full">
          <div className="w-full">
            <h1 className="text-center text-[40px] font-Nova_Flat font-normal tablet:text-[32px] phone:text-[24px]">
              忘記密碼
            </h1>
            <h2 className="text-[20px] text-center text-[#929292] tracking-widest font-normal tablet:text-[20px] phone:text-[14px]">
              Forget Password
            </h2>
          </div>
          <div className="w-full flex flex-col items-center tablet:px-10 phone:px-10">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-black w-1/2 tablet:w-full phone:w-full"
            >
              電子郵件
            </label>
            <input
              type="email"
              id="email"
              ref={email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 h-[42px] tablet:w-full phone:w-full"
              placeholder="輸入您註冊的電子郵件"
              required
            />
            <div className="w-1/2 tablet:w-full phone:w-full">
              <label className="text-[#FF0000] ">{errorMsg}</label>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-2 items-center tablet:px-10 phone:px-10">
            <button
              onClick={forgetPwd}
              type="button"
              className="w-1/2 h-[42px] text-[14px] bg-[#519E75] text-white rounded-lg tablet:w-full phone:w-full"
            >
              確認
            </button>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="w-1/2 h-[42px] text-[14px] bg-[#929292] text-white rounded-lg tablet:w-full phone:w-full"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPwd;
