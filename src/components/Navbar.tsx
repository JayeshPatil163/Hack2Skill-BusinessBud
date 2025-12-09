
import { Button } from "@/components/ui/button";
import { Lightbulb, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="fixed top-4 transform -translate-x-1/2 left-1/2 z-50 transition-all duration-300">
  <div className=" tracking-wide  flex items-center justify-between gap-4 h-full  max-w-7xl mx-auto w-full"> 
    
    {/* First Column: Logo, Links, and Start Button */}
    <div className="flex px-6 py-4 items-center backdrop-blur-md shadow-lg justify-between border-white/20 border rounded-full gap-10">
      {toggleSidebar && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <Link to="/" className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-venture-accent" />
        <span className="font-bold text-base">BusinessBud</span>
      </Link>
      <Link to="/start">
        <Button className="bg-venture-accent rounded-full text-base hover:bg-venture-accent/90">
          Start Your Venture
        </Button>
      </Link>
    </div>

    <div className="flex gap-2">
      <Button className="border-white/20 px-6 py-8 backdrop-blur-md shadow-lg rounded-full" variant="ghost" onClick={toggleTheme}>
        {isDarkMode ? <Sun className="h-7 w-7" /> : <Moon className="h-7 w-7" />}
      </Button>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
