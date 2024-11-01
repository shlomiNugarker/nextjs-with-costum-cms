// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "tzahile.co.il",
      "images.unsplash.com",
      "tecdn.b-cdn.net",
      "plus.unsplash.com",
      "recipe-cpsa.com",
    ],
  },
};
