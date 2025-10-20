import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getApiUrl } from "../utils/api";

const useUpdateUserProfile = () => {
	const queryClient = useQueryClient();
	const { username } = useParams();

	const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
		mutationFn: async (formData) => {
			const res = await fetch(getApiUrl(`/api/users/update`), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message || data.error || "Failed to update profile");
			}
			return data;
		},
		onSuccess: async (updatedUser) => {
			toast.success("Profile updated successfully");
			
			// Update authUser cache
			queryClient.setQueryData(["authUser"], updatedUser);
			
			// Update current profile cache if viewing own profile
			if (username) {
				queryClient.setQueryData(["userProfile", username], updatedUser);
				// If username changed, also set cache for new username
				if (updatedUser.username !== username) {
					queryClient.setQueryData(["userProfile", updatedUser.username], updatedUser);
				}
			}
			
			return updatedUser;
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update profile");
		},
	});

	return { updateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;