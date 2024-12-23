import { PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { sidebarLinks } from './sidebar';

export function MobileSidebar() {
  return (
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-white/90">
          <nav className="grid gap-6 text-lg font-medium">
            {sidebarLinks.map((link, index) => (
              <Link
                key={link.link + index}
                href={link.link}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <link.icon className="h-5 w-5" />
                {link.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
  );
}