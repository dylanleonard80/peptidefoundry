import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-charcoal py-16 md:py-20">
      <div className="container max-w-5xl mx-auto px-6 lg:px-8">
        {/* Logo and tagline */}
        <div className="text-center mb-12">
          <img
            src="/lovable-uploads/da75d4b2-0e0d-4998-a153-a60a0882d732.webp"
            alt="Peptide Foundry"
            className="h-10 w-auto mx-auto mb-4 brightness-0 invert opacity-80"
          />
          <p className="text-white/50 text-sm">
            Research-grade peptides for scientific discovery
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-12" />

        {/* Disclaimers */}
        <div className="space-y-6 text-center text-white/60 text-sm leading-relaxed max-w-3xl mx-auto">
          <p>
            <strong className="text-white/80">For Research Use Only.</strong>{" "}
            All peptides sold by Peptide Foundry are intended strictly for
            in-vitro research and laboratory use. They are not intended for
            human or animal consumption, therapeutic use, or any diagnostic
            purposes.
          </p>

          <p>
            By purchasing from Peptide Foundry, you confirm that you are a
            qualified researcher or represent a research institution, and that
            all products will be used in accordance with applicable laws and
            regulations. Each product ships with a Certificate of Analysis (COA)
            verifying purity and composition.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-12" />

        {/* Contact and links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/about"
              className="text-white/60 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white/60 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/all-peptides"
              className="text-white/60 hover:text-white transition-colors"
            >
              All Peptides
            </Link>
          </div>

          <p className="text-white/50">
            <a
              href="mailto:support@peptidefoundry.com"
              className="hover:text-white transition-colors"
            >
              support@peptidefoundry.com
            </a>
            {" · "}
            <a
              href="tel:+18007378433"
              className="hover:text-white transition-colors"
            >
              1-800-PEPTIDE
            </a>
          </p>
        </div>

        {/* Copyright */}
        <p className="text-center text-white/40 text-xs mt-12">
          © {new Date().getFullYear()} Peptide Foundry. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
