import React from "react";
import { Link } from "react-router-dom";
import { Hexagon, Shield, FlaskConical, BadgeCheck, CreditCard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-charcoal">
      {/* Main Footer Content */}
      <div className="container max-w-6xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        {/* Logo and Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
            <img
              src="/lovable-uploads/da75d4b2-0e0d-4998-a153-a60a0882d732.webp"
              alt="Peptide Foundry"
              className="h-10 w-auto max-w-[180px] object-contain mb-4 brightness-0 invert opacity-80"
            />
            <p className="text-white/50 text-sm mb-4">
              Research-grade peptides for scientific discovery
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <a
                href="mailto:support@peptidefoundry.com"
                className="hover:text-white transition-colors"
              >
                support@peptidefoundry.com
              </a>
            </div>
            <div className="text-white/60 text-sm mt-1">
              <a
                href="tel:+18007378433"
                className="hover:text-white transition-colors"
              >
                1-800-PEPTIDE
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors text-sm">
                  All Peptides
                </Link>
              </li>
              <li>
                <Link to="/bacteriostatic-water" className="text-white/60 hover:text-white transition-colors text-sm">
                  Supplies
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-white/60 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/60 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@peptidefoundry.com" className="text-white/60 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="mailto:support@peptidefoundry.com" className="text-white/60 hover:text-white transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Account</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/sign-in" className="text-white/60 hover:text-white transition-colors text-sm">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="text-white/60 hover:text-white transition-colors text-sm">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard/orders" className="text-white/60 hover:text-white transition-colors text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/foundry-club" className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-1">
                  <Hexagon className="h-3 w-3" />
                  Foundry Club
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 py-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/60">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm">SSL Secure</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <FlaskConical className="h-5 w-5 text-primary" />
            <span className="text-sm">USA Compounded</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <BadgeCheck className="h-5 w-5 text-primary" />
            <span className="text-sm">3rd Party Tested</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <CreditCard className="h-5 w-5 text-primary" />
            <span className="text-sm">Secure Payments</span>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="py-8 border-t border-white/10">
          <div className="space-y-4 text-center text-white/50 text-xs leading-relaxed max-w-3xl mx-auto">
            <p>
              <strong className="text-white/70">For Research Use Only.</strong>{" "}
              All peptides sold by Peptide Foundry are intended strictly for
              in-vitro research and laboratory use. They are not intended for
              human or animal consumption, therapeutic use, or any diagnostic
              purposes.
            </p>
            <p>
              By purchasing from Peptide Foundry, you confirm that you are a
              qualified researcher or represent a research institution, and that
              all products will be used in accordance with applicable laws and
              regulations.
            </p>
          </div>
        </div>

        {/* Bottom Bar - Legal Links & Copyright */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs">
              <Link to="/privacy-policy" className="text-white/40 hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-white/40 hover:text-white/70 transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund-policy" className="text-white/40 hover:text-white/70 transition-colors">
                Refund Policy
              </Link>
              <Link to="/shipping-policy" className="text-white/40 hover:text-white/70 transition-colors">
                Shipping Policy
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Peptide Foundry. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
