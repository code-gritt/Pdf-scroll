import { DocumentViewer } from "./components/DocumentViewer";
import file from "../public/sample.pdf";

function App() {
  // const [file, setFile] = useState<File | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* {!file ? (
        <div className="flex items-center justify-center min-h-screen">
          <label className="flex flex-col items-center justify-center w-96 h-64 bg-white rounded-lg shadow-lg cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
            <Upload className="w-12 h-12 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Upload PDF, PPTX, XLSX, or DOCX
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.pptx,.xlsx,.docx"
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : ( */}
      <DocumentViewer file={file} />
      {/* )} */}
    </div>
  );
}

export default App;
