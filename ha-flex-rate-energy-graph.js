const TIERS = [
  { key: "peak", label: "Peak", rate: 0.32, color: "#b91c1c" },
  { key: "offPeak", label: "Off-peak", rate: 0.18, color: "#ea580c" },
  { key: "superOffPeak", label: "Super-off-peak", rate: 0.1, color: "#2563eb" },
].sort((a, b) => b.rate - a.rate);

const DATA_BY_RANGE = {
  billingMonth: [
    { label: "Jan", peak: 130, offPeak: 210, superOffPeak: 170 },
    { label: "Feb", peak: 122, offPeak: 195, superOffPeak: 165 },
    { label: "Mar", peak: 118, offPeak: 188, superOffPeak: 172 },
    { label: "Apr", peak: 140, offPeak: 220, superOffPeak: 190 },
    { label: "May", peak: 155, offPeak: 238, superOffPeak: 210 },
    { label: "Jun", peak: 162, offPeak: 245, superOffPeak: 218 },
  ],
  sevenDay: [
    { label: "Mon", peak: 14, offPeak: 28, superOffPeak: 23 },
    { label: "Tue", peak: 16, offPeak: 25, superOffPeak: 20 },
    { label: "Wed", peak: 13, offPeak: 26, superOffPeak: 22 },
    { label: "Thu", peak: 17, offPeak: 29, superOffPeak: 21 },
    { label: "Fri", peak: 18, offPeak: 30, superOffPeak: 22 },
    { label: "Sat", peak: 20, offPeak: 34, superOffPeak: 29 },
    { label: "Sun", peak: 19, offPeak: 32, superOffPeak: 27 },
  ],
  day: [
    { label: "00", peak: 0.2, offPeak: 0.9, superOffPeak: 0.6 },
    { label: "04", peak: 0.3, offPeak: 1.1, superOffPeak: 0.8 },
    { label: "08", peak: 0.7, offPeak: 1.3, superOffPeak: 0.6 },
    { label: "12", peak: 1.5, offPeak: 1.1, superOffPeak: 0.3 },
    { label: "16", peak: 1.8, offPeak: 1.0, superOffPeak: 0.2 },
    { label: "20", peak: 1.2, offPeak: 1.2, superOffPeak: 0.4 },
  ],
};

const toMetricValue = (row, tier, yAxis) => (yAxis === "cost" ? row[tier.key] * tier.rate : row[tier.key]);
const yUnit = (yAxis) => (yAxis === "cost" ? "$" : "kWh");

class HaFlexRateEnergyGraph extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = {};
    this._range = "billingMonth";
    this._yAxis = "cost";
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Configuration required");
    }
    this._config = config;
    this._render();
  }

  set hass(_hass) {}

  getCardSize() {
    return 4;
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    const title = this._config.title || "Energy Usage by Cost Tier";
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--paper-font-body1_-_font-family, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif);
        }
        .card {
          background: var(--ha-card-background, #fff);
          border-radius: 12px;
          box-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0, 0, 0, 0.2));
          border: 1px solid var(--divider-color, #d0d7de);
          padding: 16px;
        }
        h1 {
          margin: 0 0 12px;
          font-size: 1.05rem;
        }
        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 12px;
        }
        .controls label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--primary-text-color, #1f2937);
        }
        .controls select {
          margin-left: 6px;
          padding: 2px 6px;
        }
        svg {
          width: 100%;
          height: 420px;
          display: block;
        }
        .legend {
          display: flex;
          gap: 16px;
          margin-top: 8px;
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: var(--secondary-text-color, #4b5563);
        }
        .legend-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .swatch {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 2px;
        }
      </style>
      <div class="card">
        <h1 id="title"></h1>
        <div class="controls">
          <label for="range-select">X range
            <select id="range-select">
              <option value="billingMonth">Billing month</option>
              <option value="sevenDay">7 day</option>
              <option value="day">Day</option>
            </select>
          </label>
          <label for="y-axis-select">Y axis
            <select id="y-axis-select">
              <option value="cost">$</option>
              <option value="kwh">kWh</option>
            </select>
          </label>
        </div>
        <svg id="chart" role="img" aria-label="Stacked bar chart for energy tiers"></svg>
        <div id="legend" class="legend"></div>
      </div>
    `;

    const titleEl = this.shadowRoot.getElementById("title");
    const rangeSelect = this.shadowRoot.getElementById("range-select");
    const yAxisSelect = this.shadowRoot.getElementById("y-axis-select");

    titleEl.textContent = title;
    rangeSelect.value = this._range;
    yAxisSelect.value = this._yAxis;
    rangeSelect.onchange = (event) => {
      this._range = event.target.value;
      this._renderChart();
    };
    yAxisSelect.onchange = (event) => {
      this._yAxis = event.target.value;
      this._renderChart();
    };

    this._drawLegend();
    this._renderChart();
  }

  _drawLegend() {
    const legend = this.shadowRoot.getElementById("legend");
    legend.innerHTML = "";
    TIERS.forEach((tier) => {
      const item = document.createElement("span");
      item.className = "legend-item";
      item.innerHTML = `<span class="swatch" style="background:${tier.color}"></span>${tier.label} (${tier.rate.toFixed(2)}/kWh)`;
      legend.appendChild(item);
    });
  }

  _renderChart() {
    const chart = this.shadowRoot.getElementById("chart");
    const points = DATA_BY_RANGE[this._range];
    const width = 1000;
    const height = 420;
    const margin = { top: 20, right: 12, bottom: 60, left: 68 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const barGap = 14;
    const barWidth = Math.max(12, Math.min(80, (plotWidth - barGap * (points.length - 1)) / points.length));
    const totals = points.map((row) => TIERS.reduce((acc, tier) => acc + toMetricValue(row, tier, this._yAxis), 0));
    const maxY = Math.max(...totals) * 1.1;
    const scaleY = (v) => margin.top + plotHeight - (v / maxY) * plotHeight;
    const tickCount = 5;

    let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" stroke="#6b7280" />`;
    svg += `<line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" stroke="#6b7280" />`;

    for (let t = 0; t <= tickCount; t += 1) {
      const v = (maxY / tickCount) * t;
      const y = scaleY(v);
      const label = this._yAxis === "cost" ? `$${v.toFixed(2)}` : `${v.toFixed(1)}`;
      svg += `<line x1="${margin.left}" y1="${y}" x2="${margin.left + plotWidth}" y2="${y}" stroke="#e5e7eb" />`;
      svg += `<text x="${margin.left - 8}" y="${y + 4}" text-anchor="end" fill="#4b5563" font-size="11">${label}</text>`;
    }

    points.forEach((row, i) => {
      const x = margin.left + i * (barWidth + barGap);
      let accumulated = 0;

      TIERS.forEach((tier) => {
        const value = toMetricValue(row, tier, this._yAxis);
        const yTop = scaleY(accumulated + value);
        const yBottom = scaleY(accumulated);
        const h = yBottom - yTop;
        svg += `<rect x="${x}" y="${yTop}" width="${barWidth}" height="${h}" fill="${tier.color}">
            <title>${row.label} • ${tier.label}: ${value.toFixed(2)} ${yUnit(this._yAxis)}</title>
          </rect>`;
        accumulated += value;
      });

      const labelX = x + barWidth / 2;
      svg += `<text x="${labelX}" y="${margin.top + plotHeight + 18}" text-anchor="middle" fill="#4b5563" font-size="11">${row.label}</text>`;
    });

    svg += `<text x="16" y="${margin.top + plotHeight / 2}" transform="rotate(-90 16 ${margin.top + plotHeight / 2})" fill="#374151" font-size="12">${yUnit(this._yAxis)}</text>`;
    svg += "</svg>";
    chart.innerHTML = svg;
  }
}

if (!customElements.get("ha-flex-rate-energy-graph")) {
  customElements.define("ha-flex-rate-energy-graph", HaFlexRateEnergyGraph);
}

window.customCards = window.customCards || [];
if (!window.customCards.find((card) => card.type === "ha-flex-rate-energy-graph")) {
  window.customCards.push({
    type: "ha-flex-rate-energy-graph",
    name: "Flex Rate Energy Graph",
    description: "Simple stacked energy usage graph with cost/kWh and range controls.",
  });
}
