# 🚀 KimchiSwap Backend: Complete Step-by-Step Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Initialize the Project](#step-1-initialize-the-project)
3. [Step 2: Install Dependencies](#step-2-install-dependencies)
4. [Step 3: Configure TypeScript](#step-3-configure-typescript)
5. [Step 4: Set Up Environment Variables](#step-4-set-up-environment-variables)
6. [Step 5: Create the Server Structure](#step-5-create-the-server-structure)
7. [Step 6: Build Core Files](#step-6-build-core-files)
8. [Step 7: Test Your Server](#step-7-test-your-server)
9. [Step 8: Connect to Your Frontend](#step-8-connect-to-your-frontend)
10. [Troubleshooting](#troubleshooting)

---

## 🛠️ Prerequisites

Before we start, make sure you have:

### **Required Software:**
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **VS Code** (recommended editor)

### **How to Check:**
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

### **If You Don't Have Node.js:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the "LTS" version
3. Install it on your computer
4. Restart your terminal/command prompt

---

## 🎯 Step 1: Initialize the Project

### **1.1 Navigate to Your Project**
```bash
# Go to your kimchiswap project folder
cd /Users/j/Documents/projects/kimchiswap

# You should see your client/ folder here
ls
```

### **1.2 Create the Server Directory**
```bash
# Create a new folder called 'server'
mkdir server

# Go into the server folder
cd server

# Verify you're in the right place
pwd
# Should show: /Users/j/Documents/projects/kimchiswap/server
```

### **1.3 Initialize npm Project**
```bash
# Initialize a new npm project
npm init -y

# This creates package.json with default values
```

---

## 📦 Step 2: Install Dependencies

### **2.1 Install Production Dependencies**
```bash
# Install all the packages we need
npm install express cors helmet compression morgan dotenv ethers socket.io pg redis jsonwebtoken bcryptjs rate-limiter-flexible express-rate-limit express-validator axios winston
```

**What each package does:**
- `express` - Web framework (like Flask for Python)
- `cors` - Allows your React app to connect
- `helmet` - Security headers
- `compression` - Makes responses smaller/faster
- `morgan` - Logs HTTP requests
- `dotenv` - Loads environment variables
- `ethers` - Ethereum blockchain interaction
- `socket.io` - Real-time features
- `pg` - PostgreSQL database
- `redis` - Fast caching
- `jsonwebtoken` - User authentication
- `bcryptjs` - Password security
- `rate-limiter-flexible` - Prevents abuse
- `express-rate-limit` - Simple rate limiting
- `express-validator` - Validates data
- `axios` - Makes HTTP requests
- `winston` - Professional logging

### **2.2 Install Development Dependencies**
```bash
# Install TypeScript and development tools
npm install --save-dev typescript ts-node nodemon @types/node @types/express @types/cors @types/pg @types/jsonwebtoken @types/bcryptjs @types/compression @types/morgan eslint prettier
```

**What these do:**
- `typescript` - TypeScript compiler
- `ts-node` - Run TypeScript directly
- `nodemon` - Auto-restart server when files change
- `@types/*` - Type definitions for packages
- `eslint` - Code quality checker
- `prettier` - Code formatter

---

## ⚙️ Step 3: Configure TypeScript

### **3.1 Create TypeScript Config**
```bash
# Create tsconfig.json file
touch tsconfig.json
```

### **3.2 Add TypeScript Configuration**
Open `tsconfig.json` and add this content:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "removeComments": true,
    
    // Relaxed settings for learning
    "noImplicitAny": false,
    "noImplicitReturns": false,
    "noImplicitThis": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    
    "exactOptionalPropertyTypes": false,
    "noImplicitOverride": false,
    "noPropertyAccessFromIndexSignature": false,
    "noUncheckedIndexedAccess": false,
    "allowUnusedLabels": true,
    "allowUnreachableCode": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]
}
```

### **3.3 Update package.json Scripts**
Open `package.json` and replace the "scripts" section:

```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

---

## 🔧 Step 4: Set Up Environment Variables

### **4.1 Create Environment File**
```bash
# Create .env file
touch .env
```

### **4.2 Add Environment Variables**
Open `.env` and add this content:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration (we'll set these up later)
DATABASE_URL=postgresql://username:password@localhost:5432/kimchiswap
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Ethereum Configuration (we'll set these up later)
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
ETHEREUM_PRIVATE_KEY=your-ethereum-private-key
KIMCHICOIN_CONTRACT_ADDRESS=0x...

# External APIs
COINMARKETCAP_API_KEY=your-coinmarketcap-api-key
COINMARKETCAP_API_URL=https://pro-api.coinmarketcap.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=info
```

### **4.3 Create .gitignore**
```bash
# Create .gitignore file
touch .gitignore
```

Add this content to `.gitignore`:
```
node_modules/
dist/
.env
logs/
*.log
```

---

## 📁 Step 5: Create the Server Structure

### **5.1 Create Directory Structure**
```bash
# Create the main source directory
mkdir src

# Create subdirectories
mkdir src/config
mkdir src/middleware
mkdir src/routes
mkdir src/utils
mkdir logs
```

### **5.2 Verify Structure**
```bash
# Check your folder structure
tree
# or on macOS:
find . -type d
```

You should see:
```
server/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   └── utils/
├── logs/
├── package.json
├── tsconfig.json
├── .env
└── .gitignore
```

---

## 🔨 Step 6: Build Core Files

### **6.1 Create Logger Utility**
Create `src/utils/logger.ts`:

```typescript
import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: process.env['LOG_LEVEL'] || 'info',
  format: logFormat,
  defaultMeta: { service: 'kimchiswap-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// If we're not in production, log to the console as well
if (process.env['NODE_ENV'] !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}
```

### **6.2 Create Error Handler**
Create `src/middleware/errorHandler.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Don't leak error details in production
  const errorResponse = {
    success: false,
    error: {
      message: process.env['NODE_ENV'] === 'production' && statusCode === 500 
        ? 'Internal Server Error' 
        : message,
      ...(process.env['NODE_ENV'] !== 'production' && { stack: err.stack })
    }
  };

  res.status(statusCode).json(errorResponse);
};

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};
```

### **6.3 Create Rate Limiter**
Create `src/middleware/rateLimiter.ts`:

```typescript
import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger';

export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15 minutes
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: {
        message: 'Too many requests from this IP, please try again later.'
      }
    });
  }
});
```

### **6.4 Create Main Server File**
Create `src/index.ts`:

```typescript
import express from 'express'; 
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Load environment variables
dotenv.config();

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Import logger
import { logger } from './utils/logger';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'KimchiSwap Backend'
  });
});

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('subscribe-prices', (symbols: string[]) => {
    logger.info(`Client ${socket.id} subscribed to prices: ${symbols.join(', ')}`);
    // TODO: Implement price subscription logic
  });
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    server.listen(PORT, () => {
      logger.info(`🚀 KimchiSwap Backend running on port ${PORT}`);
      logger.info(`📊 Health check: http://localhost:${PORT}/health`);
      logger.info(`🔗 CORS origin: ${process.env.CORS_ORIGIN || "http://localhost:5173"}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

startServer();
```

---

## 🧪 Step 7: Test Your Server

### **7.1 Start the Development Server**
```bash
# Make sure you're in the server directory
cd /Users/j/Documents/projects/kimchiswap/server

# Start the development server
npm run dev
```

### **7.2 Check the Output**
You should see something like:
```
🚀 KimchiSwap Backend running on port 3001
📊 Health check: http://localhost:3001/health
🔗 CORS origin: http://localhost:5173
```

### **7.3 Test the Health Endpoint**
Open a new terminal and run:
```bash
# Test the health endpoint
curl http://localhost:3001/health
```

You should get:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "KimchiSwap Backend"
}
```

### **7.4 Test in Browser**
Open your browser and go to:
```
http://localhost:3001/health
```

You should see the same JSON response.

---

## 🔗 Step 8: Connect to Your Frontend

### **8.1 Update Your React App**
In your `client/src/components/Tracker/Tracker.jsx`, update the API call:

```javascript
// Change from:
const response = await fetch('https://pro-api.coinmarketcap.com/40fd3ca7-5ad4-403d-88e0-85453f44f192', {

// To:
const response = await fetch('http://localhost:3001/api/crypto/prices', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
});
```

### **8.2 Test the Connection**
1. Make sure your backend is running (`npm run dev` in server folder)
2. Make sure your frontend is running (`npm run dev` in client folder)
3. Click the "Track" button in your React app
4. Check the browser console for any errors

---

## 🔧 Step 9: Add Basic Routes (Optional)

### **9.1 Create a Simple Route**
Create `src/routes/crypto.ts`:

```typescript
import express from 'express';
import { logger } from '../utils/logger';

const router = express.Router();

// GET /api/crypto/prices
router.get('/prices', async (req, res) => {
  try {
    logger.info('Fetching crypto prices');
    
    // Mock data for now
    const prices = {
      BTC: 45000,
      ETH: 3000,
      KCH: 0.01,
      USDC: 1.00
    };
    
    res.json({
      success: true,
      data: prices,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error fetching prices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch prices'
    });
  }
});

export default router;
```

### **9.2 Add Route to Main Server**
In `src/index.ts`, add this line after the health check:

```typescript
// Import routes
import cryptoRoutes from './routes/crypto';

// Add this line after the health check:
app.use('/api/crypto', cryptoRoutes);
```

### **9.3 Test the New Route**
```bash
curl http://localhost:3001/api/crypto/prices
```

---

## 🚨 Troubleshooting

### **Common Issues:**

#### **1. "Module not found" errors**
```bash
# Make sure you're in the server directory
cd /Users/j/Documents/projects/kimchiswap/server

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### **2. "Port already in use" error**
```bash
# Find what's using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or change the port in .env
PORT=3002
```

#### **3. "Cannot find module" errors**
```bash
# Make sure TypeScript is installed
npm install -g typescript

# Check if ts-node is working
npx ts-node --version
```

#### **4. CORS errors in browser**
- Make sure your React app is running on `http://localhost:5173`
- Check that `CORS_ORIGIN` in `.env` matches your React app URL
- Restart both frontend and backend

#### **5. "nodemon not found" error**
```bash
# Install nodemon globally
npm install -g nodemon

# Or use npx
npx nodemon src/index.ts
```

### **Debug Mode:**
Add this to your `.env` file:
```bash
LOG_LEVEL=debug
```

This will show more detailed logs.

---

## 🎉 Congratulations!

You now have a working backend server that:
- ✅ Runs on port 3001
- ✅ Has a health check endpoint
- ✅ Supports WebSocket connections
- ✅ Has proper error handling
- ✅ Includes rate limiting
- ✅ Logs everything properly
- ✅ Can connect to your React frontend

## 🚀 Next Steps:

1. **Add more routes** (authentication, trading, etc.)
2. **Set up databases** (PostgreSQL, Redis)
3. **Add Ethereum integration**
4. **Implement real-time price feeds**
5. **Add user authentication**

## 📚 Resources:

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Socket.io Documentation](https://socket.io/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Need help?** Check the troubleshooting section above, or ask me specific questions! 