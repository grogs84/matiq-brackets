# Manual Testing Checklist for Bracket Components

This checklist should be run for each increment during the ConsolationBracket development to prevent regressions and ensure both brackets work correctly.

## Championship Bracket (Baseline - must work every time)
- [ ] Renders correctly on desktop
- [ ] Renders correctly on mobile/tablet (responsive)
- [ ] Scrolling works horizontally and vertically
- [ ] No layout breaks or visual glitches
- [ ] Tab switching to/from Championship works

## Consolation Bracket (Incremental development)
- [ ] Renders in SVG container without errors
- [ ] Basic scrolling functionality works
- [ ] No console errors
- [ ] Tab switching to/from Consolation works
- [ ] Doesn't break Championship bracket functionality

## Cross-Bracket Testing
- [ ] Switching between tabs preserves state
- [ ] No memory leaks or performance issues
- [ ] Both brackets can coexist without conflicts

## Quick Smoke Test
- [ ] Load page → Championship tab works
- [ ] Switch to Consolation tab → Consolation works  
- [ ] Switch back to Championship → Still works
- [ ] Test on mobile viewport → Both responsive

## Notes
- Run this checklist after each small increment during development
- If any item fails, address it before proceeding to the next increment
- Keep notes of any issues found for future reference
- This checklist will evolve as the Consolation bracket develops

---
*Related to Issue #16: Implement Consolation Bracket with Incremental Development Approach (Epic)*