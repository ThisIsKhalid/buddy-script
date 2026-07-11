"use client";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* ──── Mobile Bottom Navigation ──── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-[#DFDFDF]">
        <ul className="flex items-center justify-around px-2 py-2">
          <li>
            <a href="/feed" className="flex flex-col items-center gap-0.5 text-[#1890FF]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 27">
                <path fill="#1890FF" stroke="#1890FF" strokeWidth="1.5" d="M1 13.042c0-2.094 0-3.141.431-4.061.432-.92 1.242-1.602 2.862-2.965l1.571-1.321C8.792 2.232 10.256 1 12 1c1.744 0 3.208 1.232 6.136 3.695l1.572 1.321c1.62 1.363 2.43 2.044 2.86 2.965.432.92.432 1.967.432 4.06v6.54c0 2.908 0 4.362-.92 5.265-.921.904-2.403.904-5.366.904H7.286c-2.963 0-4.445 0-5.365-.904C1 23.944 1 22.49 1 19.581v-6.54z" />
                <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.07 18.497h5.857v7.253H9.07v-7.253z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="/feed" className="flex flex-col items-center gap-0.5 text-[rgba(0,0,0,0.6)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="none" viewBox="0 0 27 20">
                <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M13.334 12.405h.138l.31.001c2.364.015 7.768.247 7.768 3.81 0 3.538-5.215 3.769-7.732 3.784h-.932c-2.364-.015-7.77-.247-7.77-3.805 0-3.543 5.405-3.774 7.77-3.789l.31-.001h.138zm0 1.787c-2.91 0-6.38.348-6.38 2.003 0 1.619 3.263 1.997 6.114 2.018l.266.001c2.91 0 6.379-.346 6.379-1.998 0-1.673-3.469-2.024-6.38-2.024zM13.334 0c3.086 0 5.596 2.442 5.596 5.442 0 3.001-2.51 5.443-5.596 5.443H13.3a5.616 5.616 0 01-3.943-1.603A5.308 5.308 0 017.74 5.439C7.739 2.442 10.249 0 13.334 0z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
          <li>
            <a href="/feed" className="relative flex flex-col items-center gap-0.5 text-[rgba(0,0,0,0.6)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 25 27">
                <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M10.17 23.46c.671.709 1.534 1.098 2.43 1.098.9 0 1.767-.39 2.44-1.099.36-.377.976-.407 1.374-.067.4.34.432.923.073 1.3-1.049 1.101-2.428 1.708-3.886 1.708h-.003c-1.454-.001-2.831-.608-3.875-1.71a.885.885 0 01.072-1.298 1.01 1.01 0 011.374.068zM12.663 0c5.768 0 9.642 4.251 9.642 8.22 0 2.043.549 2.909 1.131 3.827.576.906 1.229 1.935 1.229 3.88-.453 4.97-5.335 5.375-12.002 5.375-6.067 0-11.55-.405-11.998-5.296-.004-2.024.649-3.053 1.225-3.959l.203-.324c.501-.814.928-1.7.928-3.502C3.022 4.25 6.897 0 12.664 0z" clipRule="evenodd" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#1890FF] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">6</span>
            </a>
          </li>
          <li>
            <a href="/feed" className="relative flex flex-col items-center gap-0.5 text-[rgba(0,0,0,0.6)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12.002 0c3.208 0 6.223 1.239 8.487 3.489 4.681 4.648 4.681 12.211 0 16.86-2.294 2.28-5.384 3.486-8.514 3.486-1.706 0-3.423-.358-5.03-1.097-.474-.188-.917-.366-1.235-.366-.366.003-.859.171-1.335.334-.976.333-2.19.748-3.09-.142-.895-.89-.482-2.093-.149-3.061.164-.477.333-.97.333-1.342 0-.306-.149-.697-.376-1.259C-1 12.417-.032 7.011 3.516 3.49A11.96 11.96 0 0112.002 0z" clipRule="evenodd" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#1890FF] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">2</span>
            </a>
          </li>
        </ul>
      </div>

      {/* ──── Main 3-column layout ──── */}
      <div className="w-full max-w-[1340px] mx-auto px-4 pt-[75px] pb-16 lg:pb-4">
        <div className="flex gap-4">

          {/* Left Sidebar */}
          <aside className="hidden lg:flex flex-col w-[25%] flex-shrink-0 h-[calc(100vh-85px)] overflow-y-auto scrollbar-hide gap-4 pt-4">

            {/* Explore */}
            <div className="bg-white rounded-[6px] px-6 pt-6 pb-2 shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)]">
              <h4 className="text-[#112032] font-semibold text-[15px] mb-6">Explore</h4>
              <ul className="space-y-1">
                {[
                  {
                    label: "Learning",
                    badge: "New",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <path fill="#666" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 1.395a8.605 8.605 0 100 17.21 8.605 8.605 0 000-17.21zm-1.233 4.65l.104.01c.188.028.443.113.668.203 1.026.398 3.033 1.746 3.8 2.563l.223.239.08.092a1.16 1.16 0 01.025 1.405c-.04.053-.086.105-.19.215l-.269.28c-.812.794-2.57 1.971-3.569 2.391-.277.117-.675.25-.865.253a1.167 1.167 0 01-1.07-.629c-.053-.104-.12-.353-.171-.586l-.051-.262c-.093-.57-.143-1.437-.142-2.347l.001-.288c.01-.858.063-1.64.157-2.147.037-.207.12-.563.167-.678.104-.25.291-.45.523-.575a1.15 1.15 0 01.58-.14z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Insights",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                        <path fill="#666" d="M14.96 2c3.101 0 5.159 2.417 5.159 5.893v8.214c0 3.476-2.058 5.893-5.16 5.893H6.989c-3.101 0-5.159-2.417-5.159-5.893V7.893C1.83 4.42 3.892 2 6.988 2h7.972z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Find friends",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                        <path fill="#666" d="M9.032 14.456l.297.002c4.404.041 6.907 1.03 6.907 3.678 0 2.586-2.383 3.573-6.615 3.654l-.589.005c-4.588 0-7.203-.972-7.203-3.68 0-2.704 2.604-3.659 7.203-3.659z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Bookmarks",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                        <path fill="#666" d="M13.704 2c2.8 0 4.585 1.435 4.585 4.258V20.33c0 .443-.157.867-.436 1.18-.279.313-.658.489-1.063.489a1.456 1.456 0 01-.708-.203l-5.132-3.134-5.112 3.14c-.615.36-1.361.194-1.829-.405l-.09-.126-.085-.155a1.913 1.913 0 01-.176-.786V6.434C3.658 3.5 5.404 2 8.243 2h5.46z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Group",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    ),
                  },
                  {
                    label: "Gaming",
                    badge: "New",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                        <path fill="#666" d="M7.625 2c.315-.015.642.306.645.69.003.309.234.558.515.558h.928c1.317 0 2.402 1.169 2.419 2.616v.24h2.604c2.911-.026 5.255 2.337 5.377 5.414.005.12.006.245.004.368v4.31c.062 3.108-2.21 5.704-5.064 5.773z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Settings",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#666" d="M12.616 2c.71 0 1.388.28 1.882.779.495.498.762 1.17.74 1.799l.009.147c.017.146.065.286.144.416.152.255.402.44.695.514.292.074.602.032.896-.137l.164-.082c1.23-.567 2.705-.117 3.387 1.043l.613 1.043a2.537 2.537 0 01-.884 3.204l-.257.159a1.093 1.093 0 00-.117.847c.078.287.27.53.56.695l.166.105a2.537 2.537 0 01.756 3.396l-.66 1.077-.1.152c-.774 1.092-2.279 1.425-3.427.776l-.136-.069a1.128 1.128 0 00-1.143 1.154l-.008.171C15.12 20.971 13.985 22 12.616 22h-1.235c-1.449 0-2.623-1.15-2.622-2.525z" />
                      </svg>
                    ),
                  },
                ].map(({ label, badge, icon }) => (
                  <li key={label} className="flex items-center justify-between py-2">
                    <a
                      href="#"
                      className="flex items-center gap-3 text-sm text-[#666666] hover:text-[#1890FF] transition-colors"
                    >
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{icon}</span>
                      {label}
                    </a>
                    {badge && (
                      <span className="text-[10px] font-semibold text-[#1890FF] bg-[#e8f4ff] px-2 py-0.5 rounded-full">
                        {badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested People */}
            <div className="bg-white rounded-[6px] px-6 pt-6 pb-4 shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)]">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[#112032] font-semibold text-[15px]">Suggested People</h4>
                <a href="#" className="text-[#1890FF] text-xs font-medium hover:underline">See All</a>
              </div>
              {[
                { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png" },
                { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "/assets/images/people2.png" },
                { name: "Dylan Field", role: "CEO of Figma", img: "/assets/images/people3.png" },
              ].map((person) => (
                <div key={person.name} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#112032] leading-tight">{person.name}</h4>
                      <p className="text-[11px] text-[#666666]">{person.role}</p>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-[12px] text-[#1890FF] font-medium border border-[#1890FF] rounded-[6px] px-3 py-1 hover:bg-[#1890FF] hover:text-white transition-colors"
                  >
                    Connect
                  </a>
                </div>
              ))}
            </div>

            {/* Recent Events */}
            <div className="bg-white rounded-[6px] px-6 pt-6 pb-4 shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[#112032] font-semibold text-[15px]">Recent Events</h4>
                <a href="#" className="text-[#1890FF] text-xs font-medium hover:underline">See All</a>
              </div>
              {[
                { day: "23", month: "Dec", title: "Graduation Ceremony 2026", going: 22, bgClass: "bg-[#1890FF] text-white" },
                { day: "14", month: "Jul", title: "No more terrorism no more cry", going: 17, bgClass: "bg-[#F0F2F5] text-[#112032]" },
              ].map((event) => (
                <a key={event.title} href="#" className="block mb-4">
                  <div className="flex gap-3 mb-3">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-[6px] flex flex-col items-center justify-center ${event.bgClass}`}>
                      <span className="text-lg font-bold leading-none">{event.day}</span>
                      <span className="text-[10px]">{event.month}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[13px] font-semibold text-[#112032] leading-snug">{event.title}</h4>
                    </div>
                  </div>
                  <div className="border-t border-[#DFDFDF] pt-2 flex items-center justify-between">
                    <p className="text-[12px] text-[#666666]">{event.going} People Going</p>
                    <a href="#" className="text-[12px] text-[#1890FF] font-medium hover:underline">Going</a>
                  </div>
                </a>
              ))}
            </div>
          </aside>

          {/* Middle column — feed content */}
          <main className="flex-1 min-w-0 h-[calc(100vh-85px)] overflow-y-auto scrollbar-hide pt-4">
            {children}
          </main>

          {/* Right Sidebar */}
          <aside className="hidden lg:flex flex-col w-[25%] flex-shrink-0 h-[calc(100vh-85px)] overflow-y-auto scrollbar-hide gap-4 pt-4">

            {/* You Might Like */}
            <div className="bg-white rounded-[6px] px-6 pt-6 pb-4 shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[#112032] font-semibold text-[15px]">You Might Like</h4>
                <a href="#" className="text-[#1890FF] text-xs font-medium hover:underline">See All</a>
              </div>
              <hr className="border-[#DFDFDF] mb-4" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/images/Avatar.png" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-semibold text-[#112032] truncate">Radovan SkillArena</h4>
                  <p className="text-[11px] text-[#666666] truncate">Founder &amp; CEO at Trophy</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button type="button" className="flex-1 py-1.5 text-[12px] text-[#666666] border border-[#DFDFDF] rounded-[6px] hover:bg-[#F0F2F5] transition-colors font-medium">Ignore</button>
                <button type="button" className="flex-1 py-1.5 text-[12px] text-white bg-[#1890FF] rounded-[6px] hover:bg-[#0e7fe6] transition-colors font-medium">Follow</button>
              </div>
            </div>

            {/* Your Friends */}
            <div className="bg-white rounded-[6px] px-6 pt-4 pb-2 shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[#112032] font-semibold text-[15px]">Your Friends</h4>
                <a href="#" className="text-[#1890FF] text-xs font-medium hover:underline">See All</a>
              </div>
              {/* Friends search */}
              <div className="relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 17 17">
                  <circle cx="7" cy="7" r="6" stroke="#666" />
                  <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                </svg>
                <input
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#F0F2F5] border border-[#DFDFDF] text-xs focus:outline-none focus:border-[#1890FF]"
                  type="search"
                  placeholder="Search friends..."
                />
              </div>
              {/* Friend items */}
              {[
                { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png", online: false, time: "5 mins ago" },
                { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "/assets/images/people2.png", online: true },
                { name: "Dylan Field", role: "CEO of Figma", img: "/assets/images/people3.png", online: true },
              ].map((friend) => (
                <div key={friend.name} className="flex items-center justify-between py-3 border-t border-[#F0F2F5] first:border-t-0">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={friend.img} alt={friend.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#112032] leading-tight">{friend.name}</h4>
                      <p className="text-[11px] text-[#666666]">{friend.role}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {friend.online ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 14 14">
                        <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
                      </svg>
                    ) : (
                      <span className="text-[10px] text-[#666666]">{friend.time}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
