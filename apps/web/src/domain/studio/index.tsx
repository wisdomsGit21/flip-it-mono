/************************** new try */
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useCreateFlipbookMutation } from "@/app/services/flipbookApi";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface VideoPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Studio() {
  const navigate = useNavigate();
  const [createFlipbook, { isLoading }] = useCreateFlipbookMutation();
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPosition, setVideoPosition] = useState<VideoPosition>({
    x: 0,
    y: 0,
    width: 20,
    height: 15,
  });
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePdfDimensions = () => {
      if (pdfContainerRef.current) {
        const { width, height } =
          pdfContainerRef.current.getBoundingClientRect();
        setPdfDimensions({ width, height });
      }
    };

    updatePdfDimensions();
    window.addEventListener("resize", updatePdfDimensions);
    return () => window.removeEventListener("resize", updatePdfDimensions);
  }, [scale]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleVideoPositionChange = (newPosition: Partial<VideoPosition>) => {
    setVideoPosition((prev) => ({
      ...prev,
      ...newPosition,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdfFile);
    if (videoFile) {
      formData.append("video", videoFile);
      formData.append(
        "videoPosition",
        JSON.stringify({
          ...videoPosition,
          page: currentPage,
        })
      );
    }

    try {
      const result = await createFlipbook(formData).unwrap();
      navigate(`/dashboard/flipbook/${result.id}`);
    } catch (err) {
      console.error("Failed to create flipbook:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Flipbook Studio
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">PDF Editor</h2>
            <div
              ref={pdfContainerRef}
              className="relative w-full overflow-hidden"
              style={{ height: "70vh" }}
            >
              <PdfViewer
                pdfFile={pdfFile}
                currentPage={currentPage}
                scale={scale}
                setNumPages={setNumPages}
                numPages={numPages}
              />
              <VideoOverlay
                videoFile={videoFile}
                videoPosition={videoPosition}
                pdfDimensions={pdfDimensions}
                onPositionChange={handleVideoPositionChange}
              />
            </div>
            <PdfControls
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              scale={scale}
              setScale={setScale}
              numPages={numPages}
            />
          </div>
        </div>
        <div>
          <FlipbookForm
            title={title}
            setTitle={setTitle}
            handlePdfUpload={(e) => handleFileUpload(e, setPdfFile)}
            handleVideoUpload={(e) => handleFileUpload(e, setVideoFile)}
            videoFile={videoFile}
            videoPosition={videoPosition}
            currentPage={currentPage}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

interface PdfViewerProps {
  pdfFile: File | null;
  currentPage: number;
  scale: number;
  setNumPages: (num: number) => void;
  numPages: number | null;
}

function PdfViewer({
  pdfFile,
  currentPage,
  scale,
  setNumPages,
  numPages,
}: PdfViewerProps) {
  return (
    <>
      {pdfFile && (
        <Document
          file={pdfFile}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="flex"
          error={<div>Failed to load PDF file. Please try again.</div>}
          loading={<div>Loading PDF...</div>}
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            className="mr-4"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
          {numPages !== null && currentPage < numPages && (
            <Page
              pageNumber={currentPage + 1}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          )}
        </Document>
      )}
    </>
  );
}

interface VideoOverlayProps {
  videoFile: File | null;
  videoPosition: VideoPosition;
  pdfDimensions: { width: number; height: number };
  onPositionChange: (newPosition: Partial<VideoPosition>) => void;
}

function VideoOverlay({
  videoFile,
  videoPosition,
  pdfDimensions,
  onPositionChange,
}: VideoOverlayProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);

  if (!videoFile || !videoUrl) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: 0,
        top: 0,
        right: pdfDimensions.width,
        bottom: pdfDimensions.height,
      }}
      onDrag={(_, info) => {
        onPositionChange({
          x: (info.point.x / pdfDimensions.width) * 100,
          y: (info.point.y / pdfDimensions.height) * 100,
        });
      }}
      style={{
        position: "absolute",
        left: `${videoPosition.x}%`,
        top: `${videoPosition.y}%`,
        width: `${videoPosition.width}%`,
        height: `${videoPosition.height}%`,
      }}
      className="cursor-move"
    >
      <video width="100%" height="100%" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          const handleMouseMove = (e: MouseEvent) => {
            const newWidth =
              videoPosition.width + (e.movementX / pdfDimensions.width) * 100;
            const newHeight =
              videoPosition.height + (e.movementY / pdfDimensions.height) * 100;
            onPositionChange({
              width: Math.max(10, Math.min(newWidth, 100 - videoPosition.x)),
              height: Math.max(10, Math.min(newHeight, 100 - videoPosition.y)),
            });
          };
          const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
          };
          window.addEventListener("mousemove", handleMouseMove);
          window.addEventListener("mouseup", handleMouseUp);
        }}
      />
    </motion.div>
  );
}

interface PdfControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  scale: number;
  setScale: (scale: number) => void;
  numPages: number | null;
}

function PdfControls({
  currentPage,
  setCurrentPage,
  scale,
  setScale,
  numPages,
}: PdfControlsProps) {
  return (
    <div className="flex justify-between mt-4">
      <Button
        onClick={() => setCurrentPage(Math.max(currentPage - 2, 1))}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => setScale(Math.max(scale - 0.1, 0.5))}
          disabled={scale <= 0.5}
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
        <span>{Math.round(scale * 100)}%</span>
        <Button
          onClick={() => setScale(Math.min(scale + 0.1, 2))}
          disabled={scale >= 2}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={() => setCurrentPage(Math.min(currentPage + 2, numPages || 0))}
        disabled={numPages === null || currentPage >= numPages}
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

interface FlipbookFormProps {
  title: string;
  setTitle: (title: string) => void;
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  videoFile: File | null;
  videoPosition: VideoPosition;
  currentPage: number;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

function FlipbookForm({
  title,
  setTitle,
  handlePdfUpload,
  handleVideoUpload,
  videoFile,
  videoPosition,
  currentPage,
  handleSubmit,
  isLoading,
}: FlipbookFormProps) {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Flipbook Details</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="pdf">Upload PDF</Label>
          <Input
            id="pdf"
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            required
          />
        </div>
        <div>
          <Label htmlFor="video">Upload Video (Optional)</Label>
          <Input
            id="video"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
          />
        </div>
        {videoFile && (
          <div>
            <p className="text-sm text-gray-600">
              Video placed on page: {currentPage}
            </p>
            <p className="text-sm text-gray-600">
              Position: (X: {Math.round(videoPosition.x)}%, Y:{" "}
              {Math.round(videoPosition.y)}%)
            </p>
            <p className="text-sm text-gray-600">
              Size: {Math.round(videoPosition.width)}% x{" "}
              {Math.round(videoPosition.height)}%
            </p>
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Flipbook...
            </>
          ) : (
            "Create Flipbook"
          )}
        </Button>
      </div>
    </form>
  );
}
