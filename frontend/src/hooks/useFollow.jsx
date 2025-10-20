import React from 'react'

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { getApiUrl } from "../utils/api";

 const useFollow = () => {

    const queryClient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(getApiUrl(`/api/users/follow/${userId}`), {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Failed to follow user");
      return data;
      },
    onSuccess: () => {
        // Invalidate all relevant queries to update UI
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
        console.error("Error following user:", error);
    }
  });

  return { follow, isPending };
}
export default useFollow;
