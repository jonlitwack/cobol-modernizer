# Setting Up Main Branch - CI/CD Best Practices

This guide will help you establish a proper main branch structure for this repository.

## Current State

- Repository has feature branches but no stable main branch
- Current default branch: `claude/explore-mainframe-demo-01XtHLVEt69ZoJGbsrCbMR1G` (not ideal)
- Latest work is on: `claude/run-incomplete-task-01T7Ai6nXn8JfuJxkkv9LJcd`

## Steps to Set Up Main Branch

### Option 1: Using GitHub Web Interface (Recommended)

1. **Go to your repository on GitHub:**
   https://github.com/jonlitwack/cobol-modernizer

2. **Create main branch from current work:**
   - Navigate to the branch dropdown
   - Select `claude/run-incomplete-task-01T7Ai6nXn8JfuJxkkv9LJcd`
   - Click the branch dropdown again and type "main"
   - Click "Create branch: main from claude/run-incomplete-task-01T7Ai6nXn8JfuJxkkv9LJcd"

3. **Set main as the default branch:**
   - Go to Settings → Branches
   - Under "Default branch", click the switch icon
   - Select "main" from the dropdown
   - Click "Update"

4. **Add branch protection rules (optional but recommended):**
   - Go to Settings → Branches → Add rule
   - Branch name pattern: `main`
   - Enable:
     - ✅ Require a pull request before merging
     - ✅ Require status checks to pass before merging (if you set up CI)
     - ✅ Require conversation resolution before merging
   - Click "Create"

### Option 2: Using Git Locally (on your laptop)

```bash
# Clone the repository
git clone https://github.com/jonlitwack/cobol-modernizer.git
cd cobol-modernizer

# Create main branch from the latest work
git checkout claude/run-incomplete-task-01T7Ai6nXn8JfuJxkkv9LJcd
git checkout -b main
git push -u origin main

# Set main as default on GitHub (Settings → Branches → Default branch)
```

## Recommended CI/CD Workflow Going Forward

### Branch Strategy

```
main (stable, production-ready)
  ↑
  └── feature/add-user-auth (PR)
  └── feature/add-reporting (PR)
  └── claude/* (automated feature branches)
```

### Workflow

1. **Main branch** - Stable, deployable code
2. **Feature branches** - Development work (claude/* or feature/*)
3. **Pull Requests** - All changes merge to main via PR
4. **Deployments** - Vercel auto-deploys from main branch

### Vercel Setup

Once main branch is created:

1. Connect Vercel to your GitHub repository
2. Configure deployment settings:
   - **Production Branch:** `main`
   - **Root Directory:** `admin-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. Automatic deployments:
   - Push to `main` → Production deployment
   - Open PR → Preview deployment
   - Merge PR → Automatic production update

## After Main Branch is Set Up

You can clean up old claude/* branches:

```bash
# Delete merged feature branches (optional)
git push origin --delete claude/create-erd-0144HSJw6KjFDtF6kiMS1rLr
git push origin --delete claude/build-admin-frontend-01BTrBagUrLoeisnQJq8fjk3
git push origin --delete claude/run-incomplete-task-01T7Ai6nXn8JfuJxkkv9LJcd
```

## Benefits of This Setup

✅ Clear separation between stable and development code
✅ Code review process via pull requests
✅ Automated deployments from main branch
✅ Preview deployments for testing
✅ Rollback capability
✅ Industry standard git workflow
✅ Better collaboration with team members

## Next Steps

1. Set up main branch using Option 1 or 2 above
2. Configure Vercel to deploy from main
3. Create future work on feature branches
4. Use PRs to merge into main
