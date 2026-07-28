Rechner 1:
  81.tmp
  X81
  pq.check(e)

Rechner 2:
  Q81
  TMP81
  transport.check(u)
pipeline.hw = {
    station1: {
        name: "GPU",
        competence: "engine.power"
    },
    station2: {
        name: "CPU",
        competence: "engine.logic"
    },
    station3: {
        name: "RAM",
        competence: "engine.memory"
    },
    station4: {
        name: "ROM",
        competence: "81.tmp"
    }
};
export function REAL_RESPO() {

    return {
        id: REAL.id || "GHOST-Q81",

        nc: {
            status: NC.status || "OK",
            level: NC.level || 1,
            cmd: CMD.cmd || "NONE",
            cmd_state: CMD.state || "IDLE"
        },

        rom: {
            size: ROM.size || 0,
            ready: ROM.ready || false
        },

        line: {
            deg: (LINE.angle * 57.2958).toFixed(1),
            pct: Math.round(LINE.quality * 100)
        },

        real: {
            value: REAL.value || 3,
            depth: REAL.depth || 1
        },

        score: Math.round(
            (LINE.quality || 0.81) *
            (REAL.value || 3) /
            (NC.level || 1) * 100
        )
    };
}
export function REAL_RESPO_POPUP(out) {
    const w = window.open("", "REAL-RESPO", "width=600,height=700");
    w.document.write(`
        <style>
            body { background:#000; color:#eee; font-family:Consolas; padding:20px; }
            pre { background:#111; padding:15px; border:1px solid #333; }
            h1 { color:#6cf; }
        </style>
        <h1>REAL‑RESPO</h1>
        <pre>${JSON.stringify(out, null, 2)}</pre>
    `);
}
export function REAL_RESPO_HEATMAP(out) {
    const w = window.open("", "REAL-HEATMAP", "width=600,height=700");

    const color = `hsl(${out.line.pct * 1.2}, 80%, 50%)`;

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

    const size = 100 + out.real.value * 20;
    const color = `hsl(${out.line.pct * 1.2}, 80%, 50%)`;
    const depth = out.real.depth * 40;

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

    const radius = 80 + out.nc.level * 10;
    const speed = 0.5 + out.real.value * 0.1;
    const color = `hsl(${out.line.pct * 1.2}, 80%, 50%)`;

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
