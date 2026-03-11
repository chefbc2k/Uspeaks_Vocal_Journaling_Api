# Repository Setup

## Local Install

```bash
cd /Volumes/machdext/speakplatform/Final/FOH/vocal-journaling-api/uspeaks-vocal-journaling-api
git init -b main
pnpm install
```

## Attach A Fresh Remote

```bash
git remote add origin git@github.com:YOUR_ORG/uspeaks-vocal-journaling-api.git
git remote -v
git push -u origin main
```

## Verify The Public Boundary

Run the review before publishing:

```bash
cd /Volumes/machdext/speakplatform/Final/FOH/vocal-journaling-api/uspeaks-vocal-journaling-api
rg -n "process\\.env|SUPABASE|MEMORI|ZUPLO|DigitalOcean|internal|private|secret" src docs examples README.md SECURITY.md MAINTENANCE.md
```

## Verify The Live Portal References

```bash
curl -I https://journal-api-layer-main-22c4b17.zuplo.site/api
curl -I https://journal-api-layer-main-22c4b17.zuplo.site/signin
curl -I https://journal-api-layer-main-22c4b17.zuplo.app/health
```

## Verification

```bash
cd /Volumes/machdext/speakplatform/Final/FOH/vocal-journaling-api/uspeaks-vocal-journaling-api
git status
pnpm check
```
