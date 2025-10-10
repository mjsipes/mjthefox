export function AsciiArrow({ direction }: { direction: "left" | "right" }) {
  if (direction === "right") {
    return (
      <>
        <span className="group-hover:text-sipes-blue opacity-0 group-hover:opacity-100">-</span>
        <span className="group-hover:text-sipes-orange opacity-0 group-hover:opacity-100">-</span>
        <span className="group-hover:text-sipes-green opacity-0 group-hover:opacity-100">&gt;</span>
      </>
    );
  }

  return (
    <>
      <span className="group-hover:text-sipes-green opacity-0 group-hover:opacity-100">&lt;</span>
      <span className="group-hover:text-sipes-orange opacity-0 group-hover:opacity-100">-</span>
      <span className="group-hover:text-sipes-blue opacity-0 group-hover:opacity-100">-</span>
    </>
  );
}
