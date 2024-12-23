'use client';
import { DramaIcon, HeartOff } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MobileSidebar } from './mobile-sidebar';


function pathNameToTitle(pathname: string | null): { title: string; icon?: React.ReactNode } {
  let title = 'Dashboard';
  let icon = undefined;
  const iconProps = { className: 'w-3.5 h-3.5 text-muted-foreground' };

  if (!pathname) return { title };

  switch (true) {
    case /^\/tone\/ironic$/.test(pathname):
      title = 'Ironic';
      icon = <DramaIcon {...iconProps} />;
      break;

    case /^\/tone\/offensive$/.test(
      pathname,
    ):
      title = 'Offensive';
      icon = <HeartOff {...iconProps} />;
      break;
    default:
      break;
  }
  return { title, icon };
}
function TopBar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center h-10 w-full bg-white/60 text-black">
      <div className="px-4 sm:hidden">
        <MobileSidebar />
      </div>
      <nav className="flex flex-row justify-center items-center w-full mr-[50px]">
        <div className="flex items-center space-x-1">
          <div> {pathNameToTitle(pathname).icon}</div>
          <div className="text-sm font-medium text-center text-black">
            {<span> {pathNameToTitle(pathname).title}</span>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export { TopBar };