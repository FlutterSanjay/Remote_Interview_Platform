import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sessionApi } from "../api/sessions";

export const useCreateSession = () => {
  const result = useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => toast.success("Session created successfully!"),
    onError: (e) =>
      toast.error(e.response?.data?.message || "Failed to create room"),
  });
  return result;
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSession,
  });

  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSession,
  });

  return result;
};

export const useSessionsById = (id) => {
  const result = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000, // refetch every 5 second to detect session status changes
  });

  return result;
};

export const useJoinSession = (id) => {
  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: () => sessionApi.joinSession(id),
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (e) =>
      toast.success(e.response?.data?.message || " session successfully!"),
  });

  return result;
};

export const useEndSession = (id) => {
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: () => sessionApi.endSession(id),
    onSuccess: () => toast.success("Session End successfully!"),
    onError: (e) =>
      toast.success(e.response?.data?.message || " session successfully!"),
  });

  return result;
};
