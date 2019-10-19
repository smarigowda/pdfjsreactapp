import React from "react";
import "./App.css";

import PDFMasker from "./modules/PDFMasker";

let scale = 1;
let fr = new FileReader();
let fileList;
let masks;

console.log("pdfjsLib = ", window.pdfjsLib);
console.log("jsPDF = ", window.jsPDF);

const inputfile = document.querySelector(".inputfile");
const newPdf = new window.jsPDF("p", "pt", "a4", true);

function getMasks() {
  const maskTop = document.getElementById("detail_mask_top");
  console.dir(maskTop);
  console.log("valueAsNumber", maskTop.valueAsNumber);
  let detailMaskTop = maskTop.valueAsNumber;

  const headerMask = document.getElementById("header_mask_height");
  console.log(headerMask);
  let headerMaskHeight = headerMask.valueAsNumber;

  const footerMaskTop = document.getElementById("footer_mask_top")
    .valueAsNumber;

  return { headerMaskHeight, detailMaskTop, footerMaskTop };
}
function addANewCanvas(num) {
  const canvasElement = document.createElement("canvas");
  canvasElement.setAttribute("id", `the-canvas-${num}`);
  canvasElement.setAttribute("class", `the-canvas`);
  document.body.appendChild(canvasElement);
  return canvasElement;
}
function handleChange() {
  console.log("file chosen...");
  fileList = this.files; /* now you can work with the file list */
  console.log(fileList);
  fr.onload = () => {
    processPdf();
  };
  fr.readAsDataURL(fileList[0]);
}
async function processPdf() {
  console.log("file loaded...");
  // console.log(e);
  console.log("file reader instance...");
  console.log(fr);
  let fileDataURL = fr.result;

  const pdfMasker = new PDFMasker(
    "A Module to abstract PDF Masking....",
    window.pdfjsLib,
    fileDataURL
  );
  pdfMasker.printTitle();

  let pdfDoc = await pdfMasker.init();

  let count;
  for (count = 1; count <= pdfMasker.numPages; count++) {
    // add a new page
    if (count !== 1) {
      newPdf.addPage();
    }
    // debugger;
    let canvas = addANewCanvas(count);
    const ctx = canvas.getContext("2d");
    console.log("Render Page...", count);
    // get a page from the pdfDoc
    const page = await pdfDoc.getPage(count);

    // render a page
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height * scale;
    canvas.width = viewport.width * scale;
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    await page.render(renderContext).promise;
    ctx.fillStyle = "white";
    if (count === 1) {
      console.log("masks = ", masks);
      masks = getMasks();
      ctx.fillRect(0, masks.detailMaskTop, 2000, 2000);
    }
    ctx.fillRect(0, 0, 2000, masks.headerMaskHeight);
    ctx.fillRect(0, masks.footerMaskTop, 2000, 2000);

    newPdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      viewport.width,
      viewport.height,
      "",
      "FAST"
    );
  }
  newPdf.save(`${fileList[0].name}`);
}

inputfile.addEventListener("change", handleChange);
console.log("document", document.querySelector(".inputfile"));

function App() {
  return <div className="App" />;
}

export default App;
