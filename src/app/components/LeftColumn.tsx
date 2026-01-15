import Image from "next/image"
import NavLink from "./NavLink"

export default function LeftColumn() {
    return (
        <div
            className="h-screen p-12 flex flex-col justify-between fixed"
            style={{
                width: 'var(--left-col-width)',
                left: 'var(--left-start)'
            }}
        >
            <div className="space-y-12">
                <div>
                    <h2 className="text-2xl text-white mb-2 opacity-50">PRODUCT DESIGNER
                        {/* <a className="ml-4 text-white text-sm">
                            (maybe)
                        </a> */}
                    </h2>
                    <a href="#">
                        <h1 className="text-7xl font-['Impact'] text-[#E8DDB5]">BRIAN WU</h1>
                    </a>
                    <p className="text-lg text-white mt-4 opacity-50 max-w-[300px] leading-relaxed">now this is awesome.</p>
                </div>

                <nav className="space-y-2">
                    <NavLink
                        href="#about"
                        icon="/icons/snowflake.png"
                        text="ABOUT"
                        isActive={true}
                    />
                    <NavLink href="#experience" icon="/icons/cloudburst.png" text="EXPERIENCE" />
                    <NavLink href="#portfolio" icon="/icons/updraft.png" text="PORTFOLIO" />
                    <NavLink href="#skills" icon="/icons/tailwind.png" text="SKILLS" />
                    <NavLink href="#more" icon="/icons/bladestorm.png" text="MORE" />
                </nav>
            </div>

            <div className="flex space-x-6">
                <a
                    href="https://github.com/bwu32"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                >
                    <Image
                        src="/icons/github.png"
                        alt="GitHub"
                        width={24}
                        height={24}
                    />
                </a>
                <a
                    href="https://linkedin.com/in/brianpwu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                >
                    <Image
                        src="/icons/linkedin.png"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                    />
                </a>
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=bwu32@terpmail.umd.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                >
                    <Image
                        src="/icons/email.png"
                        alt="Email"
                        width={24}
                        height={24}
                    />
                </a>

                <a
                    href="https://instagram.com/kachowoo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group flex items-center opacity-60 hover:opacity-100 transition-opacity"
                >
                    <Image
                        src="/icons/instagram.png"
                        alt="Instagram"
                        width={24}
                        height={24}
                    />
                    {/* Tooltip */}
                    {/* <span
                        className="absolute left-full ml-2 px-2 py-1 text-xs rounded bg-black text-white 
               opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                        Instagram
                    </span> */}
                </a>

                <a
                    href="https://tracker.gg/valorant/profile/riot/glizzy%23sugoi/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                >
                    <Image
                        src="/icons/snowflake.png"
                        alt="Tracker"
                        width={24}
                        height={24}
                    />
                </a>
            </div>
        </div>
    )
}