import React from "react";

type SVGFilterProps = {
  filterId: string;
  fixedRectId: string;
  rectIds: Array<{
    id: string;
    prefixedId: string;
  }>;
};

const SVGFilter: React.FC<SVGFilterProps> = ({
  filterId,
  fixedRectId,
  rectIds,
}) => (
  <defs>
    <filter id={filterId} x="0" y="0" width="100%" height="100%">
      {/* Reference the fixed rectangle */}
      <feImage xlinkHref={`#${fixedRectId}`} result="fixed" />

      {/* Reference each floating rectangle */}
      {rectIds.map(({ prefixedId }) => (
        <feImage
          key={prefixedId}
          xlinkHref={`#${prefixedId}`}
          result={prefixedId}
        />
      ))}

      {/* Combine all floating rectangles */}
      <feMerge result="floatingCombined">
        {rectIds.map(({ prefixedId }) => (
          <feMergeNode key={prefixedId} in={prefixedId} />
        ))}
      </feMerge>

      {/* Find the overlap between fixed rectangle and floating rectangles */}
      <feComposite
        in="fixed"
        in2="floatingCombined"
        operator="in"
        result="overlap"
      />

      {/* Remove overlap from fixed rectangle (the key part for the cut-out effect) */}
      <feComposite
        in="fixed"
        in2="overlap"
        operator="out"
        result="fixedFinal"
      />

      {/* Remove overlap from floating rectangles */}
      <feComposite
        in="floatingCombined"
        in2="overlap"
        operator="out"
        result="floatingFinal"
      />

      {/* Merge the non-overlapping parts */}
      <feMerge>
        <feMergeNode in="fixedFinal" />
        <feMergeNode in="floatingFinal" />
      </feMerge>
    </filter>
  </defs>
);

export default SVGFilter;
