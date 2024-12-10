export interface DocumentPage {
  pageNumber: number;
  imageUrl: string;
}

export interface DocumentViewerProps {
  file: File;
  onPageChange?: (pageNumber: number) => void;
}

export interface ThumbnailGridProps {
  pages: DocumentPage[];
  onThumbnailClick: (pageNumber: number) => void;
  currentPage: number;
}

export interface DocumentPreviewProps {
  pages: DocumentPage[];
  currentPage: number;
}