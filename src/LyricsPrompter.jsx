import { useState, useEffect, useCallback, useRef } from "react";

// ── Genre Structure Templates ──
const STRUCTURES = {
  "EDM / Electronic": [
    { id: "s1", tag: "Intro", energy: "Low", vocal: "", role: "setup" },
    { id: "s2", tag: "Build-Up", energy: "Medium", vocal: "", role: "lift" },
    { id: "s3", tag: "Drop", energy: "High", vocal: "", role: "payoff" },
    { id: "s4", tag: "Breakdown", energy: "Low", vocal: "", role: "contrast" },
    { id: "s5", tag: "Build-Up", energy: "Medium", vocal: "", role: "lift" },
    { id: "s6", tag: "Drop", energy: "High", vocal: "", role: "payoff" },
    { id: "s7", tag: "Outro", energy: "Low", vocal: "", role: "resolve" },
  ],
  "Hip-Hop / Rap": [
    { id: "s1", tag: "Intro", energy: "Low", vocal: "", role: "setup" },
    { id: "s2", tag: "Verse 1", energy: "Medium", vocal: "Rapped", role: "setup" },
    { id: "s3", tag: "Hook", energy: "High", vocal: "Sung", role: "payoff" },
    { id: "s4", tag: "Verse 2", energy: "Medium", vocal: "Rapped", role: "setup" },
    { id: "s5", tag: "Hook", energy: "High", vocal: "Sung", role: "payoff" },
    { id: "s6", tag: "Bridge", energy: "Low", vocal: "", role: "contrast" },
    { id: "s7", tag: "Hook", energy: "High", vocal: "Sung", role: "payoff" },
    { id: "s8", tag: "Outro", energy: "Low", vocal: "", role: "resolve" },
  ],
  "Rock / Pop": [
    { id: "s1", tag: "Intro", energy: "Low", vocal: "", role: "setup" },
    { id: "s2", tag: "Verse 1", energy: "Medium", vocal: "", role: "setup" },
    { id: "s3", tag: "Pre-Chorus", energy: "Medium", vocal: "", role: "lift" },
    { id: "s4", tag: "Chorus", energy: "High", vocal: "", role: "payoff" },
    { id: "s5", tag: "Verse 2", energy: "Medium", vocal: "", role: "setup" },
    { id: "s6", tag: "Pre-Chorus", energy: "Medium", vocal: "", role: "lift" },
    { id: "s7", tag: "Chorus", energy: "High", vocal: "", role: "payoff" },
    { id: "s8", tag: "Bridge", energy: "Low", vocal: "", role: "contrast" },
    { id: "s9", tag: "Final Chorus", energy: "High", vocal: "", role: "payoff" },
    { id: "s10", tag: "Outro", energy: "Low", vocal: "", role: "resolve" },
  ],
  "Cinematic / Ambient": [
    { id: "s1", tag: "Intro", energy: "Low", vocal: "", role: "setup" },
    { id: "s2", tag: "Theme", energy: "Medium", vocal: "", role: "setup" },
    { id: "s3", tag: "Build-Up", energy: "Medium", vocal: "", role: "lift" },
    { id: "s4", tag: "Climax", energy: "High", vocal: "", role: "payoff" },
    { id: "s5", tag: "Resolution", energy: "Low", vocal: "", role: "contrast" },
    { id: "s6", tag: "Outro", energy: "Low", vocal: "", role: "resolve" },
  ],
  "K-Pop": [
    { id: "s1", tag: "Intro", energy: "Medium", vocal: "", role: "setup" },
    { id: "s2", tag: "Verse 1", energy: "Medium", vocal: "Melodic Rap", role: "setup" },
    { id: "s3", tag: "Pre-Chorus", energy: "Medium", vocal: "", role: "lift" },
    { id: "s4", tag: "Chorus", energy: "High", vocal: "", role: "payoff" },
    { id: "s5", tag: "Post-Chorus", energy: "High", vocal: "", role: "payoff" },
    { id: "s6", tag: "Verse 2", energy: "Medium", vocal: "", role: "setup" },
    { id: "s7", tag: "Chorus", energy: "High", vocal: "", role: "payoff" },
    { id: "s8", tag: "Bridge", energy: "Low", vocal: "", role: "contrast" },
    { id: "s9", tag: "Final Chorus", energy: "High", vocal: "", role: "payoff" },
    { id: "s10", tag: "Outro", energy: "Low", vocal: "", role: "resolve" },
  ],
  "Jazz / Soul": [
    { id: "s1", tag: "Intro", energy: "Low", vocal: "", role: "setup" },
    { id: "s2", tag: "Verse 1", energy: "Medium", vocal: "Smooth", role: "setup" },
    { id: "s3", tag: "Chorus", energy: "Medium", vocal: "Soulful", role: "payoff" },
    { id: "s4", tag: "Verse 2", energy: "Medium", vocal: "", role: "setup" },
    { id: "s5", tag: "Solo", energy: "Medium", vocal: "", role: "contrast" },
    { id: "s6", tag: "Chorus", energy: "Medium", vocal: "Soulful", role: "payoff" },
    { id: "s7", tag: "Outro", energy: "Low", vocal: "", role: "resolve" },
  ],
  "Folk / Country": [
    { id: "s1", tag: "Intro", energy: "Low", vocal: "", role: "setup" },
    { id: "s2", tag: "Verse 1", energy: "Medium", vocal: "", role: "setup" },
    { id: "s3", tag: "Chorus", energy: "Medium", vocal: "", role: "payoff" },
    { id: "s4", tag: "Verse 2", energy: "Medium", vocal: "", role: "setup" },
    { id: "s5", tag: "Chorus", energy: "Medium", vocal: "", role: "payoff" },
    { id: "s6", tag: "Bridge", energy: "Low", vocal: "", role: "contrast" },
    { id: "s7", tag: "Final Chorus", energy: "High", vocal: "", role: "payoff" },
    { id: "s8", tag: "Outro", energy: "Low", vocal: "", role: "resolve" },
  ],
  "Custom (Empty)": [],
};

const GENRES = Object.keys(STRUCTURES);
const SECTION_TAGS = ["Intro","Verse 1","Verse 2","Verse 3","Pre-Chorus","Chorus","Final Chorus","Post-Chorus","Hook","Bridge","Interlude","Instrumental","Break","Breakdown","Build-Up","Drop","Solo","Guitar Solo","Climax","Theme","Resolution","Outro","End","Fade Out"];
const ENERGY_LEVELS = ["Low","Medium","High","Low→Medium","Medium→High","Low→High"];
const VOCAL_TAGS = ["","Whispered","Soft","Spoken Word","Sung","Belted","Powerful","Screamed","Falsetto","Breathy","Raspy","Soulful","Smooth","Rapped","Fast Rap","Melodic Rap","Trap Flow","Harmonies","Choir","Call and Response","Growled","Operatic"];
const ENERGY_COLORS = { "Low": "#3b82f6", "Medium": "#eab308", "High": "#ef4444", "Low→Medium": "#6d9e3f", "Medium→High": "#e07020", "Low→High": "#a855f7" };
const ROLE_ICONS = { setup: "◇", lift: "△", payoff: "★", contrast: "◈", resolve: "▽" };

// Typical bars per section type (4/4 time)
const SECTION_BARS = {
  "Intro": 8, "Verse 1": 16, "Verse 2": 16, "Verse 3": 16,
  "Pre-Chorus": 4, "Chorus": 8, "Final Chorus": 8, "Post-Chorus": 4,
  "Hook": 8, "Bridge": 8, "Interlude": 8, "Instrumental": 16,
  "Break": 4, "Breakdown": 8, "Build-Up": 8, "Drop": 16,
  "Solo": 8, "Guitar Solo": 8, "Climax": 8, "Theme": 16,
  "Resolution": 8, "Outro": 8, "End": 4, "Fade Out": 8,
};

function calcSectionSeconds(tag, bpm, customBars) {
  if (!bpm || bpm <= 0) return 0;
  const bars = customBars || SECTION_BARS[tag] || 8;
  const beatsPerBar = 4;
  return (bars * beatsPerBar) / bpm * 60;
}

function getBars(section) {
  return section.bars != null ? section.bars : (SECTION_BARS[section.tag] || 8);
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

let idCounter = 100;
const uid = () => "s" + (idCounter++);

const SB_URL='https://jgfvwfalxnrdujaoqoiq.supabase.co/rest/v1';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZnZ3ZmFseG5yZHVqYW9xb2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NTI4OTYsImV4cCI6MjA4OTIyODg5Nn0.amJtx-4ZGWi_psLbKte6z_W0oE1Ua9EWQxYVhHpatkc';
const sbH={'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Content-Type':'application/json','Prefer':'return=representation'};
const sbInsert=(table,data)=>fetch(`${SB_URL}/${table}`,{method:'POST',headers:sbH,body:JSON.stringify(data)}).catch(()=>{});
const sbUpsert=(table,data)=>fetch(`${SB_URL}/${table}`,{method:'POST',headers:{...sbH,'Prefer':'return=representation,resolution=merge-duplicates'},body:JSON.stringify(data)}).catch(()=>{});
const sbUpdate=(table,match,data)=>fetch(`${SB_URL}/${table}?${match}`,{method:'PATCH',headers:{...sbH,'Prefer':'return=minimal'},body:JSON.stringify(data)}).catch(()=>{});
let _userIP='unknown';
const getIP=()=>_userIP;

export default function LyricsPrompter() {
  const [genre, setGenre] = useState("EDM / Electronic");
  const [sections, setSections] = useState(() => STRUCTURES["EDM / Electronic"].map(s => ({ ...s, id: uid(), bars: SECTION_BARS[s.tag] || 8 })));
  const [isInst, setIsInst] = useState(true);
  const [bpm, setBpm] = useState(128);
  const [mood, setMood] = useState("");
  const [theme, setTheme] = useState("");
  const [lang, setLang] = useState("en");
  const [extra, setExtra] = useState("");
  const [stylePrompt, setStylePrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);
  const [randomize, setRandomize] = useState(0.7);
  const [editMode, setEditMode] = useState(false);
  const [showApiPanel, setShowApiPanel] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [analysisFile, setAnalysisFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const ANALYZER_URL = 'https://web-production-53cf6.up.railway.app';

  const analyzeAudio = async () => {
    if (!analysisFile) return;
    const target = history.find(h => h.id === selectedHistoryId) || history[0];
    if (!target) return;
    markAnalyzed(target.id);
    setAnalyzing(true); setAnalysisResult(null);
    try {
      const fd = new FormData();
      fd.append('file', analysisFile);
      const promptForAnalysis = target.edits?.edited ? target.edits.final : target.prompt;
      fd.append('prompt', promptForAnalysis);
      fd.append('prompt_type', 'lyrics');
      fd.append('ip', getIP());
      if (target.sbId) fd.append('prompt_id', String(target.sbId));
      const r = await fetch(`${ANALYZER_URL}/analyze`, { method: 'POST', body: fd });
      const d = await r.json();
      if (!r.ok) throw new Error(d.detail || 'Analysis failed');
      setAnalysisResult(d);
      setAnalysisFile(null);
      if (!useBYOK) setFreeRemaining(prev => prev + 1);
    } catch (e) { setAnalysisResult({ error: e.message }); }
    finally { setAnalyzing(false); }
  };

  // History + Upload gate system
  const loadHistory = () => { try { const s = localStorage.getItem("suno_lyrics_history"); return s ? JSON.parse(s) : []; } catch { return []; } };
  const [history, setHistory] = useState(loadHistory);
  const pendingUpload = history.length > 0 && !history[0].analyzed && !history[0].hidden;
  const saveHistory = (h) => { setHistory(h); try { localStorage.setItem("suno_lyrics_history", JSON.stringify(h.slice(0, 50))); } catch {} };
  const addToHistory = async (prompt, mdl) => {
    const entry = { id: Date.now(), ts: new Date().toISOString(), genre, sections: sections.map(s => s.tag), isInst, model: mdl, prompt, analyzed: false,
      edits: { original: prompt, final: prompt, edited: false }, sbId: null
    };
    try {
      const r = await sbInsert('lyrics_history', { ip: getIP(), genre, sections: sections.map(s => s.tag), is_inst: isInst, model: mdl, prompt, edit_original: prompt, edit_final: prompt, edited: false });
      const d = await r?.json?.();
      if (d?.[0]?.id) entry.sbId = d[0].id;
    } catch {}
    saveHistory([entry, ...history]);
  };
  const markAnalyzed = (id) => { saveHistory(history.map(x => x.id === id ? { ...x, analyzed: true } : x)); };
  const hideEntry = (id) => { saveHistory(history.map(x => x.id === id ? { ...x, hidden: true } : x)); };
  const restoreEntry = (h) => {
    if (h.genre) setGenre(h.genre);
    if (h.sections?.length > 0 && STRUCTURES[h.genre]) {
      setSections(STRUCTURES[h.genre].map(s => ({ ...s, id: uid(), bars: SECTION_BARS[s.tag] || 8 })));
    }
    setIsInst(!!h.isInst);
    const p = h.edits?.edited ? h.edits.final : h.prompt;
    if (p) { setResult(p); setEditMode(true); }
    setShowHistory(false);
  };

  // Dual mode: Free (server proxy, 10/day) + BYOK (own key, unlimited)
  const [useBYOK, setUseBYOK] = useState(false);
  const [freeRemaining, setFreeRemaining] = useState(5);
  const LIMIT = 5;
  const sbGetUsage = async () => {
    try { const today = new Date().toISOString().slice(0, 10);
    const r = await fetch(`${SB_URL}/rate_limits?ip=eq.${getIP()}&date=eq.${today}&select=count`, { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } });
    const d = await r.json(); return d?.[0]?.count || 0; } catch { return 0; }
  };
  const sbIncrementUsage = async () => {
    try { const today = new Date().toISOString().slice(0, 10); const current = await sbGetUsage();
    await sbUpsert('rate_limits', { ip: getIP(), date: today, count: current + 1 });
    setFreeRemaining(Math.max(0, LIMIT - current - 1));
    window.dispatchEvent(new Event('usage-changed')); } catch {}
  };
  useEffect(() => { fetch('https://api.ipify.org?format=json').then(r => r.json()).then(d => { _userIP = d.ip; return sbGetUsage(); }).then(used => setFreeRemaining(Math.max(0, LIMIT - used))).catch(() => {});
    const syncUsage = () => { if (getIP()) sbGetUsage().then(used => setFreeRemaining(Math.max(0, LIMIT - used))).catch(() => {}); };
    window.addEventListener('usage-changed', syncUsage);
    const local = loadHistory();
    if (local.length === 0) {
      fetch(`${SB_URL}/lyrics_history?ip=eq.${getIP()}&order=created_at.desc&limit=50&select=id,created_at,genre,sections,is_inst,model,prompt,edit_original,edit_final,edited,rating`, { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } })
        .then(r => r.json()).then(rows => { if (rows?.length > 0) { const recovered = rows.map(r => ({ id: r.id, ts: r.created_at, genre: r.genre, sections: r.sections || [], isInst: r.is_inst, model: r.model, prompt: r.prompt, analyzed: !!r.rating, hidden: false, edits: { original: r.edit_original || r.prompt, final: r.edit_final || r.prompt, edited: !!r.edited }, sbId: r.id })); saveHistory(recovered); } }).catch(() => {});
    }
    return () => window.removeEventListener('usage-changed', syncUsage);
  }, []);
  const PROVIDERS = {
    anthropic: { label: "Anthropic", placeholder: "sk-ant-xxx...", models: [{ id: "claude-opus-4-6", n: "Opus 4.6" }, { id: "claude-sonnet-4-6", n: "Sonnet 4.6" }] },
    openai: { label: "OpenAI", placeholder: "sk-xxx...", models: [{ id: "gpt-5.4", n: "GPT-5.4" }, { id: "gpt-5.3", n: "GPT-5.3" }, { id: "gpt-4o", n: "GPT-4o" }] },
    gemini: { label: "Gemini (AI Studio)", placeholder: "AIzaSy...", models: [{ id: "gemini-3.1-pro-preview", n: "3.1 Pro" }, { id: "gemini-2.5-flash-lite", n: "2.5 Flash-Lite ⚡ Free" }, { id: "gemini-2.5-flash", n: "2.5 Flash ⚡ Free" }] },
    groq: { label: "Groq ⚡ Free", placeholder: "gsk_xxx...", models: [{ id: "llama-3.3-70b-versatile", n: "Llama 3.3 70B ⚡" }, { id: "openai/gpt-oss-120b", n: "GPT-OSS 120B ⚡" }] }
  };
  const loadKeys = () => { try { const s = localStorage.getItem("suno_api_keys"); return s ? JSON.parse(s) : {}; } catch { return {}; } };
  const [apiKeys, setApiKeys] = useState(loadKeys);
  const saveKey = (provider, key) => { const next = { ...apiKeys, [provider]: key }; setApiKeys(next); try { localStorage.setItem("suno_api_keys", JSON.stringify(next)); } catch {} };
  const removeKey = (provider) => { const next = { ...apiKeys }; delete next[provider]; setApiKeys(next); try { localStorage.setItem("suno_api_keys", JSON.stringify(next)); } catch {} if (aiModel && PROVIDERS[provider]?.models.some(m => m.id === aiModel)) { const remaining = Object.keys(next).filter(p => next[p]); if (remaining.length > 0) setAiModel(PROVIDERS[remaining[0]].models[0].id); else setAiModel(""); } };
  const [keyInputs, setKeyInputs] = useState({});

  const availModels = Object.entries(PROVIDERS).flatMap(([p, cfg]) => apiKeys[p] ? cfg.models.map(m => ({ ...m, provider: p })) : []);
  const [aiModel, setAiModel] = useState(() => { const k = loadKeys(); const fp = Object.keys(k).find(p => k[p]); return fp ? PROVIDERS[fp].models[0].id : "claude-opus-4-6"; });

  const callAI = async (system, userMsg) => {
    if (!useBYOK) {
      const used = await sbGetUsage();
      if (used >= LIMIT) throw new Error(`Daily limit reached (${LIMIT}/day). Enter your own API key in ⚙ for unlimited.`);
      const r = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system, messages: [{ role: "user", content: userMsg }], temperature: randomize }) });
      const text = await r.text();
      let d; try { d = JSON.parse(text); } catch { throw new Error("Server returned invalid response. Try again."); }
      if (!r.ok) throw new Error(d.error || "Server error");
      await sbIncrementUsage();
      return (d.content?.map(b => b.type === "text" ? b.text : "").join("") || "").trim();
    }
    const modelInfo = availModels.find(m => m.id === aiModel);
    if (!modelInfo) throw new Error("No API key registered. Add your key in ⚙ settings.");
    const key = apiKeys[modelInfo.provider];
    if (!key) throw new Error(`No API key for ${PROVIDERS[modelInfo.provider].label}.`);
    if (modelInfo.provider === "anthropic") {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: aiModel, max_tokens: 2000, temperature: randomize, system, messages: [{ role: "user", content: userMsg }] }) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error?.message || "Anthropic API error");
      return (d.content?.map(b => b.type === "text" ? b.text : "").join("") || "").trim();
    } else if (modelInfo.provider === "gemini") {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${key}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system_instruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts: [{ text: userMsg }] }], generationConfig: { temperature: randomize, maxOutputTokens: 2000 } }) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error?.message || "Gemini API error");
      return (d.candidates?.[0]?.content?.parts?.[0]?.text || "").trim();
    } else if (modelInfo.provider === "groq") {
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` }, body: JSON.stringify({ model: aiModel, max_tokens: 2000, temperature: randomize, messages: [{ role: "system", content: system }, { role: "user", content: userMsg }] }) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error?.message || "Groq API error");
      return (d.choices?.[0]?.message?.content || "").trim();
    } else {
      const r = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` }, body: JSON.stringify({ model: aiModel, max_tokens: 2000, temperature: randomize, messages: [{ role: "system", content: system }, { role: "user", content: userMsg }] }) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error?.message || "OpenAI API error");
      return (d.choices?.[0]?.message?.content || "").trim();
    }
  };

  const selectGenre = (g) => {
    setGenre(g);
    setSections(STRUCTURES[g].map(s => ({ ...s, id: uid(), bars: SECTION_BARS[s.tag] || 8 })));
    setResult("");
  };

  const updateSection = (idx, field, value) => {
    setSections(prev => prev.map((s, i) => {
      if (i !== idx) return s;
      if (field === "tag") return { ...s, tag: value, bars: SECTION_BARS[value] || 8 };
      if (field === "bars") return { ...s, bars: Math.max(1, Math.min(64, parseInt(value) || 4)) };
      return { ...s, [field]: value };
    }));
  };

  const addSection = () => {
    setSections(prev => [...prev, { id: uid(), tag: "Verse 1", energy: "Medium", vocal: "", role: "setup", bars: 16 }]);
  };

  const removeSection = (idx) => {
    setSections(prev => prev.filter((_, i) => i !== idx));
  };

  const duplicateSection = (idx) => {
    setSections(prev => {
      const copy = { ...prev[idx], id: uid() };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
  };

  // Drag reorder
  const dragStart = (idx) => setDragIdx(idx);
  const dragOver = (e, idx) => { e.preventDefault(); };
  const drop = (idx) => {
    if (dragIdx === null || dragIdx === idx) return;
    setSections(prev => {
      const next = [...prev];
      const [item] = next.splice(dragIdx, 1);
      next.splice(idx, 0, item);
      return next;
    });
    setDragIdx(null);
  };

  // Build prompt preview (local)
  const preview = sections.map(s => {
    let line = `[${s.tag}]`;
    if (s.energy) line += ` [Energy: ${s.energy}]`;
    if (s.vocal && !isInst) line += ` [${s.vocal}]`;
    return line;
  }).join("\n\n");

  const charCount = result ? result.length : preview.length;

  // Generate with Claude API
  const generate = async () => {
    setLoading(true);
    const structureDesc = sections.map((s, i) => 
      `${i + 1}. [${s.tag}] ${getBars(s)}bars Energy:${s.energy}${s.vocal && !isInst ? ` Vocal:${s.vocal}` : ""} Role:${s.role}`
    ).join("\n");

    const sysPrompt = isInst
      ? `You are an expert Suno V5 lyrics-field engineer for INSTRUMENTAL music. Your job is to write the Lyrics field content that controls song structure, energy dynamics, and arrangement using only metatags.

${stylePrompt ? `CRITICAL CONTEXT: The user has already crafted a Style prompt (pasted below). Your Lyrics field output must COMPLEMENT this Style prompt — not repeat it. The Style prompt defines the SOUND; your job is to define the STRUCTURE and ENERGY ARC that makes that sound come alive as a complete song. Extract genre, instruments, mood, and BPM cues from the Style prompt to inform your metatag choices. For example, if the Style prompt mentions "lush pads" and "atmospheric", use those as cues for your [Instrument] and [Mood] tags.` : ""}

RULES:
1. Output ONLY the lyrics field content. No explanations, no markdown.
2. Use [Square Bracket] metatags for structure, energy, instrument, and mood directives.
3. Use (parentheses) sparingly for short producer cues between sections — max 1 per section.
4. NEVER write any text outside brackets/parentheses that could be sung as lyrics.
5. Create a vivid energy arc — the listener should FEEL the journey from section to section.
6. Add [Instrument: ...] tags where they'd enhance the arrangement — reference instruments from the Style prompt if provided.
7. Add [Mood: ...] or [Energy: ...] tags to reinforce the emotional arc.
8. Keep within 3000 characters.
9. Add a [Mood: ...] and [Energy: ...] header at the top if appropriate.
10. Each section should have 1-2 cue tags maximum (not more).
11. Between sections, leave blank lines for breathing room.
12. For Drop/Climax sections, add (full energy; all instruments) style cues.
13. For Breakdown/Break, add (strip back; minimal) style cues.
14. Do NOT duplicate what's already in the Style prompt. Focus on structural directives that the Style field can't express.
15. SUNO AWARENESS: Suno's energy interpretation follows genre archetype over metatags. If the Style prompt implies high energy (e.g. trailer music, EDM), don't fight it with [Energy: very low] tags — work WITH the genre's natural energy curve.`
      : `You are an expert Suno V5 lyrics writer. Write complete lyrics with metatags for the Suno Lyrics field.

${stylePrompt ? `CRITICAL CONTEXT: The user has already crafted a Style prompt (pasted below). Your lyrics must MATCH the sonic character described in that Style prompt. Extract genre, mood, energy level, and aesthetic cues from it. If the Style prompt says "dark, aggressive, 808 bass", don't write cheerful pop lyrics. The Style defines the sound; you define the words and structure that ride on top of it.` : ""}

RULES:
1. Output ONLY the lyrics field content. No explanations, no markdown.
2. Use [Square Bracket] metatags for structure and vocal delivery.
3. Write actual singable lyrics between the metatag sections.
4. ${lang === "ko" ? "Write lyrics in KOREAN (한국어). Keep syllable count consistent within sections (±2 per line). Do NOT mix Korean and English within the same section." : lang === "both" ? "Write lyrics mixing Korean and English. Separate languages by SECTION — don't mix within a section." : "Write lyrics in English."}
5. Verse: 4-8 lines, 8-10 syllables per line. Chorus: 2-4 lines, memorable hook.
6. Use (parentheses) for ad-libs and background vocals: (oh oh), (yeah!), (hey!)
7. Use ALL CAPS for high-intensity climax moments sparingly.
8. Match vocal delivery tags to the section mood.
9. Keep total under 3000 characters.
10. Each section should feel like it has a clear ROLE in the song's narrative arc.
11. The chorus should be simpler and more repetitive than the verse.
12. Do NOT include any style/genre/instrument descriptions in the lyrics — those belong in the Style field only.
13. SUNO AWARENESS: Match the emotional register of your lyrics to the genre's natural character. Suno ignores "dark" mood for genres that aren't inherently dark — if the Style prompt is bright/melodic, write lyrics that match that energy rather than fighting it.`;

    const userMsg = `${stylePrompt ? `STYLE PROMPT (already set in Suno Style field — DO NOT repeat this content):\n${stylePrompt}\n\n` : ""}Genre: ${genre}
Mode: ${isInst ? "INSTRUMENTAL (no vocals, metatags only)" : "VOCAL (lyrics + metatags)"}
BPM: ${bpm || "not set"}
${mood ? `Mood/Vibe: ${mood}` : ""}
${theme && !isInst ? `Theme/Topic: ${theme}` : ""}
${extra ? `Additional direction: ${extra}` : ""}

SECTION STRUCTURE (user-designed, ${sections.reduce((sum, s) => sum + getBars(s), 0)} total bars):
${structureDesc}

Generate the Suno V5 Lyrics field content now.`;

    try {
      const aiResult = await callAI(sysPrompt, userMsg);
      setResult(aiResult);
      setEditMode(false);
      await addToHistory(aiResult, useBYOK ? aiModel : "claude-sonnet-4-6");
    } catch (e) { setResult("Error: " + e.message); }
    setLoading(false);
  };

  const copyToClipboard = () => {
    const text = result || preview;
    try {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    } catch(e) {
      try { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); } catch(e2) { console.error("Copy failed", e2); }
    }
  };

  const iS = { width: "100%", background: "#0e0e14", border: "1px solid #1a1a28", borderRadius: 4, padding: "6px 8px", color: "#d0d0d8", fontSize: 10, fontFamily: "inherit", outline: "none" };

  return (
    <div style={{ fontFamily: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#08080d", color: "#d0d0d8", minHeight: "100vh", padding: 16 }}>
      <style>{`@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}input,select,textarea{font-family:inherit}select option{background:#0e0e14;color:#d0d0d8}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #151520" }}>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: "#f472b6", letterSpacing: -0.5 }}>SUNO LYRICS PROMPTER</h1>
        <span style={{ fontSize: 10, color: "#444" }}>v3 · Style→Structure · BYOK</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 8, color: "#22c55e" }}>{useBYOK ? `● BYOK: ${Object.keys(apiKeys).filter(p => apiKeys[p]).map(p => PROVIDERS[p].label).join(" + ") || "No key"}` : `● Free: Sonnet 4.6 · ${freeRemaining}/${LIMIT} today`}</span>
          <button onClick={() => setShowHistory(!showHistory)} style={{ background: showHistory ? "#1a1a28" : "transparent", border: "1px solid #1a1a28", borderRadius: 4, padding: "4px 8px", color: "#666", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>{history.filter(h => !h.hidden).length > 0 ? `📋 ${history.filter(h => !h.hidden).length}` : ""}</button>
          <button onClick={() => setShowApiPanel(!showApiPanel)} style={{ background: showApiPanel ? "#1a1020" : "transparent", border: showApiPanel ? "1px solid #be185d" : "1px solid #401a30", borderRadius: 6, padding: "5px 12px", color: showApiPanel ? "#f472b6" : "#be185d", fontSize: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, transition: "all 0.2s" }}>🔑 API</button>
        </div>
      </div>

      {showApiPanel && (
        <div style={{ background: "linear-gradient(135deg,#0c0c16,#1e1018)", border: "1px solid #401a30", borderRadius: 8, padding: 16, marginBottom: 12, marginLeft: 16, marginRight: 16, boxShadow: "0 4px 20px rgba(190,24,93,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#f472b6" }}>🔑 AI Provider Settings</span>
            <span style={{ fontSize: 8, color: "#555", marginLeft: "auto" }}>Keys stored in browser only</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: 8, background: "#08080d", borderRadius: 6 }}>
            <span style={{ fontSize: 9, color: "#888", fontWeight: 600 }}>Mode:</span>
            <button onClick={() => setUseBYOK(false)} style={{ padding: "6px 14px", fontSize: 9, borderRadius: 6, border: !useBYOK ? "1px solid #22c55e" : "1px solid #1a1a28", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, background: !useBYOK ? "#0a2010" : "#0e0e14", color: !useBYOK ? "#22c55e" : "#555", transition: "all 0.2s" }}>🆓 Free · Sonnet 4.6 · {freeRemaining}/{LIMIT}</button>
            <button onClick={() => setUseBYOK(true)} style={{ padding: "6px 14px", fontSize: 9, borderRadius: 6, border: useBYOK ? "1px solid #f472b6" : "1px solid #1a1a28", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, background: useBYOK ? "#1a1020" : "#0e0e14", color: useBYOK ? "#f472b6" : "#555", transition: "all 0.2s" }}>🔑 BYOK · Unlimited</button>
          </div>
          {useBYOK && (<>
            {Object.entries(PROVIDERS).map(([pid, cfg]) => {
              const isFree = cfg.label.includes("Free") || cfg.label.includes("⚡");
              return (
              <div key={pid} style={{ display: "grid", gridTemplateColumns: "110px 1fr 60px", gap: 8, alignItems: "center", marginBottom: 6, padding: "6px 8px", background: apiKeys[pid] ? "#0a1a10" : "#08080d", borderRadius: 6, border: apiKeys[pid] ? "1px solid #1a3a1a" : "1px solid #151520" }}>
                <div>
                  <span style={{ fontSize: 9, color: apiKeys[pid] ? "#22c55e" : "#888", fontWeight: 600, display: "block" }}>{cfg.label}</span>
                  {isFree && !apiKeys[pid] && <span style={{ fontSize: 7, color: "#be185d" }}>무료 토큰 제공</span>}
                  {apiKeys[pid] && <span style={{ fontSize: 7, color: "#555" }}>{cfg.models.length} models</span>}
                </div>
                {apiKeys[pid] ? (
                  <div style={{ fontSize: 9, color: "#555", padding: "6px 8px", background: "#0e0e14", borderRadius: 4, border: "1px solid #1a1a28", fontFamily: "monospace" }}>{"•".repeat(8)}...{apiKeys[pid].slice(-6)}</div>
                ) : (
                  <input value={keyInputs[pid] || ""} onChange={e => setKeyInputs({ ...keyInputs, [pid]: e.target.value })} placeholder={cfg.placeholder} type="password" style={{ ...iS, borderColor: isFree ? "#401a30" : "#1a1a28" }} />
                )}
                {apiKeys[pid] ? (
                  <button onClick={() => removeKey(pid)} style={{ background: "transparent", border: "1px solid #3a1a1a", borderRadius: 4, padding: "5px 8px", color: "#f87171", fontSize: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Remove</button>
                ) : (
                  <button onClick={() => { if (keyInputs[pid]) { saveKey(pid, keyInputs[pid]); setKeyInputs({ ...keyInputs, [pid]: "" }); if (!aiModel || !availModels.find(m => m.id === aiModel)) setAiModel(cfg.models[0].id); } }} disabled={!keyInputs[pid]} style={{ background: keyInputs[pid] ? "#f472b6" : "#1a1a28", border: "none", borderRadius: 4, padding: "5px 8px", color: keyInputs[pid] ? "#000" : "#444", fontSize: 8, cursor: keyInputs[pid] ? "pointer" : "default", fontFamily: "inherit", fontWeight: 600 }}>Save</button>
                )}
              </div>
            );})}
            <div style={{ fontSize: 8, color: "#555", marginTop: 8, padding: "6px 8px", background: "#08080d", borderRadius: 4, lineHeight: 1.6 }}>
              💡 <strong style={{ color: "#f472b6" }}>무료 키 발급:</strong> <a href="https://console.groq.com/keys" target="_blank" rel="noopener" style={{ color: "#be185d", textDecoration: "underline" }}>Groq</a> · <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style={{ color: "#be185d", textDecoration: "underline" }}>Gemini AI Studio</a> — 30초면 발급 완료, 무제한 사용 가능
            </div>
          </>)}
        </div>
      )}

      {showHistory && (
        <div style={{ background: "#0c0c12", border: "1px solid #1a1a28", borderRadius: 6, padding: 12, marginBottom: 10, marginLeft: 16, marginRight: 16, maxHeight: 250, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Prompt History ({history.length})</span>
            {history.filter(h => !h.hidden).length > 0 && <button onClick={() => { if (confirm("Hide all from view?")) saveHistory(history.map(h => ({ ...h, hidden: true }))); }} style={{ background: "transparent", border: "1px solid #2a1a1a", borderRadius: 3, padding: "2px 8px", color: "#f87171", fontSize: 8, cursor: "pointer", fontFamily: "inherit" }}>Clear All</button>}
          </div>
          {history.filter(h => !h.hidden).length === 0 ? <div style={{ fontSize: 9, color: "#333", padding: 10, textAlign: "center" }}>No history yet</div> :
          history.filter(h => !h.hidden).map(h => (
            <div key={h.id} style={{ background: "#08080d", borderRadius: 4, padding: "8px 10px", marginBottom: 4, border: `1px solid ${!h.analyzed ? "#1a1040" : "#1a1a24"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: "#888" }}>{h.genre} · {h.isInst ? "INST" : "VOCAL"} · {h.sections?.length} sections</span>
                <span style={{ fontSize: 8, color: "#444" }}>{new Date(h.ts).toLocaleDateString()} {new Date(h.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div style={{ fontSize: 8, color: "#555", maxHeight: 40, overflow: "hidden", textOverflow: "ellipsis", marginBottom: 4 }}>{h.prompt?.slice(0, 150)}...</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {h.analyzed && <span style={{ fontSize: 8, color: "#22c55e" }}>✅ analyzed</span>}
                {!h.analyzed && <span style={{ fontSize: 8, color: "#8b5cf6" }}>⏳ pending</span>}
                {h.edits?.edited && <span style={{ fontSize: 7, color: "#f472b6", background: "#1a0a1e", padding: "1px 4px", borderRadius: 2 }}>edited</span>}
                <span onClick={() => restoreEntry(h)} style={{ fontSize: 8, color: "#22d3ee", cursor: "pointer", marginLeft: "auto" }} title="Restore this prompt">↩</span>
                <span onClick={() => hideEntry(h.id)} style={{ fontSize: 8, color: "#555", cursor: "pointer" }} title="Hide this entry">✕</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, height: "calc(100vh - 80px)" }}>

        {/* LEFT: Structure Builder */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>

          {/* Style Prompt Input */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
              <label style={{ fontSize: 8, color: "#a78bfa", textTransform: "uppercase", letterSpacing: 0.5 }}>Style Prompt (from Style Prompter)</label>
              {stylePrompt && <span style={{ fontSize: 8, color: "#444" }}>{stylePrompt.length} chars</span>}
            </div>
            <textarea value={stylePrompt} onChange={e => setStylePrompt(e.target.value)}
              placeholder="Paste your Style Prompter output here... (e.g. melodic techno, lush pads, arpeggios, emotive, atmospheric, pulsing mono bass, 125 BPM. Warm analog warmth bleeds through...)"
              rows={3} style={{ ...iS, resize: "vertical", lineHeight: 1.5, minHeight: 50, borderColor: stylePrompt ? "#a78bfa33" : "#1a1a28" }} />
          </div>

          {/* Genre + BPM + Mode */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px auto", gap: 8 }}>
            <div>
              <label style={{ fontSize: 8, color: "#555", display: "block", marginBottom: 2, textTransform: "uppercase" }}>Genre Template</label>
              <select value={genre} onChange={e => selectGenre(e.target.value)} style={iS}>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 8, color: "#555", display: "block", marginBottom: 2, textTransform: "uppercase" }}>BPM</label>
              <input type="number" value={bpm} onChange={e => setBpm(parseInt(e.target.value) || 0)} min="40" max="300" style={iS} />
            </div>
            <div style={{ paddingTop: 12 }}>
              <label onClick={() => { setIsInst(!isInst); setResult(""); }} style={{
                display: "flex", alignItems: "center", gap: 6, cursor: "pointer", padding: "6px 14px",
                background: isInst ? "#1a0a20" : "#0a1a20", border: `1px solid ${isInst ? "#a855f7" : "#06b6d4"}`,
                borderRadius: 4, userSelect: "none"
              }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, border: `2px solid ${isInst ? "#a855f7" : "#06b6d4"}`, background: isInst ? "#a855f7" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#000", fontWeight: 700 }}>{isInst ? "✓" : ""}</span>
                <span style={{ fontSize: 9, color: isInst ? "#a855f7" : "#06b6d4", fontWeight: 600 }}>INST</span>
              </label>
            </div>
          </div>

          {/* Controls row */}
          <div style={{ display: "grid", gridTemplateColumns: isInst ? "1fr 1fr" : "1fr 1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ fontSize: 8, color: "#555", display: "block", marginBottom: 2, textTransform: "uppercase" }}>Mood / Vibe</label>
              <input value={mood} onChange={e => setMood(e.target.value)} placeholder="e.g. dark, euphoric, nostalgic" style={iS} />
            </div>
            {!isInst && (
              <div>
                <label style={{ fontSize: 8, color: "#555", display: "block", marginBottom: 2, textTransform: "uppercase" }}>Theme / Topic</label>
                <input value={theme} onChange={e => setTheme(e.target.value)} placeholder="e.g. lost love, night drive" style={iS} />
              </div>
            )}
            <div>
              <label style={{ fontSize: 8, color: "#555", display: "block", marginBottom: 2, textTransform: "uppercase" }}>{isInst ? "Direction" : "Language"}</label>
              {isInst
                ? <input value={extra} onChange={e => setExtra(e.target.value)} placeholder="e.g. cinematic build, 3-act" style={iS} />
                : <select value={lang} onChange={e => setLang(e.target.value)} style={iS}>
                    <option value="en">English</option>
                    <option value="ko">한국어</option>
                    <option value="both">Korean + English mix</option>
                  </select>
              }
            </div>
          </div>

          {!isInst && (
            <div>
              <label style={{ fontSize: 8, color: "#555", display: "block", marginBottom: 2, textTransform: "uppercase" }}>Additional Direction</label>
              <input value={extra} onChange={e => setExtra(e.target.value)} placeholder="e.g. metaphor-heavy, keep chorus simple" style={iS} />
            </div>
          )}

          {/* Model + Randomize */}
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 8, alignItems: "end" }}>
            <div>
              <label style={{ fontSize: 8, color: "#555", display: "block", marginBottom: 2, textTransform: "uppercase" }}>Model</label>
              <select value={useBYOK ? aiModel : "claude-opus-4-6"} onChange={e => setAiModel(e.target.value)} disabled={!useBYOK} style={{ ...iS, opacity: useBYOK ? 1 : 0.5 }}>
                {useBYOK ? (availModels.length > 0 ? availModels.map(m => <option key={m.id} value={m.id}>{PROVIDERS[m.provider].label}: {m.n}</option>) : <option value="">Add key in ⚙</option>) : <option value="claude-opus-4-6">Sonnet 4 (Free)</option>}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 8, color: "#555", textTransform: "uppercase" }}>
                Randomize: {randomize <= 0.2 ? "Fixed" : randomize <= 0.5 ? "Low" : randomize <= 0.8 ? "Mid" : "High"}
                <span style={{ color: "#333", marginLeft: 6 }}>{randomize <= 0.2 ? "— nearly same output" : randomize <= 0.5 ? "— slight variation" : randomize <= 0.8 ? "— moderate variation" : "— very different each time"}</span>
              </label>
              <input type="range" min="0" max="1" step="0.1" value={randomize} onChange={e => setRandomize(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#f472b6" }} />
            </div>
          </div>

          {/* Section Cards */}
          {(() => {
            const totalSec = sections.reduce((sum, s) => sum + calcSectionSeconds(s.tag, bpm, getBars(s)), 0);
            const totalBars = sections.reduce((sum, s) => sum + getBars(s), 0);
            return (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: 1 }}>
                  Structure ({sections.length} sections) — drag to reorder
                </span>
                <span style={{ fontSize: 10, color: bpm > 0 ? (totalSec > 240 ? "#eab308" : "#22c55e") : "#333", fontWeight: 600 }}>
                  {bpm > 0 ? `${totalBars} bars · ${formatTime(totalSec)}` : "set BPM"}
                  {totalSec > 240 && <span style={{ color: "#ef4444", fontSize: 8, marginLeft: 4 }}>Suno max ~4:00</span>}
                </span>
              </div>
            );
          })()}

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
            {sections.map((s, i) => (
              <div key={s.id} draggable onDragStart={() => dragStart(i)} onDragOver={(e) => dragOver(e, i)} onDrop={() => drop(i)}
                style={{
                  background: dragIdx === i ? "#1a1a30" : "#0c0c12", border: `1px solid ${dragIdx === i ? "#7c3aed" : "#151520"}`,
                  borderRadius: 5, padding: "8px 10px", cursor: "grab",
                  borderLeft: `3px solid ${ENERGY_COLORS[s.energy] || "#333"}`
                }}>
                <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 1fr 1fr 50px 60px", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "#444", cursor: "grab", textAlign: "center" }} title={s.role}>
                    {ROLE_ICONS[s.role] || "·"}
                  </span>
                  <select value={s.tag} onChange={e => updateSection(i, "tag", e.target.value)}
                    style={{ ...iS, fontSize: 10, fontWeight: 500, color: "#c0c0cc" }}>
                    {SECTION_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select value={s.energy} onChange={e => updateSection(i, "energy", e.target.value)}
                    style={{ ...iS, fontSize: 9, color: ENERGY_COLORS[s.energy] || "#888" }}>
                    {ENERGY_LEVELS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  {!isInst ? (
                    <select value={s.vocal} onChange={e => updateSection(i, "vocal", e.target.value)}
                      style={{ ...iS, fontSize: 9 }}>
                      {VOCAL_TAGS.map(v => <option key={v} value={v}>{v || "(no vocal tag)"}</option>)}
                    </select>
                  ) : (
                    <span style={{ fontSize: 8, color: "#333", textAlign: "center" }}>—</span>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input type="number" value={getBars(s)} onChange={e => updateSection(i, "bars", e.target.value)}
                      min="1" max="64" style={{ width: 28, background: "#08080d", border: "1px solid #1a1a28", borderRadius: 3, padding: "3px 2px", color: "#888", fontSize: 9, fontFamily: "inherit", outline: "none", textAlign: "center" }} />
                    <span style={{ fontSize: 7, color: "#444" }}>bar</span>
                    {bpm > 0 && <span style={{ fontSize: 8, color: "#555", marginLeft: 2 }}>{formatTime(calcSectionSeconds(s.tag, bpm, getBars(s)))}</span>}
                  </div>
                  <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                    <button onClick={() => duplicateSection(i)} title="Duplicate"
                      style={{ background: "transparent", border: "1px solid #1a1a28", borderRadius: 3, padding: "2px 5px", color: "#555", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>⧉</button>
                    <button onClick={() => removeSection(i)} title="Remove"
                      style={{ background: "transparent", border: "1px solid #1a1018", borderRadius: 3, padding: "2px 5px", color: "#f87171", fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>×</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={addSection} style={{
            background: "#0e0e14", border: "1px dashed #2a2a38", borderRadius: 5, padding: "8px 0",
            color: "#555", fontSize: 10, cursor: "pointer", fontFamily: "inherit"
          }}>+ Add Section</button>
        </div>

        {/* RIGHT: Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>

          {/* Generate Button */}
          {pendingUpload && !analysisResult && (
            <div style={{ background: "#0d0a1a", border: "1px solid #2a1a4a", borderRadius: 5, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#8b5cf6", fontWeight: 600 }}>🎵 Upload your Suno mp3 → get analysis report + 1 bonus generate!</div>
            </div>
          )}

          <button onClick={generate} disabled={loading || sections.length === 0} style={{
            background: loading ? "#222" : "linear-gradient(135deg, #22d3ee, #06b6d4)",
            backgroundImage: loading ? "none" : undefined,
            color: loading ? "#666" : "#fff", border: "none", borderRadius: 6,
            padding: "14px 0", fontSize: 13, fontWeight: 700, cursor: loading ? "default" : "pointer",
            fontFamily: "inherit", letterSpacing: 0.5
          }}>
            {loading ? "⏳ GENERATING..." : `GENERATE ${isInst ? "INSTRUMENTAL" : "LYRICS"} PROMPT`}
          </button>

          {/* Preview / Result */}
          <div style={{ flex: 1, background: "#0c0c12", borderRadius: 6, padding: 14, border: "1px solid #151520", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>
                {result ? "AI-Generated Output" : "Structure Preview"}
                {editMode && <span style={{ color: "#eab308", fontSize: 8, marginLeft: 6 }}>● editing</span>}
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 9, color: charCount > 5000 ? "#ef4444" : charCount > 3000 ? "#eab308" : "#22c55e" }}>
                  {charCount} / 5000
                </span>
                {!editMode && result && <button onClick={() => { setEditMode(true); if (history.length > 0 && history[0].rating === null) { const u = [{ ...history[0], edits: { ...history[0].edits, original: result } }, ...history.slice(1)]; saveHistory(u); if (history[0].sbId) sbUpdate('lyrics_history', `id=eq.${history[0].sbId}`, { edit_original: result }); } }} style={{ background: "transparent", border: "1px solid #eab308", borderRadius: 4, padding: "4px 10px", fontSize: 9, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#eab308" }}>✎ Edit</button>}
                {editMode && <button onClick={() => { if (history.length > 0 && history[0].rating === null && history[0].sbId) { sbUpdate('lyrics_history', `id=eq.${history[0].sbId}`, { edit_final: result, edited: true }); } setEditMode(false); }} style={{ background: "transparent", border: "1px solid #1a1a28", borderRadius: 3, padding: "2px 6px", color: "#555", fontSize: 8, cursor: "pointer", fontFamily: "inherit" }}>Lock</button>}
                <button onClick={copyToClipboard} style={{
                  background: copied ? "#22c55e" : "#f472b6", color: "#000", border: "none", borderRadius: 4,
                  padding: "4px 12px", fontSize: 9, fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
                }}>{copied ? "COPIED!" : "COPY"}</button>
              </div>
            </div>

            {editMode ? (
              <textarea
                value={result || preview}
                onChange={e => { const v=e.target.value; setResult(v); if (history.length > 0 && history[0].rating === null) { const u = [{ ...history[0], prompt: v, edits: { ...history[0].edits, final: v, edited: true } }, ...history.slice(1)]; saveHistory(u); if(history[0].sbId)sbUpdate('lyrics_history',`id=eq.${history[0].sbId}`,{edit_final:v,edited:true,prompt:v}); } }}
                style={{
                  flex: 1, background: "#08080d", border: "1px solid #1a1a24", borderRadius: 5,
                  padding: 12, fontSize: 11, lineHeight: 1.8, color: "#c8c8d4",
                  fontFamily: "inherit", resize: "none", outline: "none", minHeight: 300
                }}
                placeholder="Click GENERATE to create the Lyrics field content..."
              />
            ) : (
              <div style={{
                flex: 1, background: "#08080d", border: "1px solid #1a1a24", borderRadius: 5,
                padding: 12, fontSize: 11, lineHeight: 1.8, color: result ? "#c8c8d4" : "#333",
                fontFamily: "inherit", minHeight: 300, overflowY: "auto", whiteSpace: "pre-wrap"
              }}>{result || preview || "Click GENERATE to create the Lyrics field content..."}</div>
            )}
          </div>

          {/* Energy Arc + Timeline */}
          <div style={{ background: "#0c0c12", borderRadius: 6, padding: "10px 14px", border: "1px solid #151520" }}>
            <div style={{ fontSize: 8, color: "#444", textTransform: "uppercase", marginBottom: 6 }}>Energy Arc {bpm > 0 && `· ${bpm} BPM`}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 50 }}>
              {sections.map((s, i) => {
                const h = s.energy === "High" ? 36 : s.energy === "Medium" ? 22 : s.energy.includes("→High") ? 30 : s.energy.includes("→Medium") ? 18 : 10;
                const cumSec = sections.slice(0, i).reduce((sum, x) => sum + calcSectionSeconds(x.tag, bpm, getBars(x)), 0);
                return (
                  <div key={s.id} style={{ flex: getBars(s), display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <div style={{
                      width: "100%", height: h, borderRadius: "3px 3px 0 0",
                      background: `linear-gradient(180deg, ${ENERGY_COLORS[s.energy] || "#333"}, ${ENERGY_COLORS[s.energy] || "#333"}44)`,
                      transition: "height 0.3s ease"
                    }} />
                    <span style={{ fontSize: 7, color: "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
                      {s.tag.replace(/\d+/, "").trim().slice(0, 5)}
                    </span>
                    {bpm > 0 && <span style={{ fontSize: 7, color: "#333" }}>{formatTime(cumSec)}</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div style={{ fontSize: 8, color: "#2a2a35", lineHeight: 1.5 }}>
            {isInst ? "INST mode: metatags only, no vocals. Drag sections to shape the energy arc. Claude will add instrument/mood cues." : "VOCAL mode: Claude writes actual lyrics + metatags. Set Language for Korean/English. Vocal tags control delivery per section."}
          </div>

          {/* Audio Analysis */}
          {history.length > 0 && (
            <div style={{ background: "#0a0a14", borderRadius: 6, padding: 14, border: "1px solid #1a1a2e", marginTop: 10 }}>
              <div style={{ fontSize: 9, color: "#8b5cf6", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>🎵 Suno Result Analysis</div>
              <div style={{ fontSize: 9, color: "#555", marginBottom: 4 }}>Upload your Suno mp3 → get analysis report + 1 bonus generate!</div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 8, color: "#444", marginBottom: 3 }}>Which prompt was this mp3 generated from?</div>
                <select value={selectedHistoryId || history[0]?.id || ""} onChange={e => { setSelectedHistoryId(Number(e.target.value)); setAnalysisResult(null); }} style={{ width: "100%", background: "#08080d", color: "#aaa", border: "1px solid #1a1a24", borderRadius: 4, padding: "6px 8px", fontSize: 9, fontFamily: "inherit" }}>
                  {history.map(h => (
                    <option key={h.id} value={h.id}>{h.genre} · {h.edits?.edited ? "✎ " : ""}{h.prompt?.slice(0, 60)}... · {new Date(h.ts).toLocaleString()}{h.analyzed ? " ✅" : ""}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="file" accept="audio/*" onChange={e => setAnalysisFile(e.target.files?.[0] || null)} style={{ fontSize: 9, color: "#888", flex: 1 }} />
                <button onClick={analyzeAudio} disabled={!analysisFile || analyzing} style={{ background: analysisFile && !analyzing ? "#8b5cf6" : "#333", color: "#fff", border: "none", borderRadius: 4, padding: "6px 14px", fontSize: 9, fontWeight: 700, cursor: analysisFile && !analyzing ? "pointer" : "not-allowed", fontFamily: "inherit", opacity: analysisFile && !analyzing ? 1 : 0.5 }}>
                  {analyzing ? "Analyzing..." : "Analyze"}
                </button>
              </div>
              {analysisResult && !analysisResult.error && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                    {[["Genre", analysisResult.evaluation?.genre_accuracy], ["BPM", analysisResult.evaluation?.bpm_accuracy], ["Instruments", analysisResult.evaluation?.instrument_accuracy], ["Mood", analysisResult.evaluation?.mood_accuracy], ["Structure", analysisResult.evaluation?.structure_accuracy]].map(([label, score]) => (
                      <div key={label} style={{ background: "#111", borderRadius: 4, padding: "4px 8px", fontSize: 9, textAlign: "center", border: `1px solid ${score >= 7 ? "#22c55e" : score >= 4 ? "#eab308" : "#ef4444"}22` }}>
                        <div style={{ color: "#666", fontSize: 7 }}>{label}</div>
                        <div style={{ color: score >= 7 ? "#22c55e" : score >= 4 ? "#eab308" : "#ef4444", fontWeight: 700 }}>{score}/10</div>
                      </div>
                    ))}
                    <div style={{ background: "#111", borderRadius: 4, padding: "4px 10px", fontSize: 9, textAlign: "center", border: "1px solid #8b5cf622" }}>
                      <div style={{ color: "#666", fontSize: 7 }}>Overall</div>
                      <div style={{ color: "#8b5cf6", fontWeight: 700, fontSize: 12 }}>{analysisResult.evaluation?.overall_score}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 9, color: "#aaa", lineHeight: 1.6, background: "#08080d", borderRadius: 4, padding: 8, border: "1px solid #1a1a24" }}>{analysisResult.evaluation?.summary}</div>
                  {analysisResult.evaluation?.token_feedback && (
                    <div style={{ marginTop: 6 }}>
                      <div style={{ fontSize: 8, color: "#555", marginBottom: 4 }}>Token Effectiveness:</div>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {analysisResult.evaluation.token_feedback.map((t, i) => (
                          <span key={i} title={t.reason} style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, cursor: "help", background: t.effectiveness === "high" ? "#22c55e22" : t.effectiveness === "medium" ? "#eab30822" : "#ef444422", color: t.effectiveness === "high" ? "#22c55e" : t.effectiveness === "medium" ? "#eab308" : "#ef4444", border: `1px solid ${t.effectiveness === "high" ? "#22c55e" : t.effectiveness === "medium" ? "#eab308" : "#ef4444"}33` }}>{t.token}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {analysisResult?.error && <div style={{ color: "#ef4444", fontSize: 9, marginTop: 6 }}>{analysisResult.error}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
