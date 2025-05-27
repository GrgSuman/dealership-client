# Car Recommendation Platform

A modern car recommendation platform built with Next.js 15 and FastAPI, featuring AI-powered vehicle suggestions using Google's Generative AI.

## Core Features

- 🤖 **AI Recommendations**: Personalized car suggestions using Google's Generative AI and vector embeddings
- 🔍 **Smart Search**: Advanced filtering with price range, car types, brands, and features
- 💾 **User Features**: Save favorites, compare cars, and manage preferences
- 📱 **Responsive UI**: Modern interface built with shadcn/ui and Tailwind CSS
- 🔐 **Auth**: Google authentication via NextAuth.js
- 🛠️ **Admin**: Vehicle and user management dashboard

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, PostgreSQL, Prisma
- **AI/ML**: Google Generative AI, FAISS vector database
- **Auth**: NextAuth.js
- **Deployment**: Vercel

## Quick Start

1. **Setup Environment**
```bash
git clone [repository-url]
cd nextclient
npm install
```

2. **Configure Environment**
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
PYTHON_API_KEY="your-api-key"
```

3. **Initialize Database**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

4. **Start Development**
```bash
npm run dev
```

## Recommendation System

### How It Works

1. **Query Processing**
   - Takes user preferences (budget, type, brand, features)
   - Considers user activity and saved vehicles
   - Generates natural language query

2. **Vector Search**
   - Converts query to embeddings using Google AI
   - Searches FAISS vector database
   - Returns 15 initial matches

3. **Smart Filtering**
   - Price range: (min-2000) to (max+5000)
   - Scoring system:
     - Base: 1.0
     - Type match: +0.3
     - Brand match: +0.3
     - Features: +0.1 each
     - Fuel type: +0.2
     - Use case: +0.15 each

4. **Final Results**
   - Sorts by relevance score
   - Returns top 6 recommendations

### API Endpoints

```typescript
// POST /get-recommendations
interface RecommendationRequest {
  preferences: {
    budgetMin: number;
    budgetMax: number;
    carTypes: string[];
    fuelTypes: string[];
    brand: string[];
    features: string[];
    primarilyUse: string[];
  };
  activities: Array<{
    action: string;
    query: string;
    carTitles: string[];
  }>;
  savedVehicles: string[];
}
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin routes
│   ├── api/               # API endpoints
│   ├── actions/           # Server actions
│   └── [features]/        # Feature routes
├── components/            # UI components
├── lib/                   # Utilities
└── prisma/               # Database schema
```

## Performance & Security

- Vector similarity search for fast matching
- Results caching for similar queries
- API key authentication
- CORS middleware
- Input validation with Pydantic

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy

## Support

For support, open an issue in the GitHub repository or contact the development team.