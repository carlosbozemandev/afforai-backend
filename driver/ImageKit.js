const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_JCxCGw8zqXg0IfqdHmyRNCbb2HM=",
  privateKey: "private_BkdC3TtLFKR7bdHuaCgR6T565WQ=",
  urlEndpoint: "https://ik.imagekit.io/epbtkdzri1",
});

const uploadImage = async (file, fileName, folder) => {
  console.log(file, fileName, folder);
  try {
    const response = await imagekit.upload({
      file: file,
      fileName: fileName,
      folder: folder,
      tags: [fileName],
    });
    return response.url; // Return the URL or any relevant information
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

module.exports = {
  uploadImage,
};
