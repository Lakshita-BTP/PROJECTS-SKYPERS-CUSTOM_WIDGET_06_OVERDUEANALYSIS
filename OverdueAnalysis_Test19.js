(function () {
  class OverdueAnalysis extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: "open" });

      /* =========================
         TITLE
      ========================= */

      this._title = "OVERDUE ANALYSIS";
      this._titleColor = "#FFFFFF";

      this._headerBackground = "#1B2A41";
      this._cardBackground = "#FFFFFF";

      /* =========================
         KPI TEXTS
      ========================= */

      this._totalDueText = "TOTAL DUE";
      this._unclearedText = "UNCLEARED VALUE";
      this._gt30Text = ">30 DAYS";
      this._gt60Text = ">60 DAYS";

      /* =========================
         KPI TEXT COLORS
      ========================= */

      this._totalDueTextColor = "#667085";
      this._unclearedTextColor = "#667085";
      this._gt30TextColor = "#667085";
      this._gt60TextColor = "#667085";

      /* =========================
         KPI VALUE COLORS
      ========================= */

      this._totalDueValueColor = "#0F172A";
      this._unclearedValueColor = "#0F172A";
      this._gt30ValueColor = "#0F172A";
      this._gt60ValueColor = "#0F172A";

      /* =========================
         VALUES
      ========================= */

      this._unclearedValue = 0;

      /* =========================
         LABELS
      ========================= */

      this._labelColor = "#667085";

      this._barLabels = {};

      /* =========================
         BAR COLORS
      ========================= */

      this._barColors = ["#2EBE69", "#C5A04A", "#E26A00", "#D84335", "#9E1B1B"];

      /* =========================
         FORMATTING
      ========================= */

      this._decimalPlaces = 2;
      this._currencyUnit = "Cr";

      this.shadowRoot.innerHTML = `
      <style>

      .outer{
          width:100%;
          height:100%;
          padding:5px;
          box-sizing:border-box;
      }

      .card{
          width:100%;
          height:100%;
          background:${this._cardBackground};
          border-radius:12px;
          box-shadow:0 0 11px rgba(0,0,0,0.10);
          font-family:sans-serif;
      }

      .title{
          background:${this._headerBackground};
          color:${this._titleColor};
          font-size:18px;
          font-weight:bold;
          padding:12px 15px;
          text-transform:uppercase;
          letter-spacing:0.5px;
      }

      .container{
          padding:15px;
          box-sizing:border-box;
      }

      .kpi-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:8px;
          margin-bottom:6px;
      }

      .kpi-card{
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:0;
          background:#F8FAFC;
          border:1px solid #E5E7EB;
          border-radius:10px;
          padding:4px 8px;
          text-align:center;
      }

      .kpi-value{
          font-size:18px;
          font-weight:700;
          line-height:1;
          margin:0;
          padding:0;
      }

      .kpi-label{
          font-size:11px;
          font-weight:600;
          line-height:1;
          margin:0;
          padding:0;
          text-transform:uppercase;
      }

      .row{
          margin-bottom:18px;
      }

      .row:first-of-type{
          margin-top: 50px;
      }

      .label-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:6px;
      }

      .label{
          font-size:12px;
          font-weight:700;
          text-transform:uppercase;
          color:${this._labelColor};
      }

      .value{
          font-size:13px;
          font-weight:700;
          color:#0F172A;
      }

      .bar-container{
          width:100%;
          height:18px;
          background:#E5E7EB;
          border-radius:10px;
          overflow:hidden;
      }

      .bar{
          height:100%;
          border-radius:10px;
          transition:width .3s ease;
      }

      .empty{
          display:flex;
          align-items:center;
          justify-content:center;
          height:100%;
          color:#667085;
          font-size:14px;
      }
          

      </style>

      <div class="outer">

        <div class="card">

          <div id="title" class="title">
            ${this._title}
          </div>

          <div id="content" class="container">

            <div class="empty">
              Waiting For Data Binding...
            </div>

          </div>

        </div>

      </div>
      `;
    }

    connectedCallback() {
      console.log("CONNECTED");
      console.log("DataBinding:", this._myDataBinding);
      this.render();
    }

    set myDataBinding(dataBinding) {
      console.log("BINDING RECEIVED");
      console.log(dataBinding);

      this._myDataBinding = dataBinding;
      this.render();
    }

    /* =========================
    TITLE
    ========================= */

    setTitle(value) {
      this._title = value;
      this.render();
    }

    setTitleColor(value) {
      this._titleColor = value;
      this.render();
    }

    setHeaderBackground(value) {
      this._headerBackground = value;
      this.render();
    }

    setCardBackground(value) {
      this._cardBackground = value;
      this.render();
    }

    /* =========================
    TOTAL DUE
    ========================= */

    setTotalDueText(value) {
      this._totalDueText = value;
      this.render();
    }

    setTotalDueTextColor(value) {
      this._totalDueTextColor = value;
      this.render();
    }

    setTotalDueValueColor(value) {
      this._totalDueValueColor = value;
      this.render();
    }

    /* =========================
    UNCLEARED
    ========================= */

    setUnclearedText(value) {
      this._unclearedText = value;
      this.render();
    }

    setUnclearedTextColor(value) {
      this._unclearedTextColor = value;
      this.render();
    }

    setUnclearedValueColor(value) {
      this._unclearedValueColor = value;
      this.render();
    }

    setUnclearedValue(value) {
      this._unclearedValue = Number(value) || 0;
      this.render();
    }

    /* =========================
    GT30
    ========================= */

    setGT30Text(value) {
      this._gt30Text = value;
      this.render();
    }

    setGT30TextColor(value) {
      this._gt30TextColor = value;
      this.render();
    }

    setGT30ValueColor(value) {
      this._gt30ValueColor = value;
      this.render();
    }

    /* =========================
    GT60
    ========================= */

    setGT60Text(value) {
      this._gt60Text = value;
      this.render();
    }

    setGT60TextColor(value) {
      this._gt60TextColor = value;
      this.render();
    }

    setGT60ValueColor(value) {
      this._gt60ValueColor = value;
      this.render();
    }

    /* =========================
    LABELS
    ========================= */

    setLabelColor(value) {
      this._labelColor = value;
      this.render();
    }

    setBarLabel(index, value) {
      this._barLabels[index] = value;
      this.render();
    }

    /* =========================
    BAR COLORS
    ========================= */

    setBarColor(index, color) {
      index = Number(index);

      if (index >= 0) {
        this._barColors[index] = color;
        this.render();
      }
    }

    /* =========================
    FORMATTING
    ========================= */

    setDecimalPlaces(value) {
      this._decimalPlaces = Number(value);
      this.render();
    }

    setCurrencyUnit(value) {
      this._currencyUnit = value;
      this.render();
    }

    formatValue(value) {
      value = Number(value) || 0;

      if (this._currencyUnit === "Cr") {
        return (
          "₹" +
          value.toLocaleString(undefined, {
            minimumFractionDigits: this._decimalPlaces,
            maximumFractionDigits: this._decimalPlaces,
          }) +
          " Cr"
        );
      }

      if (this._currencyUnit === "Lakh") {
        return (
          "₹" +
          value.toLocaleString(undefined, {
            minimumFractionDigits: this._decimalPlaces,
            maximumFractionDigits: this._decimalPlaces,
          }) +
          " Lakh"
        );
      }

      return (
        "₹" +
        value.toLocaleString(undefined, {
          minimumFractionDigits: this._decimalPlaces,
          maximumFractionDigits: this._decimalPlaces,
        })
      );
    }

    render() {
      const content = this.shadowRoot.getElementById("content");

      if (!content) {
        return;
      }

      content.innerHTML = `
          <div style="padding:20px">
            TITLE=${this._title}
          </div>
        `;
    }

    async serializeCustomWidgetToImage() {
      console.log("EXPORT START");
      console.log("STATE", this._myDataBinding?.state);

      const canvas = document.createElement("canvas");

      const width = 1400;
      const height = 900;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      /* =========================
      NO DATA
      ========================= */

      if (
        !this._myDataBinding ||
        this._myDataBinding.state !== "success" ||
        !this._myDataBinding.data ||
        this._myDataBinding.data.length === 0
      ) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = this._headerBackground;
        ctx.fillRect(0, 0, width, height * 0.08);

        ctx.fillStyle = this._titleColor;
        ctx.font = `bold ${Math.round(height * 0.03)}px Arial`;
        ctx.fillText(this._title, 20, height * 0.05);

        ctx.fillStyle = "#444";
        ctx.font = `${Math.round(height * 0.025)}px Arial`;
        ctx.fillText("No Data Available", 40, height * 0.15);

        return canvas.toDataURL("image/png");
      }

      /* =========================
      DATA
      ========================= */

      const measureKeys = this._myDataBinding.metadata.feeds.measures.values;

      const row = this._myDataBinding.data[0];

      const data = measureKeys.map((key) => ({
        name: this._myDataBinding.metadata.mainStructureMembers[key].label,
        value: Number(row[key]?.raw || 0),
      }));

      const totalDue = data.reduce((sum, item) => sum + item.value, 0);

      let gt30 = 0;
      let gt60 = 0;

      data.forEach((item) => {
        const label = item.name.toLowerCase().replace(/\s+/g, "");

        if (
          label.includes("31") ||
          label.includes("61") ||
          label.includes("90")
        ) {
          gt30 += item.value;
        }

        if (label.includes("61") || label.includes("90")) {
          gt60 += item.value;
        }
      });

      const maxValue = Math.max(...data.map((x) => x.value), 1);

      /* =========================
      RESPONSIVE SIZES
      ========================= */

      const headerHeight = height * 0.08;

      const sidePadding = width * 0.03;

      const cardGap = width * 0.04;

      const cardWidth = (width - sidePadding * 2 - cardGap) / 2;

      const cardHeight = height * 0.09;

      const kpiTop = headerHeight + 30;

      const valueFont = Math.max(18, Math.round(height * 0.03));

      const labelFont = Math.max(11, Math.round(height * 0.015));

      const titleFont = Math.max(22, Math.round(height * 0.03));

      /* =========================
      BACKGROUND
      ========================= */

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      /* =========================
      HEADER
      ========================= */

      ctx.fillStyle = this._headerBackground;
      ctx.fillRect(0, 0, width, headerHeight);

      ctx.fillStyle = this._titleColor;
      ctx.font = `bold ${titleFont}px Arial`;

      ctx.fillText(this._title, sidePadding, headerHeight * 0.65);

      /* =========================
      KPI DRAWER
      ========================= */

      const drawCard = (x, y, value, label, valueColor, labelColor) => {
        ctx.fillStyle = "#F8FAFC";
        ctx.strokeStyle = "#E5E7EB";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(x, y, cardWidth, cardHeight, 10);

        ctx.fill();
        ctx.stroke();

        ctx.textAlign = "center";

        ctx.fillStyle = valueColor;
        ctx.font = `bold ${valueFont}px Arial`;

        ctx.fillText(value, x + cardWidth / 2, y + cardHeight * 0.42);

        ctx.fillStyle = labelColor;
        ctx.font = `bold ${labelFont}px Arial`;

        ctx.fillText(label, x + cardWidth / 2, y + cardHeight * 0.78);

        ctx.textAlign = "left";
      };

      drawCard(
        sidePadding,
        kpiTop,
        this.formatValue(totalDue / 10000000),
        this._totalDueText,
        this._totalDueValueColor,
        this._totalDueTextColor,
      );

      drawCard(
        sidePadding + cardWidth + cardGap,
        kpiTop,
        this.formatValue(this._unclearedValue),
        this._unclearedText,
        this._unclearedValueColor,
        this._unclearedTextColor,
      );

      drawCard(
        sidePadding,
        kpiTop + cardHeight + 20,
        this.formatValue(gt30 / 10000000),
        this._gt30Text,
        this._gt30ValueColor,
        this._gt30TextColor,
      );

      drawCard(
        sidePadding + cardWidth + cardGap,
        kpiTop + cardHeight + 20,
        this.formatValue(gt60 / 10000000),
        this._gt60Text,
        this._gt60ValueColor,
        this._gt60TextColor,
      );

      /* =========================
      BARS
      ========================= */

      const barsStartY = kpiTop + cardHeight * 2 + 80;

      const availableHeight = height - barsStartY - 40;

      const rowHeight = availableHeight / data.length;

      data.forEach((item, index) => {
        const percent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

        const label = this._barLabels[index] ?? item.name;

        const color = this._barColors[index] || "#344F6D";

        const y = barsStartY + index * rowHeight;

        const barHeight = Math.min(24, Math.max(12, rowHeight * 0.35));

        ctx.fillStyle = this._labelColor;
        ctx.font = `bold ${labelFont}px Arial`;

        ctx.fillText(label.toUpperCase(), sidePadding, y);

        ctx.fillStyle = "#0F172A";

        ctx.textAlign = "right";

        ctx.fillText(this.formatValue(item.value), width - sidePadding, y);

        ctx.textAlign = "left";

        const barY = y + 10;

        ctx.fillStyle = "#E5E7EB";

        ctx.beginPath();

        ctx.roundRect(
          sidePadding,
          barY,
          width - sidePadding * 2,
          barHeight,
          barHeight / 2,
        );

        ctx.fill();

        ctx.fillStyle = color;

        ctx.beginPath();

        ctx.roundRect(
          sidePadding,
          barY,
          ((width - sidePadding * 2) * percent) / 100,
          barHeight,
          barHeight / 2,
        );

        ctx.fill();
      });

      return canvas.toDataURL("image/png");
    }
  }

  customElements.define("com-max-overdueanalysis", OverdueAnalysis);
})();
