
import React from "react";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }: any) => {
  const router = useRouter();
  return (
    <div>
      <ToastContainer />
      {router.pathname === "/login" || router.pathname === "/sign-up" ? (
        <div>{children} </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header/>
              {children}
              <Footer />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
