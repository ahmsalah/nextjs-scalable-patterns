# Load nvm if available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Load fnm if available
command -v fnm >/dev/null 2>&1 && eval "$(fnm env)"

# Add pnpm to PATH (macOS + Linux default locations)
export PATH="$HOME/Library/pnpm:$HOME/.local/share/pnpm:$PATH"
