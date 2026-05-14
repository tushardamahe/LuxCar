import { Link } from "react-router-dom";
import logo from "../assets/lclogo.svg";

const Footer = () => {
  return (
    <div className="bg-black pt-12 px-4">
      <footer className="bg-dark w-full max-w-400 mx-auto text-white pt-8 lg:pt-10 px-6 sm:px-8 md:px-14 lg:px-24 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-10 md:gap-12">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-1">
              <img src={logo} alt="LuxCar" className="h-14 md:h-16 w-auto" />

              <h2 className="font-nevera text-xl md:text-2xl text-white tracking-wide">
                <span className="text-primary">Lux</span>Car
              </h2>
            </div>

            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Experience luxury mobility with premium vehicles, seamless
              bookings, and refined driving experiences crafted for every
              journey.
            </p>

            <div className="flex gap-5 md:gap-6">
              <Link
                to="https://www.linkedin.com/in/tushar-damahe/"
                className="text-neutral-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link
                to=""
                className="text-neutral-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>

              <Link
                to=""
                className="text-neutral-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-24 items-start">
            <div>
              <h3 className="font-medium text-sm mb-5 text-white">
                Quick Links
              </h3>

              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/cars"
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Cars
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-5 text-white">Services</h3>

              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Luxury Rentals
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Chauffeur
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Airport Pickup
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Business Travel
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="font-medium text-sm mb-5 text-white">Support</h3>

              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Terms
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Privacy
                  </Link>
                </li>

                <li>
                  <Link
                    to=""
                    className="hover:text-orange-400 transition-all duration-300"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-5 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-neutral-500 text-sm">© 2026 LuxCar</p>

          <p className="text-sm text-neutral-500">
            Crafted for premium driving experiences.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-orange-500 rounded-full blur-[140px] pointer-events-none" />

          <h3 className="text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,15vw,15rem)] [-webkit-text-stroke:1px_#fe5d00] mt-6">
            LuxCar
          </h3>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
