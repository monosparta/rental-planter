import background from "../assets/formbg.png";
import vector from "../assets/Vector.png";
import { useEffect, useState } from "react";
import { modifyPlant, getUser } from "../Api";
import { useParams, useNavigate } from "react-router-dom";

const RentForm = () => {
  let { id } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [plant, setPlant] = useState({});
  const [minHumid, setMinHumid] = useState(0);
  let navigate = useNavigate();

  const checkRentForm = () => {
    //get user info
    getUser()
      .then((response) => {
        const rent = response.data.rents.find((x) => x.id === parseInt(id));
        if (!rent) {
          alert("租借資料無效，將引導您回首頁");
          window.location.replace("/main");
        }

        if (!rent.plant) {
          window.location.replace(`/rentForm/${id}`);
        }

        setCurrentImg(
          `${process.env.REACT_APP_BACKEND_HOST || ""}/${rent.plant.imgPath}`
        );

        setMinHumid(parseInt(rent.plant.minHumid  ));

        setPlant({
          name: rent.plant.name,
          intro: rent.plant.intro,
          nickname: rent.plant.nickname
        });
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
      modifyPlant(id, formData)
        .then((res) => {
          if (res.status === 200) {
            alert("更新成功！");
            navigate("/main");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            console.log(error.response.data.message);
            let message = '';
            switch (error.response.data.message) {
              case 'Unexpected field':
                message = "僅接受 .jpeg 、.jpg 、 .png 格式的檔案";
                break;
              case 'File too large':
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
    const [file] = imgURL.files;
    if (file) {
      temp.src = URL.createObjectURL(file);
    }
  };

  return (
    <div
      className=" w-full"
      style={{ backgroundImage: `url(${background})`, height: "100vh" }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-[1280px] h-[720px] mt-[180px] tablet:w-[416px] tablet:h-[795px]">
          <form id="form">
            <div className="flex flex-row  bg-white rounded-3xl">
              {/* 上傳圖片 */}
              <div className="w-[543px] h-[720px] bg-[#519E75] rounded-3xl">
                <div
                  id="showIMG"
                  className="flex justify-center items-center mt-[120px] w-[480px] h-[372px] mx-[31px] tablet:w-[352px] tablet:h-[220px] tablet:mt-6"
                >
                  <label
                    for="uploadIMG"
                    className="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden"
                  >
                    <img
                      id="tempIMG"
                      className="w-full h-full object-cover"
                      src={currentImg}
                      alt="preview"
                    ></img>
                    <input
                      onChange={showIMG}
                      id="uploadIMG"
                      type="file"
                      name="image"
                      className="hidden"
                      accept=".jpeg, .jpg, .png"
                    />
                  </label>
                </div>
              </div>

              {/* 植物資料 */}
              <div className="mt-[69px] ml-9 tablet:mt-6 tablet:ml-8 ">
                <h1 className="text-left text-[32px]  font-semibold pt-12 tablet:pt-[20px] tablet:text-[20px]">
                  編輯植物
                </h1>
                <div className="relative z-0 mb-6 mt-[69px] w-[660px] group tablet:w-[364px]">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#519E75] focus:outline-none focus:ring-0 focus:border-[#519E75] peer"
                    placeholder=" "
                    defaultValue={plant.name}
                    required
                  />
                  <label
                    for="name"
                    className="peer-focus:font-medium absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#519E75] peer-focus:dark:text-[#519E75] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    植物品種
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-[660px] group tablet:w-[364px]">
                  <input
                    type="text"
                    name="nickname"
                    id="nickname"
                    className="block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#519E75] focus:outline-none focus:ring-0 focus:border-[#519E75] peer"
                    placeholder=" "
                    defaultValue={plant.nickname}
                    required
                  />
                  <label
                    for="nickname"
                    className="peer-focus:font-medium absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#519E75] peer-focus:dark:text-[#519E75] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    植物暱稱
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-[660px] group tablet:w-[364px]">
                  <input
                    type="number"
                    name="minHumid"
                    id="minHumid"
                    className="block py-2.5 px-0 w-full text-[18px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#519E75] focus:outline-none focus:ring-0 focus:border-[#519E75] peer"
                    placeholder=" "
                    value={minHumid}
                    onChange={(event) => setMinHumid(event.target.value)}
                    min="1"
                    max="100"
                    required
                  />
                  <label
                    for="minHumid"
                    className="peer-focus:font-medium absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#519E75] peer-focus:dark:text-[#519E75] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    最低土壤溼度標準
                  </label>
                  <div className="flex flex-row mt-2">
                    <img
                      src={vector}
                      className="mr-2 mt-1 h-3 w-3 "
                      alt="info"
                    ></img>
                    <label className="text-gray-500">說明</label>
                  </div>
                </div>

                <div className="relative z-0 mb-6 w-[660px] h-[156px] group tablet:w-[364px] tablet:h-[120px]">
                  <textarea
                    type="text"
                    name="intro"
                    id="introduction"
                    className="block py-2.5 px-0 w-full h-[156px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#519E75] focus:outline-none focus:ring-0 focus:border-[#519E75] peer tablet:h-[120px]"
                    placeholder=" "
                    defaultValue={plant.intro}
                    required
                  />
                  <label
                    for="intro"
                    className="peer-focus:font-medium absolute text-[18px] text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#519E75] peer-focus:dark:text-[#519E75] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    植物簡介
                  </label>
                </div>
                <label className="text-[#FF0000] ">{errorMsg}</label>
                <div className="flex justify-end mt-2">
                  <button
                    className="h-[54px] w-[140px] text-[20px] bg-[#707070] text-white rounded-lg mr-12 tablet:h-[41px] tablet:w-[120px]"
                    type="button"
                    onClick={() => navigate("/main")}
                  >
                    取消
                  </button>
                  <input
                    id="uploadInfo"
                    type="submit"
                    value="確定"
                    className="h-[54px] w-[140px] text-[20px] bg-[#FFC700] rounded-lg mr-[68px] tablet:h-[41px] tablet:w-[120px]"
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
