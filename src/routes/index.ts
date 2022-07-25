import express, { Router } from "express";
import { readdirSync } from "fs"; //file system
const router: Router = express.Router();

const PATH_ROUTES = __dirname; // direccion lugar donde se encuentra un archivo

const removeExtension = (fileName: string): string => {
  const cleanFileName = <string>fileName.split(".").shift(); //agarra el primer indice del arreglo
  return cleanFileName;
};

function loadRouter(file: string): void {
  const name = removeExtension(file);
  if (name !== "index") {
    import(`./${file}`).then((routerModule) => {
      console.log(`Cargando ruta ${name}`);
      router.use(`/${name}`, routerModule.router);
    });
  }
}

//console.log(PATH_ROUTES);
readdirSync(PATH_ROUTES).filter((file) => loadRouter(file));

export default router;
