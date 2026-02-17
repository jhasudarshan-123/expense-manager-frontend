import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X, Menu } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Header1 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadClick = () => {
    scrollToSection('#download-section');
    toast({
      title: "Download section",
      description: "Scrolling to download options",
    });
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#top'); }} 
            className="cursor-pointer"
          >
            <span className="font-bold text-xl md:text-2xl text-brand-blue">
              Unify<span className="text-brand-yellow">Patients</span>
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#about"
            className="text-gray-700 hover:text-brand-blue font-medium transition-colors"
            onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
          >
            About
          </a>

          <a 
            href="#features"
            className="text-gray-700 hover:text-brand-blue font-medium transition-colors"
            onClick={(e) => { e.preventDefault(); scrollToSection('#features'); }}
          >
            Features
          </a>

          <a 
            href="#how-it-works"
            className="text-gray-700 hover:text-brand-blue font-medium transition-colors"
            onClick={(e) => { e.preventDefault(); scrollToSection('#how-it-works'); }}
          >
            How It Works
          </a>

          {/* Download Button */}
          <Button 
            className="bg-brand-blue text-white rounded-full hover:bg-opacity-90 transition-colors font-medium"
            onClick={() => navigate("/signup")}
          >
            Join For free
          </Button>

          {/* ⭐ SIGN UP BUTTON */}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <a 
              href="#about"
              className="text-gray-700 hover:text-brand-blue font-medium"
              onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
            >
              About
            </a>

            <a 
              href="#features"
              className="text-gray-700 hover:text-brand-blue font-medium"
              onClick={(e) => { e.preventDefault(); scrollToSection('#features'); }}
            >
              Features
            </a>

            <a 
              href="#how-it-works"
              className="text-gray-700 hover:text-brand-blue font-medium"
              onClick={(e) => { e.preventDefault(); scrollToSection('#how-it-works'); }}
            >
              How It Works
            </a>

            {/* Download Button */}
            <Button 
              className="bg-brand-blue text-white rounded-full hover:bg-opacity-90 font-medium"
              onClick={handleDownloadClick}
            >
              Download App
            </Button>

            {/* ⭐ MOBILE SIGN UP BUTTON */}
            <Button
              className="bg-brand-yellow text-gray-900 rounded-full hover:bg-opacity-90 font-semibold"
              onClick={() => { 
                setMobileMenuOpen(false);
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header1;
