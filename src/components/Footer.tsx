
import { Check } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium">TruthGuardian</span>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} TruthGuardian. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
