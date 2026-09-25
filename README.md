# Sponsors wall

Every GitHub sponsor of [@merill](https://github.com/sponsors/merill), redrawn nightly by [sponsorkit](https://github.com/antfu-collective/sponsorkit).

<p align="center">
  <a href="https://github.com/sponsors/merill">
    <img src="https://raw.githubusercontent.com/merill/sponsors/main/sponsors.svg" alt="Sponsors of merill">
  </a>
</p>

## Embedding

- **README / web page:** `https://raw.githubusercontent.com/merill/sponsors/main/sponsors.svg`
- **Email (Entra.News):** `https://raw.githubusercontent.com/merill/sponsors/main/sponsors.png`

Link the image to `https://github.com/sponsors/merill`.

`sponsors.json` lists the same public sponsors with their tier name and no amounts.
The merill.net daily stats workflow copies it into the site's sponsors section.

## Upkeep

Nothing, unless the nightly run fails. If it does, it's almost always because the
`SPONSORKIT_GITHUB_TOKEN` secret expired. Create a new classic token with the
`read:user` and `read:org` scopes and update the secret.
