import { PDFDocument } from 'pdf-lib';
import { DocumentPage } from './types';

export async function extractPdfPages(file: File): Promise<DocumentPage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pageCount = pdfDoc.getPageCount();
  
  const pages: DocumentPage[] = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push({
      pageNumber: i + 1,
      imageUrl: URL.createObjectURL(file) + '#page=' + (i + 1)
    });
  }
  
  return pages;
}

export function getFileType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  return extension;
}