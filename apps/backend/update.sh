#!/bin/bash
# Quick update script for when you push code changes

set -e

echo "Updating Blog Backend..."

# Pull latest changes
echo "Pulling latest code from Git..."
git pull origin main  # Update branch name if needed

# Load nvm if needed
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install any new dependencies
echo "Installing dependencies..."
npm install

# Restart PM2
echo "Restarting application..."
cd $HOME/blog/apps/backend && pm2 start app

echo "Update complete! Check status with: pm2 status"
echo "View logs with: pm2 logs"