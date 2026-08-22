---
description: How to safely prepare, execute, and undo Git merges.
---

This workflow helps you safely merge branches by creating backup tags before the merge, executing the merge, and providing steps to revert if things go wrong.

### 1. Preparation: Create Backup Tags

Save your current place in Git by creating backup tags for both branches.
First, tag the main branch (the branch you are merging INTO):

```bash
git tag backup-main-before-merge $(git rev-parse --abbrev-ref HEAD)
```

If you know the name of the feature branch you are merging in from, tag it too:

```bash
# Replace <feature-branch> with the actual branch name
# git tag backup-feature-before-merge <feature-branch>
```

### 2. Execution: The Safe Merge

Switch to the main branch you want to merge into (if you aren't already):

```bash
# git checkout <main-branch>
```

Run the merge command using `--no-ff` so Git always keeps a clear record of the merge event:

```bash
# Replace <feature-branch> with the actual branch name
# git merge --no-ff <feature-branch>
```

### 3. Recovery: Getting Back if Things Go Wrong

**Option A - If the merge is currently failing/conflicting:**
If the merge fails or causes severe bugs right away, completely undo the merge and return to the exact pre-merge state:

```bash
// turbo
git merge --abort
```

**Option B - If you already committed the broken merge:**
Roll back your current branch to your safety tag:

```bash
git reset --hard backup-main-before-merge
```

**Option C - Recovering the target branch:**
Access the untouched state of your second branch anytime by checking it out or creating a new workspace from its tag:

```bash
# git checkout -b recovered-feature-branch backup-feature-before-merge
```
