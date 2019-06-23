export default class PDFMasker {
  constructor(title, pdfjsLib, jspdf, fileDataURL) {
    this.title = title;
    this.pdfjsLib = pdfjsLib;
    this.jspdf = jspdf;
    this.fileDataURL = fileDataURL;
  }
  printTitle() {
    console.log(this.title);
    console.log(this.fileDataURL);
  }
}
