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
        background: "#F4F5F7", // Fundo levemente mais frio para combinar com o Dark Mode
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
          max-width: 1100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
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
          margin-bottom: 24px;
        }

        .brandWord {
          font-size: 22px;
          letter-spacing: 0.16em;
          color: #1A1A1A;
          text-transform: uppercase;
          font-weight: 800;
        }

        .left {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .headline {
          font-size: clamp(38px, 4vw, 50px);
          font-weight: 800;
          color: #111111;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .headlineLine {
          display: block;
        }

        .highlight {
          color: ${PACE_PURPLE};
        }

        .sub {
          font-size: clamp(16px, 1.2vw, 18px);
          color: #666666;
          margin: 0;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.6;
          max-width: 480px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 480px;
          width: 100%;
        }

        .input {
          padding: 16px 18px;
          border-radius: 12px;
          background: #FFFFFF;
          font-size: 16px;
          font-family: inherit;
          border: 1.5px solid #E5E5E5;
          outline: none;
          width: 100%;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .input::placeholder {
          color: #A0A0A0;
        }

        .submitBtn {
          padding: 16px 24px;
          border-radius: 12px;
          background: ${PACE_PURPLE};
          color: #FFFFFF;
          border: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.02em;
          font-family: inherit;
          margin-top: 8px;
          transition: transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 8px 16px rgba(92, 82, 232, 0.25);
        }

        .submitBtn:hover {
          opacity: 0.92;
          box-shadow: 0 12px 20px rgba(92, 82, 232, 0.3);
        }

        .submitBtn:active {
          transform: translateY(2px);
          box-shadow: 0 4px 8px rgba(92, 82, 232, 0.2);
        }

        .imageWrap {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .mockupImage {
          width: 100%;
          max-width: 360px;
          height: auto;
          filter: drop-shadow(0px 24px 48px rgba(0, 0, 0, 0.12));
          animation: float 6s ease-in-out infinite;
        }

        /* Animação suave de flutuação */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0px); }
        }

        @media (max-width: 1100px) {
          .wrap {
            gap: 48px;
            padding: 0 24px;
          }
        }

        @media (max-width: 920px) {
          .wrap {
            grid-template-columns: 1fr;
            gap: 56px;
            padding: 0 16px;
          }

          .topbar {
            justify-content: center;
            margin-bottom: 0px;
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

          .imageWrap {
            order: 2;
          }
          
          .mockupImage {
            max-width: 300px; /* Um pouco menor no mobile */
          }
        }

        @media (max-width: 640px) {
          .wrap {
            gap: 40px;
            padding: 0 8px;
          }

          .headline {
            font-size: clamp(34px, 10vw, 42px);
          }
        }
      `}</style>

      <div className="wrap">
        <div className="topbar">
          <img
            src="/PaceLogo.png"
            alt="PACE"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              display: "block",
            }}
            draggable={false}
          />
          <span className="brandWord">PACE</span>
        </div>

        <div className="left">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h1 className="headline">
              <span className="headlineLine">Pare de planejar.</span>
              <span className="headlineLine">Comece a executar.</span>
            </h1>
            <p className="sub">
              O PACE é o seu cockpit de alta performance. Unifique tarefas, hábitos e agenda em um único ecossistema inteligente.
            </p>
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
                  borderColor: focusName ? PACE_PURPLE : "#E5E5E5",
                  boxShadow: focusName ? "0 0 0 3px rgba(92,82,232,0.1)" : "0 2px 4px rgba(0,0,0,0.02)",
                }}
              />

              <input
                className="input"
                placeholder="Seu email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                style={{
                  borderColor: focusEmail ? PACE_PURPLE : "#E5E5E5",
                  boxShadow: focusEmail ? "0 0 0 3px rgba(92,82,232,0.1)" : "0 2px 4px rgba(0,0,0,0.02)",
                }}
              />

              <button className="submitBtn" type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Garantir meu acesso antecipado"}
              </button>

              {errorMsg && (
                <p style={{ margin: "8px 0 0", color: "#B42318", fontSize: 13, fontWeight: 500 }}>
                  {errorMsg}
                </p>
              )}

              <p
                style={{
                  fontSize: 13,
                  color: "#A0A0A0",
                  margin: "6px 0 0",
                  textAlign: "center",
                }}
              >
                Vagas limitadas no Beta Privado. Sem spam.
              </p>
            </form>
          ) : (
            <div
              style={{
                padding: "32px 24px",
                borderRadius: "16px",
                background: "#FFFFFF",
                border: "1px solid #E5E5E5",
                boxShadow: "0 12px 24px rgba(0,0,0,0.04)",
                textAlign: "center",
                maxWidth: "480px",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: PACE_PURPLE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "#fff",
                  fontSize: 20,
                  boxShadow: "0 8px 16px rgba(92, 82, 232, 0.25)",
                }}
              >
                ✓
              </div>

              <p style={{ fontSize: 18, color: "#111111", margin: 0, fontWeight: 700 }}>
                Lugar garantido!
              </p>

              <p style={{ fontSize: 15, color: "#666666", margin: "8px 0 0", lineHeight: 1.5 }}>
                Avisaremos no seu e-mail assim que o PACE estiver liberado para você. Prepare-se.
              </p>
            </div>
          )}
        </div>

        {/* Aqui substituímos a carcaça complexa pela imagem pura flutuante */}
        <div className="imageWrap">
          <img 
            src="public/homeWaitlist.png" 
            alt="PACE App Preview" 
            className="mockupImage" 
          />
        </div>
      </div>
    </div>
  );
}