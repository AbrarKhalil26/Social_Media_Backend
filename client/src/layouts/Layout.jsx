import { Detector, Offline, Online } from "react-detect-offline";
import AppNavbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AppFooter from "./Footer";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import GoTopBtn from "../components/shared/GoTopBtn";
import AppSidebar from "./Sidebar";

export default function Layout() {
  return (
    <main className="dark:bg-base dark:text-neutral-100 min-h-screen">
      <GoTopBtn />
      <div className="w-20 h-full fixed top-0 left-0 z-999999 rounded-full">
        {/* <AppNavbar /> */}
        <AppSidebar/>
      </div>
      <div className="min-h-screen ml-24 pt-15">
        {/* <Toast className="fixed top-19 right-3 z-50 shadow-lg shadow-gray-900">
          <Detector
            render={({ online }) => (
              <>
                <div
                  className={`${
                    online ? "normal" : "warning"
                  } flex items-center gap-3`}
                >
                  {online ? (
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                      <HiCheck className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                      <HiX className="h-5 w-5" />
                    </div>
                  )}
                  You are currently {online ? "online" : "offline"}
                </div>
                <ToastToggle />
              </>
            )}
          />
        </Toast> */}
        <Outlet />
      </div>
      {/* <AppFooter /> */}
    </main>
  );
}
