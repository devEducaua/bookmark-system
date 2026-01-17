import { Hono } from "hono";
import { userController } from "./controllers/userController";
import { bookmarkController } from "./controllers/bookmarkController";
import { authController } from "./controllers/authController";
import { openapiController } from "./controllers/openapiController";

const router = new Hono();

router.route("/users", userController);
router.route("/bookmarks", bookmarkController);
router.route("/auth", authController);
router.route("/", openapiController);

export default router;
