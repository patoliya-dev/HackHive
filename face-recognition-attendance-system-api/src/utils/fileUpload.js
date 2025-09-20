const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload folder exists
const ensureFolderExists = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

const uploadFile = (folderPath, fileFieldName, allowedMimeTypes = []) => {
  ensureFolderExists(folderPath);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.length && !allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  };

  return multer({ storage, fileFilter }).single(fileFieldName);
};

module.exports = uploadFile;
