#!/bin/bash

# My Tech Knowledge Base - Development Scripts
# Run from project root directory

set -e

WEBSITE_DIR="website"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
check_directory() {
    if [ ! -d "$WEBSITE_DIR" ]; then
        log_error "Website directory not found. Are you in the project root?"
        exit 1
    fi
}

# Install dependencies
install_deps() {
    log_info "Installing dependencies..."
    cd "$WEBSITE_DIR"
    npm install
    cd ..
    log_success "Dependencies installed"
}

# Start development server
start_dev() {
    check_directory
    log_info "Starting development server..."
    cd "$WEBSITE_DIR"
    npm start
}

# Build for production
build_prod() {
    check_directory
    log_info "Building for production..."
    cd "$WEBSITE_DIR"
    npm run build
    log_success "Build complete"
}

# Preview production build
preview_build() {
    check_directory
    log_info "Building and serving production version..."
    cd "$WEBSITE_DIR"
    npm run preview
}

# Clean install
clean_install() {
    check_directory
    log_warning "This will remove node_modules and package-lock.json"
    read -p "Continue? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Performing clean install..."
        cd "$WEBSITE_DIR"
        rm -rf node_modules package-lock.json
        npm install
        cd ..
        log_success "Clean install complete"
    fi
}

# Deploy reminder
deploy_reminder() {
    check_directory
    log_info "Building for deployment..."
    cd "$WEBSITE_DIR"
    npm run build
    cd ..
    log_success "Build complete!"
    log_info "To deploy:"
    echo "  1. Commit your changes: git add . && git commit -m 'Update docs'"
    echo "  2. Push to main: git push origin main"
    echo "  3. GitHub Actions will automatically deploy to GitHub Pages"
}

# Show help
show_help() {
    echo "My Tech Knowledge Base - Development Scripts"
    echo ""
    echo "Usage: ./scripts/dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  install    Install dependencies"
    echo "  dev        Start development server"
    echo "  build      Build for production"
    echo "  preview    Build and preview production version"
    echo "  clean      Clean install (removes node_modules)"
    echo "  deploy     Build and show deployment instructions"
    echo "  help       Show this help message"
    echo ""
    echo "Or use npm scripts from project root:"
    echo "  npm run dev        - Start development server"
    echo "  npm run build      - Build for production"
    echo "  npm run preview    - Preview production build"
    echo "  npm run deploy     - Build and show deployment steps"
    echo "  npm run clean-install - Clean install dependencies"
}

# Main script logic
case "${1:-help}" in
    "install")
        install_deps
        ;;
    "dev")
        start_dev
        ;;
    "build")
        build_prod
        ;;
    "preview")
        preview_build
        ;;
    "clean")
        clean_install
        ;;
    "deploy")
        deploy_reminder
        ;;
    "help"|*)
        show_help
        ;;
esac