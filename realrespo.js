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
