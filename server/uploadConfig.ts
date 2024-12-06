import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${process.cwd()}/assets/xero`);
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "thisweeksquare") {
      cb(null, "thisweeksquare" + path.extname(file.originalname));
    } else if (file.fieldname === "contacts") {
      cb(null, "contacts" + path.extname(file.originalname));
    } else {
      cb(null, file.originalname);
    }
  },
});

const upload = multer({ storage });

export default upload;
