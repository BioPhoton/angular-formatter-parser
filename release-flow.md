## Rough release flow
- npm run build
- npm run recommended-bump (lookup for recommended version bump i.e.: patch)
- cd src
- npm version [BUMP_TYPE] -m "chore(release): %s"
- git push --follow-tags
- cd ..
- npm run changelog
- npm run github-release
- npm run release