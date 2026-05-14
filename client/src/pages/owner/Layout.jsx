import { Outlet } from "react-router-dom";
import Navbar from "../../components/owner/Navbar";
import Sidebar from "../../components/owner/Sidebar";
import { useAppContext } from "../../context/useAppContext";
import { useEffect } from "react";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if(!isOwner){
      navigate("/")
    }
  }, [isOwner]);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
