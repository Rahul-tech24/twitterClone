import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "./LoadingSpinner";
import { getApiUrl } from "../../utils/api";

const FollowersFollowingModal = ({ isOpen, onClose, username, type, authUser }) => {
	const { data: users, isLoading } = useQuery({
		queryKey: [type, username],
		queryFn: async () => {
			const res = await fetch(getApiUrl(`/api/users/${type}/${username}`), {
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		enabled: isOpen && !!username,
		staleTime: 0, // Always fetch fresh data when modal opens
	});

	const { follow, isPending } = useFollow();

	const handleFollow = (e, userId) => {
		e.preventDefault();
		e.stopPropagation();
		follow(userId);
	};

	const isFollowing = (userId) => {
		return authUser?.following?.includes(userId);
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div 
				className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
				onClick={onClose}
			/>
			
			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
				<div className="bg-base-200 rounded-lg shadow-xl w-full max-w-lg max-h-[70vh] flex flex-col">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-700">
						<h3 className="text-xl font-bold">
							{type === "followers" ? "Followers" : "Following"}
						</h3>
						<button
							onClick={onClose}
							className="btn btn-sm btn-circle btn-ghost"
						>
							✕
						</button>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-y-auto p-4">
						{isLoading ? (
							<div className="flex justify-center py-8">
								<LoadingSpinner size="lg" />
							</div>
						) : users?.length === 0 ? (
							<div className="text-center py-8 text-slate-500">
								<p>No {type === "followers" ? "followers" : "following"} yet</p>
							</div>
						) : (
							<div className="space-y-3">
								{users?.map((user) => (
									<Link
										key={user._id}
										to={`/profile/${user.username}`}
										onClick={onClose}
										className="flex items-center justify-between p-3 hover:bg-base-300 rounded-lg transition"
									>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="w-12 h-12 rounded-full">
													{user.profileImg ? (
														<img src={user.profileImg} alt={user.username} />
													) : (
														<div className="w-full h-full bg-base-300 flex items-center justify-center">
															<FaUser className="w-6 h-6" />
														</div>
													)}
												</div>
											</div>
											<div className="flex flex-col">
												<span className="font-semibold hover:underline">
													{user.fullName}
												</span>
												<span className="text-sm text-slate-500">
													@{user.username}
												</span>
											</div>
										</div>

										{authUser?._id !== user._id && (
											<button
												onClick={(e) => handleFollow(e, user._id)}
												disabled={isPending}
												className={`btn btn-sm ${
													isFollowing(user._id)
														? "btn-outline"
														: "btn-primary"
												} ${isPending ? "loading" : ""}`}
											>
												{isPending ? (
													<span className="loading loading-spinner loading-sm"></span>
												) : isFollowing(user._id) ? (
													"Unfollow"
												) : (
													"Follow"
												)}
											</button>
										)}
									</Link>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default FollowersFollowingModal;
