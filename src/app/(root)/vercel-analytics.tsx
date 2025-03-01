import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const VercelAnalytics = () => {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default VercelAnalytics;
