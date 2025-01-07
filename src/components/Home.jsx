import Header from "./Header";
import banner from "../assets/lookgreatbanner.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />
      <Link to="/shop">
        <img src={banner} alt="Shop Banner" />
      </Link>
      <div className="flex justify-center">
        <Link to="/shop">
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-800"
          >
            Shop Now
          </button>
        </Link>
      </div>
    </>
  );
}
