import React from "react";

type SVGFilterProps = {
  rectIds: string[];
};

const SVGFilter: React.FC<SVGFilterProps> = ({ rectIds }) => (
  <defs>
    <filter id="subtract-overlap" x="0" y="0" width="100%" height="100%">
      <feImage xlinkHref="#fixedRect" result="fixed" />

      {rectIds.map((id) => (
        <feImage key={id} xlinkHref={`#${id}`} result={id} />
      ))}

      <feMerge result="floatingCombined">
        {rectIds.map((id) => (
          <feMergeNode key={id} in={id} />
        ))}
      </feMerge>

      <feComposite
        in="fixed"
        in2="floatingCombined"
        operator="in"
        result="overlap"
      />
      <feComposite
        in="fixed"
        in2="overlap"
        operator="out"
        result="fixedFinal"
      />
      <feComposite
        in="floatingCombined"
        in2="overlap"
        operator="out"
        result="floatingFinal"
      />

      <feMerge>
        <feMergeNode in="fixedFinal" />
        <feMergeNode in="floatingFinal" />
      </feMerge>
    </filter>
  </defs>
);

export default SVGFilter;
