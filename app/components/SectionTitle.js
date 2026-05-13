export default function SectionTitle({ children }) {
  return (
    <div className="section-title-wrap">
      <h2 className="section-title">
        <span className="section-bracket">[ </span>
        {children}
        <span className="section-bracket"> ]</span>
      </h2>
      <span className="section-divider"></span>
    </div>
  );
}
