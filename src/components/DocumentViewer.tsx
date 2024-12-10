import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileWarning } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentViewerProps {
  file: string | File;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale] = useState<number>(1.5);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const scrollToPage = (pageNumber: number) => {
    const pageElement = document.getElementById(`page-${pageNumber}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: 'smooth' });
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex gap-4 p-4 max-w-[1400px] mx-auto">
      {/* Thumbnails sidebar */}
      <div className="w-48 flex-shrink-0 overflow-y-auto h-[calc(100vh-2rem)] sticky top-4">
        <div className="space-y-2">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`thumb-${index + 1}`}
                className={`cursor-pointer transition-all duration-200 ${
                  currentPage === index + 1
                    ? 'ring-2 ring-blue-500'
                    : 'hover:ring-2 hover:ring-blue-300'
                }`}
                onClick={() => scrollToPage(index + 1)}
              >
                <Page
                  pageNumber={index + 1}
                  scale={0.2}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>

      {/* Main document viewer */}
      <div className="flex-1 space-y-4">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          error={
            <div className="flex flex-col items-center justify-center p-8 text-red-500">
              <FileWarning size={48} />
              <p className="mt-2">Failed to load document</p>
            </div>
          }
          loading={
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div
              key={`page-${index + 1}`}
              id={`page-${index + 1}`}
              className="mb-4 shadow-lg"
            >
              <Page
                pageNumber={index + 1}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
};