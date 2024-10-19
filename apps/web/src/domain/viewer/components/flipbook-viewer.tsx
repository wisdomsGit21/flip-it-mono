/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface FlipbookViewerProps {
  pdfUrl: string;
  videoUrl?: string;
  videoPosition?: {
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
  };
}

export default function FlipbookViewer({
  pdfUrl,
  videoUrl,
  videoPosition,
}: FlipbookViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const isTablet =
    typeof window !== "undefined" &&
    window.innerWidth > 768 &&
    window.innerWidth <= 1024;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth * 2;
        const containerHeight = containerRef.current.clientHeight * 2;
        const aspectRatio = 210 / 297; // A4 aspect ratio

        let width, height;
        if (containerWidth / containerHeight > aspectRatio) {
          height = containerHeight;
          width = height * aspectRatio;
        } else {
          width = containerWidth;
          height = width / aspectRatio;
        }

        setPageSize({ width: width / 2, height }); // Divide width by 2 for two-page spread
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextPage();
      } else if (event.key === "ArrowLeft") {
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderPage = (pageNumber: number) => {
    return (
      <div key={pageNumber} className="relative w-full h-full">
        <Page
          pageNumber={pageNumber}
          width={pageSize.width}
          height={pageSize.height}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={
            <div className="flex items-center justify-center w-full h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        />
        {videoUrl && videoPosition && videoPosition.page === pageNumber && (
          <div
            style={{
              position: "absolute",
              top: `${videoPosition.y}%`,
              left: `${videoPosition.x}%`,
              width: `${100}%`,
              height: `${100}%`,
              zIndex: 50,
            }}
          >
            <video
              width="100%"
              height="100%"
              controls
              className="rounded object-cover"
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-center w-full"
      ref={containerRef}
      style={{ height: "80vh" }}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-16 w-16 animate-spin" />
          </div>
        }
      >
        {pageSize.width > 0 && pageSize.height > 0 && (
          <HTMLFlipBook
            width={pageSize.width}
            height={pageSize.height}
            size="stretch"
            minWidth={300}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            ref={flipBookRef}
            onFlip={(e: unknown) => setCurrentPage(e.data)}
            usePortrait={isMobile || isTablet}
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {Array.from(new Array(numPages), (el, index) =>
              renderPage(index + 1)
            )}
          </HTMLFlipBook>
        )}
      </Document>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 fixed bottom-0 flex justify-between items-center w-full max-w-md"
      >
        <Button onClick={prevPage} disabled={currentPage === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage + 1} of {numPages}
        </span>
        <Button onClick={nextPage} disabled={currentPage === numPages - 1}>
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
