import QRCode from "qrcode";

export const generateHTMLPDF = (
  htmlTemplate: string,
  replacementData: Record<string, any>
): string => {
  try {
    // Function to replace placeholders in the HTML template
    const replacePlaceholders = (
      template: string,
      data: Record<string, any>
    ): string => {
      return template.replace(/{{(.*?)}}/g, (_, key: string) => {
        const keys = key.trim().split(".");
        let value: any = data;

        // Navigate through the object based on dot notation
        for (const k of keys) {
          value = value?.[k];
          if (value === undefined || value === "null") break;
        }

        // Only replace if value is found
        return value !== undefined && value !== null ? value : `{{${key}}}`;
      });
    };

    // Replace placeholders in the HTML template with the data
    const populatedHTML = replacePlaceholders(htmlTemplate, replacementData);
    return populatedHTML;
  } catch (error) {
    console.error("Error generating HTML for PDF:", error);
    return "Error generating HTML.";
  }
};

export const finalizeHTML = (htmlTemplate: string): string => {
  try {
    // Replace any remaining placeholders with an empty string
    return htmlTemplate.replace(/{{(.*?)}}/g, "");
  } catch (error) {
    console.error("Error finalizing HTML template:", error);
    return htmlTemplate; // Return original template in case of error
  }
};

export const generateQRCode = async (studentUrl: string) => {
    try {
      // const jsonString = JSON.stringify(data); // Convert data to JSON string
      const url = await QRCode.toDataURL(studentUrl, {
        errorCorrectionLevel: "H",
        width: 256,
      }); // Generate QR code as data URL
      return url; // Set the QR code data URL to state
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };
