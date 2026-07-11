"use client";

import PostComposer from "@/components/feed/PostComposer";
import FeedInfiniteScroll from "@/components/feed/FeedInfiniteScroll";

export default function FeedPage() {
  return (
    <>
      {/* ──── Desktop Stories Row ──── */}
      <div className="hidden lg:block relative mb-4">
        <div className="grid grid-cols-4 gap-4 relative">
          {/* Your Story */}
          <div className="relative h-[180px] rounded-[6px] overflow-hidden group cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/card_ppl1.png"
              alt="Your story"
              className="w-full h-full object-cover rounded-[6px]"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-[6px] group-hover:bg-black/60 transition-colors duration-200" />
            
            {/* Bottom Your Story wrapper */}
            <div className="absolute bottom-0 inset-x-0 bg-[#112032] rounded-t-[25.5px] rounded-b-[6px] pt-7 pb-2.5 flex flex-col items-center justify-end z-10">
              <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full border-2 border-[#112032] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path stroke="#fff" strokeWidth="1.5" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
                </svg>
              </div>
              <p className="text-white text-xs font-medium tracking-wide">Your Story</p>
            </div>
          </div>

          {/* Other stories */}
          {[
            { img: "/assets/images/card_ppl2.png", name: "Ryan Roslansky", avatar: "/assets/images/mini_pic.png" },
            { img: "/assets/images/card_ppl3.png", name: "Ryan Roslansky", avatar: "/assets/images/mini_pic.png" },
            { img: "/assets/images/card_ppl4.png", name: "Ryan Roslansky", avatar: "/assets/images/mini_pic.png" },
          ].map((story, idx) => (
            <div
              key={idx}
              className="relative h-[180px] rounded-[6px] overflow-hidden group cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.img}
                alt={story.name}
                className="w-full h-full object-cover rounded-[6px]"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-[6px] group-hover:bg-black/60 transition-colors duration-200" />

              {/* Top Right Mini Avatar */}
              <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full border-2 border-white dark:border-card overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={story.avatar} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Bottom name text */}
              <div className="absolute bottom-2.5 inset-x-0 text-white text-[12px] font-medium text-center z-10 truncate px-2">
                {story.name}
              </div>
            </div>
          ))}
        </div>

        {/* Right slide arrow button */}
        <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            className="w-6 h-6 rounded-full bg-primary border border-border dark:border-[#112032] flex items-center justify-center shadow-md cursor-pointer hover:bg-primary-dark transition-colors"
            onClick={() => alert("Load next stories (mock action)")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none" viewBox="0 0 9 8" className="translate-x-[0.5px]">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ──── Mobile Stories Row ──── */}
      <div className="lg:hidden bg-card rounded-[6px] mb-4 shadow-card overflow-x-auto scrollbar-hide border border-border transition-colors duration-300">
        <ul className="flex gap-4 p-4">
          <li className="flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/mobile_story_img.png" alt="Your Story" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" viewBox="0 0 12 12">
                  <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                </svg>
              </div>
            </div>
            <span className="text-[11px] text-text-dark font-medium">Your Story</span>
          </li>
          {[
            { img: "/assets/images/mobile_story_img1.png", name: "Ryan..." },
            { img: "/assets/images/mobile_story_img2.png", name: "Ryan..." },
            { img: "/assets/images/mobile_story_img1.png", name: "Ryan..." },
            { img: "/assets/images/mobile_story_img2.png", name: "Ryan..." },
          ].map((story, index) => (
            <li key={index} className="flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] text-text-dark font-medium">{story.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Post Composer */}
      <PostComposer />

      {/* Infinite Scroll Feed */}
      <FeedInfiniteScroll />
    </>
  );
}
