
import { Check, Flag, Info, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <Check className="h-6 w-6 text-blue-600" />
            <span className="hidden font-bold sm:inline-block">
              TruthGuardian
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center space-x-2 md:justify-end">
          <nav className="flex items-center space-x-1">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <Search className="h-4 w-4 mr-2" />
                Verify
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/about">
                <Info className="h-4 w-4 mr-2" />
                About
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/report">
                <Flag className="h-4 w-4 mr-2" />
                Report
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
