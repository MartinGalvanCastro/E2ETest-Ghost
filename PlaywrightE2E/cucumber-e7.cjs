const commonPath = "./entrega_7/";

const common = [
  `${commonPath}/features/*.feature`,
  "--require-module ts-node/register", //typescript cucumber
  `--require ${commonPath}/stepDefinitions/*.ts`,
  `--require ${commonPath}/hooks/*.ts`,
  `--require ./e2e/world/PlaywrightWorld.ts`,
  "--format progress-bar",
].join(" ");

module.exports = {
  default: common,
};
