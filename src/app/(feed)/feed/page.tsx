import PostComposer from "@/components/feed/PostComposer";
import FeedInfiniteScroll from "@/components/feed/FeedInfiniteScroll";

export default function FeedPage() {
  return (
    <>
      {/* Desktop Stories Row (For Design Fidelity) */}
      <div className="relative mb-4 hidden sm:block">
        <div className="grid grid-cols-4 gap-4">
          
          {/* Your Story card */}
          <div className="relative rounded-[6px] overflow-hidden aspect-[3/4] cursor-pointer group shadow-sm">
            <div className="absolute inset-0 bg-black/55 z-10 transition-opacity group-hover:bg-black/65"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/card_ppl1.png" alt="Your Story" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-[#112032] pt-6 pb-2 rounded-t-[25.5px] rounded-b-[6px] z-20 flex flex-col items-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <button className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white border-2 border-white cursor-pointer hover:bg-primary-hover transition-colors" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
                  </svg>
                </button>
              </div>
              <p className="text-white text-[11px] font-semibold m-0 mt-1">Your Story</p>
            </div>
          </div>

          {/* Public Story 1 */}
          <div className="relative rounded-[6px] overflow-hidden aspect-[3/4] cursor-pointer group shadow-sm">
            <div className="absolute inset-0 bg-black/45 z-10 transition-opacity group-hover:bg-black/55"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/card_ppl2.png" alt="Image" className="w-full h-full object-cover" />
            <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[11px] font-semibold z-20 m-0 truncate px-2">
              Ryan Roslansky
            </p>
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-primary overflow-hidden z-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/mini_pic.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Public Story 2 */}
          <div className="relative rounded-[6px] overflow-hidden aspect-[3/4] cursor-pointer group shadow-sm">
            <div className="absolute inset-0 bg-black/45 z-10 transition-opacity group-hover:bg-black/55"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/card_ppl3.png" alt="Image" className="w-full h-full object-cover" />
            <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[11px] font-semibold z-20 m-0 truncate px-2">
              Steve Jobs
            </p>
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-primary overflow-hidden z-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/mini_pic.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Public Story 3 */}
          <div className="relative rounded-[6px] overflow-hidden aspect-[3/4] cursor-pointer group shadow-sm">
            <div className="absolute inset-0 bg-black/45 z-10 transition-opacity group-hover:bg-black/55"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/card_ppl4.png" alt="Image" className="w-full h-full object-cover" />
            <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[11px] font-semibold z-20 m-0 truncate px-2">
              Dylan Field
            </p>
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-primary overflow-hidden z-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/mini_pic.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Stories Row (For Design Fidelity) */}
      <div className="mb-4 overflow-x-auto flex gap-3 pb-2 scrollbar-none sm:hidden">
        
        {/* Mobile Your Story */}
        <div className="relative rounded-[6px] overflow-hidden w-24 shrink-0 aspect-[3/4] cursor-pointer group shadow-sm">
          <div className="absolute inset-0 bg-black/55 z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/mobile_story_img.png" alt="Your Story" className="w-full h-full object-cover" />
          <div className="absolute bottom-2 left-0 right-0 z-20 flex flex-col items-center gap-1">
            <button className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white border border-white cursor-pointer" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" viewBox="0 0 12 12">
                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 2.5v7M2.5 6h7"/>
              </svg>
            </button>
            <p className="text-white text-[9px] font-semibold m-0">Your Story</p>
          </div>
        </div>

        {/* Mobile Story 1 */}
        <div className="relative rounded-[6px] overflow-hidden w-24 shrink-0 aspect-[3/4] cursor-pointer group shadow-sm">
          <div className="absolute inset-0 bg-black/45 z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/mobile_story_img1.png" alt="Image" className="w-full h-full object-cover" />
          <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[9px] font-semibold z-20 m-0 truncate px-1">
            Ryan...
          </p>
        </div>

        {/* Mobile Story 2 */}
        <div className="relative rounded-[6px] overflow-hidden w-24 shrink-0 aspect-[3/4] cursor-pointer group shadow-sm">
          <div className="absolute inset-0 bg-black/45 z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/mobile_story_img2.png" alt="Image" className="w-full h-full object-cover" />
          <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[9px] font-semibold z-20 m-0 truncate px-1">
            Dylan...
          </p>
        </div>

      </div>

      {/* Interactive Post Composer */}
      <PostComposer />

      {/* Infinite Scroll Feed */}
      <FeedInfiniteScroll />
    </>
  );
}
