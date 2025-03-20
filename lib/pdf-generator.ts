import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { biodata } from "@/lib/data"

export const generatePDF = async () => {
  // Show loading state
  const loadingToast = showLoadingToast()

  try {
    // Create a temporary div to render the biodata content for PDF
    const pdfContent = document.createElement("div")
    pdfContent.className = "pdf-content"
    pdfContent.style.width = "210mm" // A4 width
    pdfContent.style.padding = "15mm"
    pdfContent.style.backgroundColor = "white"
    pdfContent.style.position = "absolute"
    pdfContent.style.left = "-9999px"
    pdfContent.style.top = "0"
    pdfContent.style.fontFamily = "Arial, sans-serif"

    // Create structured content for PDF with stylish background
    pdfContent.innerHTML = `
      <div style="position: relative; padding: 20px; background-color: #f8f9fa;">
        <!-- Decorative header -->
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 15mm; background: linear-gradient(to right, #0f3460, #16488c); z-index: 0;"></div>
        
        <!-- Decorative footer -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 10mm; background: linear-gradient(to right, #0f3460, #16488c); z-index: 0;"></div>
        
        <!-- Decorative side elements -->
        <div style="position: absolute; top: 15mm; bottom: 10mm; left: 0; width: 5mm; background-color: #b8860b; opacity: 0.3; z-index: 0;"></div>
        <div style="position: absolute; top: 15mm; bottom: 10mm; right: 0; width: 5mm; background-color: #b8860b; opacity: 0.3; z-index: 0;"></div>
        
        <!-- Content container with white background -->
        <div style="position: relative; background-color: white; padding: 20px; margin-top: 10mm; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #0f3460; font-size: 24px; margin-bottom: 10px;">Biodata</h1>
            <h2 style="font-size: 20px; margin-bottom: 20px;">${biodata.name}</h2>
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
              <div style="width: 150px; height: 180px; border: 2px solid #b8860b; border-radius: 5px; overflow: hidden; background-color: #f8f9fa;">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2140.JPG-2qCGKgP8xLY9dLipkIJBqGLex5oB1E.jpeg" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #0f3460; font-size: 18px; border-bottom: 1px solid #b8860b; padding-bottom: 5px; margin-bottom: 10px;">Personal Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; width: 40%; font-weight: bold;">Date of Birth:</td>
                <td style="padding: 8px;">${biodata.personalDetails.birthdate} (Age: 21 Years)</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Birth Place:</td>
                <td style="padding: 8px;">${biodata.personalDetails.birthplace}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Height:</td>
                <td style="padding: 8px;">${biodata.personalDetails.height}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Weight:</td>
                <td style="padding: 8px;">${biodata.personalDetails.weight}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Education:</td>
                <td style="padding: 8px;">${biodata.personalDetails.education}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Current Status:</td>
                <td style="padding: 8px;">${biodata.personalDetails.currentStatus}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Religion & Caste:</td>
                <td style="padding: 8px;">${biodata.personalDetails.religion}, ${biodata.personalDetails.caste}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Zodiac Sign:</td>
                <td style="padding: 8px;">${biodata.personalDetails.zodiacSign}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Blood Group:</td>
                <td style="padding: 8px;">${biodata.personalDetails.bloodGroup}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #0f3460; font-size: 18px; border-bottom: 1px solid #b8860b; padding-bottom: 5px; margin-bottom: 10px;">Family Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; width: 40%; font-weight: bold;">Father:</td>
                <td style="padding: 8px;">${biodata.family.father.name} (${biodata.family.father.occupation})</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Mother:</td>
                <td style="padding: 8px;">${biodata.family.mother.name} (${biodata.family.mother.occupation})</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Sister:</td>
                <td style="padding: 8px;">${biodata.family.siblings[0].name}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #0f3460; font-size: 18px; border-bottom: 1px solid #b8860b; padding-bottom: 5px; margin-bottom: 10px;">Education & Career</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; width: 40%; font-weight: bold;">Current:</td>
                <td style="padding: 8px;">${biodata.education[0].degree} at ${biodata.education[0].institution} (${biodata.education[0].year})</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Graduation:</td>
                <td style="padding: 8px;">${biodata.education[1].degree} from ${biodata.education[1].institution} (${biodata.education[1].year})</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Experience:</td>
                <td style="padding: 8px;">${biodata.education[3].degree} at ${biodata.education[3].institution} (${biodata.education[3].year})</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #0f3460; font-size: 18px; border-bottom: 1px solid #b8860b; padding-bottom: 5px; margin-bottom: 10px;">Hobbies & Interests</h3>
            <p style="padding: 8px;">${biodata.personalDetails.hobbies}</p>
          </div>
          
          <div>
            <h3 style="color: #0f3460; font-size: 18px; border-bottom: 1px solid #b8860b; padding-bottom: 5px; margin-bottom: 10px;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; width: 40%; font-weight: bold;">Phone:</td>
                <td style="padding: 8px;">${biodata.contact.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Father's Phone:</td>
                <td style="padding: 8px;">${biodata.contact.fatherPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Email:</td>
                <td style="padding: 8px;">${biodata.contact.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Address:</td>
                <td style="padding: 8px;">${biodata.contact.address}</td>
              </tr>
            </table>
          </div>
        </div>
        
        <!-- Footer text -->
        <div style="position: absolute; bottom: 2mm; left: 0; right: 0; text-align: center; color: white; font-size: 10px; z-index: 2;">
          © ${new Date().getFullYear()} ${biodata.name} | Biodata
        </div>
      </div>
    `

    document.body.appendChild(pdfContent)

    // Create canvas from the element
    const canvas = await html2canvas(pdfContent, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
      backgroundColor: "#ffffff",
    })

    // Remove the temporary element
    document.body.removeChild(pdfContent)

    // Calculate dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4")
    let position = 0

    // Add first page
    pdf.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Save the PDF
    pdf.save("Vishvarajsinh_Biodata.pdf")

    // Show success message
    showSuccessToast()
  } catch (error) {
    console.error("Error generating PDF:", error)
    showErrorToast()
  } finally {
    // Hide loading state
    hideToast(loadingToast)
  }
}

export const generateDOCX = async () => {
  // Show loading state
  const loadingToast = showLoadingToast("Generating DOCX...")

  try {
    // Create a blob with HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Vishvarajsinh Biodata</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background-color: #f8f9fa;
          }
          .container {
            background-color: white;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            position: relative;
          }
          .header {
            background: linear-gradient(to right, #0f3460, #16488c);
            height: 15px;
            margin: -20px -20px 20px -20px;
          }
          .footer {
            background: linear-gradient(to right, #0f3460, #16488c);
            height: 10px;
            margin: 20px -20px -20px -20px;
          }
          h1 { color: #0f3460; text-align: center; }
          h2 { color: #0f3460; text-align: center; margin-bottom: 20px; }
          .profile-img { 
            display: block; 
            width: 150px; 
            height: auto; 
            margin: 0 auto 20px; 
            border: 2px solid #b8860b; 
          }
          h3 { 
            color: #0f3460; 
            border-bottom: 1px solid #b8860b; 
            padding-bottom: 5px; 
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 20px; 
          }
          td { 
            padding: 8px; 
            vertical-align: top; 
          }
          .label { 
            font-weight: bold; 
            width: 40%; 
          }
          .footer-text {
            text-align: center;
            font-size: 10px;
            color: #666;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"></div>
          
          <h1>Biodata</h1>
          <h2>${biodata.name}</h2>
          
          <h3>Personal Details</h3>
          <table>
            <tr>
              <td class="label">Date of Birth:</td>
              <td>${biodata.personalDetails.birthdate} (Age: 21 Years)</td>
            </tr>
            <tr>
              <td class="label">Birth Place:</td>
              <td>${biodata.personalDetails.birthplace}</td>
            </tr>
            <tr>
              <td class="label">Height:</td>
              <td>${biodata.personalDetails.height}</td>
            </tr>
            <tr>
              <td class="label">Weight:</td>
              <td>${biodata.personalDetails.weight}</td>
            </tr>
            <tr>
              <td class="label">Education:</td>
              <td>${biodata.personalDetails.education}</td>
            </tr>
            <tr>
              <td class="label">Current Status:</td>
              <td>${biodata.personalDetails.currentStatus}</td>
            </tr>
            <tr>
              <td class="label">Religion & Caste:</td>
              <td>${biodata.personalDetails.religion}, ${biodata.personalDetails.caste}</td>
            </tr>
            <tr>
              <td class="label">Zodiac Sign:</td>
              <td>${biodata.personalDetails.zodiacSign}</td>
            </tr>
            <tr>
              <td class="label">Blood Group:</td>
              <td>${biodata.personalDetails.bloodGroup}</td>
            </tr>
          </table>
          
          <h3>Family Details</h3>
          <table>
            <tr>
              <td class="label">Father:</td>
              <td>${biodata.family.father.name} (${biodata.family.father.occupation})</td>
            </tr>
            <tr>
              <td class="label">Mother:</td>
              <td>${biodata.family.mother.name} (${biodata.family.mother.occupation})</td>
            </tr>
            <tr>
              <td class="label">Sister:</td>
              <td>${biodata.family.siblings[0].name}</td>
            </tr>
          </table>
          
          <h3>Education & Career</h3>
          <table>
            <tr>
              <td class="label">Current:</td>
              <td>${biodata.education[0].degree} at ${biodata.education[0].institution} (${biodata.education[0].year})</td>
            </tr>
            <tr>
              <td class="label">Graduation:</td>
              <td>${biodata.education[1].degree} from ${biodata.education[1].institution} (${biodata.education[1].year})</td>
            </tr>
            <tr>
              <td class="label">Experience:</td>
              <td>${biodata.education[3].degree} at ${biodata.education[3].institution} (${biodata.education[3].year})</td>
            </tr>
          </table>
          
          <h3>Hobbies & Interests</h3>
          <p>${biodata.personalDetails.hobbies}</p>
          
          <h3>Contact Details</h3>
          <table>
            <tr>
              <td class="label">Phone:</td>
              <td>${biodata.contact.phone}</td>
            </tr>
            <tr>
              <td class="label">Father's Phone:</td>
              <td>${biodata.contact.fatherPhone}</td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td>${biodata.contact.email}</td>
            </tr>
            <tr>
              <td class="label">Address:</td>
              <td>${biodata.contact.address}</td>
            </tr>
          </table>
          
          <div class="footer"></div>
          <div class="footer-text">© ${new Date().getFullYear()} ${biodata.name} | Biodata</div>
        </div>
      </body>
      </html>
    `

    // Convert HTML to DOCX using a blob
    const blob = new Blob([htmlContent], { type: "application/msword" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "Vishvarajsinh_Biodata.doc"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show success message
    showSuccessToast("DOCX downloaded successfully!")
  } catch (error) {
    console.error("Error generating DOCX:", error)
    showErrorToast("Failed to generate DOCX. Please try again.")
  } finally {
    // Hide loading state
    hideToast(loadingToast)
  }
}

// Toast notification functions
function showLoadingToast(message = "Generating PDF...") {
  const toast = document.createElement("div")
  toast.className = "fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50 flex items-center"

  const spinner = document.createElement("div")
  spinner.className = "animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"
  toast.appendChild(spinner)

  const text = document.createTextNode(message)
  toast.appendChild(text)

  document.body.appendChild(toast)
  return toast
}

function showSuccessToast(message = "PDF downloaded successfully!") {
  const toast = document.createElement("div")
  toast.className = "fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50"
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => hideToast(toast), 3000)
}

function showErrorToast(message = "Failed to generate PDF. Please try again.") {
  const toast = document.createElement("div")
  toast.className = "fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50"
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => hideToast(toast), 3000)
}

function hideToast(toast: HTMLElement) {
  if (toast && toast.parentNode) {
    toast.parentNode.removeChild(toast)
  }
}

