# Setup Commands

## Create The Repository Inside The Private Repo As A Nested Git Repository

```bash
cd /Volumes/machdext/speakplatform/Final/FOH/vocal-journaling-api
mkdir -p _external/vocal-journaling-builder-sdk
cd _external/vocal-journaling-builder-sdk
git init -b main
pnpm install
```

## Attach A Fresh Remote

```bash
git remote add origin git@github.com:YOUR_ORG/vocal-journaling-builder-sdk.git
git remote -v
git push -u origin main
```

## Curated Safe-Copy Review

Run the review in the private repo before copying anything:

```bash
cd /Volumes/machdext/speakplatform/Final/FOH/vocal-journaling-api
rg -n "process\\.env|SUPABASE|MEMORI|ZUPLO|DigitalOcean|internal|private|secret|uspeaks" src docs scripts
```

Then copy only reviewed files:

```bash
cp path/to/reviewed-safe-file.ts _external/vocal-journaling-builder-sdk/src/
cp path/to/reviewed-safe-doc.md _external/vocal-journaling-builder-sdk/docs/
```

## Verification

```bash
cd /Volumes/machdext/speakplatform/Final/FOH/vocal-journaling-api
git status

cd /Volumes/machdext/speakplatform/Final/FOH/vocal-journaling-api/_external/vocal-journaling-builder-sdk
git status
git remote -v
pnpm check
```
