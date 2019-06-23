export default class PDFMasker {
  constructor(title, pdfjsLib, jspdf, fileDataURL) {
    this.title = title;
    this.pdfjsLib = pdfjsLib;
    this.jspdf = jspdf;
    this.fileDataURL = fileDataURL;
    this.pdfDoc = null;
  }
  printTitle() {
    console.log(this.title);
    console.log(this.fileDataURL);
  }
  async getDocument() {
    this.pdfDoc = await this.pdfjsLib.getDocument(this.fileDataURL);
  }
}
