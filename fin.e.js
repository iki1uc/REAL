export function REAL_SCAN() {

  // 1. Grunddaten laden
  const nc = NC || {};
  const cmd = CMD || {};
  const rom = ROM || {};
  const real = REAL || {};
  const line = LINE || {};

  // 2. Decode-Check (ISO 15415 Prinzip)
  const decodeOK = (nc.status !== "FAIL");

  // 3. Kontrast / Qualität / Struktur (Barcode-Grade Prinzip)
  const contrast = line.quality || 0.81;
  const angleDeg = (line.angle * 57.2958).toFixed(1);

  // 4. Issue-Count (Accessibility-Scan Prinzip)
  const issues = [
    nc.status !== "OK",
    cmd.state === "ERROR",
    rom.ready === false,
    contrast < 0.5
  ].filter(x => x).length;

  // 5. Score berechnen (0–100)
  const score = Math.max(0, Math.min(100,
    (decodeOK ? 40 : 0) +
    (contrast * 40) +
    (rom.ready ? 10 : 0) -
    (issues * 10)
  ));

  // 6. Ergebnis zurückgeben
  return {
    decode: decodeOK ? "OK" : "FAIL",
    winkel_deg: angleDeg,
    contrast_pct: Math.round(contrast * 100),
    rom_ready: rom.ready,
    nc_status: nc.status,
    cmd_state: cmd.state,
    issues,
    score,
    kommentar: score > 80 ? "Sehr gut" :
               score > 60 ? "Gut" :
               score > 40 ? "Mittel" :
               score > 20 ? "Schwach" :
               "Kritisch"
  };
}
export function REAL_SCAN() {

  const decodeOK = (NC.status !== "FAIL");
  const contrast = LINE.quality || 0.81;
  const angleDeg = (LINE.angle * 57.2958).toFixed(1);

  const issues = [
    NC.status !== "OK",
    CMD.state === "ERROR",
    ROM.ready === false,
    contrast < 0.5
  ].filter(x => x).length;

  const score = Math.max(0, Math.min(100,
    (decodeOK ? 40 : 0) +
    (contrast * 40) +
    (ROM.ready ? 10 : 0) -
    (issues * 10)
  ));

  return {
    decode: decodeOK ? "OK" : "FAIL",
    winkel_deg: angleDeg,
    contrast_pct: Math.round(contrast * 100),
    rom_ready: ROM.ready,
    nc_status: NC.status,
    cmd_state: CMD.state,
    issues,
    score,
    kommentar: score > 80 ? "Sehr gut" :
               score > 60 ? "Gut" :
               score > 40 ? "Mittel" :
               score > 20 ? "Schwach" :
               "Kritisch"
  };
}
