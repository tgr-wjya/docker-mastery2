# PROJECT: DOCKER MASTERY

## THE CHALLENGE

You will learn Docker by doing it — no scaffolding, no LLM writing your config files. Every file you write yourself. The app is intentionally trivial because **the app is not the point.**

---

## THE APP

A **System Status API**. Three endpoints, that's it.

- `GET /` — returns app name, version, uptime
- `GET /health` — returns `{ status: "ok" }` with `200`, or `{ status: "degraded" }` with `503`
- `GET /echo` — returns whatever JSON body you send it

No file I/O. No database. No auth. Pure in-memory. You've built all of this before in an hour — do it in 30 minutes and move on to the real work.

---

## MILESTONE 1: WRITE THE DOCKERFILE

**Goal:** Understand every line you write. No copy-paste.

### Requirements
- Base image: `oven/bun:latest`
- Working directory: `/app`
- Copy `package*.json` first, then source code (you know why)
- Install deps, expose port, define start command

### Success Criteria
- ✅ `docker build -t status-api .` succeeds
- ✅ `docker run -p 3000:3000 status-api` starts the server
- ✅ `GET /health` returns 200 from inside the container
- ✅ You can explain every single line in the file without looking it up

---

## MILESTONE 2: DOCKER COMPOSE

**Goal:** Run a multi-container setup locally.

### Requirements
Add a second service: **Redis** (you won't use it yet — you're just learning how services talk to each other).

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

### Success Criteria
- ✅ `docker compose up` starts both containers
- ✅ `docker compose down` tears both down cleanly
- ✅ You understand what `depends_on` does and what it **doesn't** guarantee
- ✅ You understand why the hostname is `redis` and not `localhost`

---

## MILESTONE 3: GITHUB ACTIONS CI

**Goal:** Tests run automatically on every push.

### Requirements
Write `.github/workflows/ci.yml` yourself:
- Trigger on push to all branches, PR to main
- Steps: checkout → setup bun → install deps → type check → run tests

### Success Criteria
- ✅ Push a branch, watch the action run in the GitHub UI
- ✅ Break a test intentionally, confirm the action fails
- ✅ Fix it, confirm it goes green
- ✅ You understand the difference between `on: push` and `on: pull_request`

---

## MILESTONE 4: CIRCLECI CI

**Goal:** Same pipeline, different platform. Understand the differences.

### Requirements
Write `.circleci/config.yml` yourself (no copying from guestbook-api):
- Use `oven/bun:latest` as the Docker executor
- Same steps as GitHub Actions
- Add dependency caching with `bun.lock` checksum

### Success Criteria
- ✅ Both GitHub Actions AND CircleCI pass on the same push
- ✅ You can explain one concrete difference between the two platforms
- ✅ Cache actually works — second run is faster than first

---

## MILESTONE 5: DEPLOY TO RAILWAY

**Goal:** A real URL that anyone can hit.

### Requirements
- Deploy via **Dockerfile** (not Railway's auto-detect — force it to use yours)
- Set environment variables through Railway's dashboard
- Confirm `GET /health` returns 200 at your live URL

### Success Criteria
- ✅ Live URL works
- ✅ Pushing to main triggers your CI, then you manually deploy
- ✅ You understand what Railway is actually doing with your Dockerfile

---

## BONUS MILESTONE: MULTI-STAGE DOCKERFILE

**Goal:** Smaller, production-appropriate image.

A multi-stage build separates "build environment" from "runtime environment." You don't need all your dev dependencies in the final image.

```dockerfile
# Stage 1 — install everything
FROM oven/bun:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .

# Stage 2 — only what's needed to run
FROM oven/bun:latest AS runner
WORKDIR /app
COPY --from=builder /app .
CMD ["bun", "index.ts"]
```

### Success Criteria
- ✅ `docker images` shows the multi-stage image is smaller than your original
- ✅ You can explain what `COPY --from=builder` is doing
- ✅ App still works

---

## WHAT YOU'RE NOT ALLOWED TO DO

- Scaffold the Dockerfile, `ci.yml`, or `config.yml` with an LLM
- Copy configs from guestbook-api
- Move to the next milestone without passing the current one's success criteria

You can ask for hints. You cannot ask for the solution.

---

## STACK

- Runtime: Bun + Elysia (familiar ground — no new framework surprises)
- Container: Docker
- Compose: Docker Compose v2
- CI: GitHub Actions + CircleCI
- Deploy: Railway

Good luck.
