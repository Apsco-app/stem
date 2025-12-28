import { Link } from "react-router-dom";
import { Zap, Mail, MapPin } from "lucide-react";

import instagramIcon from "@/assets/icons/instagram.png";
import tiktokIcon from "@/assets/icons/tiktok.png";
import facebookIcon from "@/assets/icons/facebook.png";

const footerLinks = {
  explore: [
    { name: "Home", path: "/" },
    { name: "Mission", path: "/mission" },
    { name: "Sectors", path: "/sectors" },
    { name: "Global Stage", path: "/global" },
  ],
  connect: [
    { name: "Join Us", path: "/join" },
    { name: "Contact", path: "/contact" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: facebookIcon, url: "#" },
  { name: "Instagram", icon: instagramIcon, url: "#" },
  { name: "TikTok", icon: tiktokIcon, url: "#" },

];

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-border/50">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 group mb-4">
              <Zap className="h-8 w-8 text-primary" />
              <span className="font-display font-bold text-xl">
                <span className="text-foreground">UMSSN</span>
                <span className="gradient-text ml-1">STEM</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Empowering students in Science, Technology, Engineering, and Mathematics through innovation and global competition.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:info@umssnstem.org" className="hover:text-primary transition-colors">
                  info@umssnstem.org
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Uganda Martyrs SS Namugongo, Kampala, Uganda</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} UMSSN STEM Club. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="gradient-text font-semibold">umssnstem.org</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
