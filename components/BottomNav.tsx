export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#121212]/95 backdrop-blur-xl border-t border-white/[0.08] flex items-center justify-around z-50 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-2xl">
      {/* Trang chủ - active */}
      <div className="flex flex-col items-center gap-1 text-[#fe2c55] min-w-[70px] py-1 cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        <span className="text-[11px] font-bold tracking-wide whitespace-nowrap">Trang chủ</span>
      </div>
      {/* Khám phá */}
      <div className="flex flex-col items-center gap-1 text-white/40 min-w-[70px] py-1 cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
        <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap">Khám phá</span>
      </div>
      {/* Hồ sơ */}
      <div className="flex flex-col items-center gap-1 text-white/40 min-w-[70px] py-1 cursor-pointer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="text-[11px] font-semibold tracking-wide whitespace-nowrap">Hồ sơ</span>
      </div>
    </nav>
  );
}
