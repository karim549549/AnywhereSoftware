export interface IAnnouncement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAnnouncementDto {
  title: string;
  content: string;
}

export interface IUpdateAnnouncementDto {
  title?: string;
  content?: string;
}
