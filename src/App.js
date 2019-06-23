import React from "react";
import "./App.css";

import PDFMasker from "./modules/PDFMasker";

console.log("pdfjsLib = ", window.pdfjsLib);
console.log("jsPDF = ", window.jsPDF);

const inputfile = document.querySelector(".inputfile");
inputfile.addEventListener("change", function() {
  console.log("file chosen...");
  const fileList = this.files; /* now you can work with the file list */
  console.log(fileList);
  let fr = new FileReader();
  async function receivedPdf(e) {
    console.log("file loaded...");
    console.log(e);
    console.log("file reader instance...");
    console.log(fr);
    let fileDataURL = fr.result;

    const pdfMasker = new PDFMasker(
      "A Module to abstract PDF Masking....",
      window.pdfjsLib,
      window.jsPDF,
      fileDataURL
    );
    pdfMasker.printTitle();
    pdfMasker.getDocument();
  }
  fr.onload = receivedPdf;
  //fr.readAsText(file);
  fr.readAsDataURL(fileList[0]);
});
console.log("document", document.querySelector(".inputfile"));

function App() {
  return <div className="App" />;
}

export default App;
