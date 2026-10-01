const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function merge() {
  try {
    const pdf1Bytes = fs.readFileSync('toc/classnotes /Toc part 1.pdf');
    const pdf2Bytes = fs.readFileSync('toc/classnotes /Part 2.pdf');

    const pdf1 = await PDFDocument.load(pdf1Bytes);
    const pdf2 = await PDFDocument.load(pdf2Bytes);

    console.log('PDF 1 pages:', pdf1.getPageCount());
    console.log('PDF 2 pages:', pdf2.getPageCount());

    const mergedPdf = await PDFDocument.create();

    const copiedPages1 = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
    copiedPages1.forEach((page) => mergedPdf.addPage(page));

    const copiedPages2 = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
    copiedPages2.forEach((page) => mergedPdf.addPage(page));

    const mergedPdfFile = await mergedPdf.save();
    
    fs.mkdirSync('public/notes/classnotes', { recursive: true });
    fs.writeFileSync('public/notes/classnotes/class-notes.pdf', mergedPdfFile);

    console.log('Merged PDF pages:', mergedPdf.getPageCount());
    console.log('Merged successfully');
  } catch (err) {
    console.error('Error merging PDFs:', err);
  }
}

merge();
