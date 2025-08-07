export interface Announcement {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
}

export interface UpdateAnnouncementRequest {
  title?: string;
  content?: string;
}

export interface GetAnnouncementsRequest {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  orderBy?: 'asc' | 'desc';
}