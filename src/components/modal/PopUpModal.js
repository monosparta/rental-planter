import exclamation from '../../assets/modalIcon/exclamation.svg';

const confirmColor = {
  green:
    "text-white bg-[#519E75] hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300",
  red: "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300",
};

const PopUpModal = (props) => {
  if (props.show) {
    return (
      <div
        id="popupModal"
        tabIndex="-1"
        class="bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 left-0 m-0 h-full w-full z-50"
      >
        <div class="relative flex flex-col justify-center p-4 w-full max-w-md m-auto h-full md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-6 text-center">
              <img
                src={props.img || exclamation}
                class=" mx-auto mb-4 w-14 h-14 "
                alt=""
              ></img>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {props.text}
              </h3>
              <button
                onClick={props.onConfirm}
                data-modal-toggle="popup-modal"
                type="button"
                class={`${
                  confirmColor[props.color || "green"]
                } rounded-lg text-sm font-medium inline-flex items-center px-5 py-2.5 text-center mr-2`}
              >
                確定
              </button>
              <button
                onClick={props.onCancel}
                data-modal-toggle="popup-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export { PopUpModal };