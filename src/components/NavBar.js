import { HamBarIcon } from "../components/icons/NavIcons";
import { useState } from "react";
import logo from "../assets/logo.png";

const NavBar = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const navAddLogout = (navItems) => {
    const items = [...navItems];
    items.push({
      title: "登出",
      onClick: logout
    });
    return items.map((x) => ({
      title: x.title,
      onClick: () => {
        x.onClick();
        setMobileMenuOpen(!mobileMenuOpen);
      },
      isCurrent: x.isCurrent
    }));
  };

  return (
    <nav className="w-full flex items-center justify-center border-b fixed bg-white z-50 desktop:h-24 tablet:h-20 h-16">
      <div className="container w-full desktop:max-w-[1560px] tablet:max-w-[768px] desktop:px-[140px] tablet:px-9 px-4 flex flex-wrap justify-between items-center relative">
        <button onClick={props.onLogoClick} className="h-full">
          <img src={logo} alt="Logo" />
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="inline-flex justify-end items-center text-sm text-gray-500 rounded-lg desktop:hidden tablet:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <HamBarIcon className="w-6 h-6" />
        </button>

        <div className="hidden desktop:flex tablet:flex justify-center items-center  desktop:text-[20px] tablet:text-[16px] gap-8">
          {props.navItems.map((item) => (
            <button className={item.isCurrent ? "text-blue-700 border-b-2 border-blue-700 box-content cursor-default" : ""} onClick={item.isCurrent ? ()=>{} : item.onClick} key={item.title}>
              {item.title}
            </button>
          ))}
        </div>
        <button
          onClick={logout}
          className="bg-[#8B8B8B] text-white w-[56px] h-10 rounded-lg hidden desktop:block tablet:block"
        >
          登出
        </button>
      </div>

      <div
        className={`absolute desktop:top-24 tablet:top-20 top-16 left-0 bg-white p-4 w-full desktop:hidden tablet:hidden ${
          mobileMenuOpen ? "flex" : "hidden"
        }`}
        id="mobile-menu"
      >
        <ul className="w-full flex flex-col gap-2">
          {navAddLogout(props.navItems).map((item) => (
            <li key={item.title}>
              <button
                onClick={item.isCurrent ? ()=>{} : item.onClick}
                className={`w-full flex items-center p-2 text-base font-normal rounded-lg  ${item.isCurrent ? "text-white bg-blue-700 cursor-default" : "text-gray-900 hover:bg-gray-100"}`}
              >
                <span className="ml-3">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export { NavBar };
