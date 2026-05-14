import { AppContext } from "./AppContext";

import { toast } from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [cars, setCars] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        setToken(null)
        localStorage.removeItem("token")
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("You have been logged out");
    navigate("/")
  };

 useEffect(() => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}, [token]);

useEffect(() => {
    fetchUser();

  if (token) {
    fetchCars();
  }
}, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
