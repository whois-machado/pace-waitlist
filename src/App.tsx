import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const PACE_PURPLE = "#5C52E8";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export default function App() {
  const supabase = useMemo(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      setErrorMsg("Preencha nome e email.");
      return;
    }

    if (!supabase) {
      setErrorMsg("Supabase não configurado.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("waitlist").insert([
        {
          name: cleanName,
          email: cleanEmail,
        },
      ]);

      if (error) {
        const msg = String(error.message || "");

        if (error.code === "23505" || msg.toLowerCase().includes("duplicate")) {
          setErrorMsg("Esse email já está na lista 🙂");
          setSubmitted(true);
          return;
        }

        setErrorMsg(error.message);
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: "#F4F3F0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        padding: "48px 16px",
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        .wrap {
          width: 100%;
          max-width: 1040px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 96px;
          align-items: center;
          padding: 0 48px;
          position: relative;
        }

        .topbar {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          gap: 12px;
          user-select: none;
          margin-bottom: 14px;
        }

        .brandWord {
          font-size: 20px;
          letter-spacing: 0.16em;
          color: #1A1A1A;
          text-transform: uppercase;
          font-weight: 700;
        }

        .left {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .headline {
          font-size: clamp(34px, 3.8vw, 52px);
          font-weight: 700;
          color: #111111;
          line-height: 1.13;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .headlineLine {
          display: block;
          white-space: nowrap;
        }

        .sub {
          font-size: clamp(14px, 1.2vw, 16px);
          color: #7A7872;
          margin: 0;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.65;
          max-width: 520px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 520px;
          width: 100%;
        }

        .input {
          padding: 14px 16px;
          border-radius: 12px;
          background: #FAFAF7;
          font-size: 15px;
          font-family: inherit;
          border: 1.5px solid #DDD9D0;
          outline: none;
          width: 100%;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .submitBtn {
          padding: 14px 24px;
          border-radius: 12px;
          background: ${PACE_PURPLE};
          color: #FFFFFF;
          border: none;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: -0.01em;
          font-family: inherit;
          margin-top: 4px;
          transition: transform 0.18s ease, opacity 0.18s ease;
        }

        .submitBtn:hover {
          opacity: 0.96;
        }

        .submitBtn:active {
          transform: scale(0.985);
        }

        .iphoneWrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phoneShell {
          width: min(300px, 82vw);
          aspect-ratio: 272 / 572;
          border-radius: 50px;
          background: #1A1A1E;
          box-shadow:
            0 0 0 1px #38383C,
            0 48px 96px rgba(0,0,0,0.22),
            inset 0 0 0 1px rgba(255,255,255,0.05);
          position: relative;
          padding: 14px;
          display: flex;
          flex-direction: column;
          transform: scaleY(0.965);
          transform-origin: top;
        }

        .phoneScreen {
          flex: 1;
          border-radius: 38px;
          overflow: hidden;
          position: relative;
          background: #F5F4FB;
        }

        .phoneImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 1100px) {
          .headlineLine {
            white-space: normal;
          }

          .wrap {
            gap: 64px;
            padding: 0 24px;
          }
        }

        @media (max-width: 920px) {
          .wrap {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 0 12px;
          }

          .topbar {
            margin-bottom: 8px;
          }

          .left {
            align-items: center;
            text-align: center;
            gap: 28px;
          }

          .sub {
            max-width: 100%;
          }

          .form {
            max-width: 100%;
          }

          .iphoneWrap {
            order: 2;
          }
        }

        @media (max-width: 640px) {
          .wrap {
            gap: 36px;
            padding: 0 4px;
          }

          .brandWord {
            font-size: 18px;
          }

          .headline {
            font-size: clamp(32px, 11vw, 48px);
            line-height: 1.08;
          }

          .sub {
            font-size: 15px;
            line-height: 1.55;
          }

          .phoneShell {
            width: min(320px, 92vw);
          }
        }
      `}</style>

      <div className="wrap">
        <div className="topbar">
          <img
            src="/PaceLogo.png"
            alt="PACE"
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              display: "block",
            }}
            draggable={false}
          />
          <span className="brandWord">PACE</span>
        </div>

        <div className="left">
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h1 className="headline">
              <span className="headlineLine">O mundo tira seu foco.</span>
              <span className="headlineLine">O PACE devolve.</span>
            </h1>
            <p className="sub">Organize seu foco. Evolua no seu ritmo.</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="form">
              <input
                className="input"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusName(true)}
                onBlur={() => setFocusName(false)}
                style={{
                  borderColor: focusName ? PACE_PURPLE : "#DDD9D0",
                  boxShadow: focusName ? "0 0 0 3px rgba(92,82,232,0.08)" : "none",
                }}
              />

              <input
                className="input"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                style={{
                  borderColor: focusEmail ? PACE_PURPLE : "#DDD9D0",
                  boxShadow: focusEmail ? "0 0 0 3px rgba(92,82,232,0.08)" : "none",
                }}
              />

              <button className="submitBtn" type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar na lista de espera"}
              </button>

              {errorMsg && (
                <p style={{ margin: "8px 0 0", color: "#B42318", fontSize: 13 }}>
                  {errorMsg}
                </p>
              )}

              <p
                style={{
                  fontSize: 12,
                  color: "#B0ACA4",
                  margin: "2px 0 0",
                  letterSpacing: "0.01em",
                  textAlign: "center",
                }}
              >
                Beta privado. Sem spam.
              </p>
            </form>
          ) : (
            <div
              style={{
                padding: "28px 24px",
                borderRadius: "12px",
                background: "#FAFAF7",
                border: "1.5px solid #DDD9D0",
                textAlign: "center",
                maxWidth: "520px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: PACE_PURPLE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                ✓
              </div>

              <p style={{ fontSize: 15, color: "#111111", margin: 0, fontWeight: 500 }}>
                Muito Obrigado!
              </p>

              <p style={{ fontSize: 13, color: "#7A7872", margin: "6px 0 0" }}>
                Avisaremos assim que o PACE estiver pronto.
              </p>
            </div>
          )}
        </div>

        <div className="iphoneWrap">
          <div className="phoneShell">
            <div
              style={{
                position: "absolute",
                left: "-3px",
                top: "118px",
                width: 3,
                height: 34,
                background: "#38383C",
                borderRadius: "2px 0 0 2px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "-3px",
                top: "166px",
                width: 3,
                height: 54,
                background: "#38383C",
                borderRadius: "2px 0 0 2px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "-3px",
                top: "232px",
                width: 3,
                height: 54,
                background: "#38383C",
                borderRadius: "2px 0 0 2px",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "-3px",
                top: "158px",
                width: 3,
                height: 78,
                background: "#38383C",
                borderRadius: "0 2px 2px 0",
              }}
            />

            <div className="phoneScreen">
              <img src="/menuScreen.png" alt="PACE menu preview" className="phoneImage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}