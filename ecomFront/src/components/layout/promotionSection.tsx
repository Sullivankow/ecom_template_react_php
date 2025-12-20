
import Button from "../ui/button";


const promotionImage = "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"; // Image vêtements Unsplash

const PromotionSection: React.FC = () => {
  return (
    <section style={{ width: "100%", position: "relative", margin: "2rem 0" }}>
      <img
        src={promotionImage}
        alt="Promotions en cours"
        style={{ width: "100%", height: "420px", display: "block", borderRadius: "12px", objectFit: "cover", filter: "brightness(0.7)" }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          color: "#fff",
          pointerEvents: "none"
        }}
      >
        <div style={{
          background: "#ff1744",
          color: "#fff",
          fontWeight: 900,
          fontSize: "2.2rem",
          padding: "0.5rem 2.5rem",
          borderRadius: "40px",
          boxShadow: "0 4px 24px #0008",
          marginBottom: "1.5rem",
          letterSpacing: "2px",
          textShadow: "0 2px 8px #0008",
          pointerEvents: "auto"
        }}>
          -50% SUR TOUT !
        </div>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem", textShadow: "0 2px 16px #000" }}>
          Promotions exceptionnelles sur la mode !
        </h2>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      >
        <a href="/promotions" style={{ textDecoration: "none", pointerEvents: "auto" }}>
          <Button>
            Voir toutes les promotions
          </Button>
        </a>
      </div>
    </section>
  );
};

export default PromotionSection;