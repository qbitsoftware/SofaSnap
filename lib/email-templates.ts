export interface ContactEmailTemplateData {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  message: string;
  productName: string;
  productId: number;
  ownerName: string;
  ownerEmail: string;
  startDate?: string;
  endDate?: string;
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Uus kontakt teie kuulutuse kohta</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
          line-height: 1.6; 
          color: #1a1a1a; 
          background-color: #f8fafc;
          padding: 20px;
        }
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .header { 
          background: linear-gradient(135deg, hsl(16, 88%, 80%) 0%, hsl(16, 88%, 80%) 100%);
          color: white;
          padding: 32px 24px;
          text-align: center;
        }
        .header h1 { 
          font-size: 24px; 
          font-weight: 700; 
          margin-bottom: 8px;
          letter-spacing: -0.025em;
        }
        .header p { 
          font-size: 16px; 
          opacity: 0.9;
          font-weight: 400;
        }
        .content { 
          padding: 32px 24px; 
        }
        .product-info {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .product-name { 
          color: hsl(16, 88%, 80%); 
          font-weight: 700; 
          font-size: 18px;
          margin-bottom: 8px;
          display: block;
        }
        .rental-period {
          background: #fef3f2;
          border: 1px solid hsl(16, 88%, 80%);
          border-radius: 8px;
          padding: 12px 16px;
          margin: 16px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rental-period::before {
          content: "📅";
          font-size: 16px;
        }
        .rental-dates {
          color: hsl(16, 88%, 80%);
          font-weight: 600;
        }
        .contact-section {
          margin-bottom: 32px;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid hsl(16, 88%, 80%);
          display: inline-block;
        }
        .contact-info { 
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .contact-item:last-child {
          border-bottom: none;
        }
        .contact-label {
          font-weight: 600;
          color: #475569;
          min-width: 80px;
          margin-right: 12px;
        }
        .contact-value {
          color: #1e293b;
          word-break: break-word;
        }
        .message-section {
          margin-bottom: 32px;
        }
        .message-content { 
          white-space: pre-line; 
          padding: 20px; 
          background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          border-left: 4px solid hsl(16, 88%, 80%);
          font-size: 15px;
          line-height: 1.7;
          color: #334155;
        }
        .cta-section {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          margin-bottom: 24px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, hsl(16, 88%, 80%) 0%, hsl(16, 88%, 80%) 100%);
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(240, 113, 98, 0.2);
        }
        .footer { 
          background: #f8fafc;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          font-size: 14px; 
          color: #64748b;
          margin-bottom: 8px;
        }
        .logo {
          color: hsl(16, 88%, 80%);
          font-weight: 700;
          font-size: 16px;
        }
        @media (max-width: 600px) {
          .email-container { margin: 0; border-radius: 0; }
          .header, .content, .footer { padding-left: 16px; padding-right: 16px; }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>✉️ Uus päring teie kuulutuse kohta</h1>
          <p>Keegi on huvitatud teie tootest</p>
        </div>
        
        <div class="content">
          <div class="product-info">
            <span class="product-name">"${data.productName}"</span>
            <p style="color: #64748b; margin-bottom: 12px;">Tere, ${data.ownerName}! Keegi soovib teiega ühendust võtta.</p>
            ${data.startDate && data.endDate ? `
              <div class="rental-period">
                <span>Soovitud rendiperiood:</span>
                <span class="rental-dates">${data.startDate} - ${data.endDate}</span>
              </div>
            ` : ''}
          </div>

          <div class="contact-section">
            <h3 class="section-title">👤 Kontaktandmed</h3>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-label">Nimi:</span>
                <span class="contact-value">${data.senderName}</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">E-post:</span>
                <span class="contact-value">${data.senderEmail}</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Telefon:</span>
                <span class="contact-value">${data.senderPhone || 'Pole märgitud'}</span>
              </div>
            </div>
          </div>
          
          <div class="message-section">
            <h3 class="section-title">💬 Sõnum</h3>
            <div class="message-content">${data.message}</div>
          </div>

          <div class="cta-section">
            <p style="margin-bottom: 16px; color: #475569;">Vaadake oma kuulutust ja vastake otse sellele e-kirjale</p>
            <a href="https://seatly.eu/tooted/${data.productId}" class="cta-button">
              Vaata kuulutust
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p>Saate vastata otse sellele e-kirjale või võtta ühendust ülaltoodud kontaktandmete kaudu.</p>
          <p>See kiri on saadetud <span class="logo">Seatly</span> platvormi kaudu.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateSignupSubject(): string {
  return `Tere tulemast Seatly perekonda! 🎉`;
}

export function generateSignupTemplate(email: string, name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tere tulemast Seatly platvormile</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
          line-height: 1.6; 
          color: #1a1a1a; 
          background-color: #f8fafc;
          padding: 20px;
        }
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .header { 
          background: linear-gradient(135deg, hsl(16, 88%, 80%) 0%, hsl(16, 88%, 80%) 100%);
          color: white;
          padding: 40px 24px;
          text-align: center;
        }
        .header h1 { 
          font-size: 28px; 
          font-weight: 700; 
          margin-bottom: 12px;
          letter-spacing: -0.025em;
        }
        .header p { 
          font-size: 18px; 
          opacity: 0.9;
          font-weight: 400;
        }
        .welcome-emoji {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }
        .content { 
          padding: 40px 24px; 
        }
        .welcome-section {
          text-align: center;
          margin-bottom: 32px;
        }
        .user-name {
          color: hsl(16, 88%, 80%);
          font-weight: 700;
          font-size: 20px;
        }
        .welcome-text {
          font-size: 16px;
          color: #475569;
          margin: 16px 0;
          line-height: 1.7;
        }
        .features-section {
          margin-bottom: 32px;
        }
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 20px;
          padding-bottom: 8px;
          border-bottom: 2px solid hsl(16, 88%, 80%);
          display: inline-block;
        }
        .features-grid {
          display: grid;
          gap: 16px;
        }
        .feature-item {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .feature-icon {
          font-size: 24px;
          flex-shrink: 0;
        }
        .feature-content h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 4px;
        }
        .feature-content p {
          font-size: 14px;
          color: #64748b;
          line-height: 1.5;
        }
        .next-steps {
          background: linear-gradient(135deg, #fef3f2 0%, #fef2f2 100%);
          border: 1px solid hsl(16, 88%, 80%);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
        }
        .next-steps h3 {
          color: hsl(16, 88%, 80%);
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .step-list {
          list-style: none;
          padding: 0;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          color: #7c2d12;
          font-weight: 500;
        }
        .step-number {
          background: hsl(16, 88%, 80%);
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          text-align: center;
          line-height: 1;
        }
        .cta-section {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          margin-bottom: 24px;
        }
        .cta-text {
          font-size: 16px;
          color: #475569;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, hsl(16, 88%, 80%) 0%, hsl(16, 88%, 80%) 100%);
          color: white;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(240, 113, 98, 0.25);
          margin: 0 8px 8px 0;
        }
        .cta-button.secondary {
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          box-shadow: 0 4px 6px rgba(100, 116, 139, 0.25);
        }
        .support-section {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          text-align: center;
        }
        .support-section h4 {
          color: #1e293b;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .support-section p {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 12px;
        }
        .support-contact {
          color: hsl(16, 88%, 80%);
          text-decoration: none;
          font-weight: 600;
        }
        .footer { 
          background: #f8fafc;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          font-size: 14px; 
          color: #64748b;
          margin-bottom: 8px;
        }
        .logo {
          color: hsl(16, 88%, 80%);
          font-weight: 700;
          font-size: 18px;
        }
        .social-links {
          margin-top: 16px;
        }
        .social-links a {
          color: #64748b;
          text-decoration: none;
          margin: 0 8px;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .email-container { margin: 0; border-radius: 0; }
          .header, .content, .footer { padding-left: 16px; padding-right: 16px; }
          .cta-button { display: block; margin: 8px 0; }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <span class="welcome-emoji">🎉</span>
          <h1>Tere tulemast Seatly perekonda!</h1>
          <p>Sinu konto on edukalt loodud</p>
        </div>
        
        <div class="content">
          <div class="welcome-section">
            <p class="welcome-text">
              Tere, <span class="user-name">${name}</span>!<br>
              Täname, et liitusid meie kogukonnaga. Oleme põnevil sind Seatly perekonnas näha!
            </p>
          </div>

          <div class="features-section">
            <h3 class="section-title">🚀 Mida saad nüüd teha?</h3>
            <div class="features-grid">
              <div class="feature-item">
                <span class="feature-icon">🛋️</span>
                <div class="feature-content">
                  <h4>Lisa oma esimene toode</h4>
                  <p>Müü või rendi välja oma kasutamata mööblit ja teeningu raha</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔍</span>
                <div class="feature-content">
                  <h4>Sirvi kvaliteetseid tooteid</h4>
                  <p>Leia endale sobivat mööblit soodsate hindadega</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">💬</span>
                <div class="feature-content">
                  <h4>Võta ühendust müüjatega</h4>
                  <p>Suhtle otse teiste kasutajatega turvaliselt ja lihtsalt</p>
                </div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🌱</span>
                <div class="feature-content">
                  <h4>Ole keskkonnasõbralik</h4>
                  <p>Aita luua jätkusuutlikumat tulevikku, andes asjadele teise elu</p>
                </div>
              </div>
            </div>
          </div>

          <div class="next-steps">
            <h3><span>📋</span> Järgmised sammud</h3>
            <ul class="step-list">
              <li class="step-item">
                <span class="step-number">1</span>
                <span>Täida oma profiili andmed</span>
              </li>
              <li class="step-item">
                <span class="step-number">2</span>
                <span>Lisa oma esimene toode müüki või rendile</span>
              </li>
              <li class="step-item">
                <span class="step-number">3</span>
                <span>Hakka sirvima teiste kasutajate pakkumisi</span>
              </li>
            </ul>
          </div>

          <div class="cta-section">
            <p class="cta-text">Valmis alustama? Kliki allolevale nupule!</p>
            <a href="https://seatly.eu/tooted" class="cta-button secondary">
              Sirvi tooteid
            </a>
          </div>

          <div class="support-section">
            <h4>🤝 Vajad abi?</h4>
            <p>Meie meeskond on alati valmis sind aitama!</p>
            <a href="mailto:seatly@seatly.eu" class="support-contact">tugi@seatly.ee</a>
          </div>
        </div>
        
        <div class="footer">
          <p>Täname, et valisid <span class="logo">Seatly</span> platvormi!</p>
          <p>Sinu e-post: ${email}</p>
          <div class="social-links">
            <a href="https://www.seatly.eu/muugitingimused">Kasutustingimused</a>
            <a href="https://www.seatly.eu/privaatsuspoliitika">Privaatsuspoliitika</a>
            <a href="https://www.seatly.eu/kontaktid">Kontakt</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export interface InvoiceEmailTemplateData {
  customerEmail: string;
  invoiceNumber: string;
  invoiceDate: string;
  productName: string;
  adDuration: string; // e.g., "1 kuu", "3 kuud", "Piiramatu"
  amount: string;
  paymentMethod: string;
  transactionId?: string;
}

export function generateInvoiceSubject(invoiceNumber: string): string {
  return `Seatly arve ${invoiceNumber} - Reklaami makse`;
}

export function generateInvoiceTemplate(data: InvoiceEmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Seatly Arve</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
          line-height: 1.6; 
          color: #1a1a1a; 
          background-color: #f8fafc;
          padding: 20px;
        }
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .header { 
          background: linear-gradient(135deg, hsl(16, 88%, 80%) 0%, hsl(16, 88%, 80%) 100%);
          color: white;
          padding: 32px 24px;
          text-align: center;
        }
        .header h1 { 
          font-size: 24px; 
          font-weight: 700; 
          margin-bottom: 8px;
          letter-spacing: -0.025em;
        }
        .header p { 
          font-size: 16px; 
          opacity: 0.9;
          font-weight: 400;
        }
        .content { 
          padding: 32px 24px; 
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .invoice-info h2 {
          color: #1e293b;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .invoice-number {
          color: hsl(16, 88%, 80%);
          font-weight: 600;
          font-size: 18px;
        }
        .invoice-date {
          color: #64748b;
          font-size: 14px;
        }
        .customer-info {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 12px;
          padding-bottom: 6px;
          border-bottom: 2px solid hsl(16, 88%, 80%);
          display: inline-block;
        }
        .customer-details p {
          color: #475569;
          margin-bottom: 4px;
        }
        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }
        .invoice-table th {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #1e293b;
          border-bottom: 1px solid #e2e8f0;
        }
        .invoice-table td {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
          color: #475569;
        }
        .invoice-table tr:last-child td {
          border-bottom: none;
        }
        .total-section {
          background: linear-gradient(135deg, #fef3f2 0%, #fef2f2 100%);
          border: 1px solid hsl(16, 88%, 80%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          text-align: center;
        }
        .total-row {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px 0;
          gap: 20px;
        }
        .total-label {
          font-weight: 600;
          color: #7c2d12;
        }
        .total-amount {
          font-size: 20px;
          font-weight: 700;
          color: hsl(16, 88%, 80%);
        }
        .payment-info {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .payment-item:last-child {
          border-bottom: none;
        }
        .payment-label {
          font-weight: 500;
          color: #475569;
        }
        .payment-value {
          color: #1e293b;
          font-weight: 600;
        }
        .thank-you-section {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          margin-bottom: 24px;
        }
        .thank-you-section h3 {
          color: #1e293b;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .thank-you-section p {
          color: #64748b;
          font-size: 15px;
        }
        .footer { 
          background: #f8fafc;
          padding: 24px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          font-size: 14px; 
          color: #64748b;
          margin-bottom: 8px;
        }
        .logo {
          color: hsl(16, 88%, 80%);
          font-weight: 700;
          font-size: 16px;
        }
        .support-info {
          margin-top: 16px;
          font-size: 13px;
          color: #94a3b8;
        }
        @media (max-width: 600px) {
          .email-container { margin: 0; border-radius: 0; }
          .header, .content, .footer { padding-left: 16px; padding-right: 16px; }
          .invoice-header { flex-direction: column; text-align: center; }
          .invoice-table { font-size: 14px; }
          .invoice-table th, .invoice-table td { padding: 12px 8px; }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🧾 Arve</h1>
          <p>Täname teid ostu eest!</p>
        </div>
        
        <div class="content">
          <div class="invoice-header">
            <div class="invoice-info">
              <h2>Arve</h2>
              <div class="invoice-number">#${data.invoiceNumber}</div>
              <div class="invoice-date">Kuupäev: ${data.invoiceDate}</div>
            </div>
          </div>

          <div class="customer-info">
            <h3 class="section-title">👤 Kliendi andmed</h3>
            <div class="customer-details">
              <p><strong>E-post:</strong> ${data.customerEmail}</p>
            </div>
          </div>

          <table class="invoice-table">
            <thead>
              <tr>
                <th>Toode / Teenus</th>
                <th>Kestvus</th>
                <th>Summa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Reklaami pakett</strong><br>
                  <span style="color: #64748b; font-size: 14px;">Toode: "${data.productName}"</span>
                </td>
                <td>${data.adDuration}</td>
                <td><strong>${data.amount}</strong></td>
              </tr>
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row">
              <span class="total-label">Kokku:</span>
              <span class="total-amount">${data.amount}</span>
            </div>
          </div>

          <div class="payment-info">
            <h3 class="section-title">💳 Makse andmed</h3>
            <div class="payment-item">
              <span class="payment-label">Makseviis:</span>
              <span class="payment-value">${data.paymentMethod}</span>
            </div>
            <div class="payment-item">
              <span class="payment-label">Staatus:</span>
              <span class="payment-value" style="color: #059669;">✅ Makstud</span>
            </div>
            ${data.transactionId ? `
              <div class="payment-item">
                <span class="payment-label">Tehingu ID:</span>
                <span class="payment-value">${data.transactionId}</span>
              </div>
            ` : ''}
          </div>

          <div class="thank-you-section">
            <h3>🎉 Täname teid!</h3>
            <p>Teie reklaam on nüüd aktiivsena nähtav Seatly platvormil. Soovime edukat müüki!</p>
          </div>
        </div>
        
        <div class="footer">
          <p>See arve on genereeritud automaatselt <span class="logo">Seatly</span> süsteemi poolt.</p>
          <p>Küsimuste korral võtke meiega ühendust: <a href="mailto:seatly@seatly.eu" style="color: hsl(16, 88%, 80%);">seatly@seatly.eu</a></p>
          <div class="support-info">
            <p>Seatly - Jätkusuutlik mööbli müük ja rent</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

