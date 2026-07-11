"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
    <div
      className="relative flex items-center gap-2 cursor-pointer"
      ref={menuRef}
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatarUrl || "/assets/images/profile.png"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name + chevron */}
      <div
        className="flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm font-medium text-text-dark block whitespace-nowrap">
          {user.firstName} {user.lastName}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            fill="currentColor"
            className="text-text-dark"
            d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
          />
        </svg>
      </div>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-[6px] shadow-[0_4px_20px_rgba(108,126,147,0.2)] z-50 transition-colors duration-300">
          {/* User info header */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl || "/assets/images/profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-dark">
                {user.firstName} {user.lastName}
              </h4>
              <Link
                href="/feed"
                className="text-xs text-primary hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* Menu items */}
          <ul className="py-1">
            <li>
              <Link
                href="/feed"
                className="flex items-center justify-between px-4 py-3 text-sm text-text-dark hover:bg-bg-page transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#377DFF"
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    />
                  </svg>
                  Profile
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    fill="currentColor"
                    className="text-text-muted"
                    d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                    opacity=".5"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="/feed"
                className="flex items-center justify-between px-4 py-3 text-sm text-text-dark hover:bg-bg-page transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    fill="none"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fill="#377DFF"
                      d="M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.313.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17z"
                    />
                  </svg>
                  Settings
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    fill="currentColor"
                    className="text-text-muted"
                    d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                    opacity=".5"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="/feed"
                className="flex items-center justify-between px-4 py-3 text-sm text-text-dark hover:bg-bg-page transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="#377DFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 19a9 9 0 100-18 9 9 0 000 18z"
                    />
                    <path
                      stroke="#377DFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009"
                    />
                  </svg>
                  Help &amp; Support
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    fill="currentColor"
                    className="text-text-muted"
                    d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                    opacity=".5"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-text-dark hover:bg-bg-page transition-colors cursor-pointer"
                onClick={logout}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    fill="none"
                    viewBox="0 0 19 19"
                  >
                    <path
                      stroke="#377DFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667"
                    />
                  </svg>
                  Log Out
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="10"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    fill="currentColor"
                    className="text-text-muted"
                    d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                    opacity=".5"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
