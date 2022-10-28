const colors = {
  green: {
    normal:
      "bg-[#519E75] text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300",
    disabled: "bg-green-300 text-white cursor-not-allowed",
  },
  yellow: {
    normal:
      "bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300",
    disabled: "bg-yellow-300 text-white cursor-not-allowed",
  },
};

const Button = (props) => (
  <button
    onClick={props.onClick}
    className={`rounded-lg desktop:text-[18px] tablet:text-[16px] text-[12px] desktop:px-5 desktop:py-3 tablet:px-4 tablet:py-2 px-3 py-1.5 ${colors[props.color][props.disabled ? 'disabled': 'normal']} ${props.className}`}
    disabled={props.disabled}
  >
    {props.text}
  </button>
);

export { Button };
