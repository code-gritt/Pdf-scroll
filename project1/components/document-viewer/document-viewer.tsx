"use client";

import { useState } from 'react';
import { DocumentViewerProps } from '@/lib/types';
import { extractPdfPages } from '@/lib/document-utils';
import { ThumbnailGrid } from './thumbnail-grid';
import { DocumentPreview } from './document-preview';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function DocumentViewer({ file, onPageChange }: DocumentViewerProps) {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFileLoad = async () => {
    const extractedPages = await extractPdfPages(file);
    setPages(extractedPages);
  };

  const handleThumbnailClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange?.(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(prev => prev + 1);
      onPageChange?.(currentPage + 1);
    }
  };

  if (!pages.length) {
    handleFileLoad();
    return <div className="flex items-center justify-center h-full">Loading document...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      <aside className="w-full md:w-64 lg:w-80 border-r">
        <ThumbnailGrid
          pages={pages}
          onThumbnailClick={handleThumbnailClick}
          currentPage={currentPage}
        />
      </aside>
      
      <main className="flex-1 relative">
        <DocumentPreview pages={pages} currentPage={currentPage} />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === pages.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}