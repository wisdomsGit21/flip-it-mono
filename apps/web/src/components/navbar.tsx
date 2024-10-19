import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookmarkIcon } from "@radix-ui/react-icons";

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <BookmarkIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">
                Flip It
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/features"
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              to="/auth/signup"
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
