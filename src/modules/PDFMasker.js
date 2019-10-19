export default class PDFMasker {
  constructor(title, pdfjsLib, fileDataURL) {
    this.title = title;
    this.pdfjsLib = pdfjsLib;
    this.fileDataURL = fileDataURL;
    this.pdfDoc = null;
    this.numPages = null;
  }
  printTitle() {
    console.log(this.title);
    // console.log(this.fileDataURL);
  }
  async init() {
    let loadingTask = this.pdfjsLib.getDocument(this.fileDataURL);

    this.pdfDoc = await loadingTask.promise.then(function(pdf) {
      // you can now use *pdf* here
      console.log("Number of pages = ", pdf.numPages);
      return pdf;
    });
    this.numPages = this.pdfDoc.numPages;
    return this.pdfDoc;

    // let pdfDoc = await this.pdfjsLib.getDocument(this.fileDataURL);
    // this.pdfDoc = pdfDoc;
    // console.log('Number of pages = ', this.pdfDoc.numPages);
    // this.numPages = this.pdfDoc.numPages;
    // return pdfDoc;
  }
}
