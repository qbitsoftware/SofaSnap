export interface ContactEmailTemplateData {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  productName: string;
  productId: number;
  ownerName: string;
  ownerEmail: string;
}

export function generateContactEmailSubject(productName: string, senderName: string): string {
  return `Uus päring kuulutuse "${productName}" kohta - ${senderName}`;
}

export function generateContactEmailTemplate(data: ContactEmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Uus kontakt teie kuulutuse kohta</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .content { padding: 20px 0; }
        .contact-info { background-color: #e9ecef; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 14px; color: #6c757d; }
        .product-name { color: #007bff; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Tere, ${data.ownerName}!</h2>
          <p>Keegi on huvitatud teie kuulutusest <span class="product-name">"${data.productName}"</span> ja soovib teiega ühendust võtta.</p>
        </div>
        
        <div class="content">
          <h3>Kontaktandmed:</h3>
          <div class="contact-info">
            <p><strong>Nimi:</strong> ${data.senderName}</p>
            <p><strong>E-post:</strong> ${data.senderEmail}</p>
            <p><strong>Telefon:</strong> ${data.senderPhone}</p>
          </div>
          
          <h3>Sõnum:</h3>
          <p style="white-space: pre-line; padding: 15px; background-color: #f8f9fa; border-radius: 6px;">${data.message}</p>
        </div>
        
        <div class="footer">
          <p>Saate vastata otse sellele e-kirjale või võtta ühendust kontaktandmete kaudu.</p>
          <p>See kiri on saadetud Seatly platvormi kaudu.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

