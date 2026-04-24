<!--
Title format (Conventional Commits):
  feat|fix|chore|docs|refactor|test|perf|ci|build(scope): concise subject
Example: feat(users): SCRUM-XX - paginate the users accordion list
-->

## Ticket

Closes SCRUM-XXX — https://saurabhbiswas34.atlassian.net/browse/SCRUM-XXX

<!-- If there is no Jira ticket, link the GitHub issue or briefly explain why. -->

## Summary (what & why)

- <!-- Why is this change needed? What problem does it solve? -->
- <!-- What did you change at a high level? -->
- <!-- Any non-obvious decision or trade-off? -->

## Type of change

- [ ] feat — new user-facing capability
- [ ] fix — bug fix
- [ ] refactor — no behaviour change
- [ ] perf — performance improvement
- [ ] docs — documentation only
- [ ] test — tests only
- [ ] chore / ci / build — tooling, deps, workflows
- [ ] BREAKING CHANGE — fill the migration section below

## Acceptance criteria mapping

<!--
One row per AC from the ticket. "Verified by" must name a real test file or a
manual step a reviewer can run. ACs with no verification block approval.
-->

| AC  | Implementation | Verified by                                 |
| --- | -------------- | ------------------------------------------- |
| 1   | `src/...`      | `Navbar.test.tsx` / `home.spec.ts` / manual |
| 2   |                |                                             |

## Test plan

### Automated

- **Unit tests added / updated**: `<file list or "none">`
- **E2E tests added / updated**: `<file list or "none">`

### Manual QA

<!-- Steps a reviewer can follow in ~2 minutes to sanity-check the change. -->

1.
2.

### Local results snapshot

- `npm run lint` — <!-- ✅ / ❌ -->
- `npm run check:types` — <!-- ✅ / ❌ -->
- `npm run test:unit` — <!-- ✅ / ❌ | coverage: stmts %, branches %, funcs %, lines % -->
- `npm run test:e2e` — <!-- ✅ / ❌ | N passed -->

## Quality gates

Tick only what you actually ran locally. CI re-runs the required ones.

- [ ] `npm run lint` passes
- [ ] `npm run check:types` passes
- [ ] `npm run test:unit` passes and coverage stays ≥ 50% on statements / branches / functions / lines
- [ ] `npm run test:e2e` passes
- [ ] `npm run check:axe` clean for new / changed UI
- [ ] `npm run check:vuln` (audit-ci) clean
- [ ] `npm run check:deadcode` — no new unused exports / files introduced by this PR
- [ ] `npm run check:docs-sync` passes
- [ ] `npm run check:size` within budget (UI / bundle-touching PRs only)
- [ ] Pre-commit / pre-push hooks ran — no `--no-verify`, no `--skip-hooks`

## Screenshots / recording

<!--
Required for any UI change.
- Before / after for modifications
- Desktop + mobile viewports for responsive work
- Short GIF or MP4 for interactions (hover, focus, open/close, transitions)
-->

## Documentation updated

Tick every file this PR touches; leave unticked items as proof they genuinely did not need changes.

- [ ] `README.md`
- [ ] `docs/architecture/ARCHITECTURE.md`
- [ ] `docs/testing/TESTING_STRATEGY.md`
- [ ] `docs/conventions/COMPONENT_GUIDE.md`
- [ ] `docs/conventions/FEATURE_GUIDE.md`
- [ ] `docs/setup/CONTEXT_SETUP.md`
- [ ] `docs/code-review/CODE-REVIEW.md`
- [ ] `.cursor/rules/repo-standards.mdc`
- [ ] `.cursor/skills/react-quality-starter/SKILL.md`
- [ ] N/A — no user-facing or developer-facing surface changed

## Scope

- **In scope:**
- **Out of scope (deliberately):**
- **Follow-ups:** <!-- SCRUM-XXX — short description -->

## Rollout & revert

- **Deploy path:** <!-- standard merge / feature-flagged / needs new env var / needs data migration -->
- **Revert path:** <!-- safe via `git revert <sha>` / requires follow-up migration / cannot be reverted — explain -->

## Risk / blast radius

<!-- One sentence. What breaks if this ships badly, who notices, how fast. -->

## Breaking changes / migration notes

<!--
Fill only if the "BREAKING CHANGE" box is ticked above.
- API / prop / route / env-var change
- Migration steps for consumers
- Deprecation window (if any)
-->

N/A

## Security

- [ ] No new secrets, tokens, or personal data in the diff
- [ ] No new third-party script / iframe / untrusted HTML sink
- [ ] New dependencies (if any) are pinned and reviewed for licence + vulnerabilities

## Reviewer checklist

> Reviewer ticks these, not the author.

- [ ] Review used `docs/code-review/CODE-REVIEW.md` (five axes) where useful — gates are not a substitute
- [ ] AC mapping is truthful (spot-checked at least one AC end-to-end)
- [ ] Tests exercise the acceptance criteria, not just the happy path
- [ ] No leftover `console.log`, `TODO`, or commented-out code
- [ ] No secrets / tokens / personal emails / local paths in the diff
- [ ] New files follow Atomic Design placement (`atoms` / `molecules` / `organisms`) and BEM class naming
- [ ] Accessibility: semantic HTML, correct roles, `aria-*` where needed, keyboard reachable, visible focus
- [ ] No duplicate `id` attributes in rendered markup
- [ ] Scope matches the ticket — no drive-by refactors smuggled in
