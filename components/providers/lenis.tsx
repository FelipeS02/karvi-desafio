import { FC, ReactNode } from 'react';

import ReactLenis from 'lenis/react';

const LenisProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15,
        wheelMultiplier: 0.7,
        gestureOrientation: 'vertical',
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
