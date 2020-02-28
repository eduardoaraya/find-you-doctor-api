import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';


const get_name_dir_destination = () => {
  const dirUpload = path.resolve(__dirname, '..', 'storage', 'app');
  if (!fs.existsSync(dirUpload)) {
    fs.mkdirSync(dirUpload);
  }
  return dirUpload;
};

export default {
  dest: get_name_dir_destination(),
  storage: multer.diskStorage({

    destination: (req, file, cb) => cb(null, get_name_dir_destination()),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        cb(null, `${hash.toString('hex')}${path.extname(file.originalname)}`);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalide type file'));
    }
  },
};
