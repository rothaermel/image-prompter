# Image Prompt Builder

A Vue.js application for building image generation prompts with a beautiful, responsive interface using Bootstrap SCSS.

## Features

- **Interactive Form**: Build prompts by selecting from various categories
- **Real-time Generation**: See your prompt update as you make selections
- **Smart Randomization**: Randomize all fields or use harmonious combinations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Dark theme with Bootstrap SCSS customization
- **Copy/Select Functions**: Easy prompt copying and text selection

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite.js** - Fast build tool and development server
- **Bootstrap 5** - CSS framework with SCSS customization
- **SCSS** - CSS preprocessor for enhanced styling

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── PromptForm.vue      # Main form component
│   └── PromptOutput.vue    # Prompt display component
├── utils/
│   └── promptUtils.js      # Prompt generation logic
├── assets/
│   └── styles/
│       └── main.scss       # Custom SCSS styles
├── App.vue                 # Main application component
└── main.js                 # Application entry point
```

## Usage

1. **Fill the Form**: Select options from the dropdown menus or enter text in the focal point field
2. **Generate Prompt**: The prompt will automatically update as you make selections
3. **Randomize**: Use the "Randomize" button to fill all fields with random values
4. **Harmonize**: Use the "Harmonize" button to create coherent, aesthetically pleasing combinations
5. **Copy/Select**: Use the buttons in the output panel to copy or select the generated prompt

## Customization

### Adding New Options

Edit `src/utils/promptUtils.js` to add new options to any category:

```javascript
export const promptOptions = {
  // Add new options to existing categories
  colors: [
    'Azure-Blue',
    'Sage-Green',
    // Add your new colors here
  ],
  // Or create new categories
  newCategory: [
    'Option 1',
    'Option 2',
  ]
}
```

### Styling

Customize the appearance by editing `src/assets/styles/main.scss`:

```scss
// Change color scheme
$primary: #your-color;
$secondary: #your-color;

// Add custom styles
.your-custom-class {
  // Your styles here
}
```

## Development Scripts

### Web Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Electron Desktop App
- `npm run electron:dev` - Start Electron in development mode
- `npm run electron:build` - Build Electron app for current platform
- `npm run electron:build:win` - Build for Windows
- `npm run electron:build:mac` - Build for macOS
- `npm run electron:build:linux` - Build for Linux
- `npm run electron:dist` - Build for all platforms

## Desktop App (Electron)

This project also includes Electron support for creating desktop applications:

- **Cross-Platform**: Windows, macOS, Linux
- **Native Menus**: Platform-specific application menus
- **Auto-updater Ready**: Built-in support for future updates
- **Light/Dark Mode**: Same theme system as web version

See [ELECTRON_README.md](./ELECTRON_README.md) for detailed Electron setup and build instructions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.
