import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RefObject } from "@react-types/shared";
import * as d3 from "d3";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { StatsCountCulturableSpeciesResponse } from "%api/statsCountCulturableSpecies/definitions";
import { THEME } from "%core/theme";

type Props = { data: StatsCountCulturableSpeciesResponse };

export const AppContainer: FC<Props> = ({ data }) => {
  const color = THEME.COLOR.PRIMARY_DARK;
  const svgRef = useRef<SVGSVGElement>(null);
  const scaleXRef = useRef<SVGGElement>(null);
  const scaleYRef = useRef<SVGGElement>(null);
  const { wrapperWidth, wrapperHeight, yLabelsWidth, graphWidth, graphHeight, scaleX, scaleY } =
    useDrawChart(data, svgRef, scaleXRef, scaleYRef);
  const { handleMouseEnter, handleMouseLeave, toolTipValue, isToolTipOpen } = useToolTip();

  return (
    <Tooltip
      title={toolTipValue}
      slotProps={{ popper: { disablePortal: true } }}
      followCursor={true}
      open={isToolTipOpen}
    >
      <Container
        ref={svgRef}
        width={wrapperWidth}
        height={wrapperHeight}
      >
        <g
          id="scaleX"
          ref={scaleXRef}
          transform={`translate(${yLabelsWidth}, ${graphHeight})`}
        ></g>
        <g
          id="scaleY"
          ref={scaleYRef}
          transform={`translate(${yLabelsWidth}, 0)`}
        ></g>
        <g
          id="graph"
          transform={`translate(${yLabelsWidth}, 1)`}
        >
          {(data ?? []).map((d, i) => {
            return (
              <Bar
                key={i}
                transform={`translate(0, ${scaleY(d.bin)})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => {
                  handleMouseEnter(`${d.bin} : ${d.frequency}`);
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                }}
              >
                <rect
                  width={graphWidth}
                  height={scaleY.bandwidth()}
                  fill={"transparent"}
                ></rect>
                <rect
                  width={scaleX(d.frequency)}
                  height={scaleY.bandwidth() - 1}
                  className="inner"
                ></rect>
              </Bar>
            );
          })}
        </g>
      </Container>
    </Tooltip>
  );
};

const Container = styled("svg")({
  width: "100%",
});
const Bar = styled("g")({
  cursor: "pointer",
  [".inner"]: {
    fill: THEME.COLOR.PRIMARY_DARK,
  },
  ["&:hover .inner"]: {
    fill: THEME.COLOR.PRIMARY,
  },
});

const useToolTip = () => {
  const [toolTipValue, setToolTipValue] = useState("");
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const handleMouseEnter = (value: string) => {
    setToolTipValue(value);
    setIsToolTipOpen(true);
  };
  const handleMouseLeave = () => {
    setToolTipValue("");
    setIsToolTipOpen(false);
  };
  return {
    toolTipValue,
    isToolTipOpen,
    handleMouseEnter,
    handleMouseLeave,
  };
};

const useDrawChart = (
  data: StatsCountCulturableSpeciesResponse | undefined,
  svgRef: RefObject<SVGSVGElement | null>,
  scaleXRef: RefObject<SVGGElement | null>,
  scaleYRef: RefObject<SVGGElement | null>
) => {
  const barHeight: number = 30;
  const yLabelsWidth: number = 80;
  const xLabelsHeight: number = 30;
  const [wrapperWidth, setWrapperWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (svgRef.current) {
        setWrapperWidth(svgRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);
  const graphHeight: number = useMemo(() => {
    return (data?.length ?? 0) * barHeight;
  }, [data]);
  const graphWidth: number = useMemo(() => {
    const tempResult = wrapperWidth - yLabelsWidth;
    return Math.max(tempResult, 0);
  }, [wrapperWidth, yLabelsWidth]);
  const wrapperHeight: number = useMemo(() => {
    return graphHeight + xLabelsHeight;
  }, [graphHeight, xLabelsHeight]);
  const graphMax = useMemo(() => {
    return data ? Math.ceil((d3.max(data, (d) => d.frequency) as number) / 100) * 100 : 0;
  }, [data]);

  const scaleX = useMemo(() => {
    return d3.scaleLinear().domain([0, graphMax]).range([0, graphWidth]);
  }, [graphMax, graphWidth]);
  const scaleY = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, graphHeight])
      .domain(data ? data.map((d) => d.bin) : []);
  }, [data, graphHeight]);

  useEffect(() => {
    if (!scaleXRef.current) return;
    d3.select(scaleXRef.current).call(d3.axisBottom(scaleX).ticks(5));
  }, [data, scaleXRef.current, graphWidth]);
  useEffect(() => {
    if (!scaleYRef.current) return;
    d3.select(scaleYRef.current).call(d3.axisLeft(scaleY));
  }, [data, scaleYRef.current]);

  return {
    wrapperWidth,
    wrapperHeight,
    barHeight,
    yLabelsWidth,
    xLabelsHeight,
    graphWidth,
    graphHeight,
    scaleY,
    scaleX,
  };
};
