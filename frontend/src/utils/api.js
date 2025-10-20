// API configuration for different environments
// Since frontend and backend are deployed together on Render,
// we always use relative paths in production (same domain)
export const getApiUrl = (endpoint) => {
  // Always use relative paths - works in both dev (proxy) and production (same server)
  return endpoint;
};

export default getApiUrl;
