# ha-flex-rate-energy-graph
A graph in Home Assistant that itemizes usage based on time of day costs

## Demo

Open `index.html` in a browser to view a simple interactive stacked-bar graph with:

- default billing-month view
- stacked usage by peak/off-peak/super-off-peak (costliest tier at the bottom)
- y-axis toggle between `$` and `kWh`
- x-range options for billing month, 7 day, and day

## HACS import

1. In Home Assistant, open HACS → Frontend → menu → Custom repositories.
2. Add this repository URL and select category `Dashboard`.
3. Install **Flex Rate Energy Graph**.
4. Add `/hacsfiles/ha-flex-rate-energy-graph/ha-flex-rate-energy-graph.js` as a Lovelace resource (type `module`).
5. Add a manual card:

```yaml
type: custom:ha-flex-rate-energy-graph
title: Energy Usage by Cost Tier
```

## Live development

For quick browser iteration, run:

```bash
python3 -m http.server
```

Then open `http://localhost:8000/index.html`.

For Home Assistant live dev:

1. Copy `ha-flex-rate-energy-graph.js` into your HA config under `www/`.
2. Add `/local/ha-flex-rate-energy-graph.js` as a Lovelace module resource.
3. Use the same manual card config shown above.
4. After edits, hard refresh the browser (or reload Lovelace resources) to pick up updates.
