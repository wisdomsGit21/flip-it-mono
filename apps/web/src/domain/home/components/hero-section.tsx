/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import HTMLFlipBook from "react-pageflip";

export default function Component() {
  const flipBookRef = useRef(null);
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background text-foreground">
      <div className="container  mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Transform Your PDFs into Interactive Flipbooks
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Engage your audience with stunning, interactive content that
                brings your PDFs to life.
              </p>
            </motion.div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="inline-flex items-center justify-center">
                Get Started
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <HTMLFlipBook
              width={350}
              height={400}
              size="fixed"
              minWidth={300}
              maxWidth={700}
              minHeight={400}
              maxHeight={1000}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              ref={flipBookRef}
              startPage={0}
              flippingTime={1000}
              startZIndex={0}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              <img
                src="/hero-cover.jpg"
                alt="hero cover"
                className="w-full h-full bg-cover bg-top"
              />
              <img
                src="/page-1.png"
                alt="hero cover"
                className="w-full h-full bg-cover bg-top"
              />
              <img
                src="/page-2.png"
                alt="hero cover"
                className="w-full h-full bg-cover bg-top"
              />
              <img
                src="/page-1.png"
                alt="hero cover"
                className="w-full h-full bg-cover bg-top"
              />
              <img
                src="/page-2.png"
                alt="hero cover"
                className="w-full h-full bg-cover bg-top"
              />
            </HTMLFlipBook>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
