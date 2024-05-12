import { IPlaywrightWorld } from "../world";
import fs from "fs";

export const tomarPantallazo = async (
  world: IPlaywrightWorld,
  imageName: string,
  folder: string
) => {
  const screenshotPath = `./screenshots/${folder}/${imageName}.png`;
  if (!fs.existsSync(`./screenshots/${folder}`)) {
    fs.mkdirSync(`./screenshots/${folder}`, { recursive: true });
  }
  await world.page.screenshot({ path: screenshotPath });
};
