import express = require("express");
import { Middleware } from "./middleware";
import { AuthRoute } from "./modules/auth/authRoute";
import { UserRoute } from "./modules/users/usersRoute"
export class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "production":
        this.basePath = "/app/dist";
        break;
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: "",
    });
  }

  public path() {
    const router = express.Router();
    const middleware = new Middleware()
    // route for auth related APIs
    router.use("/auth", AuthRoute);
    // route for users
    router.use("/users", middleware.authenticateUser, UserRoute);

    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: req.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}