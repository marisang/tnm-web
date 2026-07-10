export interface Show {
  id: string;
  title: string;
  artist?: string;
  banner: string; // URL da imagem
  date: string; // Format: DD/MM/YYYY
  time: string; // Format: HH:MM
  location: string;
  address?: string;
  ticketUrl?: string;
  whatsapp?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface CreateShowInput {
  title: string;
  artist?: string;
  banner: File;
  date: string;
  time: string;
  location: string;
  address: string;
  ticketUrl: string;
  whatsapp: string;
}
