import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useAppContext } from "../contexts/AppContext";

const MainNav = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <span className="space-x-2 md:block hidden">
      {isLoggedIn ? (
        <span className="flex gap-3">
          <Link
            to="/my-booking"
            className="bg-white px-5 py-2 rounded-md font-semibold text-blue-800 hover:bg-gray-200 transition-all"
          >
            My Bookings
          </Link>
          <Link
            to="/my-hotels"
            className="bg-white px-5 py-2 rounded-md font-semibold text-blue-800 hover:bg-gray-200 transition-all"
          >
            My Hotels
          </Link>
          <SignOutButton />
        </span>
      ) : (
        <Link
          to="/sign-in"
          className="bg-white px-5 py-2 rounded-md font-semibold text-blue-800 hover:bg-gray-200 transition-all"
        >
          Sign In
        </Link>
      )}
    </span>
  );
};

export default MainNav;
