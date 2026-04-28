# MSTRMND Production Mode

This document turns the current MSTRMND runtime into a launch-ready production plan.

## Current core capabilities

- Expo/React Native app shell
- Zustand app state
- Real Gemini execution path
- Runtime pipeline execution
- Memory-aware agent prompts
- Structured run output
- Progressive runtime callbacks
- Multi-agent proposal → critique → refinement mode
- Supabase persistence adapter placeholder
- Supabase schema baseline

## Production priorities

### P0 — Must ship before public use

1. Add environment variables.
2. Install and verify Supabase client.
3. Persist runs to Supabase.
4. Add auth/session guard.
5. Add error states and retry UI.
6. Verify Expo web build.
7. Connect Vercel project to GitHub.
8. Add production domain/subdomain.

### P1 — Launch quality

1. Add onboarding flow.
2. Add pricing/credits model.
3. Add project memory persistence.
4. Add usage tracking.
5. Add admin/debug screen.
6. Add run history screen.

### P2 — Platform scale

1. Branching pipelines.
2. Media generation agents.
3. Deployment agents.
4. Pipeline templates.
5. Agent marketplace foundation.

## Required env vars

```bash
EXPO_PUBLIC_GEMINI_API_KEY=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

For server/web deployment later:

```bash
GEMINI_API_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
```

## Production route map

```txt
/                 onboarding / home
/(tabs)           mobile app shell
/create           prompt + runtime trigger
/runtime          future dedicated runtime console
/projects         project list
/project/[id]     project workspace
/settings         credits, account, keys, plan
```

## Launch offer

MSTRMND should launch as an invite-only creative operating system.

Recommended plans:

- Guest: limited runs, no persistent memory
- Creator: personal projects + persistent memory
- Studio: team projects + agent templates
- Enterprise: custom agents, domains, dedicated workflows

## Production validation checklist

- [ ] App starts locally with `npm run dev`
- [ ] Expo web starts with `npm run web`
- [ ] Runtime console renders
- [ ] Run Pipeline produces logs
- [ ] Multi-agent mode produces proposal/critique/refinement
- [ ] Missing Gemini key shows safe fallback
- [ ] Supabase env missing does not crash
- [ ] Vercel build passes
- [ ] Domain routes resolve
- [ ] README includes setup instructions

## Next code tasks

1. Add real Supabase createClient adapter.
2. Add runtime persistence tables and functions.
3. Add run history view.
4. Add onboarding and pricing copy.
5. Add production deployment runbook.
