import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";
import { motion } from "motion/react";
import { FiMail, FiLock, FiUser, FiX } from "react-icons/fi";
import { assets } from "../assets/assets";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
        setShowLogin(false);
        toast.success(
          state === "login"
            ? "Welcome back to LuxCar"
            : "Account created successfully",
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-md px-4"
      onClick={() => setShowLogin(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-orange-500/10 bg-dark p-8 shadow-[0_0_60px_rgba(249,115,22,0.12)]"
      >
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl"></div>

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition cursor-pointer"
        >
          <FiX size={20} />
        </button>

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-1">
            <img src={assets.lclogo} alt="LuxCar" className="h-14 w-auto" />

            <h2 className="font-nevera text-xl md:text-2xl text-white tracking-wide">
              <span className="text-primary">Lux</span>Car
            </h2>
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-white text-center">
            {state === "login" ? "Welcome Back" : "Create Your Account"}
          </h2>

          <p className="mt-2 text-sm text-neutral-400 text-center">
            {state === "login"
              ? "Access your premium LuxCar experience"
              : "Join LuxCar and start your luxury journey"}
          </p>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="relative z-10 mt-8 flex flex-col gap-5"
        >
          {state === "register" && (
            <div>
              <label className="text-sm text-neutral-300">Full Name</label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1b1b1d] px-4 h-14 focus-within:border-orange-500 transition-all">
                <FiUser className="text-neutral-500" />

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent outline-none text-white placeholder:text-neutral-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm text-neutral-300">Email Address</label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1b1b1d] px-4 h-14 focus-within:border-orange-500 transition-all">
              <FiMail className="text-neutral-500" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white placeholder:text-neutral-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-300">Password</label>

            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1b1b1d] px-4 h-14 focus-within:border-orange-500 transition-all">
              <FiLock className="text-neutral-500" />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-white placeholder:text-neutral-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 h-14 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] hover:scale-[1.01] transition-all cursor-pointer"
          >
            {state === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="relative z-10 mt-6 text-center text-sm text-neutral-400">
          {state === "login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => setState("register")}
                className="text-orange-400 hover:text-orange-300 transition cursor-pointer"
              >
                Create account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setState("login")}
                className="text-orange-400 hover:text-orange-300 transition cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
