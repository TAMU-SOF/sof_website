#!/usr/bin/env node
const { spawn } = require('child_process')
const path = require('path')
// 1) start the standalone server
const server = spawn(path.join(__dirname, '.next/standalone/server'), [], { stdio: 'inherit' })
// 2) open default browser when ready
server.stdout.on('data', d => {
  if (d.toString().toLowerCase().includes('listening')) {
    const url = 'http://localhost:3000'
    // windows
    spawn('start', [url], { shell: true })
  }
})
