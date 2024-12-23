"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Drama, HeartOff, type LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  link: {
    link: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
  };
  pathname?: string | null;
}

function SidebarLink({ link, pathname }: SidebarLinkProps) {
  return (
    <Link href={link.link} key={link.link}>
      <button
        className={cn(
          "flex items-center space-x-1 min-w-[160px] mb-1 p-3 hover:bg-white transition-colors rounded-xl border-2 border-transparent duration-200 hover:border-blue-500/80",
          pathname?.includes(link.link) &&
          "bg-white border-blue-500/80"
        )}
				type="button"
      >
        <div className="flex items-center justify-center rounded-lg transition-colors">
          <link.icon className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">{link.title}</span>
        </div>
        <span className="text-base px-1">{link.title}</span>
      </button>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky inset-y-0 left-0 top-0 z-10 hidden flex-col sm:flex bg-white/60 backdrop-blur-3xl w-48 px-2">
      <nav className="flex flex-col items-start">
        <Link href= "/" className="h-20 w-40 transition-all group-hover:scale-110 flex justify-center items-center mb-2">
          {/* <Image width={130} height={20} src={"/logo.png"} alt="Logo" /> */}
        </Link>

        <div className="mt-2 font-geist">
          {sidebarLinks.map((link, index) => (
            <SidebarLink
              link={link}
              key={link.link + index}
              pathname={pathname}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}

export type SidebarLink = {
  title: string;
  icon: LucideIcon;
  link: string;

  external?: boolean;
};

export const sidebarLinks: SidebarLink[] = [
  {
    title: "Testing",
    icon: Drama,
    link: "/testing",
  },
  {
    title: 'Testing 2',
    icon: HeartOff,
    link: '/testing2'
  },
];