// Styles shared by both frames. Colours come from the host's --oc-* tokens,
// so light and dark themes follow the app.
export const BASE_STYLE = `
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .chart { position: relative; width: 100%; overflow: hidden; }
  .chart svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .chart-grid { stroke: var(--oc-border); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .5; fill: none; }
  .chart-cursor, .chart-dot, .chart-tip { position: absolute; pointer-events: none; opacity: 0; }
  .chart.hovering .chart-cursor, .chart.hovering .chart-dot, .chart.hovering .chart-tip { opacity: 1; }
  .chart-cursor { top: 0; bottom: 0; left: 0; width: 1px; background: var(--oc-border); }
  .chart-dot { top: -3px; left: -3px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 0 2px var(--oc-bg); }
  .chart-tip { top: 2px; padding: 1px 6px; border-radius: 4px; white-space: nowrap; font-size: 11px;
    background: var(--oc-elevated); color: var(--oc-elevated-fg); border: 1px solid var(--oc-border); font-variant-numeric: tabular-nums; }
  .port { display: inline-flex; align-items: center; height: 18px; padding: 0 6px; border-radius: 4px; font: 11px var(--oc-mono);
    background: color-mix(in srgb, var(--oc-primary) 14%, transparent); color: var(--oc-primary-text, var(--oc-primary)); }
`;

export const PANEL_STYLE = `
  html, body { height: 100%; overflow-y: auto; overflow-x: hidden; }
  #root { display: flex; flex-direction: column; gap: 14px; padding: 12px 12px 20px; }
  .head { display: flex; align-items: flex-start; gap: 8px; }
  .head .titles { min-width: 0; flex: 1; }
  .host-name { font-size: 13px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .host-meta { color: var(--oc-muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .live { display: inline-flex; align-items: center; gap: 6px; color: var(--oc-muted); font-size: 11px; white-space: nowrap; padding-top: 2px; }
  .live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--oc-success); }
  .live.stale::before { background: var(--oc-muted); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
  .card { min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 1px solid var(--oc-border);
    border-radius: var(--oc-radius); background: var(--oc-elevated); color: var(--oc-elevated-fg); }
  .card-top { display: flex; align-items: baseline; gap: 8px; }
  .label { font-size: 11px; font-weight: 600; letter-spacing: .02em; color: var(--oc-muted); text-transform: uppercase; }
  .big { font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -.01em; }
  .card-top .grow { flex: 1; }
  .sub { color: var(--oc-muted); font-size: 11px; }
  .stack { display: flex; height: 8px; border-radius: 4px; overflow: hidden; background: var(--oc-muted-surface, var(--oc-hover)); }
  .stack > span { height: 100%; transition: width .4s ease; }
  .stack > span + span { box-shadow: -1px 0 0 var(--oc-elevated); }
  .legend { display: flex; flex-direction: column; gap: 4px; }
  .legend-row { display: grid; grid-template-columns: 10px minmax(0, 1fr) auto auto; align-items: center; gap: 8px; }
  .legend-row .swatch { width: 8px; height: 8px; border-radius: 2px; }
  .legend-row .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .legend-row .value { text-align: right; min-width: 56px; }
  .section { display: flex; flex-direction: column; gap: 6px; }
  .section-head { display: flex; align-items: baseline; gap: 8px; padding: 0 2px; }
  .section-head .grow { flex: 1; }
  .empty { color: var(--oc-muted); padding: 10px 12px; border: 1px dashed var(--oc-border); border-radius: var(--oc-radius); }
  .servers { display: flex; flex-direction: column; border: 1px solid var(--oc-border); border-radius: var(--oc-radius); overflow: hidden; }
  .server { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 10px; padding: 8px 12px; }
  .server + .server { border-top: 1px solid var(--oc-border); }
  .server .title { display: flex; align-items: center; gap: 6px; min-width: 0; flex-wrap: wrap; }
  .server .title b { font-weight: 600; }
  .origin { font-size: 10px; padding: 0 5px; border-radius: 4px; line-height: 16px; border: 1px solid var(--oc-border); color: var(--oc-muted); }
  .server .stats { text-align: right; white-space: nowrap; }
  .server .command { grid-column: 1 / -1; color: var(--oc-muted); font: 11px var(--oc-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .table { border: 1px solid var(--oc-border); border-radius: var(--oc-radius); overflow: hidden; }
  .thead, details.group > summary, .proc { display: grid; grid-template-columns: minmax(0, 1fr) 60px 72px; align-items: center; column-gap: 8px; }
  .thead { padding: 6px 12px; color: var(--oc-muted); font-size: 11px; border-bottom: 1px solid var(--oc-border); }
  .cell { text-align: right; white-space: nowrap; }
  .quiet { color: var(--oc-muted); }
  details.group + details.group { border-top: 1px solid var(--oc-border); }
  details.group > summary { list-style: none; padding: 8px 12px; cursor: pointer; user-select: none; }
  details.group > summary::-webkit-details-marker { display: none; }
  details.group > summary:focus-visible { outline: 2px solid var(--oc-focus); outline-offset: -2px; }
  .gname { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .gname b { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .gname .count { color: var(--oc-muted); }
  .chevron { flex: none; width: 12px; height: 12px; color: var(--oc-muted); transition: transform .15s ease; }
  details.group[open] .chevron { transform: rotate(90deg); }
  .dot { flex: none; width: 6px; height: 6px; border-radius: 50%; }
  .rows { padding: 0 0 6px; }
  /* Names line up under the group name (past the chevron and dot), then step in per level. */
  .proc { padding: 4px 12px 4px calc(36px + var(--depth, 0) * 14px); }
  .who { display: flex; flex-direction: column; min-width: 0; }
  .pname { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pdetail { color: var(--oc-muted); font: 11px/1.35 var(--oc-mono); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .more { color: var(--oc-muted); padding: 4px 12px 2px 36px; }
  .banner { padding: 8px 12px; border-radius: var(--oc-radius); border: 1px solid color-mix(in srgb, var(--oc-warning) 40%, transparent);
    background: color-mix(in srgb, var(--oc-warning) 10%, transparent); color: var(--oc-warning-text, var(--oc-fg)); }
  .banner.error { border-color: color-mix(in srgb, var(--oc-error) 40%, transparent); background: color-mix(in srgb, var(--oc-error) 10%, transparent);
    color: var(--oc-error-text, var(--oc-fg)); }
  .footnote { color: var(--oc-muted); font-size: 11px; padding: 0 2px; }
  [hidden] { display: none !important; }
`;

export const STATUS_STYLE = `
  html, body { overflow: hidden; }
  #root { display: flex; flex-direction: column; gap: 6px; padding: 2px 0 4px; }
  .line { display: grid; grid-template-columns: 84px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; }
  .meter { position: relative; height: 4px; border-radius: 2px; background: var(--oc-muted-surface, var(--oc-hover)); overflow: hidden; }
  .meter > span { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 2px; transition: width .4s ease; }
  .ports { display: flex; flex-wrap: wrap; gap: 4px; min-width: 0; }
  .note { color: var(--oc-muted); }
  .note.error { color: var(--oc-error-text, var(--oc-fg)); }
  [hidden] { display: none !important; }
`;
