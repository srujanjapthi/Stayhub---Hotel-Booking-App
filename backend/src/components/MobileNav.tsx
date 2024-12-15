import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Calendar, LogIn, Menu, UserPlus, X } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLoggedIn } = useAppContext();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const closeSidebar = (): void => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded-md"
      >
        <Menu />
      </button>

      <motion.div
        className="fixed top-0 right-0 h-full shadow-lg overflow-hidden z-20"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col gap-7 p-6 backdrop-blur-3xl bg-slate-200 h-screen w-[310px]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl px-4 py-2 bg-blue-950 text-white rounded-lg font-semibold">
              Stay Hub
            </h2>
            <X onClick={closeSidebar} className="cursor-pointer" />
          </div>
          {isLoggedIn ? (
            <span className="flex flex-col gap-3">
              <span
                onClick={closeSidebar}
                className="flex gap-3 bg-gray-100 px-5 py-2 rounded-md font-semibold hover:bg-gray-200 border-[1px] border-gray-300 shadow-sm cursor-pointer transition-all"
              >
                <Calendar className="w-4" />
                <Link to="/my-booking">My Bookings</Link>
              </span>
              <span
                onClick={closeSidebar}
                className="flex gap-3 bg-gray-100 px-5 py-2 rounded-md font-semibold hover:bg-gray-200 border-[1px] border-gray-300 shadow-sm cursor-pointer transition-all"
              >
                <Building2 className="w-4" />
                <Link to="/my-hotels">My Hotels</Link>
              </span>
              <div onClick={closeSidebar}>
                <SignOutButton />
              </div>
            </span>
          ) : (
            <span className="flex flex-col gap-3">
              <span
                onClick={closeSidebar}
                className="flex justify-center gap-3 bg-blue-800 px-5 py-2 rounded-md font-semibold text-white hover:bg-blue-900 cursor-pointer transition-all"
              >
                <LogIn className="w-4" />
                <Link to="/sign-in">Sign In</Link>
              </span>
              <span
                onClick={closeSidebar}
                className="flex justify-center gap-3 bg-gray-100 px-5 py-2 rounded-md font-semibold hover:bg-gray-200 border-[1px] border-gray-300 shadow-sm cursor-pointer transition-all"
              >
                <UserPlus className="w-4" />
                <Link to="/register">Register</Link>
              </span>
            </span>
          )}
        </div>
      </motion.div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-10"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default MobileNav;
