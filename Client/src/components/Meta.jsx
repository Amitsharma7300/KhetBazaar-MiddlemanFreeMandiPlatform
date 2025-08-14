// src/components/Meta.jsx
import { Helmet } from "react-helmet";

export default function Meta({ title, description, image, url }) {
  return (
    <Helmet>
      <title>{title || "KhetBazaar | Middleman-Free Mandi"}</title>
      <meta name="description" content={description || "Connect farmers directly with buyers. Real-time crop prices, secure deals, no middlemen."} />
      <meta name="keywords" content="KhetBazaar, mandi platform, middleman free, farmers market, crop prices, agriculture marketplace" />

      {/* Open Graph */}
      <meta property="og:title" content={title || "KhetBazaar"} />
      <meta property="og:description" content={description || "Fair crop deals, real-time prices, and secure contracts without middlemen."} />
      <meta property="og:image" content={image || "https://khetbazaar.vercel.app/og-image.jpg"} />
      <meta property="og:url" content={url || "https://khetbazaar.vercel.app/"} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "KhetBazaar"} />
      <meta name="twitter:description" content={description || "Direct farmer-to-buyer deals, no middlemen, better profits."} />
      <meta name="twitter:image" content={image || "https://khetbazaar.vercel.app/og-image.jpg"} />
    </Helmet>
  );
}
