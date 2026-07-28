// REAL/realrespo.js
import NC from "./NC.scan";
import CMD from "./NC.command";
import ROM from "./ROM.build";
import LINE from "./line.js";
import REAL from "./REAL.json";

function deg(rad){ return (rad * 57.2958).toFixed(1); }
function pct(v){ return Math.round(v * 100); }

export function REAL_RESPO() {

    const out = {
        identität: REAL.id || "REAL-Q81",

        // NC.scan
        nc_status: NC.status || "OK",
        nc_level: NC.level || 1,

        // NC.command
        command: CMD.cmd || "NONE",
        command_state: CMD.state || "IDLE",

        // ROM.build
        rom_size: ROM.size || 0,
        rom_ready: ROM.ready || false,

        // line.js (° und %)
        winkel_deg: deg(LINE.angle || 0),
        erfüllung_pct: pct(LINE.quality || 0.81),

        // REAL.json
        real_value: REAL.value || 3,
        real_depth: REAL.depth || 1,

        // final score
        real_output: {
            score: pct(
                (LINE.quality || 0.81) *
                (REAL.value || 3) /
                (NC.level || 1)
            ),
            kommentar: "REAL‑RESPO Bewertung abgeschlossen."
        }
    };

    return out;
}
export function REAL_RESPO_POPUP(out) {
    const w = window.open("", "REAL-RESPO", "width=600,height=700");
    w.document.write(`
        <style>
            body { background:#000; color:#eee; font-family:Consolas; padding:20px; }
            pre { background:#111; padding:15px; border:1px solid #333; padding:10px; }
            h1 { color:#6cf; }
        </style>
        <h1>REAL‑RESPO · Output</h1>
        <pre>${JSON.stringify(out, null, 2)}</pre>
    `);
}
export function REAL_RESPO_HEATMAP(out) {
    const w = window.open("", "REAL-HEATMAP", "width=600,height=700");

    const pct = out.erfüllung_pct;
    const color = `hsl(${pct * 1.2}, 80%, 50%)`;

    w.document.write(`
        <style>
            body { background:#000; color:#eee; font-family:Consolas; padding:20px; }
            #map { width:400px; height:400px; background:${color}; border-radius:10px; }
        </style>
        <h1>REAL‑Heatmap</h1>
        <div id="map"></div>
        <pre>${JSON.stringify(out, null, 2)}</pre>
    `);
}
export function REAL_RESPO_3D(out) {
    const w = window.open("", "REAL-3D", "width=600,height=700");

    const size = 100 + out.intensität * 20;
    const color = `hsl(${out.erfüllung_pct * 1.2}, 80%, 50%)`;
    const depth = out.tiefe_z * 40;

    w.document.write(`
        <style>
            body { background:#000; color:#eee; font-family:Consolas; padding:20px; }
            #ball {
                width:${size}px;
                height:${size}px;
                background:${color};
                border-radius:50%;
                margin:150px auto;
                transform:translateZ(${depth}px);
                box-shadow:0 0 40px ${color};
            }
        </style>
        <h1>REAL‑3D‑Kugel</h1>
        <div id="ball"></div>
        <pre>${JSON.stringify(out, null, 2)}</pre>
    `);
}
export function REAL_RESPO_QMOVE(out) {
    const w = window.open("", "REAL-QMOVE", "width=600,height=700");

    const radius = 80 + out.distanz * 2;
    const speed = 0.5 + out.intensität * 0.1;
    const color = `hsl(${out.erfüllung_pct * 1.2}, 80%, 50%)`;

    w.document.write(`
        <style>
            body { background:#000; color:#eee; font-family:Consolas; padding:20px; }
            #orbit {
                width:${radius * 2}px;
                height:${radius * 2}px;
                border:1px solid #333;
                border-radius:50%;
                margin:100px auto;
                position:relative;
            }
            #dot {
                width:20px; height:20px;
                background:${color};
                border-radius:50%;
                position:absolute;
                left:${radius}px;
                top:0px;
                box-shadow:0 0 20px ${color};
            }
        </style>
        <h1>REAL‑Q‑Move</h1>
        <div id="orbit"><div id="dot"></div></div>
        <pre>${JSON.stringify(out, null, 2)}</pre>

        <script>
            let angle = 0;
            setInterval(()=>{
                angle += ${speed};
                const r = ${radius};
                const x = r + Math.cos(angle) * r;
                const y = r + Math.sin(angle) * r;
                document.getElementById("dot").style.left = x + "px";
                document.getElementById("dot").style.top  = y + "px";
            }, 20);
        </script>
    `);
}
