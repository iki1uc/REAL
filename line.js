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
