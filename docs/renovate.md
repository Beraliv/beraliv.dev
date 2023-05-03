# Automating npm package updates with Renovate

What:

Automating the process of keeping the NPM dependencies up to date. NPM packages are not updated often enough since the process is manual and uninspiring as it is too repetitive.

Why:

- Ensure that the NPM packages are up to date (new features, security improvements)
- Engineers can spend their time more productively than updating dependencies manually

Requirements:

- Process scheduled based on a cron job
- Check for updates
- Create a single feature branch for all updates
- Add a change log with listing the updates (Update packageName from version x to version y)
- Wait until the CI checks are "green" and then automatically merge the PR
- Update packages with beta version
- Support of workspaces

| Name     | Scheduled job | Check for updates | 1 branch for multiple updates | Custom changelog | Automerge | Beta version updates | Npm workspaces |
| -------- | ------------- | ----------------- | ----------------------------- | ---------------- | --------- | -------------------- | -------------- |
| renovate | ✅ (⚠️)       | ✅ (🚀)           | ✅                            | ✅🕓 (⚠️)        | ✅ (⚠️)   | ✅                   | ✅             |

✅ - possible
⚠️ - limitations
🚀 - customisable
🕓 - time-consuming (requires additional work)

✅ **Process scheduled based on a cron job**

- Schedule configuration – https://docs.renovatebot.com/key-concepts/scheduling/
- E.g. outside of working hours – `schedule:nonOfficeHours` https://docs.renovatebot.com/presets-schedule/#schedulenonofficehours:

```json
["after 10pm every weekday", "before 5am every weekday", "every weekend"]
```

- ⚠️ Schedule configuration provides the window, not the time when the cron job is started [🔗 link](https://docs.renovatebot.com/key-concepts/scheduling/#in-repository-schedule-configuration:~:text=Be%20sure%20to%20schedule%20enough%20time%20for%20Renovate%20to%20process%20your%20repository.%20Do%20not%20set%20schedules%20like%20%22Run%20Renovate%20for%20an%20hour%20each%20Sunday%22%20as%20you%20will%20run%20into%20problems.) and [🔗 another link](https://docs.renovatebot.com/known-limitations/#timeschedule-based-limitations)
- ⚠️ Granularity must be at least one hour [🔗 link](https://docs.renovatebot.com/key-concepts/scheduling/#:~:text=Renovate%20does%20not%20support%20scheduled%20minutes%20or%20%22at%20an%20exact%20time%22%20granularity.%20Granularity%20must%20be%20at%20least%20one%20hour)

✅ **Check for updates**

- Scans your repositories to detect package files and their dependencies when you have `renovate.json` configuration file – https://docs.renovatebot.com/getting-started/use-cases/#how-renovate-updates-a-package-file
- 🚀 There are rules to include and exclude dependencies from updates - [ignoreDeps](https://docs.renovatebot.com/configuration-options/#ignoredeps) and [matchDepNames](https://docs.renovatebot.com/configuration-options/#matchdepnames)

✅ **Create a single feature branch for all updates**

- It's possible to create different groups for updates
- Updating all packages except for major with `group:allNonMajor` – https://docs.renovatebot.com/presets-group/#groupallnonmajor
- Splitting by patch/minor/major with `matchUpdateTypes` – https://docs.renovatebot.com/configuration-options/#matchupdatetypes

✅ **Add a change log with listing the updates (Update packageName from version x to version y)**

- Can be done using `postUpgradeTasks` – https://docs.renovatebot.com/configuration-options/#postupgradetasks
- ⚠️ Post-upgrade tasks can only be used on self-hosted Renovate instances (need to enable [`allowPostUpgradeCommandTemplating`](https://docs.renovatebot.com/self-hosted-configuration/#allowpostupgradecommandtemplating))
- ⚠️ We need to implement the script and pass package update information (anything from [Template field](https://docs.renovatebot.com/templates/#template-fields)) (🕓 extra work for development)
- Example of how to add `postUpgradeTasks` command:

```bash
 "packageRules": [
    {
      "$doc": "docs: 📄 Add changelog",
      "postUpgradeTasks":  {
        "commands": [
           "node ./scripts/add-changelog.js --upgrades {{upgrades}}"
        ],
        "fileFilters": ["CHANGELOG/*.yml"]
      },
      "packagePatterns": [
        ".*"
      ]
    }
  ]
```

✅ **Wait until the CI checks are "green" and then automatically merge the PR**

- Can enable `automerge` – https://docs.renovatebot.com/configuration-options/#automerge
- It's possible to do it only for patch/minor dependencies
- ⚠️ There are automerge limitation – https://docs.renovatebot.com/known-limitations/#automerge-limitations
  - Renovate automerges at most one branch per run
  - Renovate will only automerge a branch when it is up-to-date with the target branch
  - Renovate may not be able to automerge as many branches as you expect, especially if your base branch is receiving regular commits at the same time

✅ **Update packages with beta version**

- Has `ignoreUnstable` option to do unstable updates for a package - [link 🔗](https://docs.renovatebot.com/configuration-options/#ignoreunstable)

✅ **Support of workspaces**

- Works with pnpm, yarn and npm workspaces – [link 🔗](https://github.com/renovatebot/renovate/pull/20420)
