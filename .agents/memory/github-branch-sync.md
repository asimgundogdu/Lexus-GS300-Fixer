---
name: GitHub branch synchronization
description: Reliable recovery when local Git history and GitHub main diverge after connector-based writes.
---

When the GitHub connector is used to mirror a local commit, GitHub may generate a different commit SHA even when the tree, parent, message, author, and date match. Treat the resulting GitHub commit as authoritative, force-update the requested branch only when explicitly approved, then fetch and reset the local branch to that remote commit.

**Why:** The connector's commit creation can normalize commit metadata differently, leaving local and remote histories divergent even though their files are identical.

**How to apply:** Verify the remote tree matches the intended local tree before force-updating. Afterward run `git fetch`, reset the local branch to `origin/main`, and confirm both refs and the working tree are clean.