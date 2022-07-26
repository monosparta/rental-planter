import background from "../assets/formbg.png";
import vector from "../assets/Vector.png";
import { useEffect, useState } from "react";
import { addPlant, getUser } from "../Api";
import { useParams, useNavigate } from "react-router-dom";

const RentForm = () => {
  let { id } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const checkRentForm = () => {
    //get user info
    getUser()
      .then((response) => {
        const rent = response.data.rents.find((x) => x.id === parseInt(id));
        if (!rent || rent.plant) {
          alert("租借資料無效，將引導您回首頁");
          window.location.replace("/main");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        }
      });
  };

  useEffect(() => {
    checkRentForm();
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      addPlant(formData)
        .then((res) => {
          if (res.status === 200) {
            alert("更新成功！");
            navigate("/main");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            let message = "";
            switch (error.response.data.message) {
              case "Unexpected field":
                message = "僅接受 .jpeg 、.jpg 、 .png 格式的檔案";
                break;
              case "File too large":
                message = "檔案大小不得超過 10 MB";
                break;
              default:
                message = "發生未預期的錯誤，請稍後重試";
            }
            setErrorMsg(message);
          } else if (error.response.status === 401) {
            alert("登入狀態已逾期，請重新登入");
            window.location.replace("/");
          } else if (error.response.status === 404) {
            setErrorMsg("找不到要求的租借資料");
          } else if (error.response.status === 409) {
            setErrorMsg("植物資料已存在");
          } else if (error.response.status === 500) {
            setErrorMsg("伺服器錯誤");
          }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showIMG = () => {
    const imgURL = document.getElementById("uploadIMG");
    const temp = document.getElementById("tempIMG");
    const imgHint = document.getElementById("imgHint");
    const [file] = imgURL.files;
    if (file) {
      temp.src = URL.createObjectURL(file);
      temp.classList.remove("hidden");
      imgHint.classList.add("hidden");
    }
  };

  return (
    <div
      class=" w-full"
      style={{ backgroundImage: `url(${background})`, height: "100vh" }}
    >
      <div class="flex flex-col items-center justify-center">
        <div class="w-[1280px] h-[720px] mt-[180px] tablet:w-[416px] tablet:h-[795px]">
          <form id="form">
            <input type="hidden" name="rent" value={id} />
            <div class="flex flex-row  bg-white rounded-3xl">
              {/* 上傳圖片 */}
              <div class="w-[543px] h-[720px] bg-[#519E75] rounded-3xl">
                <div
                  id="showIMG"
                  class="flex justify-center items-center mt-[120px] w-[480px] h-[372px] mx-[31px] tablet:w-[352px] tablet:h-[220px] tablet:mt-6"
                >
                  <label
                    for="uploadIMG"
                    class="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden"
                  >
                    <img
                      id="tempIMG"
                      class="w-full h-full object-cover hidden"
                      alt="preview"
                    ></img>
                    <span id="imgHint" class="text-center text-gray-500">
                      點擊上傳圖片
                      <br />
                      需為 .png、.jpg、.jpeg 格式
                      <br />
                      檔案不得超過 10 MB
                    </span>
                    <input
                      onChange={showIMG}
                      id="uploadIMG"
                      type="file"
                      name="image"
                      class="hidden"
                      accept=".jpeg, .jpg, .png"
                    />
                  </label>
                </div>
              </div>

              {/* 植物資料 */}
              <div class="mt-[69px] ml-9 tablet:mt-6 tablet:ml-8 ">
                <h1 class="text-left text-[32px]  font-semibold pt-12 tablet:pt-[20px] tablet:text-[20px]">
                  租借表單
                </h1>
                <div class="relative z-0 mb-6 mt-[69px] w-[660px] group tablet:w-[364px]">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#519E75] focus:outline-none focus:ring-0 focus:border-[#519E75] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="name"
                    class="peer-focus:font-medium absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#519E75] peer-focus:dark:text-[#519E75] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    植物品種
                  </label>
                </div>
                <div class="relative z-0 mb-6 w-[660px] group tablet:w-[364px]">
                  <input
                    type="text"
                    name="nickname"
                    id="nickname"
                    class="block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#519E75] focus:outline-none focus:ring-0 focus:border-[#519E75] peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="nickname"
                    class="peer-focus:font-medium absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#519E75] peer-focus:dark:text-[#519E75] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    植物暱稱
                  </label>
                </div>
                <div class="relative z-0 mb-6 w-[660px] group tablet:w-[364px]">
                  <input
                    type="number"
                    name="minHumid"
                    id="minHumid"
                    class="block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#519E75] focus:outline-none focus:ring-0 focus:border-[#519E75] peer"
                    placeholder=" "
                    min="1"
                    max="100"
                    required
                  />
                  <label
                    for="minHumid"
                    class="peer-focus:font-medium absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#519E75] peer-focus:dark:text-[#519E75] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    最低土壤溼度標準
                  </label>
                  <div class="flex flex-row mt-2">
                    <img
                      src={vector}
                      class="mr-2 mt-1 h-3 w-3 "
                      alt="info"
                    ></img>
                    <label class="text-gray-500">說明</label>
                  </div>
                </div>

                <div class="relative z-0 mb-6 w-[660px] h-[156px] group tablet:w-[364px] tablet:h-[120px]">
                  <textarea
                    type="text"
                    name="intro"
                    id="introduction"
                    class="block py-2.5 px-0 w-full h-[156px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#519E75] focus:outline-none focus:ring-0 focus:border-[#519E75] peer tablet:h-[120px]"
                    placeholder=" "
                    required
                  />
                  <label
                    for="intro"
                    class="peer-focus:font-medium absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#519E75] peer-focus:dark:text-[#519E75] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    植物簡介
                  </label>
                </div>
                <label class="text-[#FF0000] ">{errorMsg}</label>
                <div class="flex justify-end mt-2">
                  <button
                    class="h-[54px] w-[140px] text-[20px] bg-[#707070] text-white rounded-lg mr-12 tablet:h-[41px] tablet:w-[120px]"
                    type="button"
                    onClick={() => navigate("/main")}
                  >
                    取消
                  </button>
                  <input
                    id="uploadInfo"
                    type="submit"
                    value="確定"
                    class="h-[54px] w-[140px] text-[20px] bg-[#FFC700] rounded-lg mr-[68px] tablet:h-[41px] tablet:w-[120px]"
                  ></input>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentForm;
