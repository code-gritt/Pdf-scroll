"use client";

import { useState } from 'react';
import { DocumentViewer } from '@/components/document-viewer/document-viewer';
import { Button } from '@/components/ui/button';
import { FileUp } from 'lucide-react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {!selectedFile ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="mb-4 mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <FileUp className="w-12 h-12 text-primary" />
              </div>
              <Button variant="outline" className="mb-2">
                Choose Document
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.pptx,.xlsx,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, PPTX, XLSX, DOCX
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <DocumentViewer
            file={selectedFile}
            onPageChange={(pageNumber) => {
              console.log(`Navigated to page ${pageNumber}`);
            }}
          />
        </div>
      )}
    </div>
  );
}