import React from "react";
import { motion } from "framer-motion";
import { QuoteIcon } from "@radix-ui/react-icons";

const TestimonialSection: React.FC = () => {
  return (
    <div className="bg-background pt-16 lg:py-24">
      <div className="pb-16 bg-primary/80 lg:pb-0 lg:z-10 lg:relative">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative lg:-my-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1/2 bg-background lg:hidden"
            />
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
              <div className="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                <img
                  className="object-cover lg:h-full lg:w-full"
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Happy customer using Flip It"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8"
          >
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
              <blockquote>
                <div>
                  <QuoteIcon className="h-12 w-12 text-primary-foreground opacity-25" />
                  <p className="mt-6 text-2xl font-medium text-primary-foreground">
                    Flip It has revolutionized how we present our annual
                    reports. The interactive features and embedded videos have
                    significantly increased engagement with our stakeholders.
                    It's a game-changer for corporate communications.
                  </p>
                </div>
                <footer className="mt-6">
                  <p className="text-base font-medium text-primary-foreground">
                    Sarah Thompson
                  </p>
                  <p className="text-base font-medium text-primary-foreground/70">
                    Director of Communications, TechCorp Inc.
                  </p>
                </footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
