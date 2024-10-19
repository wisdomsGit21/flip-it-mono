import React from "react";
import { motion } from "framer-motion";

const CTASection: React.FC = () => {
  return (
    <div className="bg-primary/80 font-sourcecode">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-primary-foreground sm:text-4xl"
        >
          <span className="block">Boost your content's impact.</span>
          <span className="block">Start using Flip It today.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg leading-6 text-primary-foreground/80"
        >
          Join thousands of satisfied users who have transformed their PDFs into
          engaging, interactive experiences.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          href="#"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-primary-foreground hover:bg-primary-foreground/90 sm:w-auto transition-colors duration-200"
        >
          Sign up for free
        </motion.a>
      </div>
    </div>
  );
};

export default CTASection;
