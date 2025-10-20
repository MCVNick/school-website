import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLayout } from "../../../Utils/Context/LayoutContext";

import "./PdfDocument.scss";

export default function PdfDocument() {
  const location = useLocation();
  const { setShowLayout } = useLayout();

  useEffect(() => {
    setShowLayout(true);
  }, [setShowLayout]);

  const params = new URLSearchParams(location.search);
  const filename = params.get("name");

  if (!filename) {
    return (
      <div className="pdf-document__error">
        <h2>No PDF specified</h2>
        <p>
          Please provide a filename using the <code>?name=</code> query
          parameter.
        </p>
        <p className="pdf-document__example">
          Example: <code>?name=document.pdf</code>
        </p>
      </div>
    );
  }

  const pdfUrl = `https://pdf.nicholasmcqueen.com/${filename}`;

  return (
    <div className="pdf-document">
      <iframe
        src={pdfUrl}
        title={`PDF Viewer - ${filename}`}
        className="pdf-document__iframe"
      />
    </div>
  );
}
