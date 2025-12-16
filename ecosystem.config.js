module.exports = {
    apps: [{
      name: "test",
      script: "./dist/app.js",
      env_production: { NODE_ENV: "production" }
    }]
  };