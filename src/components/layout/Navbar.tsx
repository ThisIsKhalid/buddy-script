"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <>
      {/* ───────── Desktop Navbar ───────── */}
      <nav className="hidden lg:flex fixed top-0 inset-x-0 z-50 bg-white border-b border-[#DFDFDF] h-[65px] items-center">
        <div className="w-full max-w-[1340px] mx-auto px-4 flex items-center gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 mr-4">
            <Link href="/feed">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Search */}
          <div className="relative flex items-center ml-auto">
            <svg
              className="absolute left-3 text-[#666]"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              fill="none"
              viewBox="0 0 17 17"
            >
              <circle cx="7" cy="7" r="6" stroke="#666" />
              <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
            </svg>
            <input
              className="pl-10 pr-4 py-2 rounded-full bg-[#F0F2F5] border border-[#DFDFDF] text-sm text-[#112032] placeholder-[#666] focus:outline-none focus:border-[#1890FF] w-52"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
          </div>

          {/* Nav icons */}
          <ul className="flex items-center gap-1 ml-4">
            {/* Home */}
            <li>
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F0F2F5] transition-colors text-[rgba(0,0,0,0.6)]"
                href="/feed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" fill="none" viewBox="0 0 18 21">
                  <path stroke="#1890FF" strokeWidth="1.5" d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z" />
                  <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857" />
                </svg>
              </Link>
            </li>
            {/* Friends */}
            <li>
              <Link
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F0F2F5] transition-colors"
                href="/feed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="none" viewBox="0 0 26 20">
                  <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zm-17.685.735a.878.878 0 01-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .491.798.793a.873.873 0 01-.314 1.693.897.897 0 01-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 001.04 2.527 3.58 3.58 0 002.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75z" clipRule="evenodd" />
                </svg>
              </Link>
            </li>
            {/* Notifications */}
            <li>
              <span className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F0F2F5] transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
                  <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0z" clipRule="evenodd" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 bg-[#1890FF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">6</span>
              </span>
            </li>
            {/* Chat */}
            <li>
              <Link
                className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#F0F2F5] transition-colors"
                href="/feed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" fill="none" viewBox="0 0 23 22">
                  <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M11.43 0c2.96 0 5.743 1.143 7.833 3.22 4.32 4.29 4.32 11.271 0 15.562C17.145 20.886 14.293 22 11.405 22c-1.575 0-3.16-.33-4.643-1.012-.437-.174-.847-.338-1.14-.338-.338.002-.793.158-1.232.308-.9.307-2.022.69-2.852-.131-.826-.822-.445-1.932-.138-2.826.152-.44.307-.895.307-1.239 0-.282-.137-.642-.347-1.161C-.57 11.46.322 6.47 3.596 3.22A11.04 11.04 0 0111.43 0z" clipRule="evenodd" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 bg-[#1890FF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </Link>
            </li>
          </ul>

          {/* Profile dropdown */}
          <div className="ml-2 flex-shrink-0">
            <UserMenu />
          </div>
        </div>
      </nav>

      {/* ───────── Mobile Top Bar ───────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-[#DFDFDF] h-14 flex items-center px-4 gap-3">
        <Link href="/feed">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-7 w-auto" />
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[#666]">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
              <circle cx="7" cy="7" r="6" stroke="#666" />
              <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
            </svg>
          </span>
          {user && (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#DFDFDF]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || "/assets/images/profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
