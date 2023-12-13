import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private FONT_FAMILY = 'Roboto';
  private FONT_SIZE = 18;
  private _date: string;

  constructor() {
    this._date = new Date().toISOString().slice(0, 10);
  }

  downloadChatPdf(topic: string, output: any[], outputTitle: any[]) {
    const doc = new jsPDF();
    doc.setFont(this.FONT_FAMILY);

    // Title
    doc.setFontSize(this.FONT_SIZE);
    doc.text(`Chat History (${this._date})`, 105, 15, {
      align: 'center',
    });
    doc.text(`Random Topic: "${topic}"`, 105, 25, {
      align: 'center',
    });

    // Generate table
    autoTable(doc, {
      startY: 30,
      head: [outputTitle],
      body: output.map((o) => [o.handle, o.message]),
      styles: {
        font: 'Roboto',
        fillColor: [255, 255, 255],
        textColor: 50,
        lineColor: [170, 170, 170],
        lineWidth: 0.1,
      },
      columnStyles: {
        0: { cellWidth: 'wrap', fillColor: [200, 200, 200] },
        1: { cellWidth: 'auto', textColor: 0 },
      },
      margin: { top: 10 },
      theme: 'grid',
    });

    doc.save(`chat-history-${Date.now()}.pdf`);
  }
}
