export default function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] bg-[#000000] border-r border-white/[0.08] flex-col py-8 px-4 z-50 overflow-y-auto no-scrollbar justify-between">
      <div className="flex flex-col gap-8">
        
        <div className="flex items-center gap-2.5 px-3">
          <img
            src="/logo.png"
            alt="TikTok"
            className="h-9 w-9 object-contain"
          />
          <span className="text-[21px] font-black tracking-tight text-white">
            Tiktok Clone
          </span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {/* Trang chủ */}
          <div className="flex items-center gap-4 px-3.5 py-3 rounded-xl text-[#fe2c55] hover:bg-white/[0.04] font-bold cursor-pointer transition-all duration-150">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span className="text-[16px] font-bold tracking-wide">Trang chủ</span>
          </div>

          {/* Khám phá */}
          <div className="flex items-center gap-4 px-3.5 py-3 rounded-xl text-white hover:bg-white/[0.04] font-bold cursor-pointer transition-all duration-150">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span className="text-[16px] font-bold tracking-wide">Khám phá</span>
          </div>

          {/* Hồ sơ */}
          <div className="flex items-center gap-4 px-3.5 py-3 rounded-xl text-white hover:bg-white/[0.04] font-bold cursor-pointer transition-all duration-150">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[16px] font-bold tracking-wide">Hồ sơ</span>
          </div>
        </nav>
      </div>
    </aside>
  );
}
