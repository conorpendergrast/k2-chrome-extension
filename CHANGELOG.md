# 0.4.6
- Updated the view for PR waiting for to to not show PRs that are assigned to you

# 0.4.5
- Changed the view for PRs waiting on you to show PRs that you have finished reviewing, but haven't merged yet

# 0.4.4
- Fixed a bug where an API failure would cause a weirdly formatted issue list

# 0.4.3
- Fixed a bug where FirstPick issues wheren't being labeled properly

# 0.4.2
- Fixed a bug with the API that would create an infinite loop with retrying the API

# 0.4.1
- Refactored the tabs so that they load appropriately now

# 0.4.0
- Added a quick label button for the mobile area
- Added a tab for viewing mobile issues to work on
- Tried once again (and pretty much failed) to fix tab switching
- Added automatic API retrying according to GitHubs rate limiting headers

# 0.3.6
- Swapped the NewHire label for the FirstPick label

# 0.3.5
- Corrected the logic for the PR lists so that they show the proper PRs now

# 0.3.4
- Fixed a bug when sorting issues when there were more than 100

# 0.3.3
- Improved text for your own pull requests

# 0.3.2
- Improved text for your own pull requests

# 0.3.1
- Added pagination to the API calls
- Tried to fix tab switching without much luck

# 0.3.0
- Added full support for GitHub reviewers. This assumes that a PR assignee is the one responsible for merging it. Reviewers, their only job is to review code.

# 0.2.1
- Added a waiting label for issues that are waiting for customers

# 0.2.0
- Added a picker for areas and a some color for the other pickers

# 0.1.11
- Fixing a bug where the PR query shouldn't be just querying the expensify/expensify repo

# 0.1.10
- Switching issue searches to the expensify/expensify repo

# 0.1.9
- Bumping version because previous package was corrupt (no js/content.js)

# 0.1.8
- Added Area 51 to the list of issues

# 0.1.7
- Fixed a bug where Merge button wasn't disabled for PRs on HOLD when there's a trailing slash in the PRs URL
- Removed crx gulp task
- Added zip gulp task

# 0.1.6
- Fixed a bug where the label quick selectors didn't work anymore

# 0.1.5
- Fixed a bug where clicking on the K2 tab didn't work anymore

# 0.1.4
- Added a label to the list of issues for newhire tickets
- Added styles so that "Planning" and "Waiting for customer" issues are greyed out
- Made it so that when the lists refresh, there is no loading view and the data stays there

# 0.1.3
- Added a reviewing label switching button
- Add a bug/task/feature label switching button
- Fixed some errors for grabbing the repo name

# 0.1.2
- Replaced all icons with superscripts because GitHub is dumb and won't let octicons or font-awesome be used
- Added Travis CI status to all PRs

# 0.1.1
- Fixed a bug that wouldn't allow you to log in

# 0.1.0
- Fixed a bug causing the re-syncing of data to break the page
- Added an 'hourly' column of things assigned to you
- Added a table of 'issues to work on' for the different areas

# 0.0.10
- Updated the extension to work with the new GH repo layout

# 0.0.9
- Made some of the page components redraw on an interval

# 0.0.8
- Added the ability to quick select KSv2 labels
- Updated all libraries and build tools
- Added a sign out button
- Changed password field to be a password field

# 0.0.7
- Fixed the merge button that was no longer being disabled
- Fixed the password form

# 0.0.6
- Updated the styles for aa PR on hold to match the new GitHub changes
- Refined the detection of a held PR to one that contains "[HOLD" or "[WIP" in the title

# 0.0.5
- Added a dark theme for GitHub but disabled it for now
- Fixed a bug where authored pull requests weren't showing
- Moved the Kernel Scheduling navigation item to the bottom of the github menu (so it don't move things that you are used to having in the same spot)

# 0.0.4
- Refactored the React components to use Alt-Flux
- Added loading and blank states to the lists

# 0.0.3
- Changes the page title to K2 when on the K2 dashboard

# 0.0.2
- Restrict issue and pull request queries to the Expensify organization
