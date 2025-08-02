
# ChatPilot NPM Package

A React component for integrating a customizable chatbot widget powered by ChatPilot API.

## Installation

```bash
npm install @leocodeio-chatpilot/npm-chatpilot
```

## Usage

```tsx
import { ChatPilotBot } from '@leocodeio-chatpilot/npm-chatpilot';

function App() { is Reac
  return (
    <div>
      <ChatPilotBot 
        apiKey="your-api-key"
        xApiKey="your-x-api-key"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | string | Yes | Your ChatPilot API key |
| `xApiKey` | string | Yes | Your ChatPilot X-API key |
| `apiUrl` | string | No | Custom API URL (optional) |

## Features

- 🎨 Clean, modern chat interface
- 📱 Responsive design
- 🔄 Real-time messaging
- 🎯 Floating chat button
- ⚡ Built with React 19 and TypeScript
- 🎭 Toast notifications for errors
- 📦 Multiple export formats (ESM, CJS, UMD)

## Component Exports

### `ChatPilotBot`
The main chat widget component that provides a floating chat interface.

### `Capitalize`
A utility function to capitalize the first letter of a string.

```tsx
import { Capitalize } from '@leocodeio-chatpilot/npm-chatpilot';

const result = Capitalize({ str: "hello world" }); // "Hello world"
```

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm run dev

# Build the package
pnpm run build

# Type checking
pnpm run typecheck
```

## Publishing

```bash
pnpm run build
git add .
git commit -m "updated a update for unupdatable update"
git push origin main
```

## License

MIT

## API Endpoint

The component communicates with the ChatPilot API at `https://chatpilot.leocode.tech/action+/npm+/prompt`

