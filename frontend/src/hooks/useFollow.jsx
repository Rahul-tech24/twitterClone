import React from 'react'

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

 const useFollow = () => {

    const queryClient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(`/api/users/follow/${userId}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to follow user");
      return res.json();
      },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
    }
  });

  return { follow, isPending };
}
export default useFollow;
