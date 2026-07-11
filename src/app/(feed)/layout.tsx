"use client";

import Navbar from "@/components/layout/Navbar";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-body-bg font-sans overflow-hidden flex flex-col">
      {/* Dynamic Navbar */}
      <Navbar />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border-color shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-2">
        <div className="max-w-md mx-auto px-6">
          <ul className="flex items-center justify-between list-none p-0 m-0">
            <li>
              <a href="/feed" className="p-2 text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" fill="none" viewBox="0 0 24 27">
                  <path fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.5" d="M1 13.042c0-2.094 0-3.141.431-4.061.432-.92 1.242-1.602 2.862-2.965l1.571-1.321C8.792 2.232 10.256 1 12 1c1.744 0 3.208 1.232 6.136 3.695l1.572 1.321c1.62 1.363 2.43 2.044 2.86 2.965.432.92.432 1.967.432 4.06v6.54c0 2.908 0 4.362-.92 5.265-.921.904-2.403.904-5.366.904H7.286c-2.963 0-4.445 0-5.365-.904C1 23.944 1 22.49 1 19.581v-6.54z"/>
                  <path fill="#fff" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.07 18.497h5.857v7.253H9.07v-7.253z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="/feed" className="p-2 text-muted hover:text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20">
                  <path fill="currentColor" fillOpacity=".6" fillRule="evenodd" d="M13.334 12.405h.138l.31.001c2.364.015 7.768.247 7.768 3.81 0 3.538-5.215 3.769-7.732 3.784h-.932c-2.364-.015-7.77-.247-7.77-3.805 0-3.543 5.405-3.774 7.77-3.789l.31-.001h.138zm0 1.787c-2.91 0-6.38.348-6.38 2.003 0 1.619 3.263 1.997 6.114 2.018l.266.001c2.91 0 6.379-.346 6.379-1.998 0-1.673-3.469-2.024-6.38-2.024zm9.742-2.27c2.967.432 3.59 1.787 3.59 2.849 0 .648-.261 1.83-2.013 2.48a.953.953 0 01-.327.058.919.919 0 01-.858-.575.886.886 0 01.531-1.153c.83-.307.83-.647.83-.81 0-.522-.682-.886-2.027-1.082a.9.9 0 01-.772-1.017c.074-.488.54-.814 1.046-.75zm-18.439.75a.9.9 0 01-.773 1.017c-1.345.196-2.027.56-2.027 1.082 0 .163 0 .501.832.81a.886.886 0 01.531 1.153.92.92 0 01-.858.575.953.953 0 01-.327-.058C.262 16.6 0 15.418 0 14.77c0-1.06.623-2.417 3.592-2.85.506-.061.97.263 1.045.751zM13.334 0c3.086 0 5.596 2.442 5.596 5.442 0 3.001-2.51 5.443-5.596 5.443H13.3a5.616 5.616 0 01-3.943-1.603A5.308 5.308 0 017.74 5.439C7.739 2.442 10.249 0 13.334 0zm0 1.787c-2.072 0-3.758 1.64-3.758 3.655-.003.977.381 1.89 1.085 2.58a3.772 3.772 0 002.642 1.076l.03.894v-.894c2.073 0 3.76-1.639 3.76-3.656 0-2.015-1.687-3.655-3.76-3.655zm7.58-.62c2.153.344 3.717 2.136 3.717 4.26-.004 2.138-1.647 3.972-3.82 4.269a.911.911 0 01-1.036-.761.897.897 0 01.782-1.01c1.273-.173 2.235-1.248 2.237-2.501 0-1.242-.916-2.293-2.179-2.494a.897.897 0 01-.756-1.027.917.917 0 011.055-.736zM6.81 1.903a.897.897 0 01-.757 1.027C4.79 3.13 3.874 4.182 3.874 5.426c.002 1.251.963 2.327 2.236 2.5.503.067.853.519.783 1.008a.912.912 0 01-1.036.762c-2.175-.297-3.816-2.131-3.82-4.267 0-2.126 1.563-3.918 3.717-4.262.515-.079.972.251 1.055.736z" clipRule="evenodd"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="/feed" className="relative p-2 text-muted hover:text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="none" viewBox="0 0 25 27">
                  <path fill="currentColor" fillOpacity=".6" fillRule="evenodd" d="M10.17 23.46c.671.709 1.534 1.098 2.43 1.098.9 0 1.767-.39 2.44-1.099.36-.377.976-.407 1.374-.067.4.34.432.923.073 1.3-1.049 1.101-2.428 1.708-3.886 1.708h-.003c-1.454-.001-2.831-.608-3.875-1.71a.885.885 0 01.072-1.298 1.01 1.01 0 011.374.068zM12.663 0c5.768 0 9.642 4.251 9.642 8.22 0 2.043.549 2.909 1.131 3.827.576.906 1.229 1.935 1.229 3.88-.453 4.97-5.335 5.375-12.002 5.375-6.067 0-11.55-.405-11.998-5.296-.004-2.024.649-3.053 1.225-3.959l.203-.324c.501-.814.928-1.7.928-3.502C3.022 4.25 6.897 0 12.664 0zm0 1.842C8.13 1.842 4.97 5.204 4.97 8.22c0 2.553-.75 3.733-1.41 4.774-.531.836-.95 1.497-.95 2.932.216 2.316 1.831 3.533 10.055 3.533 8.178 0 9.844-1.271 10.06-3.613-.004-1.355-.423-2.016-.954-2.852-.662-1.041-1.41-2.221-1.41-4.774 0-3.017-3.161-6.38-7.696-6.38z" clipRule="evenodd"/>
                </svg>
                <span className="absolute top-1 right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1.5 translate-y-[-1px]">6</span>
              </a>
            </li>
            <li>
              <a href="/feed" className="relative p-2 text-muted hover:text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" fillOpacity=".6" fillRule="evenodd" d="M12.002 0c3.208 0 6.223 1.239 8.487 3.489 4.681 4.648 4.681 12.211 0 16.86-2.294 2.28-5.384 3.486-8.514 3.486-1.706 0-3.423-.358-5.03-1.097-.474-.188-.917-.366-1.235-.366-.366.003-.859.171-1.335.334-.976.333-2.19.748-3.09-.142-.895-.89-.482-2.093-.149-3.061.164-.477.333-.97.333-1.342 0-.306-.149-.697-.376-1.259C-1 12.417-.032 7.011 3.516 3.49A11.96 11.96 0 0112.002 0zm.001 1.663a10.293 10.293 0 00-7.304 3.003A10.253 10.253 0 002.63 16.244c.261.642.514 1.267.514 1.917 0 .649-.225 1.302-.422 1.878-.163.475-.41 1.191-.252 1.349.156.16.881-.092 1.36-.255.576-.195 1.228-.42 1.874-.424.648 0 1.259.244 1.905.503 3.96 1.818 8.645.99 11.697-2.039 4.026-4 4.026-10.509 0-14.508a10.294 10.294 0 00-7.303-3.002zm4.407 9.607c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01zm-4.476 0c.616 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.121-1.11c0-.613.493-1.108 1.11-1.108h.01zm-4.477 0c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01z" clipRule="evenodd"/>
                </svg>
                <span className="absolute top-1 right-1 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center translate-x-1.5 translate-y-[-1px]">2</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Bottom Navigation End */}

      {/* Main Layout Grid */}
      <div className="w-full max-w-[1320px] mx-auto px-4 mt-[60px] lg:mt-0 pb-16 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 lg:pt-6">
          
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3 h-[calc(100vh-95px)] overflow-y-auto sticky top-[90px] pr-1 space-y-6">
            
            {/* Explore Section */}
            <div className="bg-white p-6 rounded-[6px] border border-border-color shadow-sm">
              <h4 className="text-sm font-semibold text-[#112032] mb-5 text-left">Explore</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                <li className="flex items-center justify-between">
                  <a href="#0" className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path fill="currentColor" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 1.395a8.605 8.605 0 100 17.21 8.605 8.605 0 000-17.21zm-1.233 4.65l.104.01c.188.028.443.113.668.203 1.026.398 3.033 1.746 3.8 2.563l.223.239.08.092a1.16 1.16 0 01.025 1.405c-.04.053-.086.105-.19.215l-.269.28c-.812.794-2.57 1.971-3.569 2.391-.277.117-.675.25-.865.253a1.167 1.167 0 01-1.07-.629c-.053-.104-.12-.353-.171-.586l-.051-.262c-.093-.57-.143-1.437-.142-2.347l.001-.288c.01-.858.063-1.64.157-2.147.037-.207.12-.563.167-.678.104-.25.291-.45.523-.575a1.15 1.15 0 01.58-.14zm.14 1.467l-.027.126-.034.198c-.07.483-.112 1.233-.111 2.036l.001.279c.009.737.053 1.414.123 1.841l.048.235.192-.07c.883-.372 2.636-1.56 3.23-2.2l.08-.087-.212-.218c-.711-.682-2.38-1.79-3.167-2.095l-.124-.045z" />
                    </svg>
                    Learning
                  </a>
                  <span className="bg-red-50 text-red-500 font-semibold text-[10px] px-1.5 py-0.5 rounded-[4px]">New</span>
                </li>
                <li>
                  <a href="#0" className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                      <path fill="currentColor" d="M14.96 2c3.101 0 5.159 2.417 5.159 5.893v8.214c0 3.476-2.058 5.893-5.16 5.893H6.989c-3.101 0-5.159-2.417-5.159-5.893V7.893C1.83 4.42 3.892 2 6.988 2h7.972zm0 1.395H6.988c-2.37 0-3.883 1.774-3.883 4.498v8.214c0 2.727 1.507 4.498 3.883 4.498h7.972c2.375 0 3.883-1.77 3.883-4.498V7.893c0-2.727-1.508-4.498-3.883-4.498zM7.036 9.63c.323 0 .59.263.633.604l.005.094v6.382c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094v-6.382c0-.385.286-.697.638-.697zm3.97-3.053c.323 0 .59.262.632.603l.006.095v9.435c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094V7.274c0-.386.286-.698.638-.698zm3.905 6.426c.323 0 .59.262.632.603l.006.094v3.01c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094v-3.01c0-.385.286-.697.638-.697z" />
                    </svg>
                    Insights
                  </a>
                </li>
              </ul>
            </div>

            {/* Shortcuts Section */}
            <div className="bg-white p-6 rounded-[6px] border border-border-color shadow-sm">
              <h4 className="text-sm font-semibold text-[#112032] mb-5 text-left">Shortcuts</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                <li>
                  <a href="#0" className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-primary transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/f1.png" alt="" className="w-5 h-5 object-contain" />
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#0" className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-primary transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/f2.png" alt="" className="w-5 h-5 object-contain" />
                    Videos
                  </a>
                </li>
                <li>
                  <a href="#0" className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-primary transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/f3.png" alt="" className="w-5 h-5 object-contain" />
                    Groups
                  </a>
                </li>
                <li>
                  <a href="#0" className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-primary transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/f4.png" alt="" className="w-5 h-5 object-contain" />
                    Events
                  </a>
                </li>
                <li>
                  <a href="#0" className="flex items-center gap-3 text-sm text-[#4A5568] hover:text-primary transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/f5.png" alt="" className="w-5 h-5 object-contain" />
                    Pages
                  </a>
                </li>
              </ul>
            </div>

            {/* Events Section */}
            <div className="bg-white p-6 rounded-[6px] border border-border-color shadow-sm">
              <h4 className="text-sm font-semibold text-[#112032] mb-5 text-left">Recent Event</h4>
              <div className="flex flex-col gap-4">
                
                {/* Event 1 */}
                <a href="#0" className="group">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#1890FF] text-white p-2 rounded-[6px] flex flex-col items-center justify-center w-12 shrink-0">
                      <h4 className="text-sm font-bold m-0 leading-none">23</h4>
                      <p className="text-[10px] m-0">Dec</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#112032] group-hover:text-primary transition-colors line-clamp-2 text-left">
                        Graduation Ceremony 2026
                      </h4>
                    </div>
                  </div>
                  <hr className="border-t border-[#F5F5F5] my-2" />
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span>22 People Going</span>
                    <span className="text-primary font-medium">Going</span>
                  </div>
                </a>

                {/* Event 2 */}
                <a href="#0" className="group">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#e8f4ff] text-primary p-2 rounded-[6px] flex flex-col items-center justify-center w-12 shrink-0">
                      <h4 className="text-sm font-bold m-0 leading-none">14</h4>
                      <p className="text-[10px] m-0">Jul</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#112032] group-hover:text-primary transition-colors line-clamp-2 text-left">
                        No more terrorism no more cry
                      </h4>
                    </div>
                  </div>
                  <hr className="border-t border-[#F5F5F5] my-2" />
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span>17 People Going</span>
                    <span className="text-primary font-medium">Going</span>
                  </div>
                </a>

              </div>
            </div>

          </div>

          {/* Center Feed Column */}
          <div className="col-span-12 lg:col-span-6 h-[calc(100vh-95px)] overflow-y-auto px-1">
            {children}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3 h-[calc(100vh-95px)] overflow-y-auto sticky top-[90px] pl-1 space-y-6">
            
            {/* Recommendations */}
            <div className="bg-white p-6 rounded-[6px] border border-border-color shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-[#F5F5F5] pb-2">
                <h4 className="text-sm font-semibold text-[#112032] m-0">You Might Like</h4>
                <a href="#0" className="text-xs text-primary hover:underline font-medium">See All</a>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/Avatar.png" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden text-left">
                    <h5 className="text-xs font-semibold text-[#112032] truncate m-0">
                      Radovan SkillArena
                    </h5>
                    <p className="text-[10px] text-muted truncate m-0 mt-0.5">Founder & CEO at Trophy</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full pt-1">
                  <button
                    type="button"
                    className="flex-1 py-1.5 text-center text-[11px] font-medium text-[#4A5568] bg-light-gray hover:bg-gray-200 rounded-[6px] transition-colors border-none"
                    onClick={() => alert("Ignored recommendation (mock)")}
                  >
                    Ignore
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-1.5 text-center text-[11px] font-medium text-white bg-primary hover:bg-primary-hover hover:shadow-sm rounded-[6px] transition-all border-none"
                    onClick={() => alert("Followed user (mock)")}
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>

            {/* Active Friends List */}
            <div className="bg-white p-6 rounded-[6px] border border-border-color shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-[#112032] m-0">Your Friends</h4>
                <a href="#0" className="text-xs text-primary hover:underline font-medium">See All</a>
              </div>

              {/* Search Friends Form */}
              <div className="relative w-full mb-4">
                <form className="relative" onSubmit={(e) => e.preventDefault()}>
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 17 17">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M16 16l-3-3" />
                    </svg>
                  </span>
                  <input
                    className="w-full h-8 bg-light-gray rounded-[6px] pl-9 pr-3 text-[11px] text-[#2D3748] placeholder-muted border border-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    type="search"
                    placeholder="Search friends..."
                  />
                </form>
              </div>

              {/* Friends Rows */}
              <div className="flex flex-col divide-y divide-[#F5F5F5]">
                {/* Friend 1 */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-full overflow-hidden border shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/people1.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <h5 className="text-xs font-semibold text-[#112032] truncate m-0">Steve Jobs</h5>
                      <p className="text-[10px] text-muted truncate m-0">CEO of Apple</p>
                    </div>
                  </div>
                  <span className="text-[9px] text-muted shrink-0 pl-1">5m ago</span>
                </div>

                {/* Friend 2 */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-full overflow-hidden border shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/people2.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <h5 className="text-xs font-semibold text-[#112032] truncate m-0">Ryan Roslansky</h5>
                      <p className="text-[10px] text-muted truncate m-0">CEO of Linkedin</p>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0 pl-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 14 14">
                      <rect width="10" height="10" x="2" y="2" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="5" />
                    </svg>
                  </div>
                </div>

                {/* Friend 3 */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-full overflow-hidden border shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/people3.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <h5 className="text-xs font-semibold text-[#112032] truncate m-0">Dylan Field</h5>
                      <p className="text-[10px] text-muted truncate m-0">CEO of Figma</p>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0 pl-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 14 14">
                      <rect width="10" height="10" x="2" y="2" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="5" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
