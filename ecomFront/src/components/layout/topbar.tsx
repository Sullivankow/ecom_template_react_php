import React from "react";

const promoText = "🎉 Livraison offerte dès 50€ d'achat ! Profitez-en aujourd'hui seulement ! 🎉";

const Topbar: React.FC = () => {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #2563eb 0%, #22c55e 50%, #0a224e 100%)",
        minHeight: 36,
      }}
    >
      <div className="whitespace-nowrap animate-marquee text-white font-semibold text-sm py-2 px-4">
        {promoText}
      </div>
    </div>
  );
};

export default Topbar;

