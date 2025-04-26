module.exports = {
  apps: [{
    name: "babylvoob",
    script: "npm",
    args: "start",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "512M",
    env: {
      NODE_ENV: "production",
      PORT: 3000  // หรือพอร์ตที่คุณต้องการ
    }
  }]
};
