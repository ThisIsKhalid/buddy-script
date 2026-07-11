"use client";

import { useState, useRef } from "react";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useAuth } from "@/hooks/useAuth";

export default function PostComposer() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const createPostMutation = useCreatePost();

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePostSubmit = async () => {
    if (!text.trim()) return;

    try {
      await createPostMutation.mutateAsync({
        text,
        imageUrl,
        visibility,
      });

      // Reset state
      setText("");
      setImageUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-[6px] border border-border-color shadow-sm mb-4 font-sans text-left">
      <div className="flex gap-4 items-start">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-border-color shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.avatarUrl || "/assets/images/txt_img.png"} alt="Image" className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <textarea
            className="w-full h-[100px] border border-[#E8E8E8] rounded-[6px] p-4 text-sm text-[#2D3748] placeholder-[#C4C4C4] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
            placeholder="Write something..."
            id="floatingTextarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
      </div>

      {imageUrl && (
        <div className="relative mt-4 max-w-[200px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Attached preview" className="border border-border-color rounded-md max-h-[150px] object-cover w-full" />
          <button
            type="button"
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs cursor-pointer border-none outline-none shadow-sm"
            onClick={handleRemoveImage}
          >
            &times;
          </button>
        </div>
      )}

      {/* Hidden file input for Photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Action footer area */}
      <div className="flex items-center justify-between mt-4 border-t border-[#F5F5F5] pt-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 text-xs font-semibold text-[#4A5568] hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer"
            onClick={handlePhotoClick}
          >
            <span className="text-muted group-hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path fill="currentColor" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z"/>
              </svg>
            </span>
            Photo
          </button>
          
          <button
            type="button"
            className="flex items-center gap-2 text-xs font-semibold text-[#4A5568] opacity-50 cursor-not-allowed bg-transparent border-none p-0"
            disabled
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                <path fill="currentColor" d="M11.485 4.5c2.213 0 3.753 1.534 3.917 3.784l2.418-1.082c1.047-.468 2.188.327 2.271 1.533l.005.141v6.64c0 1.237-1.103 2.093-2.155 1.72l-.121-.047-2.418-1.083c-.164 2.25-1.708 3.785-3.917 3.785H5.76c-2.343 0-3.932-1.72-3.932-4.188V8.688c0-2.47 1.589-4.188 3.932-4.188h5.726zm0 1.5H5.76C4.169 6 3.197 7.05 3.197 8.688v7.015c0 1.636.972 2.688 2.562 2.688h5.726c1.586 0 2.562-1.054 2.562-2.688v-.686-6.329c0-1.636-.973-2.688-2.562-2.688zM18.4 8.57l-.062.02-2.921 1.306v4.596l2.921 1.307c.165.073.343-.036.38-.215l.008-.07V8.876c0-.195-.16-.334-.326-.305z"/>
              </svg>
            </span>
            Video
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Post Visibility Selector */}
          <div>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as "public" | "private")}
              className="border border-border-color rounded-[6px] px-2 py-1.5 text-xs text-[#666] bg-white outline-none cursor-pointer hover:border-gray-400 transition-colors"
            >
              <option value="public">🌐 Public</option>
              <option value="private">🔒 Private</option>
            </select>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 py-2 px-5 bg-primary hover:bg-primary-hover hover:shadow-md text-white rounded-[6px] text-xs font-semibold border-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={createPostMutation.isPending || !text.trim()}
            onClick={handlePostSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
              <path fill="currentColor" fillRule="evenodd" d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z" clipRule="evenodd" />
            </svg>
            <span>{createPostMutation.isPending ? "Posting..." : "Post"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
