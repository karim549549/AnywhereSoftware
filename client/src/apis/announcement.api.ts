import fetcher from "@/utils/fetcher";
import { Announcement, CreateAnnouncementRequest, UpdateAnnouncementRequest, GetAnnouncementsRequest } from "@/types/announcement.type";
import { PaginationResponse } from "@/types/pagination.type";

export const createAnnouncement = async (data: CreateAnnouncementRequest): Promise<Announcement> => {
  const response = await fetcher.post<Announcement>("/announcement", { body: data });
  return response;
};

export const getAllAnnouncements = async (params?: GetAnnouncementsRequest): Promise<PaginationResponse<Announcement>> => {
  const query = new URLSearchParams();
  if (params) {
    for (const key in params) {
      if (params[key as keyof GetAnnouncementsRequest] !== undefined) {
        query.append(key, String(params[key as keyof GetAnnouncementsRequest]));
      }
    }
  }
  const response = await fetcher.get<PaginationResponse<Announcement>>(`/announcement?${query.toString()}`);
  return response;
};

export const getUserAnnouncements = async (params?: GetAnnouncementsRequest): Promise<PaginationResponse<Announcement>> => {
  const query = new URLSearchParams();
  if (params) {
    for (const key in params) {
      if (params[key as keyof GetAnnouncementsRequest] !== undefined) {
        query.append(key, String(params[key as keyof GetAnnouncementsRequest]));
      }
    }
  }
  const response = await fetcher.get<PaginationResponse<Announcement>>(`/announcement/user?${query.toString()}`);
  return response;
};

export const getAnnouncementById = async (id: string): Promise<Announcement> => {
  const response = await fetcher.get<Announcement>(`/announcement/${id}`);
  return response;
};

export const updateAnnouncement = async (id: string, data: UpdateAnnouncementRequest): Promise<Announcement> => {
  const response = await fetcher.put<Announcement>(`/announcement/${id}`, { body: data });
  return response;
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  await fetcher.delete<void>(`/announcement/${id}`);
};
