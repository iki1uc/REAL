# REAL – Scan System

Dieses System führt einen vollständigen REAL‑SCAN durch:

- Code‑Analyse
- NC‑Status
- CMD‑Status
- ROM‑Status
- REAL.json‑Status
- line.js (° und %)
- respo.tmp
- Fehler‑Analyse
- Score‑Berechnung (0–100)

## Dateien

| Datei | Funktion |
|-------|----------|
| FAIL.html | Fehler‑Scan |
| FIT.html | Fitness‑Scan |
| FIX.html | Reparatur‑Scan |
| REAL.json | Real‑Werte |
| NC.scan | Scan‑Status |
| NC.command | Befehls‑Status |
| ROM.build | Speicher‑Status |
| fin.e.js | Engine + REAL_SCAN |
| line.js | Winkel + Kontrast |

## Funktionen

### REAL_SCAN()
Bewertet das gesamte System und liefert:

- decode (OK/FAIL)
- winkel_deg
- contrast_pct
- rom_ready
- nc_status
- cmd_state
- issues
- score
- kommentar

### REAL_RESPO()
Zeigt Systemlage.

### Visualisierungen
- REAL‑SCAN Popup  
- REAL‑SCAN Heatmap  
- REAL‑SCAN 3D‑Kugel  
- REAL‑SCAN Q‑Move  
- REAL‑SCAN Dashboard  
- REAL‑SCAN Live‑Graph  
- REAL‑SCAN Score‑Bar  
- REAL‑SCAN Orbit‑Map  
- REAL‑SCAN ID‑Check  

