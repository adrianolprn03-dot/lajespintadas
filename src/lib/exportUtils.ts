import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToJSON(data: any[], filename: string) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

export function exportToCSV(data: any[], filename: string) {
    if (!data || !data.length) return;
    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}

export function exportToPDF(data: any[], filename: string, title?: string) {
    if (!data || !data.length) return;
    
    const doc = new jsPDF("landscape");
    const headers = Object.keys(data[0]);
    
    const rows = data.map(item => headers.map(header => item[header]));

    if (title) {
        doc.setFontSize(14);
        doc.setTextColor(10, 61, 109); // Primary Color
        doc.text(title, 14, 15);
    }

    autoTable(doc, {
        head: [headers],
        body: rows,
        startY: title ? 25 : 15,
        theme: 'striped',
        headStyles: { fillColor: [10, 61, 109] }, // Primary Dark
        styles: { fontSize: 8, cellPadding: 2 },
    });

    doc.save(`${filename}.pdf`);
}
