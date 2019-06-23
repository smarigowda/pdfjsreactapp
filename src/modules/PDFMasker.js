export default class PDFMasker {
  constructor(title, pdfjsLib, jspdf, fileDataURL) {
    this.title = title;
    this.pdfjsLib = pdfjsLib;
    this.jspdf = jspdf;
    this.fileDataURL = fileDataURL;
    this.pdfDoc = null;
    this.numPages = null;
  }
  printTitle() {
    console.log(this.title);
    // console.log(this.fileDataURL);
  }
  async init() {
    let pdfDoc = await this.pdfjsLib.getDocument(this.fileDataURL);
    this.pdfDoc = pdfDoc;
    console.log('Number of pages = ', this.pdfDoc.numPages);
    this.numPages = this.pdfDoc.numPages;
    return pdfDoc;
  }
}
