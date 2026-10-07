# One-Person-Empire-OS

A Replit workspace export containing a generic pnpm monorepo scaffold — no project-specific application code.

## Features

- Express 5 API server skeleton with a single `/healthz` route and Zod-validated response
- OpenAPI spec (`lib/api-spec/openapi.yaml`) with Orval codegen into React hooks (`api-client-react`) and Zod schemas (`api-zod`)
- Drizzle ORM Postgres schema package (empty schema index)
- `mockup-sandbox` React + shadcn preview harness for UI mockups
- Workspace tooling: esbuild bundling, shared tsconfig, typecheck/build scripts, post-merge helper script

## Tech stack

- TypeScript 5.9, Node.js 24, pnpm workspaces
- Express 5, Drizzle ORM, Zod v4, Orval

## Getting started

```bash
pnpm run typecheck              # typecheck all libs
pnpm run build                  # typecheck + build all packages
pnpm --filter @workspace/api-server run dev   # API server (port 5000)
```

Requires `DATABASE_URL` (Postgres). Commands come from `replit.md` in the repo.

## Project structure

```
├── artifacts/api-server/    # Express app (health route only)
├── artifacts/mockup-sandbox/ # React/shadcn mockup preview app
├── lib/api-spec/            # OpenAPI YAML + Orval config
├── lib/api-client-react/    # generated React API hooks
├── lib/api-zod/             # generated Zod schemas
├── lib/db/                  # Drizzle config (empty schema)
└── scripts/                 # build/merge tooling
```

## Status

**Stub / project scaffold.** The workspace template files (`replit.md`) were never populated — the project name, product description, and architecture sections still contain placeholder instructions. This tree is byte-identical to the `Regulatory-Compliance-Monitor` repo apart from metadata, i.e. it is the unmodified Replit starter. Original workspace: https://replit.com/@channel40000000/One-Person-Empire-OS
