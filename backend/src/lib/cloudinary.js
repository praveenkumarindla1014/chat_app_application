import { v2 as cloudinary } from "cloudinary";

let configured = false;
function ensureConfig() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    configured = true;
  }
}

// Proxy defers config until first property access (after dotenv has loaded)
export default new Proxy(cloudinary, {
  get(target, prop) {
    ensureConfig();
    return target[prop];
  },
});