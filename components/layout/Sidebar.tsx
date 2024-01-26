import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const classDashboard = ["/", "/home"].includes(router.pathname)
    ? "bg-blue-800 p-3"
    : "p-2";

  const classExperiments = ["/experiments"].includes(router.pathname)
    ? "bg-blue-800 p-3"
    : "p-2";

  return (
    <aside
      className="bg-gray-700 
    sm:w-1/3 
    md:w-1/6 
    xl:w-1/8
    sm:min-h-screen 
    p-7"
    >
      <div>
        <Link href="/home">
          <a className="text-white text-2xl font-black">NAVIKA APP</a>
        </Link>
      </div>
      <nav className="mt-5 list-none">
        <li className={classDashboard}>
          <Link href="/home">
            <a className="text-white mb-2 block">Home</a>
          </Link>
        </li>
        <li className={classExperiments}>
          <Link href="/experiments">
            <a className="text-white mb-2 block">Experiments</a>
          </Link>
        </li>
        <Link href="/sign-up">
          <a className="flex text-gray-500 p-4 text-sm  justify-center">
            Dont have an account? Sign up here
          </a>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
