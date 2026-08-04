import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import axios from "axios";

// useMutation
const useAddStory = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await axios.post("http://localhost:3000/stories", data);
    },
    onSuccess: () => {
      message.success("Them thanh cong");
    },
    onError: () => {
      message.error("Them that bai");
    },
  });
};

export default useAddStory;
