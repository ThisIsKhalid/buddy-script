import PostComposer from "@/components/feed/PostComposer";
import FeedInfiniteScroll from "@/components/feed/FeedInfiniteScroll";

export default function FeedPage() {
  return (
    <>
      {/* Desktop Stories Row */}
      <div className="hidden lg:block bg-white rounded-[6px] mb-4 shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)] relative overflow-hidden">
        <div className="grid grid-cols-4 gap-0">
          {/* Your Story */}
          <div className="relative rounded-l-[6px] overflow-hidden" style={{ height: 180 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/card_ppl1.png" alt="Your story" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end pb-3">
              <div className="w-8 h-8 rounded-full bg-[#1890FF] flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path stroke="#fff" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
                </svg>
              </div>
              <p className="text-white text-xs font-medium">Your Story</p>
            </div>
          </div>
          {/* Other stories */}
          {[
            { img: "/assets/images/card_ppl2.png", name: "Ryan Roslansky", avatar: "/assets/images/mini_pic.png" },
            { img: "/assets/images/card_ppl3.png", name: "Steve Jobs", avatar: "/assets/images/mini_pic.png" },
            { img: "/assets/images/card_ppl4.png", name: "Dylan Field", avatar: "/assets/images/mini_pic.png" },
          ].map((story) => (
            <div key={story.name} className="relative overflow-hidden" style={{ height: 180 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-between p-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#1890FF]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={story.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-white text-xs font-medium">{story.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stories Row */}
      <div className="lg:hidden bg-white rounded-[6px] mb-4 shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)] overflow-x-auto scrollbar-hide">
        <ul className="flex gap-3 p-4">
          <li className="flex-shrink-0 flex flex-col items-center gap-1">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#1890FF]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/mobile_story_img.png" alt="Your Story" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#1890FF] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" viewBox="0 0 12 12">
                  <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                </svg>
              </div>
            </div>
            <span className="text-[11px] text-[#112032] font-medium">Your Story</span>
          </li>
          {[
            { img: "/assets/images/mobile_story_img1.png", name: "Ryan..." },
            { img: "/assets/images/mobile_story_img2.png", name: "Dylan..." },
          ].map((story) => (
            <li key={story.name} className="flex-shrink-0 flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1890FF]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={story.img} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] text-[#112032] font-medium">{story.name}</span>
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
