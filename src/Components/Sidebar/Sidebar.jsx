import "./Sidebar.css";
import {
  Logo,
  SearchIcon,
  History,
  UserIdentifier,
  Desktop,
  UserMultiple,
  Home,
  Navigation,
  Contact,
  Dictionary,
  Building,
  Graph,
  RightArrow,
  Book,
} from "../../assets/index";

const Sidebar = () => {
  return (
    <aside className="sidebarContainer">
      <div className="sideContent">
        <div className="logo">
          <img src={Logo} alt="Red Grape" />
        </div>
        {[SearchIcon, History].map((item, index) => (
          <div className="search" key={index}>
            <img src={item} alt="Icon" />
          </div>
        ))}
      </div>
      <div className="sideContent line">
        {[
          Home,
          Navigation,
          UserIdentifier,
          Desktop,
          UserMultiple,
          Contact,
          Dictionary,
          Book,
          Building,
          Graph,
        ].map((item, index) => (
          <div className="search" key={index}>
            <img src={item} alt="Icon" />
          </div>
        ))}
      </div>
      <div className="search rightArrow">
        <img src={RightArrow} alt="" />
      </div>
    </aside>
  );
};
export default Sidebar;
