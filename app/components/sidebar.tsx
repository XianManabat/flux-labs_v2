export default function SideBar() {
    return (
        <aside className="w-60 min-h-screen bg-[#16232e] border-r border-[#24333f] p-5 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-8 pb-5 border-b border-[#24333f]">
                    <div className="w-9 h-9 border border-[#c9a876] flex items-center justify-center font-bold">
                        F
                    </div>
                    <div>
                        <p className="font-bold tracking-widest text-sm">FLUXLABS</p>
                        <p className="text-[10px] text-[#6b7a86] tracking-widest">AIR GUARD</p>
                    </div>
                </div>

                <div className="links">
                    <p className="text-[10px] text-[#6b7a86] tracking-widest mb-3">MONITORING</p>

                    <a href="/" className="flex items-center gap-2 px-3 py-2 bg-[#1c2b38] text-sm mb-1">
                        DASHBOARD
                    </a>

                    <a href="/readings" className="flex items-center gap-2 px-3 py-2 text-sm text-[#6b7a86] mb-1">
                        READINGS
                    </a>

                    <a href="/notifications" className="flex items-center gap-2 px-3 py-2 text-sm text-[#6b7a86]">
                        NOTIFICATIONS
                    </a>
                </div>
            </div>

           
        </aside>
    );
}