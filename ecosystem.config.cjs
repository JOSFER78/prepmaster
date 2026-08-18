module.exports = {
  apps: [
    {
      name: 'touchef',
      script: 'node_modules/.bin/vite',
      args: 'preview --port 3002 --host 0.0.0.0',
      cwd: '/home/ubuntu/workspace/pro/webs/12prepmaster',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '350M',
      restart_delay: 4000,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/home/ubuntu/.pm2/logs/touchef-error.log',
      out_file: '/home/ubuntu/.pm2/logs/touchef-out.log'
    }
  ]
};
