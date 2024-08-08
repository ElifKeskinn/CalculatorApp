import React from "react";
const Display = React.forwardRef((props, ref) => (
  <section className="display">
    <p ref={ref}>{props.calc || "0"}</p>
  </section>
));

export default Display;
