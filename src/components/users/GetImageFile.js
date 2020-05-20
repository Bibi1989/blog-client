import dotenv from "dotenv";
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const cloud_base_name = process.env.REACT_APP_CLOUDINARY_BASE_URL;

dotenv.config();

export const getFiles = async (new_files, setImageUrl, form) => {
  let get_links = [];
  for (let file of new_files) {
    try {
      const Data = new FormData();
      Data.append("file", file);
      Data.append("Content", "");
      Data.append("tags", form.email);
      Data.append("upload_preset", upload_preset);

      const response = await fetch(cloud_base_name, {
        method: "POST",
        body: Data,
      });
      const result = await response.json();
      get_links.push(result.secure_url);
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  return setImageUrl(get_links);
};
