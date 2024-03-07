import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            TaskBan
          </Link>
          <div className="hidden md:block">
            <ul className="flex items-center">
              <li className="px-4">
                <Link href="/task-management" className="hover:text-blue-500">
                  Tasks
                </Link>
              </li>
              <li className="px-4">
                <Link href="/people" className="hover:text-blue-500">
                  People Table
                </Link>
              </li>
              <li className="px-4">
                <Link href="/tanstack-table" className="hover:text-blue-500">
                  Tanstack Table
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
