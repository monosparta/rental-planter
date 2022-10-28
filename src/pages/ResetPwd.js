import Background from "../assets/skyBgIMG.png";
import plantIMG from "../assets/resetIMG.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, getUser } from "../Api.js";

const ResetPwd = () => {
  let navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [style, setStyle] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [visibility, setVisibility] = useState("w-1/2 invisible");
  const pwd = (e) => {
    setPassword(e.target.value);
  };
  const pwd2 = (e) => {
    setPassword2(e.target.value);
  };

  useEffect(() => {
    //get user info
    getUser().catch((error) => {
      if (error.response.status === 401) {
        alert("登入狀態已逾期，請重新登入");
        window.location.replace("/");
      }
    });
  });

  useEffect(() => {
    if (password !== "") {
      if (password === password2) {
        setStyle("text-green-600 w-full text-left");
        setVisibility("w-1/2 visible");
        setMsg("輸入密碼相同，成功！");
        setDisabled(false);
      } else {
        setStyle("text-[#FF0000] w-full text-left");
        setVisibility("w-1/2 visible");
        setMsg("輸入密碼不相同，失敗！");
        setDisabled(true);
      }
    }
  }, [password, password2]);

  const resetPwd = () => {
    changePassword({ password })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.clear();
          alert("更新成功！請重新登入");
          window.location.replace("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        } else {
          setStyle("text-[#FF0000] w-full text-left");
          setVisibility("w-1/2 visible");
          setMsg("發生未預期的錯誤！");
          console.error(
            `Server responded with status ${error.response.status}`
          );
        }
      });
  };

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
              重設密碼
            </h1>
            <h2 className="text-[20px] text-center text-[#929292] tracking-widest font-normal tablet:text-[20px] phone:text-[14px]">
              Reset Password
            </h2>
          </div>
          <div className="w-full flex flex-col items-center tablet:px-10 phone:px-10">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-black w-1/2 tablet:w-full phone:w-full"
            >
              密碼
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="輸入密碼"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 h-[42px] tablet:w-full phone:w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
              onChange={pwd}
            />
            <label
              for="password"
              className="block my-2 text-sm font-medium text-black w-1/2 tablet:w-full phone:w-full"
            >
              確認密碼
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="再次輸入密碼"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 h-[42px] tablet:w-full phone:w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
              onChange={pwd2}
              // onBlur 點旁邊空白
            />
          </div>

          <div className="flex flex-col w-full space-y-2 items-center tablet:px-10 phone:px-10">
            <div className={visibility}>
              <label className={style}>{msg}</label>
            </div>
            <button
              className="w-1/2 h-[42px] text-[14px] bg-[#519E75] text-white rounded-lg tablet:w-full phone:w-full"
              disabled={disabled}
              onClick={resetPwd}
            >
              確認
            </button>
            <button
              className="w-1/2 h-[42px] text-[14px] bg-[#929292] text-white rounded-lg tablet:w-full phone:w-full"
              onClick={() => navigate("/")}
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPwd;
