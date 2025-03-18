import { RefObject } from "@react-types/shared";
import { useQuery } from "@tanstack/react-query";
import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";
import {
  StatsCountCulturableSpeciesParams,
  StatsCountCulturableSpeciesResponse,
  statsCountCulturableSpeciesURL,
} from "%api/statsCountCulturableSpecies/definitions.ts";
import { getData } from "%core/network/getData.ts";
import { THEME } from "%core/theme.ts";

export const MediumSpeciesDistributionChart: FC<{}> = () => {
  const { data } = useGraphData();
  const color = THEME.COLOR.PRIMARY_DARK;
  const svgRef = useRef<SVGSVGElement>(null);
  const scaleXRef = useRef<SVGGElement>(null);
  const scaleYRef = useRef<SVGGElement>(null);
  const { wrapperWidth, wrapperHeight, yLabelsWidth, graphWidth, graphHeight, scaleX, scaleY } =
    useDrawChart(data, svgRef, scaleXRef, scaleYRef);

  return (
    <div className={"bg- flex w-full"}>
      <svg
        className={"w-full"}
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
          transform={`translate(${yLabelsWidth}, 0)`}
        >
          {(data ?? []).map((d, i) => {
            return (
              <g
                key={i}
                transform={`translate(0, ${scaleY(d.bin)})`}
                style={{ cursor: "pointer" }}
              >
                <rect
                  width={graphWidth}
                  height={scaleY.bandwidth()}
                  fill={"transparent"}
                ></rect>
                <rect
                  width={scaleX(d.frequency)}
                  height={scaleY.bandwidth()}
                  fill={color}
                ></rect>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

const useDrawChart = (
  data: StatsCountCulturableSpeciesResponse | undefined,
  svgRef: RefObject<SVGSVGElement | null>,
  scaleXRef: RefObject<SVGGElement | null>,
  scaleYRef: RefObject<SVGGElement | null>
) => {
  const wrapperWidth: number = svgRef.current?.clientWidth ?? 0;
  const barHeight: number = 30;
  const yLabelsWidth: number = 80;
  const xLabelsHeight: number = 30;
  const graphHeight: number = (data?.length ?? 0) * barHeight;
  const graphWidth: number = wrapperWidth - yLabelsWidth;
  const wrapperHeight: number = graphHeight + xLabelsHeight;
  const graphMax = data ? Math.ceil((d3.max(data, (d) => d.frequency) as number) / 100) * 100 : 0;
  const scaleX = d3
    .scaleLinear()
    .domain([0, Math.min(graphMax, 5000)])
    .range([0, graphWidth]);
  const scaleY = d3
    .scaleBand()
    .range([0, graphHeight])
    .domain(data ? data.map((d) => d.bin) : [])
    .padding(0.04);

  useEffect(() => {
    if (!scaleXRef.current) return;
    d3.select(scaleXRef.current).call(d3.axisBottom(scaleX).ticks(5));
  }, [data, scaleXRef]);
  useEffect(() => {
    if (!scaleYRef.current) return;
    d3.select(scaleYRef.current).call(d3.axisLeft(scaleY));
  }, [data, scaleYRef]);

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

const useGraphData = () => {
  const { data } = useQuery({
    queryKey: ["speciesDistribution"],
    queryFn: async () => {
      const response = await getData<
        StatsCountCulturableSpeciesResponse,
        StatsCountCulturableSpeciesParams
      >(statsCountCulturableSpeciesURL, {});
      if (!response.body) {
        throw new Error("No data found");
      }
      return response.body;
    },
    staleTime: 0,
  });

  return { data };
};
