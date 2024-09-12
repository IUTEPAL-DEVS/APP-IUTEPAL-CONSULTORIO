import { links } from '@/lib/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const router = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = router === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ${isActive ? 'bg-sky-600 text-sky-100' : 'hover:bg-sky-100 hover:text-blue-600 hover:transition-all ease-in-out duration-700'
              }`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}