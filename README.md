# FeedbackHub

A full-stack feedback board application with upvoting system, built with Next.js 15, demonstrating **Optimistic UI**, **Cache Revalidation**, and **clean layered architecture**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Authentication | Supabase Auth |
| Styling | Tailwind CSS 4 |
| UI Components | Shadcn/ui + Radix UI |
| Animations | Framer Motion |
| Validation | Zod |
| Forms | React Hook Form |

---

## Architecture

The application follows a **4-layer architecture** pattern for clean separation of concerns:

```
UI (Client Components)
        │
        ▼
Server Actions (/app/actions/)
   - Input validation (Zod)
   - Auth checks
   - Cache invalidation
        │
        ▼
Services (/lib/services/)
   - Business logic
   - Error handling
        │
        ▼
Data Access (/lib/data-access/)
   - Prisma queries
   - Database operations
        │
        ▼
Database (PostgreSQL)
```

### Why This Architecture?

- **Testability**: Each layer can be tested in isolation
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to extend with new features
- **Type Safety**: TypeScript flows through all layers

---

## Key Features

### 1. Optimistic UI

Instant feedback when users vote - the UI updates **before** the server responds.

```typescript
// app/(private)/dashboard/_components/Suggestions/VoteButton.tsx

const [optimisticState, addOptimisticVote] = useOptimistic<VoteState, boolean>(
    { voteCount: initialVoteCount, hasVoted },
    (currentState, optimisticValue) => ({
        voteCount: optimisticValue
            ? currentState.voteCount + 1
            : currentState.voteCount - 1,
        hasVoted: optimisticValue
    })
);

const handleVote = async () => {
    // Step 1: Instant UI update
    startTransition(() => {
        addOptimisticVote(!optimisticState.hasVoted)
    });

    // Step 2: Server call (happens in background)
    const result = await toggleVoteAction({ userId, suggestionId });

    // Step 3: Handle errors (React auto-reverts on failure)
    if (!result.success) {
        toast.error(result.message);
    }
};
```

**Result**: Vote count changes instantly. No loading spinners. If the server fails, React automatically reverts the UI.

---

### 2. Cache Revalidation

When data changes, all users see updates without manual refresh.

```typescript
// app/actions/votes.ts

export async function toggleVoteAction(data: ToggleVoteInput) {
    const validation = safeValidate(toggleVoteSchema, data);

    if (!validation.success) {
        return { success: false, message: 'Invalid input' };
    }

    const result = await toggleVote(validation.data);

    // Invalidate cache - all users get fresh data
    revalidatePath('/dashboard');

    return result;
}
```

**Where it's used**:
- `createSuggestionAction` - New suggestions appear for all users
- `updateSuggestionAction` - Edits reflect immediately
- `deleteSuggestionAction` - Removed items disappear for everyone
- `toggleVoteAction` - Vote counts sync across sessions

---

### 3. Prisma ORM

Type-safe database queries with relations.

```prisma
// prisma/schema.prisma

model User {
  id          String       @id @default(uuid())
  email       String       @unique
  name        String?
  createdAt   DateTime     @default(now()) @map("created_at")

  suggestions Suggestion[]
  votes       Vote[]

  @@map("users")
}

model Suggestion {
  id          String             @id @default(uuid())
  title       String
  description String
  category    SuggestionCategory @default(FEATURE)
  status      SuggestionStatus   @default(OPEN)
  createdAt   DateTime           @default(now()) @map("created_at")

  authorId    String             @map("author_id")
  author      User               @relation(fields: [authorId], references: [id], onDelete: Cascade)

  votes       Vote[]

  @@map("suggestions")
}

model Vote {
  id           String     @id @default(uuid())
  createdAt    DateTime   @default(now()) @map("created_at")

  userId       String     @map("user_id")
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)

  suggestionId String     @map("suggestion_id")
  suggestion   Suggestion @relation(fields: [suggestionId], references: [id], onDelete: Cascade)

  @@unique([userId, suggestionId]) // One vote per user per suggestion
  @@map("votes")
}
```

**Data Access Example**:

```typescript
// lib/data-access/suggestions.ts

export async function getAllSuggestions() {
    return await prisma.suggestion.findMany({
        include: {
            votes: true,
            author: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
}
```

---

## Data Flow Example

**User votes on a suggestion**:

```
1. Click vote button
   └─> VoteButton.tsx (optimistic update)

2. Call server action
   └─> toggleVoteAction() validates input with Zod

3. Execute business logic
   └─> toggleVote() checks if vote exists

4. Database operation
   └─> createVote() or deleteVote() via Prisma

5. Cache invalidation
   └─> revalidatePath('/dashboard')

6. All users see updated count
```

---

## Project Structure

```
app/
├── (private)/dashboard/          # Protected routes
│   ├── page.tsx                  # Main suggestions page
│   └── _components/
│       ├── Suggestions/
│       │   ├── SuggestionCard.tsx
│       │   ├── VoteButton.tsx    # Optimistic UI
│       │   └── DeleteButton.tsx
│       └── Navbar/
│           └── suggestion-form/
├── (public)/                     # Auth routes
│   ├── login/
│   └── signup/
├── actions/                      # Server Actions
│   ├── auth.ts
│   ├── suggestions.ts
│   └── votes.ts
└── auth/callback/                # OAuth handler

lib/
├── services/                     # Business logic
│   ├── auth/
│   ├── suggestions/
│   └── votes/
├── data-access/                  # Prisma queries
│   ├── suggestions.ts
│   └── votes.ts
├── utils/
│   └── validation.ts             # Zod schemas
└── prisma.ts                     # Prisma client

prisma/
└── schema.prisma                 # Database models
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Supabase recommended)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/feedback-hub.git
cd feedback-hub

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Authentication Flow

1. User signs up with email/password
2. Supabase Auth creates `auth.users` record
3. Database trigger syncs to `public.users` table
4. Session stored in HTTP-only cookies
5. Server actions validate session before mutations

---

## Validation with Zod

All inputs are validated before reaching the database:

```typescript
// lib/utils/validation.ts

export const createSuggestionSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000),
    authorId: z.string().uuid(),
    category: z.enum(['FEATURE', 'BUG', 'IMPROVEMENT']).optional()
});

export const toggleVoteSchema = z.object({
    userId: z.string().uuid(),
    suggestionId: z.string().uuid()
});
```

---

## Service Response Pattern

Consistent response structure across all services:

```typescript
type ServiceResponse<T = null> = {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
    action?: 'added' | 'removed';
};
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open database GUI |
| `npx prisma db push` | Sync schema to database |

