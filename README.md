# GK Lab — E-Commerce

Digital drops, **IMTAT** courses, merch, and consulting. Matches [Georgie the Educator](https://www.youtube.com/@georgietheeducator) on YouTube.

```bash
npm install
cp .env.example .env.local
npm run assets    # sync brand PNGs from ~/Desktop/IMTAT
npm run dev       # http://localhost:3003
```

**Related sites**

| Site | Port | Theme |
|------|------|-------|
| Portfolio | 3001 | Navy + gold |
| GK WOO | 3002 | Merch vibe |
| GK Lab | 3003 | Dark + blue |

Course production lives in `~/Desktop/IMTAT`. Run `sync-imtat-assets.py` after updating slides or logos.
