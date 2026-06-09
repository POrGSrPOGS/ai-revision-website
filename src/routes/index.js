const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const router = Router();

const routes = fs.readdirSync(__dirname);

routes.forEach((route) => {
  const routeInfo = path.parse(route);
  const routeName = routeInfo.name;
  const routeExtension = routeInfo.ext;

  if (routeExtension !== ".js") return;
  if (routeName === "index") return;

  router.use(`/${routeName}`, require(`./${routeName}`));
});

module.exports = router;
