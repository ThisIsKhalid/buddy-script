"use client";

import Navbar from "@/components/layout/Navbar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFeed = pathname === "/feed" || pathname === "/";

  return (
    <div className="min-h-screen bg-bg-page flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* ──── Mobile Bottom Navigation ──── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border transition-colors duration-300">
        <ul className="flex items-center justify-around px-2 py-2">
          <li>
            <Link
              href="/feed"
              className={`flex flex-col items-center gap-0.5 ${isFeed ? "text-primary" : "text-text-muted"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 27"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M1 13.042c0-2.094 0-3.141.431-4.061.432-.92 1.242-1.602 2.862-2.965l1.571-1.321C8.792 2.232 10.256 1 12 1c1.744 0 3.208 1.232 6.136 3.695l1.572 1.321c1.62 1.363 2.43 2.044 2.86 2.965.432.92.432 1.967.432 4.06v6.54c0 2.908 0 4.362-.92 5.265-.921.904-2.403.904-5.366.904H7.286c-2.963 0-4.445 0-5.365-.904C1 23.944 1 22.49 1 19.581v-6.54z"
                />
                <path
                  fill="var(--color-card)"
                  stroke="var(--color-card)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.07 18.497h5.857v7.253H9.07v-7.253z"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/feed"
              className="flex flex-col items-center gap-0.5 text-text-muted hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="20"
                fill="none"
                viewBox="0 0 27 20"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M13.334 12.405h.138l.31.001c2.364.015 7.768.247 7.768 3.81 0 3.538-5.215 3.769-7.732 3.784h-.932c-2.364-.015-7.77-.247-7.77-3.805 0-3.543 5.405-3.774 7.77-3.789l.31-.001h.138zm0 1.787c-2.91 0-6.38.348-6.38 2.003 0 1.619 3.263 1.997 6.114 2.018l.266.001c2.91 0 6.379-.346 6.379-1.998 0-1.673-3.469-2.024-6.38-2.024zM13.334 0c3.086 0 5.596 2.442 5.596 5.442 0 3.001-2.51 5.443-5.596 5.443H13.3a5.616 5.616 0 01-3.943-1.603A5.308 5.308 0 017.74 5.439C7.739 2.442 10.249 0 13.334 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/feed"
              className="relative flex flex-col items-center gap-0.5 text-text-muted hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 25 27"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10.17 23.46c.671.709 1.534 1.098 2.43 1.098.9 0 1.767-.39 2.44-1.099.36-.377.976-.407 1.374-.067.4.34.432.923.073 1.3-1.049 1.101-2.428 1.708-3.886 1.708h-.003c-1.454-.001-2.831-.608-3.875-1.71a.885.885 0 01.072-1.298 1.01 1.01 0 011.374.068zM12.663 0c5.768 0 9.642 4.251 9.642 8.22 0 2.043.549 2.909 1.131 3.827.576.906 1.229 1.935 1.229 3.88-.453 4.97-5.335 5.375-12.002 5.375-6.067 0-11.55-.405-11.998-5.296-.004-2.024.649-3.053 1.225-3.959l.203-.324c.501-.814.928-1.7.928-3.502C3.022 4.25 6.897 0 12.664 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                6
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/feed"
              className="relative flex flex-col items-center gap-0.5 text-text-muted hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12.002 0c3.208 0 6.223 1.239 8.487 3.489 4.681 4.648 4.681 12.211 0 16.86-2.294 2.28-5.384 3.486-8.514 3.486-1.706 0-3.423-.358-5.03-1.097-.474-.188-.917-.366-1.235-.366-.366.003-.859.171-1.335.334-.976.333-2.19.748-3.09-.142-.895-.89-.482-2.093-.149-3.061.164-.477.333-.97.333-1.342 0-.306-.149-.697-.376-1.259C-1 12.417-.032 7.011 3.516 3.49A11.96 11.96 0 0112.002 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* ──── Main 3-column layout ──── */}
      <div className="w-full max-w-[1340px] mx-auto px-4 pt-[75px] pb-16 lg:pb-4 transition-colors duration-300">
        <div className="flex gap-4">
          {/* Left Sidebar */}
          <aside className="hidden lg:flex flex-col w-[25%] flex-shrink-0 h-[calc(100vh-85px)] overflow-y-auto scrollbar-hide gap-4 pt-4">
            {/* Explore */}
            <div className="bg-card rounded-[6px] px-6 pt-6 pb-2 shadow-card transition-colors duration-300">
              <h4 className="text-text-dark font-semibold text-[15px] mb-6">
                Explore
              </h4>
              <ul className="space-y-1">
                {[
                  {
                    label: "Learning",
                    badge: "New",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 1.395a8.605 8.605 0 100 17.21 8.605 8.605 0 000-17.21zm-1.233 4.65l.104.01c.188.028.443.113.668.203 1.026.398 3.033 1.746 3.8 2.563l.223.239.08.092a1.16 1.16 0 01.025 1.405c-.04.053-.086.105-.19.215l-.269.28c-.812.794-2.57 1.971-3.569 2.391-.277.117-.675.25-.865.253a1.167 1.167 0 01-1.07-.629c-.053-.104-.12-.353-.171-.586l-.051-.262c-.093-.57-.143-1.437-.142-2.347l.001-.288c.01-.858.063-1.64.157-2.147.037-.207.12-.563.167-.678.104-.25.291-.45.523-.575a1.15 1.15 0 01.58-.14zm.14 1.467l-.027.126-.034.198c-.07.483-.112 1.233-.111 2.036l.001.279c.009.737.053 1.414.123 1.841l.048.235.192-.07c.883-.372 2.636-1.56 3.23-2.2l.08-.087-.212-.218c-.711-.682-2.38-1.79-3.167-2.095l-.124-.045z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Insights",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                        <path fill="currentColor" d="M14.96 2c3.101 0 5.159 2.417 5.159 5.893v8.214c0 3.476-2.058 5.893-5.16 5.893H6.989c-3.101 0-5.159-2.417-5.159-5.893V7.893C1.83 4.42 3.892 2 6.988 2h7.972zm0 1.395H6.988c-2.37 0-3.883 1.774-3.883 4.498v8.214c0 2.727 1.507 4.498 3.883 4.498h7.972c2.375 0 3.883-1.77 3.883-4.498V7.893c0-2.727-1.508-4.498-3.883-4.498zM7.036 9.63c.323 0 .59.263.633.604l.005.094v6.382c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094v-6.382c0-.385.286-.697.638-.697zm3.97-3.053c.323 0 .59.262.632.603l.006.095v9.435c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094V7.274c0-.386.286-.698.638-.698zm3.905 6.426c.323 0 .59.262.632.603l.006.094v3.01c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094v-3.01c0-.385.286-.697.638-.697z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Find friends",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                        <path fill="currentColor" d="M9.032 14.456l.297.002c4.404.041 6.907 1.03 6.907 3.678 0 2.586-2.383 3.573-6.615 3.654l-.589.005c-4.588 0-7.203-.972-7.203-3.68 0-2.704 2.604-3.659 7.203-3.659zm0 1.5l-.308.002c-3.645.038-5.523.764-5.523 2.157 0 1.44 1.99 2.18 5.831 2.18 3.847 0 5.832-.728 5.832-2.159 0-1.44-1.99-2.18-5.832-2.18zm8.53-8.037c.347 0 .634.282.679.648l.006.102v1.255h1.185c.38 0 .686.336.686.75 0 .38-.258.694-.593.743l-.093.007h-1.185v1.255c0 .414-.307.75-.686.75-.347 0-.634-.282-.68-.648l-.005-.102-.001-1.255h-1.183c-.379 0-.686-.336-.686-.75 0-.38.258-.694.593-.743l.093-.007h1.183V8.669c0-.414.308-.75.686-.75zM9.031 2c2.698 0 4.864 2.369 4.864 5.319 0 2.95-2.166 5.318-4.864 5.318-2.697 0-4.863-2.369-4.863-5.318C4.17 4.368 6.335 2 9.032 2zm0 1.5c-1.94 0-3.491 1.697-3.491 3.819 0 2.12 1.552 3.818 3.491 3.818 1.94 0 3.492-1.697 3.492-3.818 0-2.122-1.551-3.818-3.492-3.818z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Bookmarks",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                        <path fill="currentColor" d="M13.704 2c2.8 0 4.585 1.435 4.585 4.258V20.33c0 .443-.157.867-.436 1.18-.279.313-.658.489-1.063.489a1.456 1.456 0 01-.708-.203l-5.132-3.134-5.112 3.14c-.615.36-1.361.194-1.829-.405l-.09-.126-.085-.155a1.913 1.913 0 01-.176-.786V6.434C3.658 3.5 5.404 2 8.243 2h5.46zm0 1.448h-5.46c-2.191 0-3.295.948-3.295 2.986V20.32c0 .044.01.088 0 .07l.034.063c.059.09.17.12.247.074l5.11-3.138c.38-.23.84-.23 1.222.001l5.124 3.128a.252.252 0 00.114.035.188.188 0 00.14-.064.236.236 0 00.058-.157V6.258c0-1.9-1.132-2.81-3.294-2.81zm.386 4.869c.357 0 .646.324.646.723 0 .367-.243.67-.559.718l-.087.006H7.81c-.357 0-.646-.324-.646-.723 0-.367.243-.67.558-.718l.088-.006h6.28z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Group",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
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
                        <path fill="currentColor" d="M7.625 2c.315-.015.642.306.645.69.003.309.234.558.515.558h.928c1.317 0 2.402 1.169 2.419 2.616v.24h2.604c2.911-.026 5.255 2.337 5.377 5.414.005.12.006.245.004.368v4.31c.062 3.108-2.21 5.704-5.064 5.773-.117.003-.228 0-.34-.005a199.325 199.325 0 01-7.516 0c-2.816.132-5.238-2.292-5.363-5.411a6.262 6.262 0 01-.004-.371V11.87c-.03-1.497.48-2.931 1.438-4.024.956-1.094 2.245-1.714 3.629-1.746a3.28 3.28 0 01.342.005l3.617-.001v-.231c-.008-.676-.522-1.23-1.147-1.23h-.93c-.973 0-1.774-.866-1.785-1.937-.003-.386.28-.701.631-.705zm-.614 5.494h-.084C5.88 7.52 4.91 7.987 4.19 8.812c-.723.823-1.107 1.904-1.084 3.045v4.34c-.002.108 0 .202.003.294.094 2.353 1.903 4.193 4.07 4.08 2.487.046 5.013.046 7.55-.001.124.006.212.007.3.004 2.147-.05 3.86-2.007 3.812-4.361V11.87a5.027 5.027 0 00-.002-.291c-.093-2.338-1.82-4.082-4.029-4.082l-.07.002H7.209a4.032 4.032 0 00-.281-.004l.084-.001zm1.292 4.091c.341 0 .623.273.667.626l.007.098-.001 1.016h.946c.372 0 .673.325.673.725 0 .366-.253.669-.582.717l-.091.006h-.946v1.017c0 .4-.3.724-.673.724-.34 0-.622-.273-.667-.626l-.006-.098v-1.017h-.945c-.372 0-.674-.324-.674-.723 0-.367.254-.67.582-.718l.092-.006h.945v-1.017c0-.4.301-.724.673-.724zm7.058 3.428c.372 0 .674.324.674.724 0 .366-.254.67-.582.717l-.091.007h-.09c-.373 0-.674-.324-.674-.724 0-.367.253-.67.582-.717l.091-.007h.09zm-1.536-3.322c.372 0 .673.324.673.724 0 .367-.253.67-.582.718l-.091.006h-.09c-.372 0-.674-.324-.674-.724 0-.366.254-.67.582-.717l.092-.007h.09z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Settings",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.616 2c.71 0 1.388.28 1.882.779.495.498.762 1.17.74 1.799l.009.147c.017.146.065.286.144.416.152.255.402.44.695.514.292.074.602.032.896-.137l.164-.082c1.23-.567 2.705-.117 3.387 1.043l.613 1.043c.017.027.03.056.043.085l.057.111a2.537 2.537 0 01-.884 3.204l-.257.159a1.102 1.102 0 00-.33.356 1.093 1.093 0 00-.117.847c.078.287.27.53.56.695l.166.105c.505.346.869.855 1.028 1.439.18.659.083 1.36-.272 1.957l-.66 1.077-.1.152c-.774 1.092-2.279 1.425-3.427.776l-.136-.069a1.19 1.19 0 00-.435-.1 1.128 1.128 0 00-1.143 1.154l-.008.171C15.12 20.971 13.985 22 12.616 22h-1.235c-1.449 0-2.623-1.15-2.622-2.525l-.008-.147a1.045 1.045 0 00-.148-.422 1.125 1.125 0 00-.688-.519c-.29-.076-.6-.035-.9.134l-.177.087a2.674 2.674 0 01-1.794.129 2.606 2.606 0 01-1.57-1.215l-.637-1.078-.085-.16a2.527 2.527 0 011.03-3.296l.104-.065c.309-.21.494-.554.494-.923 0-.401-.219-.772-.6-.989l-.156-.097a2.542 2.542 0 01-.764-3.407l.65-1.045a2.646 2.646 0 013.552-.96l.134.07c.135.06.283.093.425.094.626 0 1.137-.492 1.146-1.124l.009-.194a2.54 2.54 0 01.752-1.593A2.642 2.642 0 0111.381 2h1.235zm0 1.448h-1.235c-.302 0-.592.118-.806.328a1.091 1.091 0 00-.325.66l-.013.306C10.133 6.07 9 7.114 7.613 7.114a2.619 2.619 0 01-1.069-.244l-.192-.1a1.163 1.163 0 00-1.571.43l-.65 1.045a1.103 1.103 0 00.312 1.464l.261.162A2.556 2.556 0 015.858 12c0 .845-.424 1.634-1.156 2.13l-.156.096c-.512.29-.71.918-.472 1.412l.056.107.63 1.063c.147.262.395.454.688.536.26.072.538.052.754-.042l.109-.052a2.652 2.652 0 011.986-.261 2.591 2.591 0 011.925 2.21l.02.353c.062.563.548 1 1.14 1h1.234c.598 0 1.094-.45 1.14-1l.006-.11a2.536 2.536 0 01.766-1.823 2.65 2.65 0 011.877-.75c.35.009.695.086 1.048.241l.316.158c.496.213 1.084.058 1.382-.361l.073-.111.644-1.052a1.1 1.1 0 00-.303-1.455l-.273-.17a2.563 2.563 0 01-1.062-1.462 2.513 2.513 0 01.265-1.944c.19-.326.451-.606.792-.838l.161-.099c.512-.293.71-.921.473-1.417l-.07-.134-.013-.028-.585-.995a1.157 1.157 0 00-1.34-.513l-.111.044-.104.051a2.661 2.661 0 01-1.984.272 2.607 2.607 0 01-1.596-1.18 2.488 2.488 0 01-.342-1.021l-.014-.253a1.11 1.11 0 00-.323-.814 1.158 1.158 0 00-.823-.34zm-.613 5.284c1.842 0 3.336 1.463 3.336 3.268 0 1.805-1.494 3.268-3.336 3.268-1.842 0-3.336-1.463-3.336-3.268 0-1.805 1.494-3.268 3.336-3.268zm0 1.448c-1.026 0-1.858.815-1.858 1.82 0 1.005.832 1.82 1.858 1.82 1.026 0 1.858-.815 1.858-1.82 0-1.005-.832-1.82-1.858-1.82z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Save post",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-save">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                    ),
                  },
                ].map(({ label, badge, icon }) => (
                  <li
                    key={label}
                    className="flex items-center justify-between mb-6 last:mb-2"
                  >
                    <a
                      href="#"
                      className="flex items-center gap-3 text-sm text-text-muted dark:text-text-dark hover:text-primary transition-colors duration-200"
                    >
                      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                        {icon}
                      </span>
                      {label}
                    </a>
                    {badge && (
                      <span className="text-[13px] font-normal text-white bg-[#0ACF83] border-2 border-card rounded-[8px] w-9 h-6 flex items-center justify-center transition-colors duration-300 dark:border-[#0ACF83]">
                        {badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested People */}
            <div className="bg-card rounded-[6px] px-6 pt-6 pb-4 shadow-card transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-text-dark font-semibold text-[15px]">
                  Suggested People
                </h4>
                <a
                  href="#"
                  className="text-primary text-xs font-medium hover:underline"
                >
                  See All
                </a>
              </div>
              {[
                {
                  name: "Steve Jobs",
                  role: "CEO of Apple",
                  img: "/assets/images/people1.png",
                },
                {
                  name: "Ryan Roslansky",
                  role: "CEO of Linkedin",
                  img: "/assets/images/people2.png",
                },
                {
                  name: "Dylan Field",
                  role: "CEO of Figma",
                  img: "/assets/images/people3.png",
                },
              ].map((person) => (
                <div
                  key={person.name}
                  className="flex items-center justify-between mb-6 last:mb-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 border border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-text-dark leading-tight mb-0.5">
                        {person.name}
                      </h4>
                      <p className="text-[12px] text-text-muted dark:text-text-dark dark:opacity-75">
                        {person.role}
                      </p>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-[12px] font-medium leading-[1.4] rounded-[2px] px-3 py-[7px] text-[#959EAE] bg-card border border-[#DCDFE4] hover:bg-primary hover:border-primary hover:text-white dark:border-primary dark:bg-transparent dark:text-white dark:hover:bg-primary dark:hover:border-primary transition-all duration-200 text-center cursor-pointer flex-shrink-0"
                  >
                    Connect
                  </a>
                </div>
              ))}
            </div>

            {/* Events Card */}
            <div className="bg-card rounded-[6px] px-6 pt-6 pb-2 shadow-card transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-text-dark font-semibold text-[15px]">
                  Events
                </h4>
                <a
                  href="#"
                  className="text-primary text-xs font-medium hover:underline"
                >
                  See all
                </a>
              </div>
              {[
                {
                  day: "10",
                  month: "Jul",
                  title: "No more terrorism no more cry",
                  going: 17,
                  img: "/assets/images/feed_event1.png",
                },
                {
                  day: "10",
                  month: "Jul",
                  title: "No more terrorism no more cry",
                  going: 17,
                  img: "/assets/images/feed_event1.png",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="bg-card dark:bg-bg-page border border-border rounded-[6px] shadow-sm dark:shadow-none mb-4 overflow-hidden transition-colors duration-300"
                >
                  {/* Event Top Image */}
                  <div className="w-full h-[140px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Event Content info */}
                  <div className="flex items-center gap-3 px-4 pt-5 pb-3.5">
                    {/* Date Block */}
                    <div className="flex-shrink-0 bg-[#0acf83] rounded-[2px] w-[52px] py-2 text-center text-white flex flex-col justify-center items-center">
                      <span className="text-[18px] font-bold leading-none mb-0.5">
                        {event.day}
                      </span>
                      <span className="text-[14px] font-normal leading-none">
                        {event.month}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h4 className="text-[16px] font-medium text-text-dark leading-snug line-clamp-2">
                        {event.title}
                      </h4>
                    </div>
                  </div>

                  {/* Horizontal line */}
                  <hr className="border-t border-border/60 mx-4 my-1" />

                  {/* Event bottom details */}
                  <div className="flex items-center justify-between px-4 pb-3 pt-0.5">
                    <p className="text-[12px] font-medium text-text-muted/70">
                      {event.going} People Going
                    </p>
                    <a
                      href="#"
                      className="text-[12px] font-medium text-primary bg-[#F3F9FF] border border-primary dark:bg-transparent rounded-[2px] py-1 px-3.5 transition-colors duration-200 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-center cursor-pointer flex-shrink-0"
                    >
                      Going
                    </a>
                  </div>
                </div>
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
            <div className="bg-card rounded-[6px] px-6 pt-6 pb-4 shadow-card transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-text-dark font-semibold text-[15px]">
                  You Might Like
                </h4>
                <a
                  href="#"
                  className="text-primary text-xs font-medium hover:underline"
                >
                  See All
                </a>
              </div>
              <hr className="border-border mb-4 transition-colors duration-300" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/images/Avatar.png"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-semibold text-text-dark truncate">
                    Radovan SkillArena
                  </h4>
                  <p className="text-[11px] text-text-muted truncate">
                    Founder &amp; CEO at Trophy
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="flex-1 py-1.5 text-[12px] text-text-muted border border-border rounded-[6px] hover:bg-bg-page transition-all duration-200 font-medium cursor-pointer"
                >
                  Ignore
                </button>
                <button
                  type="button"
                  className="flex-1 py-1.5 text-[12px] text-white bg-primary rounded-[6px] hover:bg-primary-dark transition-colors duration-200 font-medium cursor-pointer"
                >
                  Follow
                </button>
              </div>
            </div>

            {/* Your Friends */}
            <div className="bg-card rounded-[6px] px-6 pt-4 pb-2 shadow-card transition-colors duration-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-text-dark font-semibold text-[15px]">
                  Your Friends
                </h4>
                <a
                  href="#"
                  className="text-primary text-xs font-medium hover:underline"
                >
                  See All
                </a>
              </div>
              {/* Friends search */}
              <div className="relative mb-4">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 17 17"
                >
                  <circle cx="7" cy="7" r="6" stroke="currentColor" />
                  <path stroke="currentColor" strokeLinecap="round" d="M16 16l-3-3" />
                </svg>
                <input
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-bg-page border border-border text-xs text-text-dark placeholder-[#666] focus:outline-none focus:border-primary transition-colors duration-300"
                  type="search"
                  placeholder="Search friends..."
                />
              </div>
              {/* Friend items */}
              {[
                {
                  name: "Steve Jobs",
                  role: "CEO of Apple",
                  img: "/assets/images/people1.png",
                  online: false,
                  time: "5 mins ago",
                },
                {
                  name: "Ryan Roslansky",
                  role: "CEO of Linkedin",
                  img: "/assets/images/people2.png",
                  online: true,
                },
                {
                  name: "Dylan Field",
                  role: "CEO of Figma",
                  img: "/assets/images/people3.png",
                  online: true,
                },
              ].map((friend) => (
                <div
                  key={friend.name}
                  className="flex items-center justify-between py-3 border-t border-border first:border-t-0 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={friend.img}
                        alt={friend.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-text-dark leading-tight">
                        {friend.name}
                      </h4>
                      <p className="text-[11px] text-text-muted">
                        {friend.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {friend.online ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <rect
                          width="12"
                          height="12"
                          x="1"
                          y="1"
                          fill="#0ACF83"
                          stroke="var(--color-card)"
                          strokeWidth="2"
                          rx="6"
                        />
                      </svg>
                    ) : (
                      <span className="text-[10px] text-text-muted">
                        {friend.time}
                      </span>
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
