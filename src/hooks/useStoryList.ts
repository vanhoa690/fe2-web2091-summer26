import { useQuery } from "@tanstack/react-query";
import axiosClient from "../api/axiosClient";

const useStoryList = () => {
  return useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axiosClient.get("/stories");
      return res.data;
    },
  });
};

export default useStoryList;
