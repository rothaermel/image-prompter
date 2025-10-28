# Image Prompt Builder - Electron Desktop App

A Vue.js + Electron desktop application for building image generation prompts with light/dark mode support.

## 🚀 Quick Start

### Development Mode
```bash
# Start the Electron app in development mode
npm run electron:dev
```

This will:
1. Start the Vite development server
2. Wait for the server to be ready
3. Launch the Electron app

### Production Builds

#### Build for Current Platform
```bash
npm run electron:build
```

#### Build for Specific Platforms
```bash
# Windows (creates .exe installer and portable)
npm run electron:build:win

# macOS (creates .dmg and .zip)
npm run electron:build:mac

# Linux (creates AppImage, .deb, .rpm)
npm run electron:build:linux
```

#### Build All Platforms
```bash
npm run electron:dist
```

## 📁 Project Structure

```
├── electron/
│   └── main.js              # Electron main process
├── src/
│   ├── components/          # Vue components
│   ├── utils/              # Utility functions
│   ├── assets/styles/      # SCSS styles
│   ├── App.vue             # Main Vue app
│   └── main.js             # Vue entry point
├── dist/                   # Built web app (for Electron)
├── dist-electron/          # Built Electron apps
└── assets/                 # App icons (optional)
```

## 🎨 Features

- **Cross-Platform**: Windows, macOS, Linux support
- **Light/Dark Mode**: Toggle between themes
- **Responsive Design**: Works on all screen sizes
- **Real-time Prompt Generation**: Live updates as you type
- **Smart Randomization**: Random and harmonious field generation
- **Copy/Select Functions**: Easy prompt copying
- **Native Menus**: Platform-specific application menus
- **Auto-updater Ready**: Built-in support for future updates

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start web development server
npm run dev

# Start Electron development
npm run electron:dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build web app for production |
| `npm run electron:dev` | Start Electron in development mode |
| `npm run electron:build` | Build Electron app for current platform |
| `npm run electron:build:win` | Build for Windows |
| `npm run electron:build:mac` | Build for macOS |
| `npm run electron:build:linux` | Build for Linux |
| `npm run electron:dist` | Build for all platforms |
| `npm run electron:pack` | Package without installer |

## 📦 Distribution

Built applications will be available in the `dist-electron/` directory:

### Windows
- `Image Prompt Builder Setup.exe` - NSIS installer
- `Image Prompt Builder.exe` - Portable executable

### macOS
- `Image Prompt Builder.dmg` - Disk image installer
- `Image Prompt Builder.zip` - Archive

### Linux
- `Image Prompt Builder.AppImage` - Portable AppImage
- `Image Prompt Builder.deb` - Debian package
- `Image Prompt Builder.rpm` - RPM package

## 🎯 Customization

### Adding App Icons
Place your app icons in the `assets/` directory:
- `icon.png` (512x512) - Linux
- `icon.ico` (256x256) - Windows
- `icon.icns` (512x512) - macOS

Then uncomment the icon lines in `package.json` and `electron/main.js`.

### Modifying Build Configuration
Edit the `build` section in `package.json` to customize:
- App metadata
- Build targets
- Installer options
- Code signing (for distribution)

### Adding Native Features
The Electron main process (`electron/main.js`) can be extended to add:
- File system access
- Native notifications
- System tray integration
- Auto-updater
- Native menus

## 🔧 Troubleshooting

### Common Issues

1. **Electron won't start**
   - Ensure Vite dev server is running on port 3000
   - Check that all dependencies are installed

2. **Build fails**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Ensure you have the required build tools for your platform

3. **App won't load**
   - Check that the build completed successfully
   - Verify the `dist/` directory contains the built files

### Platform-Specific Notes

- **Windows**: Requires Visual Studio Build Tools for native modules
- **macOS**: May require Xcode Command Line Tools
- **Linux**: May require additional build dependencies

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed information
