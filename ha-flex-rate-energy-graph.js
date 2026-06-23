const DEFAULT_TIERS = [
  { key: "peak", label: "Peak", rate: 0.32, color: "#b91c1c" },
  { key: "offPeak", label: "Off-peak", rate: 0.18, color: "#ea580c" },
  { key: "superOffPeak", label: "Super-off-peak", rate: 0.1, color: "#2563eb" },
].sort((a, b) => b.rate - a.rate);

const RANGE_OPTIONS = [
  { value: "day", label: "day" },
  { value: "sevenDay", label: "7 day" },
  { value: "billingMonth", label: "month" },
  { value: "yearly", label: "year" },
];

const YAXIS_OPTIONS = [
  { value: "kwh", label: "kWh" },
  { value: "cost", label: "$" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const DATA_BY_RANGE = {
  billingMonth: [
    { label: "1", peak: 4.2, offPeak: 7.1, superOffPeak: 5.3 },
    { label: "2", peak: 3.8, offPeak: 6.5, superOffPeak: 5.8 },
    { label: "3", peak: 4.5, offPeak: 7.8, superOffPeak: 4.9 },
    { label: "4", peak: 5.1, offPeak: 6.2, superOffPeak: 5.5 },
    { label: "5", peak: 3.9, offPeak: 8.1, superOffPeak: 4.7 },
    { label: "6", peak: 4.8, offPeak: 7.4, superOffPeak: 6.1 },
    { label: "7", peak: 4.1, offPeak: 6.9, superOffPeak: 5.2 },
    { label: "8", peak: 5.3, offPeak: 7.6, superOffPeak: 4.4 },
    { label: "9", peak: 3.6, offPeak: 8.3, superOffPeak: 5.9 },
    { label: "10", peak: 4.7, offPeak: 6.8, superOffPeak: 5.1 },
    { label: "11", peak: 4.4, offPeak: 7.2, superOffPeak: 6.3 },
    { label: "12", peak: 5.0, offPeak: 7.9, superOffPeak: 4.6 },
    { label: "13", peak: 3.7, offPeak: 6.6, superOffPeak: 5.7 },
    { label: "14", peak: 4.9, offPeak: 7.5, superOffPeak: 5.4 },
    { label: "15", peak: 4.3, offPeak: 8.0, superOffPeak: 4.8 },
    { label: "16", peak: 5.2, offPeak: 6.4, superOffPeak: 6.0 },
    { label: "17", peak: 4.0, offPeak: 7.3, superOffPeak: 5.6 },
    { label: "18", peak: 4.6, offPeak: 7.7, superOffPeak: 5.0 },
    { label: "19", peak: 5.4, offPeak: 6.7, superOffPeak: 4.5 },
    { label: "20", peak: 3.5, offPeak: 8.2, superOffPeak: 5.9 },
    { label: "21", peak: 4.2, offPeak: 7.0, superOffPeak: 5.3 },
    { label: "22", peak: 4.8, offPeak: 6.5, superOffPeak: 6.2 },
    { label: "23", peak: 5.1, offPeak: 7.8, superOffPeak: 4.7 },
    { label: "24", peak: 3.9, offPeak: 7.4, superOffPeak: 5.5 },
    { label: "25", peak: 4.5, offPeak: 6.9, superOffPeak: 5.1 },
    { label: "26", peak: 4.7, offPeak: 8.1, superOffPeak: 4.9 },
    { label: "27", peak: 5.3, offPeak: 7.2, superOffPeak: 5.8 },
    { label: "28", peak: 4.1, offPeak: 6.6, superOffPeak: 5.4 },
    { label: "29", peak: 4.4, offPeak: 7.5, superOffPeak: 6.1 },
    { label: "30", peak: 5.0, offPeak: 7.9, superOffPeak: 4.6 },
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
  yearly: [
    { label: "Jan", peak: 130, offPeak: 210, superOffPeak: 170 },
    { label: "Feb", peak: 122, offPeak: 195, superOffPeak: 165 },
    { label: "Mar", peak: 118, offPeak: 188, superOffPeak: 172 },
    { label: "Apr", peak: 140, offPeak: 220, superOffPeak: 190 },
    { label: "May", peak: 155, offPeak: 238, superOffPeak: 210 },
    { label: "Jun", peak: 162, offPeak: 245, superOffPeak: 218 },
    { label: "Jul", peak: 175, offPeak: 255, superOffPeak: 225 },
    { label: "Aug", peak: 170, offPeak: 250, superOffPeak: 220 },
    { label: "Sep", peak: 148, offPeak: 230, superOffPeak: 200 },
    { label: "Oct", peak: 135, offPeak: 215, superOffPeak: 185 },
    { label: "Nov", peak: 128, offPeak: 205, superOffPeak: 175 },
    { label: "Dec", peak: 145, offPeak: 225, superOffPeak: 195 },
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
    this._tiers = DEFAULT_TIERS;
    this._data = null;
    this._fetchId = 0;
    this._dataFetchedForRange = null;
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Configuration required");
    }
    this._config = config;
    this._applyConfig();
    this._render();
  }

  _applyConfig() {
    const peakEntity = this._config.peak_entity;
    const offPeakEntity = this._config.off_peak_entity;
    const superOffPeakEntity = this._config.super_off_peak_entity;

    if (peakEntity || offPeakEntity || superOffPeakEntity) {
      this._tiers = [
        { key: "peak", label: "Peak", entity: peakEntity, rate: this._config.peak_rate ?? 0.32, color: "#b91c1c" },
        { key: "offPeak", label: "Off-peak", entity: offPeakEntity, rate: this._config.off_peak_rate ?? 0.18, color: "#ea580c" },
        { key: "superOffPeak", label: "Super-off-peak", entity: superOffPeakEntity, rate: this._config.super_off_peak_rate ?? 0.1, color: "#2563eb" },
      ].sort((a, b) => b.rate - a.rate);
    } else {
      this._tiers = DEFAULT_TIERS;
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (this._previewOnly) return;
    if (!this._tiers.some((t) => t.entity)) return;
    if (this._dataFetchedForRange === this._range) return;
    this._fetchData();
  }

  get _previewOnly() {
    return this._config.preview === true || this.hasAttribute("preview");
  }

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
        .toggle-group {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--primary-text-color, #1f2937);
          cursor: pointer;
          user-select: none;
        }
        .toggle-option {
          opacity: 0.4;
          transition: opacity 0.15s;
        }
        .toggle-option.active {
          opacity: 1;
        }
        .toggle-divider {
          opacity: 0.3;
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
        .empty-state {
          text-align: center;
          padding: 60px 16px;
          color: var(--secondary-text-color, #6b7280);
          font-size: 0.95rem;
        }
      </style>
      <div class="card">
        <h1 id="title"></h1>
        <div class="controls" id="controls"></div>
        <svg id="chart" role="img" aria-label="Stacked bar chart for energy tiers"></svg>
        <div id="legend" class="legend"></div>
      </div>
    `;

    const titleEl = this.shadowRoot.getElementById("title");
    titleEl.textContent = title;

    this._buildToggleControls();
    this._drawLegend();
    this._renderData();
  }

  _renderData() {
    if (this._previewOnly) {
      this._renderChart(DATA_BY_RANGE[this._range]);
      return;
    }
    const hasEntities = this._tiers.some((t) => t.entity);
    if (!hasEntities) {
      this._showEmpty("Configure peak_entity, off_peak_entity, and super_off_peak_entity in card config");
      return;
    }
    if (this._data && this._dataFetchedForRange === this._range) {
      this._renderChart(this._data);
      return;
    }
    if (this._hass) {
      this._fetchData();
    } else {
      this._showEmpty("Waiting for Home Assistant...");
    }
  }

  _showEmpty(msg) {
    const chart = this.shadowRoot.getElementById("chart");
    chart.style.display = "none";
    const legend = this.shadowRoot.getElementById("legend");
    legend.innerHTML = `<div class="empty-state">${msg}</div>`;
  }

  _drawLegend() {
    const legend = this.shadowRoot.getElementById("legend");
    legend.innerHTML = "";
    this._tiers.forEach((tier) => {
      const item = document.createElement("span");
      item.className = "legend-item";
      item.innerHTML = `<span class="swatch" style="background:${tier.color}"></span>${tier.label} (${tier.rate.toFixed(2)}/kWh)`;
      legend.appendChild(item);
    });
  }

  _buildToggleControls() {
    const controls = this.shadowRoot.getElementById("controls");
    controls.innerHTML = "";

    const yGroup = document.createElement("span");
    yGroup.className = "toggle-group";
    YAXIS_OPTIONS.forEach((opt, i) => {
      if (i > 0) {
        const div = document.createElement("span");
        div.className = "toggle-divider";
        div.textContent = "|";
        yGroup.appendChild(div);
      }
      const span = document.createElement("span");
      span.className = "toggle-option" + (opt.value === this._yAxis ? " active" : "");
      span.textContent = opt.label;
      yGroup.appendChild(span);
    });
    yGroup.onclick = () => {
      this._yAxis = this._yAxis === "cost" ? "kwh" : "cost";
      this._buildToggleControls();
      this._renderData();
    };
    controls.appendChild(yGroup);

    const rangeGroup = document.createElement("span");
    rangeGroup.className = "toggle-group";
    RANGE_OPTIONS.forEach((opt, i) => {
      if (i > 0) {
        const div = document.createElement("span");
        div.className = "toggle-divider";
        div.textContent = "|";
        rangeGroup.appendChild(div);
      }
      const span = document.createElement("span");
      span.className = "toggle-option" + (opt.value === this._range ? " active" : "");
      span.textContent = opt.label;
      rangeGroup.appendChild(span);
    });
    rangeGroup.onclick = () => {
      const idx = RANGE_OPTIONS.findIndex((o) => o.value === this._range);
      const next = RANGE_OPTIONS[(idx + 1) % RANGE_OPTIONS.length];
      this._range = next.value;
      this._dataFetchedForRange = null;
      this._buildToggleControls();
      this._renderData();
    };
    controls.appendChild(rangeGroup);
  }

  _getTimeRange() {
    const now = new Date();
    let start;
    switch (this._range) {
      case "day":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "sevenDay":
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "billingMonth":
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "yearly":
        start = new Date(now.getFullYear() - 1, now.getMonth(), 1);
        break;
    }
    return { start, end: now };
  }

  async _fetchData() {
    const fetchId = ++this._fetchId;
    const range = this._range;
    const { start, end } = this._getTimeRange();

    const entityIds = this._tiers.filter((t) => t.entity).map((t) => t.entity);

    try {
      const history = await this._hass.callWS({
        type: "history/history_during_period",
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: entityIds,
        minimal_response: true,
        no_attributes: true,
      });

      if (fetchId !== this._fetchId) return;

      this._data = this._processHistory(history, range);
      this._dataFetchedForRange = range;
      this._renderChart(this._data);
    } catch (err) {
      if (fetchId !== this._fetchId) return;
      this._showEmpty("Failed to fetch energy data");
    }
  }

  _processHistory(history, range) {
    const dataMap = new Map();

    this._tiers.forEach((tier) => {
      if (!tier.entity) return;
      const states = history[tier.entity] || [];
      for (let i = 1; i < states.length; i++) {
        const prev = parseFloat(states[i - 1].state);
        const curr = parseFloat(states[i].state);
        if (isNaN(prev) || isNaN(curr)) continue;
        const delta = curr - prev;
        if (delta < 0) continue;

        const ts = new Date(states[i].last_changed);
        let bucketKey, label;

        switch (range) {
          case "day":
            bucketKey = `${String(ts.getHours()).padStart(2, "0")}`;
            label = bucketKey;
            break;
          case "sevenDay":
            bucketKey = ts.toISOString().slice(0, 10);
            label = DAYS[ts.getDay()];
            break;
          case "billingMonth":
            bucketKey = ts.toISOString().slice(0, 10);
            label = `${ts.getDate()}`;
            break;
          case "yearly":
            bucketKey = `${ts.getFullYear()}-${String(ts.getMonth()).padStart(2, "0")}`;
            label = MONTHS[ts.getMonth()];
            break;
        }

        if (!dataMap.has(bucketKey)) {
          dataMap.set(bucketKey, { label, peak: 0, offPeak: 0, superOffPeak: 0 });
        }
        dataMap.get(bucketKey)[tier.key] += delta;
      }
    });

    return Array.from(dataMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([, row]) => row);
  }

  _renderChart(points) {
    const chart = this.shadowRoot.getElementById("chart");
    chart.style.display = "block";
    const width = 1000;
    const height = 420;
    const margin = { top: 20, right: 12, bottom: 60, left: 68 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const barGap = 14;
    const barWidth = Math.max(12, Math.min(80, (plotWidth - barGap * (points.length - 1)) / points.length));
    const totals = points.map((row) => this._tiers.reduce((acc, tier) => acc + toMetricValue(row, tier, this._yAxis), 0));
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

      this._tiers.forEach((tier) => {
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
    description: "Stacked energy usage graph with cost/kWh and range controls.",
  });
}
