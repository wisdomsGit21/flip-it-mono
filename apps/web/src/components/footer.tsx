import React from "react";
import { motion } from "framer-motion";
import { BookmarkIcon } from "@radix-ui/react-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center">
            <BookmarkIcon className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">Flip It</span>
          </div>
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
            {["About", "Blog", "Jobs", "Press", "Privacy", "Terms"].map(
              (item) => (
                <div key={item} className="px-5 py-2">
                  <a
                    href="#"
                    className="text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item}
                  </a>
                </div>
              )
            )}
          </nav>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between"
        >
          <div className="flex space-x-6 md:order-2">
            {["Facebook", "Instagram", "Twitter"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <span className="sr-only">{item}</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-muted-foreground md:mt-0 md:order-1">
            &copy; 2023 Flip It, Inc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
