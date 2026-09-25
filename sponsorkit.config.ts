import { writeFile } from 'node:fs/promises'
import { defineConfig, tierPresets } from 'sponsorkit'
import type { Sponsorship, Tier } from 'sponsorkit'

// Tier thresholds mirror the GitHub Sponsors tiers: $5, $15, $100, $500 a month.
// Anything under $15 (including custom amounts) lands in Backers.
const tiers: Tier[] = [
  { title: 'Past Sponsors', monthlyDollars: -1, preset: tierPresets.xs },
  { title: 'Backers', preset: tierPresets.small },
  { title: 'Sponsors', monthlyDollars: 15, preset: tierPresets.base },
  { title: 'Company Sponsors', monthlyDollars: 100, preset: tierPresets.large },
  { title: 'Lead Sponsors', monthlyDollars: 500, preset: tierPresets.xl },
]

function tierFor(monthlyDollars: number): string {
  if (monthlyDollars < 0)
    return 'Past Sponsors'
  const match = tiers
    .filter(t => (t.monthlyDollars ?? 0) >= 0 && monthlyDollars >= (t.monthlyDollars ?? 0))
    .sort((a, b) => (b.monthlyDollars ?? 0) - (a.monthlyDollars ?? 0))[0]
  return match?.title ?? 'Backers'
}

export default defineConfig({
  github: { login: 'merill', type: 'user' },
  outputDir: '.',
  formats: ['svg', 'png'], // png is for Entra.News: most email clients block SVG
  width: 800,
  includePrivate: false,
  includePastSponsors: true,
  // Shows one-time gifts at the tier they'd fund, month by month, then moves them to Past Sponsors.
  prorateOnetime: true,
  tiers,
  // sponsors.json feeds the merill.net sponsors section. It carries the tier name
  // only: no dollar amounts, no private sponsors.
  async onBeforeRenderer(sponsors: Sponsorship[]) {
    const wall = sponsors
      .filter(s => s.privacyLevel !== 'PRIVATE')
      .map(s => ({
        login: s.sponsor.login,
        type: s.sponsor.type,
        name: s.sponsor.name || s.sponsor.login,
        avatarUrl: s.sponsor.avatarUrl,
        linkUrl: s.sponsor.linkUrl || `https://github.com/${s.sponsor.login}`,
        tier: tierFor(s.monthlyDollars),
      }))
    await writeFile('sponsors.json', `${JSON.stringify(wall, null, 2)}\n`)
    return sponsors
  },
})
