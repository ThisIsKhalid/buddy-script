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
      await createPostMutation.mutateAsync({ text, imageUrl, visibility });
      setText("");
      setImageUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-card rounded-[6px] p-6 mb-4 shadow-card border border-border transition-colors duration-300">
      {/* Avatar + Textarea row */}
      <div className="flex items-start gap-3">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatarUrl || "/assets/images/txt_img.png"}
            alt="Your avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 relative min-h-[40px] flex items-start pt-2">
          <textarea
            className="w-full bg-transparent border-0 outline-none focus:ring-0 resize-none text-[15px] text-text-dark placeholder-transparent py-0 pr-8"
            placeholder="Write something ..."
            value={text}
            rows={2}
            onChange={(e) => setText(e.target.value)}
          />
          {!text && (
            <div className="absolute left-0 top-[8px] pointer-events-none flex items-center gap-1.5 text-[15px] text-text-muted">
              <span>Write something ...</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 23 24" className="text-text-muted opacity-80">
                <path fill="currentColor" d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Image preview */}
      {imageUrl && (
        <div className="relative mt-3 mb-2 ml-13 inline-block max-w-[200px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Attached preview"
            className="rounded-[6px] border border-border max-h-[150px] w-auto transition-colors duration-300"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center leading-none hover:bg-red-600 transition-colors cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Action footer */}
      <div className="flex items-center justify-between mt-4 px-4 py-3 bg-[#F8FAFD] dark:bg-[#112032]/40 rounded-[6px] border border-border/10">
        {/* Photo */}
        <button
          type="button"
          onClick={handlePhotoClick}
          className="flex items-center gap-2 text-sm text-[#4E5D78] dark:text-[#959EAE] hover:text-primary transition-colors font-semibold cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path fill="currentColor" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z" />
          </svg>
          Photo
        </button>

        {/* Action controls */}
        <div className="flex items-center gap-4">
          {/* Small compact visibility dropdown */}
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as "public" | "private")}
            className="border-0 bg-transparent text-xs text-text-muted hover:text-primary focus:outline-none cursor-pointer font-semibold transition-colors py-1 outline-none"
          >
            <option value="public">🌐 Public</option>
            <option value="private">🔒 Private</option>
          </select>

          {/* Post button */}
          <button
            type="button"
            onClick={handlePostSubmit}
            disabled={createPostMutation.isPending || !text.trim()}
            className="flex items-center gap-2 bg-[#1890FF] hover:bg-primary-dark text-white text-xs font-semibold px-5 py-2.5 rounded-[6px] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
              <path fill="#fff" fillRule="evenodd" d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88z" clipRule="evenodd" />
            </svg>
            <span>{createPostMutation.isPending ? "Posting..." : "Post"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
