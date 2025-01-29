import  { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Dashboard from '@/pages/Dashboard';
import StudentForm from '@/components/students/StudentForm';
import { useUser } from "@/context/UserContext";
import UserBadge from "./userBadge";

type PageType = "dashboard" | "students" | "settings" | "logout";

interface Link {
  label: string;
  href: string;
  icon: JSX.Element;
  page: PageType;
}

export function SidebarComponenet() {
  const {user} = useUser();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  const links: Link[] = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      page: "dashboard",
    },
    {
      label: "Students",
      href: "/students",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      page: "students",
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      page: "settings",
    },
    
  ];

  const handleLinkClick = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} >
        <SidebarBody className="justify-between gap-10 ">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => handleLinkClick(link.page)}
                />
              ))}
            </div>
          </div>
          
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-y-auto">
        <div className="sticky  top-0 z-10 bg-white/10 backdrop-blur-md p-4 flex justify-between">
          <h1 className="text-lg font-semibold">Hello, {user?.firstName} Welcome Back! 👋</h1>
          <UserBadge/>
        </div>
        <Content currentPage={currentPage} />
      </div>
    </div>
  );
}

const Content = ({ currentPage }: { currentPage: PageType }) => {
  switch (currentPage) {
    case "dashboard":
      return <DashboardPage />;
    case "students":
      return <StudentsPage />;
    case "settings":
      return <div>Settings Page</div>;
    case "logout":
      return <div>Logout Page</div>;
    default:
      return <DashboardPage />;
  }
};

const DashboardPage = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:px-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-screen">
        <div className="mt-8">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

const StudentsPage = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:px-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-screen">
        <div className="mt-8">
          <StudentForm />
        </div>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-10 w-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="student-work-on-laptop">
          <path d="M42.23,31.67a5,5,0,0,0-3.62-4.39L28,24.25v-2.2A9,9,0,0,0,33,14a3.49,3.49,0,0,0,0-6.9V2h5a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2h1V5a1,1,0,0,0,2,0V2h2V7.05A3.49,3.49,0,0,0,15,14a9,9,0,0,0,5,8.1v2.2l-10.62,3a5,5,0,0,0-3.61,4.39C4.84,42.85,5,40,5,44a4,4,0,0,0,4,4H39a4,4,0,0,0,4-4C43,40,43.17,43,42.23,31.67Zm-2,.16L40.91,40H36.5c.66-9.26,1.9-8-9.32-8,.34-2.05,0-.77,1.05-1,.61-.14.53-.26,2.42-3.89l7.41,2.12A3,3,0,0,1,40.23,31.83ZM13.07,34H34.93l-.86,12H13.93Zm10.27-5.17a1,1,0,0,0,1,.19c.43-.18-.05-.43,1.19.47L25.15,32h-2.3l-.42-2.51Zm5.35-2.31-1,2-1.57-1.13,1.22-1.26ZM33,11.91V9.09A1.5,1.5,0,0,1,33,11.91ZM31,2V7H17V2ZM15,9.09v2.82A1.5,1.5,0,0,1,15,9.09ZM17,14V9H31v5a7,7,0,0,1-14,0Zm9,8.77v1.82l-2,2.06-2-2.06V22.77A8.72,8.72,0,0,0,26,22.77Zm-5.3,3.36,1.22,1.26-1.57,1.13-1-2ZM7.77,31.83A3,3,0,0,1,9.94,29.2l7.41-2.12c1.9,3.64,1.83,3.75,2.42,3.89,1.05.26.71-1,1.05,1-11.16,0-10-1.31-9.32,8H7.09ZM7,44V42h4.64l.29,4H9A2,2,0,0,1,7,44Zm34,0a2,2,0,0,1-2,2H36.07l.29-4H41Z"></path>
        </svg>
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Student Base
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-10 w-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="student-work-on-laptop">
          <path d="M42.23,31.67a5,5,0,0,0-3.62-4.39L28,24.25v-2.2A9,9,0,0,0,33,14a3.49,3.49,0,0,0,0-6.9V2h5a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2h1V5a1,1,0,0,0,2,0V2h2V7.05A3.49,3.49,0,0,0,15,14a9,9,0,0,0,5,8.1v2.2l-10.62,3a5,5,0,0,0-3.61,4.39C4.84,42.85,5,40,5,44a4,4,0,0,0,4,4H39a4,4,0,0,0,4-4C43,40,43.17,43,42.23,31.67Zm-2,.16L40.91,40H36.5c.66-9.26,1.9-8-9.32-8,.34-2.05,0-.77,1.05-1,.61-.14.53-.26,2.42-3.89l7.41,2.12A3,3,0,0,1,40.23,31.83ZM13.07,34H34.93l-.86,12H13.93Zm10.27-5.17a1,1,0,0,0,1,.19c.43-.18-.05-.43,1.19.47L25.15,32h-2.3l-.42-2.51Zm5.35-2.31-1,2-1.57-1.13,1.22-1.26ZM33,11.91V9.09A1.5,1.5,0,0,1,33,11.91ZM31,2V7H17V2ZM15,9.09v2.82A1.5,1.5,0,0,1,15,9.09ZM17,14V9H31v5a7,7,0,0,1-14,0Zm9,8.77v1.82l-2,2.06-2-2.06V22.77A8.72,8.72,0,0,0,26,22.77Zm-5.3,3.36,1.22,1.26-1.57,1.13-1-2ZM7.77,31.83A3,3,0,0,1,9.94,29.2l7.41-2.12c1.9,3.64,1.83,3.75,2.42,3.89,1.05.26.71-1,1.05,1-11.16,0-10-1.31-9.32,8H7.09ZM7,44V42h4.64l.29,4H9A2,2,0,0,1,7,44Zm34,0a2,2,0,0,1-2,2H36.07l.29-4H41Z"></path>
        </svg>
      </div>
    </Link>
  );
};