import logo from "../assets/lookgreat.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className="bg-white antialiased border-b-2 border-black-500">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="shrink-0">
                <Link to="/" title="home" className="">
                  <img className="block w-auto h-8" src={logo} alt="" />
                </Link>
              </div>

              <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
                <li>
                  <Link
                    to="/"
                    title="Home"
                    className="flex text-sm font-medium text-gray-900 hover:text-primary-700"
                  >
                    Home
                  </Link>
                </li>
                <li className="shrink-0">
                  <Link
                    to="/shop"
                    title="shop"
                    className="text-sm font-medium text-gray-900 hover:text-primary-700 "
                  >
                    Shop
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex items-center lg:space-x-2">
              <Link
                to="/cart"
                id="myCartDropdownButton1"
                data-dropdown-toggle="myCartDropdown1"
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 text-sm font-medium leading-none text-gray-900"
              >
                <span className="sr-only">Cart</span>
                <svg
                  className="w-5 h-5 lg:me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
