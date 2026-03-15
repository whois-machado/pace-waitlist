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
        fontFamily: "Inter, system-ui",
        background: "#F4F3F0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1040,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 96,
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/PaceLogo.png" width={48} />
            <span
              style={{
                fontWeight: 700,
                letterSpacing: "0.18em",
              }}
            >
              PACE
            </span>
          </div>

          <h1
            style={{
              fontSize: 48,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            O mundo tira seu foco.
            <br />
            O PACE devolve.
          </h1>

          <p style={{ color: "#7A7872" }}>
            Organize seu foco. Evolua no seu ritmo.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxWidth: 420,
              }}
            >
              <input
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusName(true)}
                onBlur={() => setFocusName(false)}
                style={{
                  padding: 14,
                  borderRadius: 10,
                  border: `1.5px solid ${
                    focusName ? PACE_PURPLE : "#DDD9D0"
                  }`,
                  background: "#FAFAF7",
                }}
              />

              <input
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                style={{
                  padding: 14,
                  borderRadius: 10,
                  border: `1.5px solid ${
                    focusEmail ? PACE_PURPLE : "#DDD9D0"
                  }`,
                  background: "#FAFAF7",
                }}
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: 14,
                  borderRadius: 10,
                  background: PACE_PURPLE,
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {loading ? "Entrando..." : "Entrar na lista de espera"}
              </button>

              {errorMsg && (
                <p style={{ color: "red", fontSize: 13 }}>{errorMsg}</p>
              )}
            </form>
          ) : (
            <p>Obrigado! Avisaremos quando o PACE lançar.</p>
          )}
        </div>

        {/* RIGHT SIDE PHONE */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 300,
              aspectRatio: "272 / 572",
              borderRadius: 50,
              background: "#1A1A1E",
              padding: 14,
              boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                borderRadius: 36,
                overflow: "hidden",
                height: "100%",
                position: "relative",
              }}
            >
              {/* MENU SCREEN */}
              <img
                src="/menuScreen.png"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}