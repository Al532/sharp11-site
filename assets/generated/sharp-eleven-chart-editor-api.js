function v(e) {
  return e === void 0 ? void 0 : JSON.parse(JSON.stringify(e));
}
function u(e, r = "") {
  return typeof e == "string" ? e : e == null ? r : String(e);
}
function I(e, r = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : r;
}
function S(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function b(e) {
  return Array.isArray(e) ? e : [];
}
const F = "1.0.0";
function H(e = {}) {
  const r = S(e);
  return {
    ...v(r),
    id: u(r.id),
    title: u(r.title),
    composer: u(r.composer),
    primaryTimeSignature: u(r.primaryTimeSignature),
    barCount: I(r.barCount, 0)
  };
}
function Y(e = {}) {
  return {
    ...v(S(e))
  };
}
function Q(e = {}) {
  const r = S(e);
  return {
    ...v(r),
    id: u(r.id),
    label: u(r.label),
    occurrence: I(r.occurrence, 0),
    barIds: b(r.barIds).map((n) => u(n)).filter(Boolean)
  };
}
function V(e = {}) {
  const r = S(e);
  return {
    ...v(r),
    id: u(r.id),
    index: I(r.index, 0),
    sectionId: u(r.sectionId),
    sectionLabel: u(r.sectionLabel),
    timeSignature: r.timeSignature == null ? null : u(r.timeSignature),
    endings: b(r.endings),
    flags: b(r.flags).map((n) => u(n)).filter(Boolean),
    directives: b(r.directives),
    comments: b(r.comments).map((n) => u(n)).filter(Boolean),
    textAnnotations: b(r.textAnnotations)
  };
}
function E({
  metadata: e,
  source: r,
  sections: n,
  bars: t,
  layout: i = null
} = {}) {
  return {
    schemaVersion: F,
    metadata: H(e),
    source: Y(r),
    sections: b(n).map(Q),
    bars: b(t).map(V),
    layout: i == null ? null : v(i)
  };
}
function J(e) {
  return E(e);
}
const q = {
  "": "maj",
  "-": "m",
  "-#5": "mb6",
  "-^": "mMaj7",
  "-^7": "mMaj7",
  "-^9": "mMaj9",
  "-11": "m11",
  "-6": "m6",
  // Validate against iReal examples: inferred as minor 6/9.
  "-69": "m69",
  "-7": "m7",
  "-7b5": "m7b5",
  "-9": "m9",
  // Validate against iReal examples: inferred as minor add9.
  "-add9": "madd9",
  "-b6": "mb6",
  "^": "maj7",
  // Validate against iReal examples: ^ is a major-triangle family marker.
  "^13": "maj13",
  "^7": "maj7",
  "^7#11": "maj#11",
  // Validate against iReal examples: inferred as major seventh sharp five.
  "^7#5": "maj7#5",
  "^9": "maj9",
  "^9#11": "maj#11",
  "+": "aug",
  11: "9sus",
  13: "13",
  "13#11": "13#11",
  // Validate against iReal examples: dominant 13 with sharp nine.
  "13#9": "13#9",
  "13b9": "13b9",
  "13sus": "13sus",
  2: "2",
  5: "5",
  6: "6",
  69: "69",
  7: "7",
  "7#11": "13#11",
  "7#5": "7#5",
  "7#9": "7#9",
  "7#9#11": "7alt",
  "7#9#5": "7alt",
  "7#9b5": "7alt",
  "7alt": "7alt",
  "7b13": "7b9b13",
  // Validate against iReal examples: sus chord keeps b13, no b9 implied.
  "7b13sus": "7b13sus",
  "7b5": "7alt",
  "7b9": "7b9",
  "7b9#11": "7alt",
  "7b9#5": "7b9b13",
  "7b9#9": "7alt",
  "7b9b13": "7b9b13",
  "7b9b5": "7alt",
  "7b9sus": "7b9sus",
  "7sus": "9sus",
  // Validate against iReal examples: add3 means the third coexists with sus4.
  "7susadd3": "7susadd3",
  9: "9",
  "9#11": "9#11",
  "9#5": "9#5",
  // Validate against iReal examples: b5 is treated enharmonically as #11 here.
  "9b5": "9#11",
  "9sus": "9sus",
  add9: "add9",
  h: "m7b5",
  h7: "m7b5",
  h9: "m9b5",
  o: "dim7",
  "o^7": "dimMaj7",
  o7: "dim7",
  sus: "sus"
}, K = Object.freeze({
  kind: "dominant",
  third: "3",
  fifth: "5",
  seventh: "b7",
  extension: "7"
}), W = Object.freeze({
  maj: {
    kind: "major",
    third: "3",
    guideToneOverride: ["3", "5"],
    colorToneOverride: [],
    pianoShapeOverride: ["3", "5", "1", "3"]
  },
  m: {
    kind: "minor",
    third: "b3",
    guideToneOverride: ["b3", "5"],
    colorToneOverride: [],
    pianoShapeOverride: ["b3", "5", "1", "b3"]
  },
  m7: { kind: "minor", third: "b3", seventh: "b7", extension: "7", colorToneOverride: ["5", "b7"] },
  m9: { kind: "minor", third: "b3", seventh: "b7", extension: "9", colorToneOverride: ["5", "9"], pianoTopTone: "9" },
  m11: {
    kind: "minor",
    third: "b3",
    seventh: "b7",
    extension: "11",
    includeEleventh: !0,
    colorToneOverride: ["5", "9", "11"],
    pianoShapeOverride: ["b3", "b7", "9", "11"]
  },
  m6: {
    kind: "minor",
    third: "b3",
    sixthReplacesSeventh: !0,
    extension: "6",
    colorToneOverride: ["5", "9"],
    pianoTopTone: "9"
  },
  m69: {
    kind: "minor",
    third: "b3",
    sixthReplacesSeventh: !0,
    extension: "6/9",
    colorToneOverride: ["5", "9"],
    pianoTopTone: "9"
  },
  madd9: {
    kind: "minor",
    third: "b3",
    guideToneOverride: ["b3", "5"],
    colorToneOverride: ["9"],
    pianoShapeOverride: ["b3", "5", "9"]
  },
  mb6: {
    kind: "minor",
    third: "b3",
    seventh: "b6",
    colorToneOverride: ["5", "9"],
    pianoShapeDisabled: !0
  },
  mMaj7: {
    kind: "minor",
    third: "b3",
    seventh: "6",
    extension: "9",
    colorToneOverride: ["9", "5", "7"],
    pianoShapeOverride: ["b3", "5", "7", "9"]
  },
  mMaj9: {
    kind: "minor",
    third: "b3",
    seventh: "7",
    extension: "9",
    colorToneOverride: ["9", "5", "7"],
    pianoShapeOverride: ["b3", "5", "7", "9"]
  },
  maj7: { kind: "major", third: "3", seventh: "7", extension: "9", colorToneOverride: ["5", "9"], pianoTopTone: "9" },
  maj9: { kind: "major", third: "3", seventh: "7", extension: "9", colorToneOverride: ["5", "9"], pianoTopTone: "9" },
  maj13: {
    kind: "major",
    third: "3",
    seventh: "7",
    extension: "13",
    colorToneOverride: ["9", "13"],
    pianoShapeOverride: ["3", "13", "7", "9"]
  },
  "maj7#5": {
    kind: "major",
    third: "3",
    fifth: "#5",
    seventh: "7",
    extension: "9",
    colorToneOverride: ["#5", "9"],
    pianoBodyTone: "#5",
    pianoTopTone: "9"
  },
  6: {
    kind: "major",
    third: "3",
    sixthReplacesSeventh: !0,
    extension: "9",
    colorToneOverride: ["5", "9"],
    pianoTopTone: "9"
  },
  69: {
    kind: "major",
    third: "3",
    sixthReplacesSeventh: !0,
    extension: "9",
    colorToneOverride: ["5", "9"],
    pianoTopTone: "9"
  },
  add9: {
    kind: "major",
    third: "3",
    guideToneOverride: ["3", "5"],
    colorToneOverride: ["9"],
    pianoShapeOverride: ["1", "3", "5", "9"]
  },
  2: {
    kind: "other",
    guideToneOverride: ["1", "5"],
    colorToneOverride: ["9"],
    pianoShapeOverride: ["1", "5", "9", "1"]
  },
  5: {
    kind: "other",
    guideToneOverride: ["1", "5"],
    colorToneOverride: [],
    pianoShapeOverride: ["1", "5", "1", "5"]
  },
  sus: {
    kind: "other",
    guideToneOverride: ["4", "5"],
    colorToneOverride: ["1"],
    pianoShapeOverride: ["1", "4", "5", "1"]
  },
  aug: {
    kind: "other",
    guideToneOverride: ["3", "#5"],
    colorToneOverride: ["1"],
    pianoShapeOverride: ["1", "3", "#5", "1"]
  },
  m7b5: {
    kind: "minor",
    third: "b3",
    fifth: "b5",
    seventh: "b7",
    guideToneOverride: ["b5", "b7"],
    colorToneOverride: ["b3", "b7"]
  },
  m9b5: {
    kind: "minor",
    third: "b3",
    fifth: "b5",
    seventh: "b7",
    guideToneOverride: ["b5", "b7"],
    colorToneOverride: ["b3", "9"],
    pianoShapeOverride: ["b3", "b5", "b7", "9"]
  },
  dim7: {
    kind: "diminished",
    third: "b3",
    fifth: "b5",
    seventh: "bb7",
    colorToneOverride: ["b5"],
    pianoShapeOverride: ["b3", "b5", "6", "1"]
  },
  dimMaj7: {
    kind: "diminished",
    third: "b3",
    fifth: "b5",
    seventh: "7",
    guideToneOverride: ["b3", "7"],
    colorToneOverride: ["b5"],
    pianoShapeOverride: ["b3", "b5", "7", "1"]
  },
  "maj#11": {
    kind: "major",
    third: "3",
    fifth: "5",
    seventh: "7",
    extension: "13",
    includeEleventh: !0,
    guideToneOverride: ["3", "5"],
    colorToneOverride: ["9", "#11", "13"],
    pianoShapeOverride: ["3", "#11", "7", "9"]
  },
  7: { kind: "dominant", extension: "7", colorToneOverride: ["5", "b7"] },
  13: { kind: "dominant", extension: "13", pianoBodyTone: "13", pianoTopTone: "9" },
  9: { kind: "dominant", extension: "9", pianoTopTone: "9" },
  "7b9": { kind: "dominant", extension: "7", colorToneOverride: ["b9", "5"], pianoTopTone: "b9" },
  "7b9b13": {
    kind: "dominant",
    extension: "13",
    colorToneOverride: ["b9", "b13"],
    pianoBodyTone: "b13",
    pianoTopTone: "b9"
  },
  "7alt": {
    kind: "dominant",
    extension: "13",
    colorToneOverride: ["b9", "#9", "b13"],
    pianoShapeOverride: ["3", "b13", "b7", "#9"]
  },
  "13b9": { kind: "dominant", extension: "13", colorToneOverride: ["b9", "13"], pianoBodyTone: "13", pianoTopTone: "b9" },
  "13#11": {
    kind: "dominant",
    extension: "13",
    includeEleventh: !0,
    colorToneOverride: ["9", "6", "#11"],
    // Preserve the current piano sound: the #11 color is available to strings,
    // but the piano shape keeps the older 13/9 shell.
    pianoShapeOverride: ["3", "13", "b7", "9"]
  },
  "13#9": { kind: "dominant", extension: "13", colorToneOverride: ["#9", "13"], pianoShapeOverride: ["3", "13", "b7", "#9"] },
  "9#11": {
    kind: "dominant",
    extension: "9",
    includeEleventh: !0,
    colorToneOverride: ["9", "#11"],
    pianoShapeOverride: ["3", "#11", "b7", "9"]
  },
  "7#5": { kind: "dominant", extension: "9", fifth: "#5", colorToneOverride: ["9", "#5"], pianoBodyTone: "#5", pianoTopTone: "9" },
  "9#5": { kind: "dominant", extension: "9", fifth: "#5", colorToneOverride: ["9", "#5"], pianoBodyTone: "#5", pianoTopTone: "9" },
  "7#9": { kind: "dominant", extension: "7", colorToneOverride: ["#9", "b7"], pianoShapeOverride: ["3", "b7", "#9"] },
  "13sus": { kind: "dominant", sus: !0, extension: "13", pianoBodyTone: "13", pianoTopTone: "9" },
  "9sus": { kind: "dominant", sus: !0, extension: "9", pianoTopTone: "9" },
  "7susadd3": {
    kind: "dominant",
    extension: "7",
    guideToneOverride: ["3", "b7"],
    colorToneOverride: ["4", "5"],
    pianoShapeOverride: ["3", "4", "b7", "1"]
  },
  "7b13sus": {
    kind: "dominant",
    sus: !0,
    extension: "7",
    guideToneOverride: ["4", "b7"],
    colorToneOverride: ["5", "b13"],
    pianoShapeOverride: ["4", "b13", "b7", "1"]
  },
  "7b9sus": {
    kind: "dominant",
    sus: !0,
    extension: "7",
    guideToneOverride: ["b7"],
    colorToneOverride: ["4", "5", "b9"],
    pianoShapeOverride: ["4", "5", "b7", "b9"]
  }
});
function X(e) {
  return e.sus ? "4" : e.third || (e.kind === "minor" ? "b3" : "3");
}
function Z(e) {
  return e.fifth || "5";
}
function ee(e) {
  return e.sixthReplacesSeventh ? "6" : e.seventh || (e.kind === "major" ? "7" : "b7");
}
function re(e) {
  return e.extension === "13";
}
function k(e) {
  return e.guideToneOverride ? e.guideToneOverride.slice() : [X(e), ee(e)];
}
function ne(e) {
  if (e.colorToneOverride) return e.colorToneOverride.slice();
  const r = [];
  return (e.extension === "9" || e.extension === "11" || e.extension === "13") && r.push("9"), e.includeEleventh && r.push("11"), e.extension === "13" && r.push("13"), re(e) || r.push(Z(e)), r;
}
function te(e, r) {
  return e.length === r.length && e.every((n, t) => n === r[t]);
}
function oe(e = W) {
  const r = {
    dom: k(K)
  }, n = {}, t = {}, i = {};
  for (const [o, s] of Object.entries(e)) {
    const a = k(s), c = ne(s);
    s.kind === "dominant" ? (t[o] = c, te(a, r.dom) || (i[o] = a)) : (r[o] = a, n[o] = c);
  }
  return {
    GUIDE_TONES: r,
    COLOR_TONES: n,
    DOMINANT_COLOR_TONES: t,
    DOMINANT_GUIDE_TONES: i
  };
}
oe();
const M = Object.freeze({
  maj: ["maj", ""],
  m: ["m"],
  m7: ["m7"],
  m9: ["m9"],
  m11: ["m11"],
  m6: ["m6"],
  m69: ["m69", "m6/9"],
  madd9: ["madd9"],
  mb6: ["mb6"],
  mMaj7: ["mMaj7", "mmaj7"],
  mMaj9: ["mMaj9", "mmaj9"],
  maj7: ["maj7", "△7"],
  maj9: ["maj9", "△9", "triangle9"],
  maj13: ["maj13"],
  "maj7#5": ["maj7#5"],
  6: ["6"],
  69: ["69", "6/9"],
  add9: ["add9"],
  2: ["2"],
  5: ["5"],
  sus: ["sus"],
  aug: ["aug"],
  m7b5: ["m7b5", "o-slash7", "half-diminished", "halfdim", "halfdim7", "ø7"],
  m9b5: ["m9b5"],
  dim7: ["dim7", "dim", "°7"],
  dimMaj7: ["dimMaj7"],
  "maj#11": ["maj#11", "lyd", "maj7#11", "triangle#11", "△#11"],
  7: ["7"],
  13: ["13", "7mixo", "13mixo", "mixo"],
  9: ["9"],
  "7b9": ["7b9"],
  "7b9b13": ["7b9b13", "7b13"],
  "7alt": ["7alt", "alt", "13alt"],
  "13b9": ["13b9", "7oct", "oct", "13oct"],
  "13#11": ["13#11", "7#11", "7lyd", "13lyd"],
  "13#9": ["13#9"],
  "9#11": ["9#11"],
  "7#5": ["7#5", "13#5"],
  "9#5": ["9#5"],
  "7#9": ["7#9"],
  "13sus": ["13sus"],
  "9sus": ["9sus", "7sus"],
  "7susadd3": ["7susadd3"],
  "7b13sus": ["7b13sus"],
  "7b9sus": ["7b9sus", "13b9sus"]
}), B = [
  "7",
  "13",
  "9",
  "7b9",
  "7b9b13",
  "7alt",
  "13b9",
  "13#11",
  "13#9",
  "9#11",
  "7#5",
  "9#5",
  "7#9",
  "13sus",
  "9sus",
  "7susadd3",
  "7b13sus",
  "7b9sus"
], ie = Object.keys(M).filter((e) => !B.includes(e));
function A(e) {
  return Object.fromEntries(e.map((r) => [
    r,
    (M[r] || []).filter((n) => n !== r)
  ]));
}
const se = {
  // Canonical chord-quality names and every accepted textual input alias.
  CHORD_QUALITY_INPUT_ALIASES: M,
  // Compatibility views derived from CHORD_QUALITY_INPUT_ALIASES.
  DOMINANT_QUALITY_ALIASES: A(B),
  QUALITY_CATEGORY_ALIASES: A(ie)
}, T = "N.C.", R = "4/4", D = 120;
function f(e) {
  return e === void 0 ? e : JSON.parse(JSON.stringify(e));
}
function z(e) {
  return String(e ?? "").trim().toLowerCase().replace(/\s+/g, "");
}
function ae() {
  const e = /* @__PURE__ */ new Map(), r = (n, t) => {
    const i = z(n), o = String(t ?? "").trim();
    !i && !o || e.set(i, o);
  };
  return Object.entries(q || {}).forEach(([n, t]) => {
    r(n, t), r(t, t);
  }), Object.entries(se.CHORD_QUALITY_INPUT_ALIASES || {}).forEach(([n, t]) => {
    r(n, n), t.forEach((i) => r(i, n));
  }), e;
}
const ce = ae();
function _(e) {
  const r = String(e || "").trim();
  return r ? `${r.charAt(0).toUpperCase()}${r.slice(1)}` : "";
}
function de(e, r) {
  let n = Math.abs(e), t = Math.abs(r);
  for (; t; ) {
    const i = n % t;
    n = t, t = i;
  }
  return n || 1;
}
function le(e, r) {
  return Math.max(1, Math.floor(e * r / de(e, r)));
}
function ue(e) {
  return String(e || "").trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "chart";
}
function me(e, r = []) {
  const n = new Set(Array.from(r).map((i) => String(i || "").trim()).filter(Boolean)), t = `user-chart-${ue(e)}`;
  if (!n.has(t)) return t;
  for (let i = 2; i < 1e4; i += 1) {
    const o = `${t}-${i}`;
    if (!n.has(o)) return o;
  }
  return `${t}-${Date.now()}`;
}
function P(e, r = []) {
  return E({
    metadata: {
      id: me(e, r),
      title: String(e || "").trim() || "Untitled chart",
      composer: "",
      sourceKey: "",
      primaryTimeSignature: R,
      tempo: D,
      barCount: 0
    },
    source: {},
    sections: [],
    bars: [],
    layout: {
      systems: {
        cellsPerRow: 16,
        rows: []
      }
    }
  });
}
function he(e, r, n, t) {
  const i = String(e || "").trim();
  if (!i) return null;
  if (/^(?:N\.C\.|NC)$/i.test(i))
    return {
      symbol: T,
      root: T,
      quality: "",
      bass: null,
      isNoChord: !0
    };
  const o = i.match(/^([A-Ga-g](?:b|#)?)(.*?)(?:\/([A-Ga-g](?:b|#)?))?$/);
  if (!o)
    return t.push({
      severity: "error",
      line: r,
      column: n,
      message: `Unknown chord token "${i}".`
    }), null;
  const [, s, a = "", c = ""] = o, m = _(s), d = _(c), l = ce.get(z(a));
  return l === void 0 ? (t.push({
    severity: "error",
    line: r,
    column: n + s.length,
    message: `Unknown chord quality "${a}" in "${i}".`
  }), null) : {
    symbol: `${m}${l}${d ? `/${d}` : ""}`,
    root: m,
    quality: l,
    bass: d || null
  };
}
function pe(e, r, n, t) {
  const i = [];
  let o = 0;
  for (; o < e.length; ) {
    const s = e[o];
    if (/\s/.test(s)) {
      o += 1;
      continue;
    }
    if (s === "(") {
      const c = e.indexOf(")", o + 1);
      if (c < 0) {
        t.push({
          severity: "error",
          line: r,
          column: n + o + 1,
          message: "Missing closing parenthesis."
        });
        break;
      }
      i.push({
        raw: e.slice(o + 1, c).trim(),
        column: n + o + 1,
        group: !0
      }), o = c + 1;
      continue;
    }
    if (s === ")") {
      t.push({
        severity: "error",
        line: r,
        column: n + o + 1,
        message: "Unexpected closing parenthesis."
      }), o += 1;
      continue;
    }
    let a = o + 1;
    for (; a < e.length && !/\s|\(|\)/.test(e[a]); ) a += 1;
    i.push({
      raw: e.slice(o, a),
      column: n + o + 1,
      group: !1
    }), o = a;
  }
  return i;
}
function be(e, r, n, t) {
  const i = pe(e, r, n, t), o = i.find((d) => d.raw.trim() === "%");
  if (o)
    return o.group || i.length > 1 ? (t.push({
      severity: "error",
      line: r,
      column: o.column,
      message: "The repeat sign % must be alone in its measure."
    }), { tokens: [] }) : {
      tokens: [{
        kind: "repeat_previous_bar",
        symbol: "%",
        sourceCellIndex: 0,
        sourceCellCount: 4,
        chartTextEventIndex: 0,
        chartTextGroupSize: 1,
        chartTextGroupIndex: 0
      }]
    };
  const s = i.map((d) => {
    const l = d.group ? d.raw.split(/\s+/).map((h) => h.trim()).filter(Boolean) : [d.raw];
    return d.group && l.length === 0 && t.push({
      severity: "error",
      line: r,
      column: d.column,
      message: "Empty subdivision group."
    }), {
      chords: l.map((h, p) => he(h, r, d.column + (d.group ? d.raw.indexOf(h) + 1 : 0), t)).filter((h) => !!h),
      column: d.column,
      groupSize: Math.max(1, l.length)
    };
  }).filter((d) => d.chords.length > 0), a = s.reduce((d, l) => le(d, l.groupSize), 1), c = Math.max(1, s.length * a), m = [];
  return s.forEach((d, l) => {
    const g = Math.max(1, a / Math.max(1, d.chords.length));
    d.chords.forEach((h, p) => {
      m.push({
        ...h,
        sourceCellIndex: Math.min(c - 1, l * a + Math.floor(p * g)),
        sourceCellCount: c,
        chartTextEventIndex: l,
        chartTextGroupSize: d.chords.length,
        chartTextGroupIndex: p
      });
    });
  }), { tokens: m };
}
function fe(e) {
  const r = [];
  let n = 0, t = 0;
  for (let i = 0; i <= e.length; i += 1) {
    const o = e[i] || "|";
    if (o === "(" && (t += 1), o === ")" && (t = Math.max(0, t - 1)), o !== "|" || t > 0) continue;
    const s = e.slice(n, i).trim();
    if (s) {
      const a = e.slice(n, i).search(/\S/);
      r.push({
        content: s,
        column: n + Math.max(0, a) + 1
      });
    } else n > 0 && i < e.length && r.push({
      content: "",
      column: n + 1
    });
    n = i + 1;
  }
  return r;
}
function Te(e) {
  const r = [], n = String(e || "").replace(/\r\n?/g, `
`).split(`
`).map((t, i) => ({ measures: fe(t).map((s) => be(s.content, i + 1, s.column - 1, r)) })).filter((t) => t.measures.length > 0);
  return n.length === 0 && r.push({
    severity: "error",
    line: 1,
    column: 1,
    message: "Enter at least one measure."
  }), { lines: n, diagnostics: r };
}
function ge(e, r) {
  const n = {
    ...r ? f(r) : {},
    kind: "chord",
    symbol: e.symbol,
    root: e.root,
    quality: e.quality,
    bass: e.bass,
    sourceCellIndex: e.sourceCellIndex,
    sourceCellCount: e.sourceCellCount,
    chartTextEventIndex: e.chartTextEventIndex,
    chartTextGroupSize: e.chartTextGroupSize,
    chartTextGroupIndex: e.chartTextGroupIndex
  };
  return e.isNoChord && (n.symbol = T, n.root = T, n.quality = "", n.bass = null), n;
}
function ve(e) {
  return {
    kind: "repeat_previous_bar",
    symbol: "%",
    sourceCellIndex: 0,
    sourceCellCount: Math.max(1, e),
    chartTextEventIndex: 0,
    chartTextGroupSize: 1,
    chartTextGroupIndex: 0
  };
}
function Se(e) {
  return e.tokens.length === 1 && e.tokens[0]?.kind === "repeat_previous_bar";
}
function N(e, r) {
  const n = Array.from({ length: Math.max(1, r) }, () => ({
    bars: "",
    annots: [],
    comments: [],
    spacer: 0,
    chord: null
  }));
  return e.forEach((t) => {
    const i = Math.max(0, Math.min(n.length - 1, Number(t.sourceCellIndex || 0)));
    n[i] = {
      ...n[i],
      chord: {
        symbol: t.symbol,
        root: t.root,
        modifier: t.quality,
        bass: t.bass,
        display_prefix: t.displayPrefix || ""
      }
    };
  }), n;
}
function Oe(e, r) {
  const n = Number(e);
  return Number.isFinite(n) ? n : r + 1;
}
function xe(e, r, n) {
  const t = Array.isArray(e.sections) ? e.sections : [];
  if (r?.sectionId) {
    const o = t.find((s) => s.id === r.sectionId);
    if (o) return o;
  }
  const i = t.find((o) => r?.id && o.barIds?.includes(r.id));
  return i || t[Math.min(Math.max(0, n), Math.max(0, t.length - 1))] || null;
}
function ye(e, r) {
  const t = (Array.isArray(e.sections) && e.sections.length ? e.sections : [{ id: "section-1", label: "", occurrence: 1, barIds: [] }]).map((o) => ({
    ...f(o),
    barIds: []
  })), i = new Map(t.map((o) => [o.id, o]));
  return r.forEach((o, s) => {
    const a = e.bars?.[s] || null, c = xe(e, a, s), m = c && i.get(c.id) || t[t.length - 1];
    m && (m.barIds.push(o.id), o.sectionId = m.id, o.sectionLabel = String(m.label || ""));
  }), t.filter((o) => o.barIds.length > 0);
}
function Ce(e, r, n, {
  resetLayoutStartCellIndex: t = !0,
  previousBar: i = null
} = {}) {
  const o = r || {}, s = Array.isArray(o?.notation?.tokens) ? o.notation.tokens : [], a = Se(e), c = i?.playback || null, m = i?.notation || null, d = Math.max(
    1,
    Number(
      c?.cellSlots?.length || m?.tokens?.find((p) => Number.isInteger(p?.sourceCellCount))?.sourceCellCount || e.tokens[0]?.sourceCellCount || 4
    )
  ), l = a ? [ve(d)] : e.tokens.map((p, G) => ge(p, s[G])), g = Math.max(1, Number(l[0]?.sourceCellCount || 1)), h = {
    ...f(o),
    id: String(o.id || `bar-${n + 1}`),
    index: t ? n + 1 : Oe(o.index, n),
    notation: {
      kind: a ? "single_bar_repeat" : l.length === 1 && l[0].symbol === T ? "no_chord" : "written",
      tokens: l
    },
    playback: {
      ...o.playback ? f(o.playback) : {},
      slots: a ? f(c?.slots || []) : l.filter((p) => p.symbol !== T),
      cellSlots: a ? f(c?.cellSlots || N([], g)) : N(l, g)
    }
  };
  return t && (h.layoutStartCellIndex = null), h;
}
function Ie(e, r) {
  const n = e.flatMap((i) => i.measures), t = [];
  return n.forEach((i, o) => {
    t.push(Ce(i, r.bars?.[o], o, {
      previousBar: t[o - 1] || r.bars?.[o - 1] || null
    }));
  }), t;
}
function Ee(e, r, n) {
  let t = 0;
  const i = e.map((s) => {
    const a = r.slice(t, t + s.measures.length);
    return t += s.measures.length, {
      barIds: a.map((c) => c.id)
    };
  }).filter((s) => s.barIds.length > 0), o = Math.max(1, ...i.map((s) => s.barIds.length));
  return {
    ...n ? f(n) : {},
    systems: {
      ...n?.systems && typeof n.systems == "object" ? f(n.systems) : {},
      cellsPerRow: o * 4,
      rows: i
    }
  };
}
function Me(e, r) {
  const n = J(r || P("Untitled chart")), { lines: t, diagnostics: i } = Te(e);
  if (i.some((a) => a.severity === "error"))
    return {
      documentDraft: n,
      diagnostics: i
    };
  const o = Ie(t, n), s = ye(n, o);
  return {
    documentDraft: E({
      ...n,
      metadata: {
        ...n.metadata,
        primaryTimeSignature: n.metadata?.primaryTimeSignature || R,
        tempo: Number(n.metadata?.tempo || 0) > 0 ? Number(n.metadata.tempo) : D,
        barCount: o.length
      },
      sections: s,
      bars: o,
      layout: Ee(t, o, n.layout)
    }),
    diagnostics: i
  };
}
function je(e, r = []) {
  const n = String(e?.title || "").trim() || "Untitled chart", t = P(n, r), i = Me(String(e?.text || ""), t);
  return i.diagnostics.some((o) => o.severity === "error") ? {
    document: null,
    diagnostics: i.diagnostics
  } : {
    document: i.documentDraft,
    diagnostics: i.diagnostics
  };
}
const j = 1, ke = "io.github.al532.sharpelevenapp", Ae = "chart-import", y = "lzw1.", C = "json1.";
function $(e) {
  const r = e && typeof e == "object" ? e : {};
  return {
    version: j,
    title: String(r.title || "").trim() || "Untitled chart",
    text: String(r.text || "").replace(/\r\n?/g, `
`)
  };
}
function _e() {
  return new TextEncoder();
}
function Ne() {
  return new TextDecoder();
}
function w(e) {
  if (typeof Buffer < "u")
    return Buffer.from(e).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  let r = "";
  const n = 32768;
  for (let t = 0; t < e.length; t += n)
    r += String.fromCharCode(...e.slice(t, t + n));
  return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function O(e) {
  const r = String(e || "").replace(/-/g, "+").replace(/_/g, "/"), n = `${r}${"=".repeat((4 - r.length % 4) % 4)}`;
  if (typeof Buffer < "u")
    return new Uint8Array(Buffer.from(n, "base64"));
  const t = atob(n), i = new Uint8Array(t.length);
  for (let o = 0; o < t.length; o += 1)
    i[o] = t.charCodeAt(o);
  return i;
}
function U(e) {
  return _e().encode(e);
}
function x(e) {
  return Ne().decode(e);
}
function we(e) {
  if (e.length === 0) return [];
  const r = /* @__PURE__ */ new Map();
  for (let o = 0; o < 256; o += 1)
    r.set(String.fromCharCode(o), o);
  let n = String.fromCharCode(e[0]), t = 256;
  const i = [];
  for (let o = 1; o < e.length; o += 1) {
    const s = String.fromCharCode(e[o]), a = n + s;
    if (r.has(a)) {
      n = a;
      continue;
    }
    i.push(r.get(n)), t <= 65535 && (r.set(a, t), t += 1), n = s;
  }
  return i.push(r.get(n)), i;
}
function Ue(e) {
  if (e.length === 0) return new Uint8Array();
  const r = /* @__PURE__ */ new Map();
  for (let s = 0; s < 256; s += 1)
    r.set(s, String.fromCharCode(s));
  let n = 256, t = r.get(e[0]);
  if (t === void 0) throw new Error("Invalid compressed chart payload.");
  let i = t;
  for (let s = 1; s < e.length; s += 1) {
    const a = e[s];
    let c = r.get(a);
    if (c === void 0) {
      if (a !== n) throw new Error("Invalid compressed chart payload.");
      c = t + t.charAt(0);
    }
    i += c, n <= 65535 && (r.set(n, t + c.charAt(0)), n += 1), t = c;
  }
  const o = new Uint8Array(i.length);
  for (let s = 0; s < i.length; s += 1)
    o[s] = i.charCodeAt(s) & 255;
  return o;
}
function Be(e) {
  const r = new Uint8Array(e.length * 2);
  return e.forEach((n, t) => {
    if (n < 0 || n > 65535) throw new Error("Compressed chart payload is too large.");
    r[t * 2] = n >> 8 & 255, r[t * 2 + 1] = n & 255;
  }), r;
}
function Re(e) {
  if (e.length % 2 !== 0) throw new Error("Invalid compressed chart payload.");
  const r = [];
  for (let n = 0; n < e.length; n += 2)
    r.push(e[n] << 8 | e[n + 1]);
  return r;
}
function De(e) {
  return JSON.stringify({
    version: j,
    title: e.title,
    text: e.text
  });
}
function L(e) {
  const r = $(e), n = De(r), t = `${C}${w(U(n))}`;
  try {
    const i = Be(we(U(n))), o = `${y}${w(i)}`;
    return o.length < t.length ? o : t;
  } catch {
    return t;
  }
}
function $e(e) {
  const r = String(e || "").trim();
  if (!r)
    return { payload: null, errorMessage: "Missing chart payload." };
  try {
    let n = "";
    if (r.startsWith(y)) {
      const o = O(r.slice(y.length));
      n = x(Ue(Re(o)));
    } else r.startsWith(C) ? n = x(O(r.slice(C.length))) : n = x(O(r));
    const t = JSON.parse(n);
    if (Number(t.version) !== j)
      return { payload: null, errorMessage: "Unsupported chart payload version." };
    const i = $(t);
    return i.text.trim() ? { payload: i, errorMessage: "" } : { payload: null, errorMessage: "The shared chart is empty." };
  } catch (n) {
    return {
      payload: null,
      errorMessage: n instanceof Error ? n.message : "Invalid chart payload."
    };
  }
}
function ze(e, {
  scheme: r = ke
} = {}) {
  const n = L(e);
  return `${r}://${Ae}?payload=${encodeURIComponent(n)}`;
}
function Pe(e = {}) {
  return {
    version: 1,
    title: String(e.title || "").trim() || "Untitled chart",
    text: String(e.text || "").replace(/\r\n?/g, `
`)
  };
}
function Le(e = {}) {
  const r = Pe(e), n = je(r), t = !n.diagnostics.some((i) => i.severity === "error") && !!n.document;
  return {
    ok: t,
    title: r.title,
    barCount: n.document?.bars?.length || 0,
    diagnostics: n.diagnostics.map((i) => ({
      severity: i.severity,
      line: i.line,
      column: i.column,
      message: i.message
    })),
    encodedPayload: t ? L(r) : "",
    importUrl: t ? ze(r) : ""
  };
}
export {
  ze as createChartTextImportDeepLink,
  $e as decodeChartTextSharePayload,
  L as encodeChartTextSharePayload,
  Le as validateChartTextForSite
};
