import { useEffect, useRef, useState } from "react";

export const useToolTipEnabled = () => {
  const labelRef = useRef<HTMLSpanElement>(null);
  // cannot use useMemo as it depends on the ref;
  // instead, use useEffect to update the state
  const [toolTipEnabled, setToolTipEnabled] = useState(false);
  useEffect(() => {
    const offsetWidth = labelRef.current?.offsetWidth;
    const scrollWidth = labelRef.current?.scrollWidth;
    setToolTipEnabled(!!scrollWidth && !!offsetWidth && scrollWidth > offsetWidth);
  }, [labelRef]);
  return { labelRef, toolTipEnabled };
};
