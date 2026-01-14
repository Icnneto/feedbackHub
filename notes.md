## Projeto
Quadro de Feedback com Votos (Upvote System). Foco: Interatividade, Cache Revalidation e Optimistic UI.
Este projeto foca na experiência do usuário e na sensação de "tempo real".

### Aplicação 
Uma página onde usuários podem postar sugestões de melhoria para um produto fictício. 
Outros usuários podem dar "Upvote". A lista é reordenada pelos mais votados.

### Aprendizado
O que você vai aprender/demonstrar:

- Optimistic UI: Quando o usuário clica em "votar", o número sobe instantaneamente na tela antes do servidor responder. Isso mostra maturidade em UX.
- Cache Revalidation (revalidatePath): Como atualizar a lista para todos os usuários após uma nova postagem sem recarregar a página inteira.
- Auth (Opcional): Implementar um login social simples (Auth.js ou Clerk) para evitar spam de votos.


### ARQUITETURA
1. **UI (Client Component)**: Aciona a ação (ex: clique no botão "Votar").
2. **Server Action (/actions ou /lib/actions)**: Recebe o input, valida (Zod) e chama o Service.
3. **Service (/lib/services)**: Regras de negócio (ex: "usuário já votou?", "post existe?").
4. **Data Access (/lib/data-access)**: Executa a query no Supabase.

┌────────────────────────────────────────────────────────────────┐
│                        ACTIONS                                  │
│  /app/actions/                                                  │
│    auth.ts        → signup, login, logout                       │
│    user.ts        → update profile, delete account              │
│    suggestions.ts → create, update, delete suggestions          │
│    votes.ts       → toggle vote (to be created)                 │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                       SERVICES                                  │
│  /lib/services/                                                 │
│    auth/auth-service.ts        → Supabase Auth SDK              │
│    user/user-service.ts        → user business logic            │
│    suggestions/suggestions-service.ts                           │
│    vote/vote-service.ts        → (to be created)                │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                     DATA ACCESS                                 │
│  /lib/data-access/                                              │
│    users.ts         → Prisma queries for public.users           │
│    suggestions.ts   → Prisma queries for suggestions            │
│    votes.ts         → (to be created) Prisma queries for votes  │
│                                                                 │
│  ❌ No auth data-access (Supabase handles it + trigger syncs)   │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                      DATABASE                                   │
│                                                                 │
│  Supabase:                    Prisma/Public Schema:             │
│  ┌──────────────┐             ┌──────────────┐                  │
│  │ auth.users   │──trigger──▶│ public.users │                  │
│  └──────────────┘             └──────────────┘                  │
│                               ┌──────────────┐                  │
│                               │ suggestions  │                  │
│                               └──────────────┘                  │
│                               ┌──────────────┐                  │
│                               │ votes        │                  │
│                               └──────────────┘                  │
└────────────────────────────────────────────────────────────────┘


Based on notes.md, the focus is on Optimistic UI and Cache Revalidation.
1. Main Page - Suggestions List
Display all suggestions ordered by vote count (most voted first)
Show: title, description, author name, vote count, category badge, status badge
Call getSuggestionsAction() to fetch data

2. Vote Button with Optimistic UI
Instant UI feedback when clicking vote (before server responds)
Use React's useOptimistic or useTransition
Call toggleVoteAction({ userId, suggestionId })
Handle the action: 'added' | 'removed' response

3. Create Suggestion Form
Form fields: title, description
authorId comes from authenticated user session
Call createSuggestionAction(formData)
Use revalidatePath to refresh the list

4. Auth Integration
Login/Signup forms calling auth actions
Protect vote and create actions (require logged-in user)
Get current user ID from Supabase session

5. Cache Revalidation
Add revalidatePath('/suggestions') in:
createSuggestionAction
toggleVoteAction
deleteSuggestionAction
updateSuggestionCategoryAction
updateSuggestionStatusAction

Available Actions for Frontend at claude history (@lib/data-access/)