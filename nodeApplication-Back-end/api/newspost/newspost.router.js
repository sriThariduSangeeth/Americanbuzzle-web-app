const router = require("express").Router();
const multer = require('multer');
const { checkToken } = require("../../auth/token_validation");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.replace(/\s/g, ''));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * process.env.MAX_FILE_SIZE },
    fileFilter: imageFilter
})

const {
    createNewPost,
    getAllPost,
    getAllPostByDate,
    getTestPost,
    getAllCategory,
    getPostByCategoryId,
} = require("./newspost.controller");

router.post("/post", upload.fields([{ name: 'postImg', maxCount: 1 }, { name: 'newpost', maxCount: 1 }]), checkToken, createNewPost);
router.get("/all", getAllPost);
router.get("/category", getAllCategory)
router.get("/category/:id", getPostByCategoryId);
router.get("/date/:date", getAllPostByDate);
router.get("/test/post", upload.single('product'), getTestPost);

module.exports = router;