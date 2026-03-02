import React, { useState } from "react";

// PACE brand purple
const PACE_PURPLE = "#5C52E8";
const PACE_PURPLE_DARK = "#4840C4";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) setSubmitted(true);
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

        /* ✅ Logo agora fica DENTRO do container, não absolute na página */
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
          white-space: nowrap;   /* desktop wide */
        }

        .sub {
          font-size: clamp(14px, 1.2vw, 16px);
          color: #7A7872;
          margin: 0;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.65;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 520px;
        }

        .iphoneWrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ✅ Evita overflow em telas intermediárias */
        @media (max-width: 1100px) {
          .headlineLine { white-space: normal; }
        }

        /* ✅ Mobile layout */
        @media (max-width: 920px) {
          .wrap {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 0 16px;
          }

          .topbar {
            margin-bottom: 6px;
          }

          .left {
            align-items: center;
            text-align: center;
          }

          .form {
            width: 100%;
          }
        }
      `}</style>

      <div className="wrap">
        {/* ✅ Top-left brand (responsivo, preso ao container) */}
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

        {/* ─── LEFT SIDE ─── */}
        <div className="left">
          {/* Headline + Subheadline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <h1 className="headline">
              <span className="headlineLine">O mundo tira seu foco.</span>
              <span className="headlineLine">O PACE devolve.</span>
            </h1>
            <p className="sub">Organize seu foco. Evolua no seu ritmo.</p>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  padding: "13px 17px",
                  borderRadius: "10px",
                  border: `1.5px solid ${focusName ? PACE_PURPLE : "#DDD9D0"}`,
                  background: "#FAFAF7",
                  color: "#111111",
                  fontSize: "15px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "inherit",
                  fontWeight: 400,
                }}
                onFocus={() => setFocusName(true)}
                onBlur={() => setFocusName(false)}
              />

              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: "13px 17px",
                  borderRadius: "10px",
                  border: `1.5px solid ${focusEmail ? PACE_PURPLE : "#DDD9D0"}`,
                  background: "#FAFAF7",
                  color: "#111111",
                  fontSize: "15px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "inherit",
                  fontWeight: 400,
                }}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
              />

              <button
                type="submit"
                style={{
                  padding: "14px 24px",
                  borderRadius: "10px",
                  background: PACE_PURPLE,
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  fontFamily: "inherit",
                  transition: "background 0.2s",
                  marginTop: "4px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = PACE_PURPLE_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.background = PACE_PURPLE)}
              >
                Entrar na lista de espera
              </button>

              <p
                style={{
                  fontSize: "12px",
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
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: PACE_PURPLE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                  color: "#fff",
                  fontSize: "18px",
                }}
              >
                ✓
              </div>
              <p style={{ fontSize: "15px", color: "#111111", margin: 0, fontWeight: 500 }}>
                Muito Obrigado!
              </p>
              <p style={{ fontSize: "13px", color: "#7A7872", margin: "6px 0 0" }}>
                Avisaremos assim que o PACE estiver pronto.
              </p>
            </div>
          )}
        </div>

        {/* ─── RIGHT SIDE — iPhone Mockup com seu print ─── */}
        <div className="iphoneWrap">
          <IPhoneMock imageSrc="/home.png" />
        </div>
      </div>
    </div>
  );
}

function IPhoneMock({ imageSrc }: { imageSrc: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "min(300px, 82vw)",
          aspectRatio: "272 / 572",
          borderRadius: "50px",
          background: "#1A1A1E",
          boxShadow:
            "0 0 0 1px #38383C, 0 48px 96px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.05)",
          position: "relative",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          transform: "scaleY(0.965)",
          transformOrigin: "top",
        }}
      >
        {/* Side buttons */}
        <div
          style={{
            position: "absolute",
            left: "-3px",
            top: "118px",
            width: "3px",
            height: "34px",
            background: "#38383C",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-3px",
            top: "166px",
            width: "3px",
            height: "54px",
            background: "#38383C",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-3px",
            top: "232px",
            width: "3px",
            height: "54px",
            background: "#38383C",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-3px",
            top: "158px",
            width: "3px",
            height: "78px",
            background: "#38383C",
            borderRadius: "0 2px 2px 0",
          }}
        />

        {/* Screen */}
        <div
          style={{
            flex: 1,
            borderRadius: "38px",
            background: "#F5F4FB",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              height: 44,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#F5F4FB",
              position: "relative",
              zIndex: 3,
            }}
          >
            <div
              style={{
                width: "88px",
                height: "26px",
                background: "#1A1A1E",
                borderRadius: "20px",
              }}
            />
          </div>

          {/* ✅ Logo overlay corrigido:
              - não usa "height: 86px"
              - posiciona em relação ao topo real da tela, sem empurrar conteúdo
              - com background “transparente”, sem criar faixa */}
          <div
            style={{
              position: "absolute",
              top: 22,
              left: 20,
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            <img
              src="/PaceLogo.png"
              alt="PACE"
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                display: "block",
              }}
              draggable={false}
            />
          </div>

          {/* Print */}
          <div style={{ flex: 1, position: "relative" }}>
            <img
              src={imageSrc}
              alt="PACE app preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: "translateY(-8px)",
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}