import Background from "../assets/homeIMG.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin, getUser } from "../Api.js";

const Login = () => {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const email = useRef(undefined);
  const password = useRef(undefined);

  useEffect(() => {
    //get user info
    getUser()
      .then((response) => {
        if (response.data.user.role === 0) {
          navigate("./main");
        } else {
          navigate("./admin");
        }
      })
      .catch(() => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (e) => {
    e.preventDefault();
    userLogin({ email: email.current.value, password: password.current.value })
      .then((response) => {
        if (response.status === 200) {
          setLocalToken(response.data.token);
          if (!response.data.user.isDefaultPassword) {
            if (response.data.user.role === 0) {
              navigate("./main");
            } else {
              navigate("./admin");
            }
          } else {
            navigate("/resetPwd");
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMsg("帳號/密碼 錯誤，請再試一次");
        } else if (error.response.status === 500) {
          setErrorMsg("伺服器錯誤");
        }
      });
  };

  //local storage 存token
  const setLocalToken = (token) => {
    localStorage.setItem("token", token);
  };

  return (
    <div id="login" className="bg-cover bg-center w-screen h-screen flex justify-center items-center overflow-auto" style={{ backgroundImage: `url(${Background})` }}>
      <div
        className="flex flex-col w-full max-w-xl items-center justify-center p-4 desktop:gap-16 gap-8"
      >
        <div className="w-full flex flex-col gap-4">
          <p className="text-center text-white font-['Nova_Flat'] desktop:text-[80px] tablet:text-[80px] text-[44px]">
            Rental Planter
          </p>
          <p className="text-center text-white tracking-[.4em] desktop:text-[28px] tablet:text-[28px] text-[16px]">
            用心照顧你的植物
          </p>
        </div>

        <div className="bg-white w-full max-w-lg rounded-lg shadow desktop:py-12 tablet:py-12 py-6 flex flex-col desktop:gap-12 tablet:gap-12 gap-6">
          <p className="desktop:text-[32px] tablet:text-[32px] text-[24px] text-center font-semibold">
            Monospace VIP
          </p>
          <div className="desktop:px-8 tablet:px-8 px-4 flex flex-col gap-4">
            <form className="flex flex-col gap-6" onSubmit={login}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-medium text-gray-900 desktop:text-[20px] tablet:text-[20px] text-[18px]"
                >
                  電子郵件
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                  placeholder="輸入電子郵件"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="font-medium text-gray-900 desktop:text-[20px] tablet:text-[20px] text-[18px]"
                >
                  密碼
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={password}
                  placeholder="輸入密碼"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                  required
                />
                <div className="grid grid-col-2 grid-flow-col space-between">
                  <label className="text-[#FF0000]">{errorMsg}</label>
                  <div className="grid justify-items-end">
                    <a href="./forgetPwd" className="desktop:text-[16px] tablet:text-[16px] text-[14px] text-[#1C64F2] ">
                      忘記密碼?
                    </a>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#519E75] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg desktop:text-[24px] text-[20px] px-5 py-2.5 text-center"
              >
                登入
              </button>
            </form>
            <div className="flex desktop:text-[16px] tablet:text-[16px] text-[14px]">
              <label className="text-gray-500">尚未註冊?</label>
              <a href="./register" className="text-[#1C64F2]">
                註冊
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
