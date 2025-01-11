// import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// export async function generatePDF(
//   content: string,
//   student_name: string
// ): Promise<void> {
//   try {
//     // Default settings for PDF generation
//     const pdfSettings = {
//       orientation: "portrait", // Default orientation
//       format: "a4", // Default format
//       margin_in_mm: 1, // Default margin
//     };

//     const orientation: "portrait" | "landscape" =
//       pdfSettings.orientation === "portrait" ? "portrait" : "landscape";
//     const format = (pdfSettings.format || "a4") as "a4" | "letter" | "legal";
//     const margin: number = pdfSettings.margin_in_mm ?? 1;

//     // Create a temporary element to hold the content
//     const tempElement: HTMLDivElement = document.createElement("div");
//     console.log("content =", content);
//     tempElement.innerHTML = html;
//     console.log("Tempelement =", tempElement);
//     document.body.appendChild(tempElement);

//     // Set options for html2pdf
//     const options = {
//       margin: margin,
//       filename: `${student_name}.pdf`, // Filename using the student name
//       image: {type: "jpeg" , quality: 0.98},
//       html2canvas: {
//         scale: 5,
//         useCORS: true,
//       },
//       jsPDF: {
//         unit: "pt",
//         format: "a4",
//         orientation: "portrait",
//       },
//     };

//     // Trigger PDF generation and download
//     html2pdf()
//     .set(options)
//       .from(tempElement)
//       .save() // Automatically download the PDF
//       .then(() => {
//         // Remove the temporary element after the PDF is generated
//         tempElement.remove();
//       });
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     throw error;
//   }
// }

export async function generatePDF(
  content: string,
  student_name: string
): Promise<void> {
  try {
    // Create a temporary container and append to the body
    const tempElement = document.createElement("div");
    console.log(content);
    tempElement.innerHTML = content;
    tempElement.style.position = "absolute";
    tempElement.style.left = "-6999px"; // Hide the element offscreen
    document.body.appendChild(tempElement);

    // Generate the canvas
    const canvas = await html2canvas(tempElement);
    const imgData = canvas.toDataURL("image/png");

    // Cleanup the temporary element
    document.body.removeChild(tempElement);

    // Generate the PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    // const width = pdf.internal.pageSize.getWidth();
    // const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, 169, 158);
    pdf.save(`${student_name}.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
  }
}

