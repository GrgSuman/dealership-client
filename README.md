# Car Recommendation Platform

A modern, AI-powered car recommendation platform built with Next.js 15, featuring personalized vehicle suggestions, user preferences, and an intuitive interface.

## Features

- 🚗 **Personalized Recommendations**: AI-powered car suggestions based on user preferences and behavior
- 🔍 **Advanced Search**: Explore cars with detailed filtering options
- 💾 **Save Favorites**: Keep track of your favorite vehicles
- 🔄 **Compare Cars**: Side-by-side comparison of different vehicles
- ⚙️ **User Preferences**: Customize your car search experience
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS
- 🔐 **Authentication**: Secure user authentication with NextAuth.js(google)

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + custom
- **Database**: Prisma with PostgreSQL
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: Lucide Icons

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- PostgreSQL
- Python (for recommendation engine)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd nextclient
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
PYTHON_API_KEY="your-api-key"
```

## Authentication Setup

### 1. Generate NextAuth Secret

Generate a secure secret for NextAuth.js:

```bash
npx create-next-auth-secret
```

Add the generated secret to your `.env` file:
```env
NEXTAUTH_SECRET="your-generated-secret"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```


4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
