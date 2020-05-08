module.exports = (shipit) => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      deployTo: '/usr/share/push-server/docs',
      repositoryUrl: 'git@github.com:ykshev/push-landings.git',
      ignores: ['.git', '.vscode', 'node_modules'],
      keepReleases: 5,
      deploy: {
        remoteCopy: {
          copyAsDir: false, // Should we copy as the dir (true) or the content of the dir (false)
        },
      },
    },
    production: {
      servers: 'root@pushim',
    },
  });
};
