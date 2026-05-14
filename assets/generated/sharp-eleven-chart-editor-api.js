function Y(e, t = "") {
  return `${String(e || "").toUpperCase()}${t || ""}`;
}
function le(e) {
  return String(e || "").replace(/\u266d[\ufe0e\ufe0f]?/g, "b").replace(/\u266f[\ufe0e\ufe0f]?/g, "#").replace(/\u2013|\u2014/g, "-").trim();
}
function me(e) {
  const t = le(e), r = t.match(/^@key(?:\s*[:=])?\s+([A-Ga-g])([b#]?)(?:-|m)?(?:\s*\|\s*|\s+|$)(.*)$/s);
  if (r)
    return {
      body: String(r[3] || "").trim(),
      keyName: Y(r[1] || "", r[2] || ""),
      hasKeyTag: !0,
      legacyKeyTag: !1,
      errorMessage: null
    };
  const n = t.match(/^@([A-Ga-g])([b#]?)(?:-|m)?(?:\s*\|\s*|\s+|$)(.*)$/s);
  return n ? {
    body: String(n[3] || "").trim(),
    keyName: Y(n[1] || "", n[2] || ""),
    hasKeyTag: !0,
    legacyKeyTag: !1,
    errorMessage: null
  } : /^key\s*(?::|=)/i.test(t) ? {
    body: t,
    keyName: null,
    hasKeyTag: !0,
    legacyKeyTag: !0,
    errorMessage: "Use @key C or @C for key overrides."
  } : {
    body: t,
    keyName: null,
    hasKeyTag: !1,
    legacyKeyTag: !1,
    errorMessage: null
  };
}
function x(e) {
  return e === void 0 ? e : JSON.parse(JSON.stringify(e));
}
function f(e, t = "") {
  return typeof e == "string" ? e : e == null ? t : String(e);
}
function R(e, t = 0) {
  const r = Number(e);
  return Number.isFinite(r) ? r : t;
}
function C(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function g(e) {
  return Array.isArray(e) ? e : [];
}
const he = "1.0.0";
function fe(e = {}) {
  const t = C(e);
  return {
    ...x(t),
    id: f(t.id),
    title: f(t.title),
    composer: f(t.composer),
    primaryTimeSignature: f(t.primaryTimeSignature),
    barCount: R(t.barCount, 0)
  };
}
function pe(e = {}) {
  return {
    ...x(C(e))
  };
}
function be(e = {}) {
  const t = C(e);
  return {
    ...x(t),
    id: f(t.id),
    label: f(t.label),
    occurrence: R(t.occurrence, 0),
    barIds: g(t.barIds).map((r) => f(r)).filter(Boolean)
  };
}
function ge(e = {}) {
  const t = C(e);
  return {
    ...x(t),
    id: f(t.id),
    index: R(t.index, 0),
    sectionId: f(t.sectionId),
    sectionLabel: f(t.sectionLabel),
    timeSignature: t.timeSignature == null ? null : f(t.timeSignature),
    endings: g(t.endings),
    flags: g(t.flags).map((r) => f(r)).filter(Boolean),
    directives: g(t.directives),
    comments: g(t.comments).map((r) => f(r)).filter(Boolean),
    textAnnotations: g(t.textAnnotations)
  };
}
function ye(e = {}, t = 0) {
  const r = C(e), n = f(r.kind).trim(), s = C(r.anchor), o = f(s.beforeBarId).trim(), i = f(s.afterBarId).trim(), c = f(s.barId).trim();
  return !n || !o && !i && !c ? null : {
    ...x(r),
    id: f(r.id, `boundary-${t + 1}`),
    kind: n,
    anchor: {
      ...x(s),
      type: f(s.type, "boundary"),
      ...o ? { beforeBarId: o } : {},
      ...i ? { afterBarId: i } : {},
      ...c && !o && !i ? { barId: c } : {}
    }
  };
}
function $({
  metadata: e,
  source: t,
  sections: r,
  bars: n,
  boundaryEvents: s,
  layout: o = null
} = {}) {
  const i = g(s).map((c, d) => ye(c, d)).filter((c) => !!c);
  return {
    schemaVersion: he,
    metadata: fe(e),
    source: pe(t),
    sections: g(r).map(be),
    bars: g(n).map(ge),
    ...i.length ? { boundaryEvents: i } : {},
    layout: o == null ? null : x(o)
  };
}
function Se(e) {
  return $(e);
}
const l = Object.freeze({
  codaStart: "coda_start",
  toCoda: "to_coda",
  segno: "segno",
  fine: "fine",
  dcAlCoda: "dc_al_coda",
  dsAlCoda: "ds_al_coda",
  dcAlFine: "dc_al_fine",
  dsAlFine: "ds_al_fine",
  dcAlEnding: "dc_al_ending",
  dsAlEnding: "ds_al_ending",
  dcOnCue: "dc_on_cue",
  repeatHint: "repeat_hint"
});
l.dcAlCoda, l.dsAlCoda, l.dcAlFine, l.dsAlFine, l.dcAlEnding, l.dsAlEnding, l.dcOnCue;
function Te(e) {
  return e === void 0 ? e : JSON.parse(JSON.stringify(e));
}
function xe(e, t = "") {
  return typeof e == "string" ? e : e == null ? t : String(e);
}
function ve(e, t, r) {
  return `${e}-${t}-${r + 1}`.replace(/[^\w-]+/g, "-");
}
function Ce({
  kind: e,
  beforeBarId: t = "",
  afterBarId: r = "",
  data: n = {},
  index: s = 0
}) {
  const o = t || r;
  return {
    ...Te(n),
    id: xe(n.id, ve(e, o, s)),
    kind: e,
    anchor: {
      type: "boundary",
      ...t ? { beforeBarId: t } : {},
      ...r ? { afterBarId: r } : {}
    }
  };
}
const Oe = {
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
  "7#11": "7#11",
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
  "7sus": "7sus",
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
}, Ee = Object.freeze({
  kind: "dominant",
  third: "3",
  fifth: "5",
  seventh: "b7",
  extension: "7"
}), Ie = Object.freeze(["9", "b9", "#9"]), N = Object.freeze(["b13", "13", "#11"]), ke = Object.freeze({
  maj: {
    kind: "major",
    third: "3",
    guideToneOverride: ["3", "5"],
    pianoShapeOverride: ["3", "5", "1", "3"]
  },
  m: {
    kind: "minor",
    third: "b3",
    guideToneOverride: ["b3", "5"],
    pianoShapeOverride: ["b3", "5", "1", "b3"]
  },
  m7: { kind: "minor", third: "b3", seventh: "b7", extension: "7" },
  m9: { kind: "minor", third: "b3", seventh: "b7", extension: "9" },
  m11: {
    kind: "minor",
    third: "b3",
    seventh: "b7",
    extension: "11",
    includeEleventh: !0,
    pianoShapeOverride: ["b3", "b7", "9", "11"]
  },
  m6: {
    kind: "minor",
    third: "b3",
    sixthReplacesSeventh: !0,
    extension: "6",
    colorToneOverride: ["5", "9"]
  },
  m69: {
    kind: "minor",
    third: "b3",
    sixthReplacesSeventh: !0,
    extension: "6/9",
    colorToneOverride: ["5", "9"]
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
    extension: "9"
  },
  maj7: { kind: "major", third: "3", seventh: "7", extension: "9" },
  maj9: { kind: "major", third: "3", seventh: "7", extension: "9" },
  maj13: {
    kind: "major",
    third: "3",
    seventh: "7",
    extension: "13"
  },
  "maj7#5": {
    kind: "major",
    third: "3",
    fifth: "#5",
    seventh: "7",
    extension: "9"
  },
  6: {
    kind: "major",
    third: "3",
    sixthReplacesSeventh: !0,
    extension: "9"
  },
  69: {
    kind: "major",
    third: "3",
    sixthReplacesSeventh: !0,
    extension: "9"
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
    pianoShapeOverride: ["1", "5", "1", "5"]
  },
  sus: {
    kind: "other",
    guideToneOverride: ["4", "5"],
    pianoShapeOverride: ["1", "4", "5", "1"]
  },
  aug: {
    kind: "other",
    guideToneOverride: ["3", "#5"],
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
    colorToneOverride: ["b3", "9"]
  },
  dim7: {
    kind: "diminished",
    third: "b3",
    fifth: "b5",
    seventh: "bb7",
    pianoShapeOverride: ["b3", "b5", "6", "1"]
  },
  dimMaj7: {
    kind: "diminished",
    third: "b3",
    fifth: "b5",
    seventh: "7",
    guideToneOverride: ["b3", "7"]
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
  7: { kind: "dominant", extension: "7" },
  13: { kind: "dominant", extension: "13" },
  9: { kind: "dominant", extension: "9" },
  "7b9": { kind: "dominant", extension: "7", colorToneOverride: ["b9", "5"] },
  "7b9b13": {
    kind: "dominant",
    extension: "13",
    colorToneOverride: ["b9", "b13"]
  },
  "7alt": {
    kind: "dominant",
    extension: "13",
    colorToneOverride: ["b9", "#9", "b13"],
    pianoShapeOverride: ["3", "b13", "b7", "#9"]
  },
  "13b9": { kind: "dominant", extension: "13", colorToneOverride: ["b9", "13"] },
  "13#11": {
    kind: "dominant",
    extension: "13",
    includeEleventh: !0,
    colorToneOverride: ["9", "6", "#11"],
    // Preserve the current piano sound: the #11 color is available to strings,
    // but the piano shape keeps the older 13/9 shell.
    pianoShapeOverride: ["3", "13", "b7", "9"]
  },
  "13#9": { kind: "dominant", extension: "13", colorToneOverride: ["#9", "13"] },
  "9#11": { kind: "dominant", extension: "9", includeEleventh: !0, colorToneOverride: ["9", "#11"] },
  "7#11": { kind: "dominant", extension: "7", includeEleventh: !0, colorToneOverride: ["#11"] },
  "7#5": { kind: "dominant", extension: "9", fifth: "#5" },
  "9#5": { kind: "dominant", extension: "9", fifth: "#5" },
  "7#9": { kind: "dominant", extension: "7", colorToneOverride: ["#9", "b7"], pianoShapeOverride: ["3", "b7", "#9"] },
  "7sus": { kind: "dominant", sus: !0, extension: "7" },
  "13sus": { kind: "dominant", sus: !0, extension: "13" },
  "9sus": { kind: "dominant", sus: !0, extension: "9" },
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
    colorToneOverride: ["5", "b13"]
  },
  "7b9sus": {
    kind: "dominant",
    sus: !0,
    extension: "7",
    guideToneOverride: ["b7"],
    colorToneOverride: ["4", "5", "b9"]
  }
});
function _e(e) {
  return e.sus ? "4" : e.third || (e.kind === "minor" ? "b3" : "3");
}
function Z(e) {
  return e.fifth || "5";
}
function J(e) {
  return e.sixthReplacesSeventh ? "6" : e.seventh || (e.kind === "major" ? "7" : "b7");
}
function Ae(e) {
  return I([
    ...ee(e),
    ...e.colorToneOverride || []
  ], N);
}
function j(e) {
  if (e.guideToneOverride) return e.guideToneOverride.slice();
  const t = [_e(e), J(e)], r = Z(e);
  if (!Ae(e) || !t.includes(r))
    return t;
  const n = t.filter((s) => s !== r);
  return w(n, J(e)), n;
}
function I(e, t) {
  const r = new Set(e);
  return t.some((n) => r.has(n));
}
function w(e, t) {
  e.includes(t) || e.push(t);
}
function Me(e, t) {
  return e.filter((r) => r !== t);
}
function ee(e) {
  const t = [];
  return (e.extension === "9" || e.extension === "11" || e.extension === "13") && t.push("9"), e.includeEleventh && t.push("11"), e.extension === "13" && t.push("13"), t;
}
function Ne(e) {
  const t = j(e);
  let r = [...new Set(e.colorToneOverride || ee(e))].filter((o) => !t.includes(o));
  const n = () => [...t, ...r], s = Z(e);
  return I(n(), N) && (r = Me(r, s)), !I(n(), Ie) && !t.includes("1") && w(r, "1"), !I(n(), N) && !t.includes(s) && w(r, s), r;
}
function je(e, t) {
  return e.length === t.length && e.every((r, n) => r === t[n]);
}
function we(e = ke) {
  const t = {
    dom: j(Ee)
  }, r = t.dom || [], n = {}, s = {}, o = {};
  for (const [i, c] of Object.entries(e)) {
    const d = j(c), u = Ne(c);
    c.kind === "dominant" ? (s[i] = u, je(d, r) || (o[i] = d)) : (t[i] = d, n[i] = u);
  }
  return {
    GUIDE_TONES: t,
    COLOR_TONES: n,
    DOMINANT_COLOR_TONES: s,
    DOMINANT_GUIDE_TONES: o
  };
}
we();
const z = Object.freeze({
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
  "13#11": ["13#11", "13lyd"],
  "13#9": ["13#9"],
  "9#11": ["9#11"],
  "7#11": ["7#11", "7lyd"],
  "7#5": ["7#5", "13#5"],
  "9#5": ["9#5"],
  "7#9": ["7#9"],
  "7sus": ["7sus"],
  "13sus": ["13sus"],
  "9sus": ["9sus"],
  "7susadd3": ["7susadd3"],
  "7b13sus": ["7b13sus"],
  "7b9sus": ["7b9sus", "13b9sus"]
}), te = [
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
  "7#11",
  "7#5",
  "9#5",
  "7#9",
  "7sus",
  "13sus",
  "9sus",
  "7susadd3",
  "7b13sus",
  "7b9sus"
], Be = Object.keys(z).filter((e) => !te.includes(e));
function Q(e) {
  return Object.fromEntries(e.map((t) => [
    t,
    (z[t] || []).filter((r) => r !== t)
  ]));
}
const Ue = {
  // Canonical chord-quality names and every accepted textual input alias.
  CHORD_QUALITY_INPUT_ALIASES: z,
  // Compatibility views derived from CHORD_QUALITY_INPUT_ALIASES.
  DOMINANT_QUALITY_ALIASES: Q(te),
  QUALITY_CATEGORY_ALIASES: Q(Be)
}, O = "N.C.", P = "4/4", re = 120, Re = "@", $e = /^@(\d+\/4)$/;
function T(e) {
  return e === void 0 ? e : JSON.parse(JSON.stringify(e));
}
function ze(e) {
  return String(e || "").trim().toLowerCase().replace(/^@/, "").replace(/\s+/g, "-").replace(/_/g, "-");
}
function Pe(e, t, r, n) {
  const s = String(e || "").trim();
  if (!s.startsWith(Re)) return null;
  const o = ze(s), i = o.match(/^(\d+)x$/);
  if (i)
    return {
      kind: l.repeatHint,
      text: s,
      column: r,
      times: Math.max(2, Number(i[1]))
    };
  const c = o.match(/^(dc|ds)-al-(\d+)(?:st|nd|rd|th)?-ending$/);
  if (c)
    return {
      kind: c[1] === "dc" ? l.dcAlEnding : l.dsAlEnding,
      text: s,
      column: r,
      ending: Number(c[2])
    };
  const d = {
    coda: l.codaStart,
    "coda-start": l.codaStart,
    "to-coda": l.toCoda,
    segno: l.segno,
    fine: l.fine,
    "dc-al-coda": l.dcAlCoda,
    "ds-al-coda": l.dsAlCoda,
    "dc-al-fine": l.dcAlFine,
    "ds-al-fine": l.dsAlFine,
    "dc-on-cue": l.dcOnCue
  }[o];
  return d ? { kind: d, text: s, column: r } : (n.push({
    severity: "error",
    line: t,
    column: r,
    message: `Unknown boundary marker "${s}".`
  }), null);
}
function ne(e) {
  return String(e ?? "").trim().toLowerCase().replace(/\s+/g, "");
}
function De() {
  const e = /* @__PURE__ */ new Map(), t = (r, n) => {
    const s = ne(r), o = String(n ?? "").trim();
    !s && !o || e.set(s, o);
  };
  return Object.entries(Oe || {}).forEach(([r, n]) => {
    t(r, n), t(n, n);
  }), Object.entries(Ue.CHORD_QUALITY_INPUT_ALIASES || {}).forEach(([r, n]) => {
    t(r, r), n.forEach((s) => t(s, r));
  }), e;
}
const Le = De();
function V(e) {
  const t = String(e || "").trim();
  return t ? `${t.charAt(0).toUpperCase()}${t.slice(1)}` : "";
}
function Fe(e, t) {
  let r = Math.abs(e), n = Math.abs(t);
  for (; n; ) {
    const s = r % n;
    r = n, n = s;
  }
  return r || 1;
}
function Ge(e, t) {
  return Math.max(1, Math.floor(e * t / Fe(e, t)));
}
function Ke(e) {
  return String(e || "").trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "chart";
}
function He(e, t = []) {
  const r = new Set(Array.from(t).map((s) => String(s || "").trim()).filter(Boolean)), n = `user-chart-${Ke(e)}`;
  if (!r.has(n)) return n;
  for (let s = 2; s < 1e4; s += 1) {
    const o = `${n}-${s}`;
    if (!r.has(o)) return o;
  }
  return `${n}-${Date.now()}`;
}
function oe(e, t = []) {
  return $({
    metadata: {
      id: He(e, t),
      title: String(e || "").trim() || "Untitled chart",
      composer: "",
      sourceKey: "",
      primaryTimeSignature: P,
      tempo: re,
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
function Ye(e, t, r, n) {
  const s = String(e || "").trim();
  if (!s) return null;
  if (/^(?:N\.C\.|NC)$/i.test(s))
    return {
      symbol: O,
      root: O,
      quality: "",
      bass: null,
      isNoChord: !0
    };
  const o = s.match(/^([A-Ga-g](?:b|#)?)(.*?)(?:\/([A-Ga-g](?:b|#)?))?$/);
  if (!o)
    return n.push({
      severity: "error",
      line: t,
      column: r,
      message: `Unknown chord token "${s}".`
    }), null;
  const [, i = "", c = "", d = ""] = o, u = V(i), p = V(d), m = Le.get(ne(c));
  return m === void 0 ? (n.push({
    severity: "error",
    line: t,
    column: r + i.length,
    message: `Unknown chord quality "${c}" in "${s}".`
  }), null) : {
    symbol: `${u}${m}${p ? `/${p}` : ""}`,
    root: u,
    quality: m,
    bass: p || null
  };
}
function Je(e, t, r, n) {
  const s = [];
  let o = 0;
  for (; o < e.length; ) {
    const i = e[o] || "";
    if (/\s/.test(i)) {
      o += 1;
      continue;
    }
    if (i === "(") {
      const d = e.indexOf(")", o + 1);
      if (d < 0) {
        n.push({
          severity: "error",
          line: t,
          column: r + o + 1,
          message: "Missing closing parenthesis."
        });
        break;
      }
      s.push({
        raw: e.slice(o + 1, d).trim(),
        column: r + o + 1,
        group: !0
      }), o = d + 1;
      continue;
    }
    if (i === ")") {
      n.push({
        severity: "error",
        line: t,
        column: r + o + 1,
        message: "Unexpected closing parenthesis."
      }), o += 1;
      continue;
    }
    let c = o + 1;
    for (; c < e.length && !/\s|\(|\)/.test(e[c] || ""); ) c += 1;
    s.push({
      raw: e.slice(o, c),
      column: r + o + 1,
      group: !1
    }), o = c;
  }
  return s;
}
function Qe(e, t, r, n) {
  const s = Je(e, t, r, n), o = s.map((a, h) => ({
    token: a,
    tokenIndex: h,
    match: a.raw.trim().match($e)
  })).filter((a) => !!a.match);
  o.forEach((a) => {
    (a.token.group || a.tokenIndex !== 0) && n.push({
      severity: "error",
      line: t,
      column: a.token.column,
      message: "Place meter markers at the beginning of a measure."
    });
  });
  const i = new Set(o.map((a) => a.tokenIndex)), c = o[0]?.match?.[1] || "", d = s.filter((a, h) => !i.has(h)).map((a, h) => ({
    token: a,
    tokenIndex: s.indexOf(a),
    marker: Pe(a.raw, t, a.column, n)
  })).filter((a) => !!a.marker);
  d.forEach((a) => {
    a.token.group && n.push({
      severity: "error",
      line: t,
      column: a.token.column,
      message: "Boundary markers cannot be placed inside a subdivision group."
    });
  });
  const u = new Set(d.map((a) => a.tokenIndex)), p = s.filter((a, h) => !i.has(h) && !u.has(h)), m = s.findIndex((a, h) => !i.has(h) && !u.has(h)), S = (() => {
    for (let a = s.length - 1; a >= 0; a -= 1)
      if (!i.has(a) && !u.has(a)) return a;
    return -1;
  })(), v = d.filter((a) => m >= 0 && a.tokenIndex < m).map((a) => a.marker), b = d.filter((a) => m >= 0 && a.tokenIndex > S).map((a) => a.marker), E = d.filter(() => m < 0).map((a) => a.marker);
  d.filter((a) => m >= 0 && a.tokenIndex >= m && a.tokenIndex <= S).forEach((a) => {
    n.push({
      severity: "error",
      line: t,
      column: a.token.column,
      message: "Place boundary markers before the first chord or after the last chord in a measure."
    });
  });
  const _ = p.find((a) => a.raw.trim() === "%");
  if (_)
    return _.group || p.length > 1 ? (n.push({
      severity: "error",
      line: t,
      column: _.column,
      message: "The repeat sign % must be alone in its measure."
    }), { tokens: [], timeSignature: c, boundaryBefore: v, boundaryAfter: b, boundaryOnly: E }) : {
      timeSignature: c,
      tokens: [{
        kind: "repeat_previous_bar",
        symbol: "%",
        sourceCellIndex: 0,
        sourceCellCount: 4,
        chartTextEventIndex: 0,
        chartTextGroupSize: 1,
        chartTextGroupIndex: 0
      }],
      boundaryBefore: v,
      boundaryAfter: b,
      boundaryOnly: E
    };
  const A = p.map((a) => {
    const h = a.group ? a.raw.split(/\s+/).map((y) => y.trim()).filter(Boolean) : [a.raw];
    return a.group && h.length === 0 && n.push({
      severity: "error",
      line: t,
      column: a.column,
      message: "Empty subdivision group."
    }), {
      chords: h.map((y) => Ye(y, t, a.column + (a.group ? a.raw.indexOf(y) + 1 : 0), n)).filter((y) => !!y),
      column: a.column,
      groupSize: Math.max(1, h.length)
    };
  }).filter((a) => a.chords.length > 0), M = A.reduce((a, h) => Ge(a, h.groupSize), 1), F = Math.max(1, A.length * M), G = [];
  return A.forEach((a, h) => {
    const K = Math.max(1, M / Math.max(1, a.chords.length));
    a.chords.forEach((y, H) => {
      G.push({
        ...y,
        sourceCellIndex: Math.min(F - 1, h * M + Math.floor(H * K)),
        sourceCellCount: F,
        chartTextEventIndex: h,
        chartTextGroupSize: a.chords.length,
        chartTextGroupIndex: H
      });
    });
  }), { tokens: G, timeSignature: c, boundaryBefore: v, boundaryAfter: b, boundaryOnly: E };
}
function Ve(e) {
  const t = [];
  let r = 0, n = 0;
  for (let s = 0; s <= e.length; s += 1) {
    const o = e[s] || "|";
    if (o === "(" && (n += 1), o === ")" && (n = Math.max(0, n - 1)), o !== "|" || n > 0) continue;
    const i = e.slice(r, s).trim();
    if (i) {
      const c = e.slice(r, s).search(/\S/);
      t.push({
        content: i,
        column: r + Math.max(0, c) + 1
      });
    } else r > 0 && s < e.length && t.push({
      content: "",
      column: r + 1
    });
    r = s + 1;
  }
  return t;
}
function qe(e) {
  const t = [], r = String(e || "").replace(/\r\n?/g, `
`).split(`
`).map((n, s) => ({ measures: Ve(n).map((i) => Qe(i.content, s + 1, i.column - 1, t)) })).filter((n) => n.measures.length > 0);
  return r.length === 0 && t.push({
    severity: "error",
    line: 1,
    column: 1,
    message: "Enter at least one measure."
  }), { lines: r, diagnostics: t };
}
function We(e, t) {
  const r = {
    ...t ? T(t) : {},
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
  return e.isNoChord && (r.symbol = O, r.root = O, r.quality = "", r.bass = null), r;
}
function Xe(e) {
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
function Ze(e) {
  return e.tokens.length === 1 && e.tokens[0]?.kind === "repeat_previous_bar";
}
function D(e) {
  return e.tokens.length > 0;
}
function q(e, t) {
  const r = Array.from({ length: Math.max(1, t) }, () => ({
    bars: "",
    annots: [],
    comments: [],
    spacer: 0,
    chord: null
  }));
  return e.forEach((n) => {
    const s = Math.max(0, Math.min(r.length - 1, Number(n.sourceCellIndex || 0)));
    r[s] = {
      ...r[s],
      chord: {
        symbol: n.symbol,
        root: n.root,
        modifier: n.quality,
        bass: n.bass,
        display_prefix: n.displayPrefix || ""
      }
    };
  }), r;
}
function et(e, t) {
  const r = Number(e);
  return Number.isFinite(r) ? r : t + 1;
}
function tt(e, t, r) {
  const n = Array.isArray(e.sections) ? e.sections : [];
  if (t?.sectionId) {
    const o = n.find((i) => i.id === t.sectionId);
    if (o) return o;
  }
  const s = n.find((o) => t?.id && o.barIds?.includes(t.id));
  return s || n[Math.min(Math.max(0, r), Math.max(0, n.length - 1))] || null;
}
function rt(e, t) {
  const n = (Array.isArray(e.sections) && e.sections.length ? e.sections : [{ id: "section-1", label: "", occurrence: 1, barIds: [] }]).map((o) => ({
    ...T(o),
    barIds: []
  })), s = new Map(n.map((o) => [o.id, o]));
  return t.forEach((o, i) => {
    const c = e.bars?.[i] || null, d = tt(e, c, i), u = d && s.get(d.id) || n[n.length - 1];
    u && (u.barIds.push(o.id), o.sectionId = u.id, o.sectionLabel = String(u.label || ""));
  }), n.filter((o) => o.barIds.length > 0);
}
function nt(e, t, r, {
  resetLayoutStartCellIndex: n = !0,
  previousBar: s = null
} = {}) {
  const o = t || {}, i = Array.isArray(o?.notation?.tokens) ? o.notation.tokens : [], c = Ze(e), d = s?.playback || null, u = s?.notation || null, p = Math.max(
    1,
    Number(
      d?.cellSlots?.length || u?.tokens?.find((b) => Number.isInteger(b?.sourceCellCount))?.sourceCellCount || e.tokens[0]?.sourceCellCount || 4
    )
  ), m = c ? [Xe(p)] : e.tokens.map((b, E) => We(b, i[E])), S = Math.max(1, Number(m[0]?.sourceCellCount || 1)), v = {
    ...T(o),
    id: String(o.id || `bar-${r + 1}`),
    index: n ? r + 1 : et(o.index, r),
    timeSignature: e.timeSignature || o.timeSignature || "",
    notation: {
      kind: c ? "single_bar_repeat" : m.length === 1 && m[0]?.symbol === O ? "no_chord" : "written",
      tokens: m
    },
    playback: {
      ...o.playback ? T(o.playback) : {},
      slots: c ? T(d?.slots || []) : m.filter((b) => b.symbol !== O),
      cellSlots: c ? T(d?.cellSlots || q([], S)) : q(m, S)
    }
  };
  return n && (v.layoutStartCellIndex = null), v;
}
function ot(e, t) {
  const r = e.flatMap((o) => o.measures).filter(D), n = [];
  let s = String(t.metadata?.primaryTimeSignature || P);
  return r.forEach((o, i) => {
    o.timeSignature && (s = o.timeSignature);
    const c = nt(o, t.bars?.[i], i, {
      previousBar: n[i - 1] || t.bars?.[i - 1] || null
    });
    c.timeSignature = s, n.push(c);
  }), n;
}
function st(e, t, r) {
  return Ce({
    kind: e.kind,
    beforeBarId: t.beforeBarId || "",
    afterBarId: t.afterBarId || "",
    index: r,
    data: {
      ...e.ending ? { ending: e.ending } : {},
      ...e.times ? { times: e.times } : {},
      source: {
        format: "sharp-eleven-chart-text",
        text: e.text,
        column: e.column
      }
    }
  });
}
function it(e, t) {
  const r = [];
  let n = 0;
  const s = (o, i) => {
    !i.beforeBarId && !i.afterBarId || r.push(st(o, i, r.length));
  };
  return e.forEach((o) => {
    o.measures.forEach((i) => {
      if (D(i)) {
        const u = t[n];
        if (n += 1, !u) return;
        i.boundaryBefore.forEach((p) => s(p, { beforeBarId: u.id })), i.boundaryAfter.forEach((p) => s(p, { afterBarId: u.id }));
        return;
      }
      const c = t[n - 1] || null, d = t[n] || null;
      i.boundaryOnly.forEach((u) => s(u, {
        ...c ? { afterBarId: c.id } : {},
        ...d ? { beforeBarId: d.id } : {}
      }));
    });
  }), r;
}
function at(e, t, r) {
  const n = r && typeof r == "object" ? T(r) : {}, s = n.systems && typeof n.systems == "object" ? n.systems : {}, o = n.sourceHints || (n.source === "ireal" && n.systems && typeof n.systems == "object" ? {
    source: "ireal",
    systemsRef: "layout.systems"
  } : void 0);
  let i = 0;
  const c = e.map((u) => {
    const p = u.measures.filter(D).length, m = t.slice(i, i + p);
    return i += p, {
      barIds: m.map((S) => S.id)
    };
  }).filter((u) => u.barIds.length > 0), d = Math.max(1, ...c.map((u) => u.barIds.length));
  return {
    ...n,
    source: "sharp-eleven-chart-text",
    policy: "source-faithful",
    generatedBy: "sharp-eleven-chart-text-v1",
    ...o ? { sourceHints: o } : {},
    systems: {
      ...s,
      cellsPerRow: d * 4,
      rowCount: c.length,
      rows: c
    }
  };
}
function ct(e, t) {
  const r = Se(t || oe("Untitled chart")), n = me(e), s = n.hasKeyTag && !n.errorMessage ? n.body : e, { lines: o, diagnostics: i } = qe(s);
  if (n.errorMessage && i.unshift({
    severity: "error",
    line: 1,
    column: 1,
    message: n.errorMessage
  }), i.some((p) => p.severity === "error"))
    return {
      documentDraft: r,
      diagnostics: i
    };
  const c = ot(o, r), d = it(o, c), u = rt(r, c);
  return {
    documentDraft: $({
      ...r,
      metadata: {
        ...r.metadata,
        sourceKey: n.keyName || r.metadata?.sourceKey || "",
        primaryTimeSignature: r.metadata?.primaryTimeSignature || P,
        tempo: Number(r.metadata?.tempo || 0) > 0 ? Number(r.metadata.tempo) : re,
        barCount: c.length
      },
      sections: u,
      bars: c,
      boundaryEvents: d,
      layout: at(o, c, r.layout)
    }),
    diagnostics: i
  };
}
function dt(e, t = []) {
  const r = String(e?.title || "").trim() || "Untitled chart", n = oe(r, t), s = ct(String(e?.text || ""), n);
  return s.diagnostics.some((o) => o.severity === "error") ? {
    document: null,
    diagnostics: s.diagnostics
  } : {
    document: s.documentDraft,
    diagnostics: s.diagnostics
  };
}
const L = 1, ut = "sharp11", lt = "chart-import", B = "lzw1.", U = "json1.";
function se(e) {
  const t = e && typeof e == "object" ? e : {};
  return {
    version: L,
    title: String(t.title || "").trim() || "Untitled chart",
    text: String(t.text || "").replace(/\r\n?/g, `
`)
  };
}
function mt() {
  return new TextEncoder();
}
function ht() {
  return new TextDecoder();
}
function W(e) {
  if (typeof Buffer < "u")
    return Buffer.from(e).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  let t = "";
  const r = 32768;
  for (let n = 0; n < e.length; n += r)
    t += String.fromCharCode(...e.slice(n, n + r));
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function ie(e) {
  const t = String(e || "").replace(/-/g, "+").replace(/_/g, "/"), r = `${t}${"=".repeat((4 - t.length % 4) % 4)}`;
  if (typeof Buffer < "u")
    return new Uint8Array(Buffer.from(r, "base64"));
  const n = atob(r), s = new Uint8Array(n.length);
  for (let o = 0; o < n.length; o += 1)
    s[o] = n.charCodeAt(o);
  return s;
}
function X(e) {
  return mt().encode(e);
}
function ae(e) {
  return ht().decode(e);
}
function ft(e) {
  if (e.length === 0) return [];
  const t = /* @__PURE__ */ new Map();
  for (let o = 0; o < 256; o += 1)
    t.set(String.fromCharCode(o), o);
  let r = String.fromCharCode(e[0] || 0), n = 256;
  const s = [];
  for (let o = 1; o < e.length; o += 1) {
    const i = String.fromCharCode(e[o] || 0), c = r + i;
    if (t.has(c)) {
      r = c;
      continue;
    }
    s.push(t.get(r)), n <= 65535 && (t.set(c, n), n += 1), r = i;
  }
  return s.push(t.get(r)), s;
}
function pt(e) {
  if (e.length === 0) return new Uint8Array();
  const t = /* @__PURE__ */ new Map();
  for (let i = 0; i < 256; i += 1)
    t.set(i, String.fromCharCode(i));
  let r = 256, n = t.get(e[0] || 0);
  if (n === void 0) throw new Error("Invalid compressed chart payload.");
  let s = n;
  for (let i = 1; i < e.length; i += 1) {
    const c = e[i] || 0;
    let d = t.get(c);
    if (d === void 0) {
      if (c !== r) throw new Error("Invalid compressed chart payload.");
      d = n + n.charAt(0);
    }
    s += d, r <= 65535 && (t.set(r, n + d.charAt(0)), r += 1), n = d;
  }
  const o = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i += 1)
    o[i] = s.charCodeAt(i) & 255;
  return o;
}
function bt(e) {
  const t = new Uint8Array(e.length * 2);
  return e.forEach((r, n) => {
    if (r < 0 || r > 65535) throw new Error("Compressed chart payload is too large.");
    t[n * 2] = r >> 8 & 255, t[n * 2 + 1] = r & 255;
  }), t;
}
function gt(e) {
  if (e.length % 2 !== 0) throw new Error("Invalid compressed chart payload.");
  const t = [];
  for (let r = 0; r < e.length; r += 2)
    t.push((e[r] || 0) << 8 | (e[r + 1] || 0));
  return t;
}
function ce(e) {
  const t = ie(e);
  return ae(pt(gt(t)));
}
function de(e) {
  return ae(ie(e));
}
function k(e) {
  return JSON.parse(e);
}
function yt(e) {
  const t = de(e);
  try {
    return k(t);
  } catch (r) {
    try {
      return k(ce(e));
    } catch {
      throw r;
    }
  }
}
function St(e) {
  return JSON.stringify({
    version: L,
    title: e.title,
    text: e.text
  });
}
function ue(e) {
  const t = se(e), r = St(t), n = `${U}${W(X(r))}`;
  try {
    const s = bt(ft(X(r))), o = `${B}${W(s)}`;
    return o.length < n.length ? o : n;
  } catch {
    return n;
  }
}
function vt(e) {
  const t = String(e || "").trim();
  if (!t)
    return { payload: null, errorMessage: "Missing chart payload." };
  try {
    let r;
    if (t.startsWith(B) ? r = k(ce(t.slice(B.length))) : t.startsWith(U) ? r = k(de(t.slice(U.length))) : r = yt(t), Number(r.version) !== L)
      return { payload: null, errorMessage: "Unsupported chart payload version." };
    const n = se(r);
    return n.text.trim() ? { payload: n, errorMessage: "" } : { payload: null, errorMessage: "The shared chart is empty." };
  } catch (r) {
    return {
      payload: null,
      errorMessage: r instanceof Error ? r.message : "Invalid chart payload."
    };
  }
}
function Tt(e, {
  scheme: t = ut
} = {}) {
  const r = ue(e);
  return `${t}://${lt}?payload=${encodeURIComponent(r)}`;
}
function xt(e = {}) {
  return {
    version: 1,
    title: String(e.title || "").trim() || "Untitled chart",
    text: String(e.text || "").replace(/\r\n?/g, `
`)
  };
}
function Ct(e = {}) {
  const t = xt(e), r = dt(t), n = !r.diagnostics.some((s) => s.severity === "error") && !!r.document;
  return {
    ok: n,
    title: t.title,
    barCount: r.document?.bars?.length || 0,
    diagnostics: r.diagnostics.map((s) => ({
      severity: s.severity,
      line: s.line,
      column: s.column,
      message: s.message
    })),
    encodedPayload: n ? ue(t) : "",
    importUrl: n ? Tt(t) : ""
  };
}
export {
  Tt as createChartTextImportDeepLink,
  vt as decodeChartTextSharePayload,
  ue as encodeChartTextSharePayload,
  Ct as validateChartTextForSite
};
