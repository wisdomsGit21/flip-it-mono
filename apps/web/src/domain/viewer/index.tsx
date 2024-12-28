import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Loader2, Share2 } from "lucide-react";
import { useGetFlipbookQuery } from "@/app/services/flipbookApi";
import FlipbookViewer from "./components/flipbook-viewer";

const FlipbookView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: flipbook, isLoading, error } = useGetFlipbookQuery(id);
    console.log(flipbook);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="mr-2 h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !flipbook) {
        return (
            <div className="text-center text-red-500">
                Error loading flipbook. Please try again later.
            </div>
        );
    }

    const handleShare = () => {
        // Implement sharing functionality
        console.log("Sharing flipbook:", flipbook.id);
    };

    console.log(flipbook);

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4 text-center"
            >
                {flipbook.title}
            </motion.h1>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 flex justify-end"
            >
                <Button onClick={handleShare} className="flex items-center">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <FlipbookViewer
                    pdfUrl={flipbook.pdf.url}
                    videoUrl={flipbook.video.url}
                    videoPosition={flipbook.videoPosition}
                />
            </motion.div>
        </div>
    );
};

export default FlipbookView;
