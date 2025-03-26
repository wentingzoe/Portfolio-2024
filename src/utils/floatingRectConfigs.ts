
type Area = { minXPercent: number; maxXPercent: number; minYPercent: number; maxYPercent: number };
type RectConfig = {
  id: string;
  sizePercent: number;
  color?: string;
  area: Area;
};
type FixedRectSize = { widthPercent: number; heightPercent: number; xPercent: number; yPercent: number };

type DecorConfig = {
  fixedRectSize: FixedRectSize;
  rects: RectConfig[];
};


export const heroFloatingRectConfig: Record<"desktop" | "tablet" | "mobile", DecorConfig> = {
  desktop: {
    fixedRectSize: { widthPercent: 53, heightPercent: 100, xPercent: 0, yPercent: 0 },
    rects: [
      {
        id: "floatingRect",
        sizePercent: 12,
        area: {
        minXPercent: 41,
        maxXPercent: 56.6,
        minYPercent: 15,
        maxYPercent: 13, 
      },
      },
      {
        id: "smallRect",
        sizePercent: 6,
        area: {
        minXPercent: 23,
        maxXPercent: 56,
        minYPercent: 80,
        maxYPercent: 94,
      },
      },
    ],
  },
  tablet: {
  fixedRectSize: { widthPercent: 80, heightPercent: 80, xPercent: 0, yPercent: 0 },
  rects: [
    {
      id: "floatingRect",
      sizePercent: 10,
      area: {
        minXPercent: 12,
        maxXPercent: 10,
        minYPercent: 72,
        maxYPercent: 81,
      },
    },
    {
      id: "smallRect",
      sizePercent: 5,
      area: {
        minXPercent: 75,
        maxXPercent: 90,
        minYPercent: 10,
        maxYPercent: 20,
      },
    },
  ],
},
mobile: {
  fixedRectSize: { widthPercent: 100, heightPercent: 50, xPercent: 0, yPercent: 0 },
  rects: [
    {
      id: "floatingRect",
      sizePercent: 8,
      area: {
        minXPercent: 10,
        maxXPercent: 12,
        minYPercent: 43.6,
        maxYPercent: 50.8,
      },
    },
    {
      id: "smallRect",
      sizePercent: 4,
      area: {
        minXPercent: 46,
        maxXPercent: 60,
        minYPercent: 5.5,
        maxYPercent: 12.5,
      },
    },
  ],
},

};

export const contactFloatingRectConfig: Record<"desktop" | "tablet" | "mobile", DecorConfig> = {
  desktop: {
  fixedRectSize: { widthPercent: 80, heightPercent: 100, xPercent: 0, yPercent: 0 },
  rects: [
    {
      id: "floatingRect",
      sizePercent: 10,
      area: {
        minXPercent: 12,
        maxXPercent: 10,
        minYPercent: 72,
        maxYPercent: 81,
      },
    },
    {
      id: "smallRect",
      sizePercent: 5,
      area: {
        minXPercent: 75,
        maxXPercent: 90,
        minYPercent: 10,
        maxYPercent: 20,
      },
    },
  ],
},
  tablet: {
    fixedRectSize: { widthPercent: 56, heightPercent: 100, xPercent: 0, yPercent: 0 },
    rects: [
      {
        id: "floatingRect",
        sizePercent: 12,
        area: {
        minXPercent: 47,
        maxXPercent: 60,
        minYPercent: 15,
        maxYPercent: 30, 
      },
      },
      {
        id: "smallRect",
        sizePercent: 6,
        area: {
        minXPercent: 23,
        maxXPercent: 57,
        minYPercent: 80,
        maxYPercent: 94,
      },
      },
    ],
    
  },
  
mobile: {
  fixedRectSize: { widthPercent: 100, heightPercent: 50, xPercent: 0, yPercent: 0 },
  rects: [
    {
      id: "floatingRect",
      sizePercent: 8,
      area: {
        minXPercent: 10,
        maxXPercent: 12,
        minYPercent: 43.6,
        maxYPercent: 50.8,
      },
    },
    {
      id: "smallRect",
      sizePercent: 4,
      area: {
        minXPercent: 46,
        maxXPercent: 60,
        minYPercent: 5.5,
        maxYPercent: 12.5,
      },
    },
  ],
},

};
