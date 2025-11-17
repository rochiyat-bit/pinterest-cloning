# Pinterest Clone - Production-Ready Application

A full-featured Pinterest clone built with Next.js 14, TypeScript, PostgreSQL, and modern web technologies.

## Features

- 🖼️ **Image Sharing**: Upload, organize, and discover images
- 📌 **Boards**: Create and manage collections of pins
- 👥 **Social Features**: Follow users, like, comment, and save pins
- 🔍 **Advanced Search**: Full-text search with filters and categories
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🔔 **Real-time Notifications**: Stay updated with live notifications
- 🔐 **Secure Authentication**: Email/password and OAuth (Google, Facebook)
- ⚡ **Performance**: Optimized with Redis caching and CDN delivery

## Tech Stack

### Frontend
- Next.js 14.2+ (App Router)
- TypeScript (Strict mode)
- Tailwind CSS
- shadcn/ui components
- React Query (TanStack Query)
- Zustand (State management)

### Backend
- Next.js API Routes
- PostgreSQL 14+
- Sequelize ORM
- NextAuth.js v5
- Redis (Caching & Sessions)
- BullMQ (Background jobs)

### Cloud Services
- Cloudinary (Image storage & CDN)
- Pusher (Real-time notifications)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pinterest-cloning
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/pinterest_clone

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Redis
REDIS_URL=redis://localhost:6379

# Pusher
PUSHER_APP_ID=your-app-id
PUSHER_SECRET=your-secret
NEXT_PUBLIC_PUSHER_KEY=your-key
NEXT_PUBLIC_PUSHER_CLUSTER=your-cluster
```

4. Run database migrations:
```bash
npm run db:migrate
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
pinterest-cloning/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── (main)/              # Main application pages
│   ├── api/                 # API routes
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── pins/                # Pin-related components
│   ├── boards/              # Board components
│   └── layout/              # Layout components
├── lib/                     # Utility functions
│   ├── sequelize/           # Database configuration
│   ├── auth/                # Authentication utilities
│   └── validations/         # Zod schemas
├── models/                  # Sequelize models
├── migrations/              # Database migrations
├── config/                  # Configuration files
└── public/                  # Static assets
```

## Database Schema

The application uses PostgreSQL with the following main tables:

- **users**: User accounts and profiles
- **boards**: Pin collections
- **pins**: Individual pins with images
- **categories**: Pin/board categories
- **follows**: User follow relationships
- **saves**: Saved pins to boards
- **likes**: Pin likes
- **comments**: Pin comments
- **notifications**: User notifications

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/[...nextauth]` - NextAuth.js handler

### Pins
- `GET /api/pins` - List pins
- `POST /api/pins` - Create pin
- `GET /api/pins/[pinId]` - Get pin details
- `PUT /api/pins/[pinId]` - Update pin
- `DELETE /api/pins/[pinId]` - Delete pin

### Boards
- `GET /api/boards` - List boards
- `POST /api/boards` - Create board
- `GET /api/boards/[boardId]` - Get board details
- `PUT /api/boards/[boardId]` - Update board

### Users
- `GET /api/users/[username]` - Get user profile
- `POST /api/users/[username]/follow` - Follow user

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:migrate` - Run database migrations
- `npm run db:migrate:undo` - Undo last migration
- `npm run db:seed` - Seed database
- `npm run db:reset` - Reset database

## Development

### Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### Creating a New Model

1. Create model file in `models/`
2. Create migration in `migrations/`
3. Add associations in `lib/sequelize/associations.ts`
4. Run migration: `npm run db:migrate`

### Creating API Routes

API routes follow Next.js App Router conventions in `app/api/`.

## Deployment

### Production Checklist

- [ ] Set all environment variables
- [ ] Run database migrations
- [ ] Configure Cloudinary
- [ ] Set up Redis
- [ ] Configure OAuth providers
- [ ] Enable SSL/HTTPS
- [ ] Set up monitoring

### Deploy to Vercel

```bash
vercel --prod
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Pinterest
- Built with Next.js and shadcn/ui
- Powered by PostgreSQL and Redis

## Support

For issues and questions, please open an issue on GitHub.
