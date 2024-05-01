const commonPath = "./e2e/";

const common = [
  `${commonPath}/features/*.feature`,
  "--require-module ts-node/register", //typescript cucumber
  `--require ${commonPath}/stepDefinitions/*.ts`,
  "--format progress-bar",
].join(" ");

module.exports = {
  default: common,
};
