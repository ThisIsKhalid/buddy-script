"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative flex items-center font-sans" ref={menuRef}>
      {/* Avatar Image Trigger */}
      <div
        className="w-9 h-9 rounded-full overflow-hidden border border-border-color cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl || "/assets/images/profile.png"}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name and Chevron Trigger */}
      <div
        className="flex items-center gap-2 cursor-pointer ml-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm font-medium text-[#112032] m-0 hidden md:block">
          {user.firstName} {user.lastName}
        </p>
        <button
          className="bg-transparent border-none p-0 flex items-center text-[#112032] cursor-pointer"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
            <path
              fill="currentColor"
              d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
            />
          </svg>
        </button>
      </div>

      {/* Profile Dropdown Popover */}
      {isOpen && (
        <div
          className="absolute right-0 top-[50px] w-[260px] bg-white border border-border-color rounded-[6px] shadow-lg py-5 px-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ display: "block" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-border-color shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || "/assets/images/profile.png"}
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-[#1A202C] truncate m-0 text-left">
                {user.firstName} {user.lastName}
              </h4>
              <Link
                href="/feed"
                className="text-xs text-primary hover:underline block text-left"
                onClick={() => setIsOpen(false)}
              >
                View Profile
              </Link>
            </div>
          </div>
          
          <hr className="border-t border-border-color my-3" />
          
          <ul className="list-none m-0 p-0 flex flex-col gap-1">
            <li>
              <Link
                href="/feed"
                className="flex items-center gap-3 py-2 text-sm text-[#4A5568] hover:text-primary transition-all text-left"
                onClick={() => setIsOpen(false)}
              >
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none" viewBox="0 0 18 19">
                    <path
                      fill="#377DFF"
                      d="M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.313.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17zm0 1.375h-1.17c-.287 0-.562.113-.764.312-.179.177-.288.41-.308.628l-.012.29c-.098 1.262-1.172 2.253-2.486 2.253a2.475 2.475 0 01-1.013-.231l-.182-.095a1.1 1.1 0 00-1.488.407l-.616.993a1.05 1.05 0 00.296 1.392l.247.153A2.43 2.43 0 013.181 9.5c0 .802-.401 1.552-1.095 2.023l-.147.091c-.486.276-.674.873-.448 1.342l.053.102.597 1.01c.14.248.374.431.652.509.246.069.51.05.714-.04l.103-.05a2.506 2.506 0 011.882-.248 2.456 2.456 0 011.823 2.1l.02.335c.059.535.52.95c.56.01 1.03-.42 1.08-.94l.005-.1a2.41 2.41 0 01.73-1.73c.47-.47 1.1-.72 1.78-.71c.33 0 .66.08.99.23l.3.15c.47.2 1.03.05 1.31-.34l.07-.11.61-1a1.05 1.05 0 00-.29-1.38l-.26-.16a2.43 2.43 0 01-1.01-1.39a2.39 2.39 0 01.25-1.85c.18-.31.43-.57.75-.79l.15-.1c.49-.27.67-.87.45-1.34l-.07-.13-.01-.03-.56-.94a1.1 1.1 0 00-1.27-.49l-.1.04-.1.05a2.51 2.51 0 01-1.88.26a2.47 2.47 0 01-1.51-1.12a2.37 2.37 0 01-.33-.97l-.01-.24a1.06 1.06 0 00-.31-.77a1.1 1.1 0 00-.78-.32zm-.58 5.02c1.74 0 3.16 1.39 3.16 3.11s-1.42 3.11-3.16 3.11c-1.74 0-3.16-1.39-3.16-3.11s1.42-3.11 3.16-3.11zm0 1.38c-.97 0-1.76.77-1.76 1.73s.79 1.73 1.76 1.73s1.76-.77 1.76-1.73s-.79-1.73-1.76-1.73z"
                    />
                  </svg>
                </span>
                Settings
              </Link>
            </li>
            <li>
              <button
                className="flex items-center gap-3 py-2 text-sm text-[#4A5568] hover:text-primary transition-all text-left w-full bg-transparent border-none p-0 cursor-pointer"
                onClick={logout}
                type="button"
              >
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                    <path
                      stroke="#377DFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667"
                    />
                  </svg>
                </span>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
