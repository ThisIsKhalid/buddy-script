"use client";

import { useState, useRef } from "react";
import PostComposer from "@/components/feed/PostComposer";
import FeedInfiniteScroll from "@/components/feed/FeedInfiniteScroll";

export default function FeedPage() {
  const [storyImage, setStoryImage] = useState("/assets/images/card_ppl1.png");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingImage, setPendingImage] = useState("");

  const [publicStories] = useState([
    { img: "/assets/images/card_ppl2.png", name: "Ryan Roslansky", avatar: "/assets/images/mini_pic.png" },
    { img: "/assets/images/card_ppl3.png", name: "Dylan Field", avatar: "/assets/images/mini_pic.png" },
    { img: "/assets/images/card_ppl4.png", name: "Steve Jobs", avatar: "/assets/images/mini_pic.png" },
    { img: "/assets/images/card_ppl2.png", name: "Ryan Roslansky", avatar: "/assets/images/mini_pic.png" },
    { img: "/assets/images/card_ppl3.png", name: "Dylan Field", avatar: "/assets/images/mini_pic.png" },
    { img: "/assets/images/card_ppl4.png", name: "Steve Jobs", avatar: "/assets/images/mini_pic.png" },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleMobileScroll = (direction: "left" | "right") => {
    if (mobileScrollRef.current) {
      const scrollAmount = 200;
      mobileScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const openUpdateModal = () => {
    setPendingImage(storyImage);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPendingImage(url);
    }
  };

  const handleSaveStory = () => {
    if (pendingImage.trim() !== "") {
      setStoryImage(pendingImage);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      {/* ──── Desktop Stories Row ──── */}
      <div className="hidden lg:block relative mb-4">
        {/* Left slide arrow button */}
        <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-primary border border-border dark:border-[#112032] flex items-center justify-center shadow-md cursor-pointer hover:bg-primary-dark transition-all duration-200"
            onClick={() => handleScroll("left")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none" viewBox="0 0 9 8" className="rotate-180">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>

        {/* Stories container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth w-full select-none"
        >
          {/* Your Story card */}
          <div
            onClick={openUpdateModal}
            className="w-[140px] h-[180px] flex-shrink-0 relative rounded-[6px] overflow-hidden group cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={storyImage}
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
          {publicStories.map((story, idx) => (
            <div
              key={idx}
              className="w-[140px] h-[180px] flex-shrink-0 relative rounded-[6px] overflow-hidden group cursor-pointer"
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
        <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-primary border border-border dark:border-[#112032] flex items-center justify-center shadow-md cursor-pointer hover:bg-primary-dark transition-all duration-200"
            onClick={() => handleScroll("right")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none" viewBox="0 0 9 8" className="translate-x-[0.5px]">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ──── Mobile Stories Row ──── */}
      <div className="lg:hidden bg-card rounded-[6px] p-4 shadow-card border border-border transition-colors duration-300 relative mb-4">
        {/* Left slide arrow button */}
        <div className="absolute left-[5px] top-[40%] -translate-y-1/2 z-20">
          <button
            type="button"
            className="w-6 h-6 rounded-full bg-primary border border-border dark:border-[#112032] flex items-center justify-center shadow-md cursor-pointer hover:bg-primary-dark transition-all duration-200"
            onClick={() => handleMobileScroll("left")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="none" viewBox="0 0 9 8" className="rotate-180">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>

        {/* Stories container */}
        <div
          ref={mobileScrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth w-full select-none"
        >
          {/* Your Story card (Circle style) */}
          <div
            onClick={openUpdateModal}
            className="flex-shrink-0 flex flex-col items-center cursor-pointer"
          >
            <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={storyImage}
                alt="Your Story"
                className="w-full h-full object-cover rounded-full"
              />
              {/* dark overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-full" />
              
              {/* Plus button centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-primary border border-card rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" viewBox="0 0 12 12">
                    <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                  </svg>
                </div>
              </div>
            </div>
            <span className="text-[12px] text-primary font-medium mt-3 text-center leading-none">Your Story</span>
          </div>

          {/* Other stories */}
          {[
            { img: "/assets/images/mobile_story_img1.png", name: "Ryan...", active: true },
            { img: "/assets/images/mobile_story_img2.png", name: "Ryan...", active: false },
            { img: "/assets/images/mobile_story_img1.png", name: "Ryan...", active: true },
            { img: "/assets/images/mobile_story_img2.png", name: "Ryan...", active: false },
            { img: "/assets/images/mobile_story_img1.png", name: "Ryan...", active: true },
            { img: "/assets/images/mobile_story_img2.png", name: "Ryan...", active: false },
          ].map((story, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer"
            >
              <div
                className={`w-[60px] h-[60px] rounded-full overflow-hidden border-[3px] p-[1px] ${
                  story.active ? "border-primary" : "border-[#C5C5C5]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.img}
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-[11px] text-text-muted dark:text-text-dark font-medium mt-3 text-center leading-none">
                {story.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right slide arrow button */}
        <div className="absolute right-[5px] top-[40%] -translate-y-1/2 z-20">
          <button
            type="button"
            className="w-6 h-6 rounded-full bg-primary border border-border dark:border-[#112032] flex items-center justify-center shadow-md cursor-pointer hover:bg-primary-dark transition-all duration-200"
            onClick={() => handleMobileScroll("right")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="none" viewBox="0 0 9 8" className="translate-x-[0.5px]">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Story Upload/Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-[8px] max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-text-dark font-semibold text-lg mb-2">
              Update Your Story
            </h3>
            <p className="text-text-muted text-xs mb-4">
              Select a preset image, upload a file, or enter an image URL to update your story card.
            </p>

            {/* Presets */}
            <div className="mb-4">
              <label className="text-text-dark text-xs font-semibold block mb-2">
                Preset Library
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  "/assets/images/card_ppl1.png",
                  "/assets/images/card_ppl2.png",
                  "/assets/images/card_ppl3.png",
                  "/assets/images/card_ppl4.png"
                ].map((imgUrl) => (
                  <button
                    key={imgUrl}
                    type="button"
                    onClick={() => setPendingImage(imgUrl)}
                    className={`relative aspect-[3/4] rounded-[4px] overflow-hidden border-2 cursor-pointer transition-all ${
                      pendingImage === imgUrl ? "border-primary scale-95" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt="Preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label className="text-text-dark text-xs font-semibold block mb-1">
                Upload Custom Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-text-muted file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary file:cursor-pointer hover:file:bg-primary/20"
              />
            </div>

            {/* URL Input */}
            <div className="mb-6">
              <label className="text-text-dark text-xs font-semibold block mb-1">
                Or Image URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={pendingImage}
                onChange={(e) => setPendingImage(e.target.value)}
                className="w-full h-9 px-3 rounded bg-bg-page border border-border text-xs text-text-dark placeholder-[#8C8F95] focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-bg-page border border-border text-xs font-medium text-text-muted hover:bg-border/20 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveStory}
                className="px-4 py-2 rounded bg-primary text-xs font-medium text-white hover:bg-primary-dark cursor-pointer transition-colors"
              >
                Save Story
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Composer */}
      <PostComposer />

      {/* Infinite Scroll Feed */}
      <FeedInfiniteScroll />
    </>
  );
}
