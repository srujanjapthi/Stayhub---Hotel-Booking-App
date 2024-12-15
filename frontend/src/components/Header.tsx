import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6 px-5">
      <div className="container mx-auto flex justify-between items-center">
        <span className="md:text-3xl text-2xl text-white font-bold tracking-tight">
          <Link to="/" className="bg-blue-950 px-5 py-2 rounded-lg">
            Stay Hub
          </Link>
        </span>
        <MainNav />
        <MobileNav />
      </div>
    </div>
  );
};

export default Header;
