import React from 'react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground py-10 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">JobPortal</h3>
            <p className="text-sm">
              Connecting talents with opportunities. Find your dream job or the perfect candidate today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/jobs" className="hover:text-primary">Browse Jobs</a></li>
              <li><a href="/companies" className="hover:text-primary">Companies</a></li>
              <li><a href="/about" className="hover:text-primary">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="hover:text-primary">Blog</a></li>
              <li><a href="/faq" className="hover:text-primary">FAQ</a></li>
              <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>

         
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-10">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={24} />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 text-center text-xs text-muted-foreground border-t">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
