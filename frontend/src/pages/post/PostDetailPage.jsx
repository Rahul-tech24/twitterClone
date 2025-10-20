import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowLeft, FaRegComment, FaRegHeart, FaHeart, FaTrash } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { formatPostDate } from "../../utils/date";
import toast from "react-hot-toast";
import { getApiUrl } from "../../utils/api";

const PostDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [comment, setComment] = useState("");

	const { data: authUser } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			const res = await fetch(getApiUrl("/api/auth/user"), { credentials: "include" });
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		staleTime: Infinity,
	});

	const { data: post, isLoading } = useQuery({
		queryKey: ["post", id],
		queryFn: async () => {
			const res = await fetch(getApiUrl(`/api/posts/post/${id}`), {
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
	});

	const { mutate: deletePost, isPending: isDeleting } = useMutation({
		mutationFn: async () => {
			const res = await fetch(getApiUrl(`/api/posts/delete/${id}`), {
				method: "DELETE",
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		onSuccess: () => {
			toast.success("Post deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			navigate("/");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: likePost, isPending: isLiking } = useMutation({
		mutationFn: async () => {
			const res = await fetch(getApiUrl(`/api/posts/like/${id}`), {
				method: "POST",
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		onSuccess: (updatedLikes) => {
			queryClient.setQueryData(["post", id], (oldData) => {
				return { ...oldData, likes: updatedLikes };
			});
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: commentPost, isPending: isCommenting } = useMutation({
		mutationFn: async () => {
			const res = await fetch(getApiUrl(`/api/posts/comment/${id}`), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ text: comment }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		onSuccess: () => {
			toast.success("Comment posted successfully");
			setComment("");
			queryClient.invalidateQueries({ queryKey: ["post", id] });
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleDeletePost = () => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			deletePost();
		}
	};

	const handleLikePost = () => {
		if (isLiking) return;
		likePost();
	};

	const handlePostComment = (e) => {
		e.preventDefault();
		if (isCommenting) return;
		if (!comment.trim()) {
			toast.error("Comment cannot be empty");
			return;
		}
		commentPost();
	};

	const isMyPost = authUser && post && authUser._id === post.user._id;
	const isLiked = post?.likes?.includes(authUser?._id);
	const formattedDate = post ? formatPostDate(post.createdAt) : "";

	if (isLoading) {
		return (
			<div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
				<div className="flex justify-center items-center h-full">
					<LoadingSpinner size="lg" />
				</div>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
				<div className="flex flex-col items-center justify-center h-full">
					<p className="text-lg text-slate-500">Post not found</p>
					<button
						onClick={() => navigate("/")}
						className="btn btn-primary mt-4"
					>
						Go Home
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
			{/* Header */}
			<div className="flex items-center gap-4 px-4 py-3 border-b border-gray-700 sticky top-0 bg-base-100 z-10">
				<button
					onClick={() => navigate(-1)}
					className="btn btn-ghost btn-circle btn-sm"
				>
					<FaArrowLeft className="w-5 h-5" />
				</button>
				<h1 className="text-xl font-bold">Post</h1>
			</div>

			{/* Post Content */}
			<div className="p-4">
				<div className="flex gap-3">
					<Link to={`/profile/${post.user.username}`} className="avatar">
						<div className="w-12 h-12 rounded-full overflow-hidden">
							<img
								src={post.user.profileImg || "/avatar-placeholder.png"}
								alt={post.user.username}
							/>
						</div>
					</Link>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<Link
								to={`/profile/${post.user.username}`}
								className="font-bold hover:underline"
							>
								{post.user.fullName}
							</Link>
							<Link
								to={`/profile/${post.user.username}`}
								className="text-gray-500 text-sm"
							>
								@{post.user.username}
							</Link>
							{isMyPost && !isDeleting && (
								<div className="ml-auto">
									<FaTrash
										className="cursor-pointer hover:text-red-500"
										onClick={handleDeletePost}
									/>
								</div>
							)}
							{isDeleting && (
								<div className="ml-auto">
									<LoadingSpinner size="sm" />
								</div>
							)}
						</div>

						{/* Post Text */}
						<div className="mt-3">
							<p className="text-lg">{post.text}</p>
						</div>

						{/* Post Image */}
						{post.img && (
							<div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
								<img
									src={post.img}
									alt="Post"
									className="w-full object-contain max-h-96"
								/>
							</div>
						)}

						{/* Post Date */}
						<div className="mt-3 text-sm text-gray-500">
							{formattedDate}
						</div>

						{/* Stats */}
						<div className="flex gap-6 py-3 mt-3 border-y border-gray-700">
							<div className="flex gap-1 items-center">
								<span className="font-bold">{post.comments.length}</span>
								<span className="text-slate-500 text-sm">
									{post.comments.length === 1 ? "Comment" : "Comments"}
								</span>
							</div>
							<div className="flex gap-1 items-center">
								<span className="font-bold">{post.likes.length}</span>
								<span className="text-slate-500 text-sm">
									{post.likes.length === 1 ? "Like" : "Likes"}
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex justify-around py-3 border-b border-gray-700">
							<div className="flex gap-1 items-center cursor-pointer group">
								<FaRegComment className="w-5 h-5 group-hover:text-sky-400" />
							</div>
							<div
								className="flex gap-1 items-center cursor-not-allowed opacity-50"
								title="Repost feature coming soon"
							>
								<BiRepost className="w-6 h-6" />
							</div>
							<div
								className="flex gap-1 items-center cursor-pointer group"
								onClick={handleLikePost}
							>
								{isLiked ? (
									<FaHeart className="w-5 h-5 text-pink-500" />
								) : (
									<FaRegHeart className="w-5 h-5 group-hover:text-pink-500" />
								)}
							</div>
						</div>

						{/* Comment Input */}
						<div className="mt-4">
							<form onSubmit={handlePostComment} className="flex gap-2">
								<div className="avatar">
									<div className="w-10 h-10 rounded-full overflow-hidden">
										<img
											src={authUser?.profileImg || "/avatar-placeholder.png"}
											alt={authUser?.username}
										/>
									</div>
								</div>
								<div className="flex-1">
									<textarea
										className="textarea w-full p-3 rounded-lg border border-gray-700 bg-base-200 focus:outline-none focus:border-sky-500 resize-none"
										placeholder="Post your reply"
										value={comment}
										onChange={(e) => setComment(e.target.value)}
										rows="2"
										onKeyDown={(e) => {
											if (e.key === "Enter" && !e.shiftKey) {
												e.preventDefault();
												handlePostComment(e);
											}
										}}
									/>
									<div className="flex justify-end mt-2">
										<button
											className={`btn btn-primary btn-sm ${
												isCommenting ? "loading" : ""
											}`}
											disabled={isCommenting || !comment.trim()}
										>
											{isCommenting ? (
												<span className="loading loading-spinner loading-sm"></span>
											) : (
												"Reply"
											)}
										</button>
									</div>
								</div>
							</form>
						</div>

						{/* Comments List */}
						<div className="mt-6">
							{post.comments.length === 0 ? (
								<p className="text-center text-slate-500 py-8">
									No comments yet. Be the first to comment!
								</p>
							) : (
								<div className="space-y-4">
									{post.comments.map((comment) => (
										<div key={comment._id} className="flex gap-3 py-3 border-b border-gray-700">
											<Link
												to={`/profile/${comment.user.username}`}
												className="avatar"
											>
												<div className="w-10 h-10 rounded-full overflow-hidden">
													<img
														src={
															comment.user.profileImg ||
															"/avatar-placeholder.png"
														}
														alt={comment.user.username}
													/>
												</div>
											</Link>
											<div className="flex-1">
												<div className="flex items-center gap-2">
													<Link
														to={`/profile/${comment.user.username}`}
														className="font-semibold hover:underline"
													>
														{comment.user.fullName}
													</Link>
													<Link
														to={`/profile/${comment.user.username}`}
														className="text-gray-500 text-sm"
													>
														@{comment.user.username}
													</Link>
													<span className="text-gray-500 text-sm">
														· {formatPostDate(comment.createdAt)}
													</span>
												</div>
												<p className="mt-1">{comment.text}</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostDetailPage;
