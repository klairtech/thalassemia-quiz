# Thalassemia Awareness Quiz App

A gamified learning quiz application built with Next.js 14, focused on Thalassemia awareness and prevention. This app helps users learn about this important blood disorder through an engaging quiz experience with multilingual support.

## Features

### Core Features

- **User Onboarding**: Name input and language selection
- **Multilingual Support**: Support for 12+ Indian languages using Google Translate API
- **Quiz System**: Random selection of up to 3 questions per session
- **Question Types**: Multiple Choice, True/False, and Multi-select questions
- **Gamified Scoring**: Score based on accuracy and completion time
- **Leaderboard**: Top performers with meta-score calculation
- **Responsive Design**: Works on desktop and mobile devices

### Technical Features

- **Framework**: Next.js 14 with App Router and TypeScript
- **Database**: Supabase (PostgreSQL) with real-time capabilities
- **Styling**: TailwindCSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **API Integration**: Google Translate API for translations
- **Authentication**: Lightweight user identification system

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Cloud account with Translate API enabled

### 1. Clone and Install Dependencies

```bash
cd thalassemia-quiz
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Translate API
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Run the seed data from `seed-data.sql` to populate questions

### 4. Google Translate API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Cloud Translation API
3. Create an API key
4. Add the API key to your environment variables

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── quiz/              # Quiz page
│   ├── result/            # Results page
│   ├── leaderboard/       # Leaderboard page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── quiz/             # Quiz-specific components
│   ├── onboarding/       # Onboarding components
│   ├── result/           # Result components
│   └── leaderboard/      # Leaderboard components
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
└── lib/                  # Utility libraries
    ├── supabase.ts       # Supabase client
    ├── quiz.ts           # Quiz logic
    ├── translate.ts      # Translation service
    └── utils.ts          # General utilities
```

## Database Schema

### Tables

1. **quiz_questions**: Stores quiz questions with metadata
2. **quiz_attempts**: Records user quiz attempts and scores
3. **leaderboard**: View that aggregates best scores per user

### Key Features

- Row Level Security (RLS) enabled
- Automatic timestamp updates
- Optimized indexes for performance
- Support for multiple question types

## Scoring System

The gamified scoring system calculates a **Meta Score** based on:

- **Accuracy Score**: (Correct Answers / Total Questions) × 100
- **Time Bonus**: max(0, 30 - time_taken_in_seconds)
- **Final Score**: Accuracy Score + Time Bonus

### Grade System

- **A+**: 120+ points
- **A**: 110-119 points
- **B+**: 100-109 points
- **B**: 90-99 points
- **C+**: 80-89 points
- **C**: 70-79 points
- **D**: 60-69 points
- **F**: Below 60 points

## Supported Languages

The app supports 12+ Indian languages:

- English, Hindi, Bengali, Telugu, Marathi
- Tamil, Gujarati, Kannada, Malayalam
- Punjabi, Odia, Assamese

## API Endpoints

- `GET /api/quiz` - Fetch random quiz questions
- `POST /api/quiz` - Save quiz attempt
- `GET /api/leaderboard` - Fetch leaderboard data
- `POST /api/translate` - Translate text

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions about Thalassemia awareness, please consult:

- [World Health Organization - Thalassemia](https://www.who.int/news-room/fact-sheets/detail/thalassaemia)
- [Thalassemia International Federation](https://thalassemia.org/)

## Acknowledgments

- Medical information sourced from WHO and medical literature
- Icons by Lucide React
- Animations by Framer Motion
- Built with Next.js and Supabase
