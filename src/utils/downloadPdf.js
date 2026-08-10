export function downloadPdf(url, filename = "document.pdf") {


  if (!url) return;



  let downloadUrl = url;


  // Add Cloudinary attachment flag
  if (!downloadUrl.includes("fl_attachment")) {

    downloadUrl = downloadUrl.replace(
      "/upload/",
      "/upload/fl_attachment/"
    );

  }



  const link = document.createElement("a");


  link.href = downloadUrl;


  link.download = filename.endsWith(".pdf")
    ? filename
    : `${filename}.pdf`;



  document.body.appendChild(link);


  link.click();


  document.body.removeChild(link);


}