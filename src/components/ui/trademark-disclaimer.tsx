/**
 * TrademarkDisclaimer
 * 
 * Required on every page that references ARDMS, RDMS, RDCS, RVT, RMSKS, CCI, or ARRT trademarks.
 * Establishes non-affiliation and nominative fair use context.
 */
export function TrademarkDisclaimer({ orgs = ["ARDMS"] }: { orgs?: string[] }) {
  const orgList = orgs.join(", ");
  return (
    <p className="mt-8 font-mono text-[0.6rem] leading-relaxed text-cream-dim/30 text-center px-4">
      SonoPrep is an independent study platform and is not affiliated with, endorsed by, or
      sponsored by {orgList} or any credentialing organization. {orgs.includes("ARDMS") ? "ARDMS, RDMS, RDCS, RVT, and RMSKS are registered trademarks of the American Registry for Diagnostic Medical Sonography." : ""}
      {orgs.includes("CCI") ? " CCI is a registered trademark of Cardiovascular Credentialing International." : ""}
      {orgs.includes("ARRT") ? " ARRT is a registered trademark of the American Registry of Radiologic Technologists." : ""}
      {" "}All trademarks are the property of their respective owners and are used here solely for
      nominative identification purposes.
    </p>
  );
}
