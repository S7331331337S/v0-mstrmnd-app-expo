# MSTRMND Next Layer Implementation

This repo is the Expo/React Native surface for MSTRMND. The next layer turns the current mobile/web shell into a real agentic creative operating system.

## Connected product surfaces

- **Mobile command center:** Expo Router app shell.
- **Project workspace:** persistent projects, assets, runs, and generated outputs.
- **Agent runtime:** configurable agents with provider/model/tool permissions.
- **Pipeline runtime:** graph-based execution from input → AI node → transform → approval → output.
- **Usage layer:** credits, token usage, media usage, and plan limits.
- **Cloud layer:** Vercel project deployment and subdomain routing for web surfaces.

## Immediate build priorities

1. Add Supabase project persistence.
2. Add authenticated user/session support.
3. Add agent configuration CRUD.
4. Add pipeline graph persistence.
5. Add streaming run logs.
6. Add usage metering tied to credits.
7. Connect web deployment path to Vercel.

## Suggested architecture

```txt
app/
  (tabs)/
  ai/
  create/
  project/
components/
constants/
hooks/
lib/
  ai/
  pipeline/
  supabase/
  usage/
store/
supabase/
  schema.sql
```

## Runtime contract

Every generated run should produce:

```ts
type RunResult = {
  id: string
  projectId: string
  pipelineId: string
  status: 'queued' | 'running' | 'waiting_for_approval' | 'completed' | 'failed'
  logs: string[]
  output: unknown
  usage: {
    provider?: string
    model?: string
    inputTokens?: number
    outputTokens?: number
    estimatedCost?: number
  }
}
```

## Design rules

- Background: `#070708`
- Surface: `#111114`
- Elevated cards: `#17171C`
- Border: `#292934`
- Accent cyan: `#00E0FF`
- Accent violet: `#7C5CFF`
- Rounded panels: 16–24px
- No toy UI. Keep it cinematic, restrained, and operational.

## Vercel path

The Vercel connector found team `mstrmndhub` and project `v0-mstrmnd-app`. Once this branch is committed/pushed and connected through Git integration, Vercel can build the web target.

For manual deploy from repo root:

```bash
npm install
npm run web
vercel deploy
```

For production:

```bash
vercel deploy --prod
```
