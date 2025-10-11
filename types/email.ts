export type EmailContent = {
    subject: string;
    html: string;
  }

  export type ContactEmailData = {
    senderName?: string;
    senderEmail: string;
    senderPhone?: string;
    message: string;
    productId: number;
    productName: string;
    ownerUserId: string;
    startDate?: string;
    endDate?: string
  }
  
  export type EmailSendResult = {
    success: boolean;
    error?: string;
  }
  
  export type OwnerInfo = {
    email: string;
    name: string;
  }