
import React from 'react';
// import DownloadButton from './DownloadButton';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronUp, Mail, Phone, Facebook, Instagram, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { toast } = useToast();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} link clicked`,
      description: `You would be redirected to our ${platform} page.`
    });
  };
  
  const handleContactClick = (type: string) => {
    toast({
      title: `${type} contact`,
      description: type === 'Email' ? 'You can reach us at support@unifypatients.com' : 'Call us at (555) 123-4567'
    });
  };

  return (
    <footer id="download" className="bg-gray-900 text-white pt-16 pb-8 relative">
      <Button 
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white rounded-full h-12 w-12 flex items-center justify-center hover:bg-brand-yellow hover:text-gray-900 transition-colors"
        size="icon"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6" />
      </Button>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-2">
              <span className="text-brand-blue">Unify</span>
              <span className="text-brand-yellow">Patients</span>
            </h2>
            <p className="mb-6 text-gray-300">Heal Together, Grow Stronger</p>
            <p className="mb-6 text-gray-300">
              Join our community today and experience the power of shared healing and support.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <DownloadButton store="apple" className="bg-white text-black hover:bg-gray-100" />
              <DownloadButton store="google" />
            </div> */}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  About 
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Features
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  How It Works
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Privacy Policy",
                      description: "The privacy policy would open in a new tab."
                    });
                  }}
                >
                  Privacy Policy
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Terms of Service",
                      description: "The terms of service would open in a new tab."
                    });
                  }}
                >
                  Terms of Service
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer" onClick={() => handleContactClick('Email')}>
                <Mail className="mr-2 h-4 w-4" />
                support@unifypatients.com
              </li>
              <li className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer" onClick={() => handleContactClick('Phone')}>
                <Phone className="mr-2 h-4 w-4" />
                (555) 123-4567
              </li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-6 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); handleSocialClick('Facebook'); }}>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); handleSocialClick('Instagram'); }}>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); handleSocialClick('Twitter'); }}>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); handleSocialClick('LinkedIn'); }}>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} UnifyPatients. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); toast({ title: "Privacy Policy", description: "The privacy policy would open in a new tab." }); }}>Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); toast({ title: "Terms of Service", description: "The terms of service would open in a new tab." }); }}>Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); toast({ title: "Accessibility", description: "Our accessibility statement would open in a new tab." }); }}>Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
