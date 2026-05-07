const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure docs directory exists
const docsDir = path.join(__dirname, 'public', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const doc = new PDFDocument({ margin: 50, size: 'A4' });
const outputPath = path.join(docsDir, 'XS_Plus_Technical_Spec.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Define Brand Colors
const brandOrange = '#FF6600';
const brandGray = '#1a1c1c';

// Header
doc.rect(0, 0, doc.page.width, 100).fill(brandGray);
doc.fillColor(brandOrange).fontSize(30).text('XS PLUS', 50, 40);
doc.fillColor('white').fontSize(12).text('ARCHITECTURAL EXPANDED METAL', 170, 52);

// Title
doc.moveDown(4);
doc.fillColor(brandGray).fontSize(24).text('Technical Specification', { underline: true });

doc.moveDown(1);
doc.fontSize(10).fillColor('#666666').text('Document Version: 1.0.2  |  Date: 2026', { align: 'right' });

doc.moveDown(2);

// Section 1: Product Overview
doc.fillColor(brandOrange).fontSize(16).text('1. Product Overview');
doc.moveDown(0.5);
doc.fillColor(brandGray).fontSize(11)
   .text('XS Plus provides premium architectural expanded metal and perforated mesh solutions. Designed for high-end B2B facade and interior applications, our materials offer a unique blend of structural integrity, solar shading, and aesthetic appeal.', { align: 'justify' });

doc.moveDown(1.5);

// Section 2: Material Specifications
doc.fillColor(brandOrange).fontSize(16).text('2. Material Specifications');
doc.moveDown(0.5);

const startX = 50;
let currentY = doc.y;
const lineGap = 20;

const specs = [
    { key: 'Base Material', val: 'Aluminum Alloy (A1050, A3003, A5052), Galvanized Steel, Mild Steel' },
    { key: 'Thickness', val: '1.0mm - 4.0mm (Customizable up to 5.0mm)' },
    { key: 'SWD (Short Way of Design)', val: '10mm - 100mm' },
    { key: 'LWD (Long Way of Design)', val: '20mm - 200mm' },
    { key: 'Strand Width', val: '2.0mm - 20.0mm' },
    { key: 'Open Area (%)', val: '25% - 85% (Depending on pattern)' },
    { key: 'Surface Finish', val: 'Powder Coating (AkzoNobel/Jotun), PVDF, Anodized' },
    { key: 'Standard Panel Size', val: '1200x2400mm, 1500x3000mm (Custom sizes available)' }
];

doc.fillColor(brandGray).fontSize(10);
specs.forEach(spec => {
    doc.font('Helvetica-Bold').text(spec.key + ':', startX, currentY);
    doc.font('Helvetica').text(spec.val, startX + 150, currentY);
    currentY += lineGap;
    doc.moveTo(startX, currentY - 5).lineTo(doc.page.width - 50, currentY - 5).lineWidth(0.5).strokeColor('#e5e7eb').stroke();
});

// Move down for Section 3
doc.y = currentY + 20;

// Section 3: Applications & Installation
doc.fillColor(brandOrange).fontSize(16).text('3. Installation & Applications');
doc.moveDown(0.5);
doc.fillColor(brandGray).fontSize(11).font('Helvetica')
   .text('Applications: Exterior Facades, Ceiling Systems, Sun Screens, Balustrades, Interior Partitions.', { align: 'justify' });
doc.moveDown(0.5);
doc.text('Installation System: We recommend our proprietary XS-V and XS-U structural frame systems for seamless and secure attachment. Engineering drawings and structural load data must be verified per local building codes.', { align: 'justify' });

// Footer
doc.rect(0, doc.page.height - 50, doc.page.width, 50).fill(brandOrange);
doc.fillColor('white').fontSize(10).text('XS PLUS - PREMIUM ARCHITECTURAL METALS', 50, doc.page.height - 35);
doc.text('support@xsplus.vn  |  www.xsplus.vn', 0, doc.page.height - 35, { align: 'right', margins: { right: 50 } });

doc.end();

console.log('PDF generated successfully at: ' + outputPath);
