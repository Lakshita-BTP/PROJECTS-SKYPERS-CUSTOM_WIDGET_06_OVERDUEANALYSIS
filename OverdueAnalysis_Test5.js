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
          overflow:hidden;
          display:flex;
          flex-direction:column;
          font-family:Arial,sans-serif;
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
          flex:1;
          overflow-y:auto;
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

      content.innerHTML = `
          <div style="padding:20px;font-size:20px">
            ${this._myDataBinding ? "YES" : "NO"}
          </div>
        `;
    }
  }

  customElements.define("com-max-overdueanalysis", OverdueAnalysis);
})();
