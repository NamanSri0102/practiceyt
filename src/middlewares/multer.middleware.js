import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)//ye nhi dalna chahiye
    }
  })
  
  const upload = multer({ storage: storage })

  export const uplaod = multer({
    storage,
  })