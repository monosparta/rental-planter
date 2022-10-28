import { useRef, useState } from "react";
import { addAdmin } from "../../Api";

const AddAdminModal = (props) => {
  const [errorMsgAdmin, setErrorMsgAdmin] = useState("");

  const name = useRef(undefined);
  const email = useRef(undefined);

  const add = async () => {
    addAdmin({ name: name.current.value, email: email.current.value })
      .then((response) => {
        if (response.status === 200) {
          setErrorMsgAdmin("");
          name.current.value = "";
          email.current.value = "";
          props.onSuccess();
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMsgAdmin("表單格式錯誤");
        } else if (error.response && error.response.status === 401) {
          alert("登入狀態已逾期，請重新登入");
          window.location.replace("/");
        } else if (error.response && error.response.status === 409) {
          setErrorMsgAdmin("使用者已存在");
        } else if (error.response && error.response.status === 500) {
          setErrorMsgAdmin("伺服器錯誤");
        } else {
          console.error(error)
        }
      });
  };

  if (props.show) {
    return (
      <div
        id="addAdminModal"
        tabIndex="-1"
        className="bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 left-0 m-0 h-full w-full z-50"
      >
        <div className="flex flex-col justify-center p-4 m-auto w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white bg-opacity-100 rounded-lg shadow dark:bg-gray-700 z-50">
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                新增管理員
              </h3>
              <div className="space-y-6" action="#">
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    姓名
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    ref={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="管理員名字"
                    defaultValue=""
                    required
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    電子郵件
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="管理員電子郵件"
                    defaultValue=""
                    required
                  />
                </div>
                <label className="text-[#FF0000] ">
                  {errorMsgAdmin}
                </label>

                <button
                  onClick={add}
                  type="button"
                  className="w-full text-white bg-[#519E75] hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  新增
                </button>
                <button
                  onClick={props.onCancel}
                  className="w-full text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export { AddAdminModal };
