import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
// Avoid deep type imports to keep compatibility across Recharts versions

// Typed CustomTooltip with inverted theme: light=dark tooltip, dark=light tooltip
type LocalValueType = number | string;
type LocalNameType = string | number;
type LocalPayload = {
  color?: string;
  value?: LocalValueType;
  name?: LocalNameType;
};
type CustomTooltipProps = TooltipProps<LocalValueType, LocalNameType>;
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const labelText = new Date(label as any).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const items = (payload ?? []) as LocalPayload[];
  return (
    <div className='rounded-md border p-2 shadow-sm bg-gray-900 text-gray-100 border-gray-700 dark:bg-white dark:text-gray-900 dark:border-gray-200'>
      <div className='text-xs opacity-80 mb-1'>{labelText}</div>
      {items.map((item, idx) => (
        <div
          key={idx}
          className='flex items-center gap-2 text-sm'
        >
          <span
            className='inline-block h-2 w-2 rounded-full'
            style={{ backgroundColor: (item.color as string) || "#8884d8" }}
          />
          <span>{`$${Number(item.value as number).toLocaleString("en")}`}</span>
        </div>
      ))}
    </div>
  );
};
const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = [...(data?.purchaseSummary || [])].reverse();

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className='flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl'>
      {isLoading ? (
        <div className='m-5'>Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className='text-lg font-semibold mb-2 px-7 pt-5'>
              Purchase Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className='mb-4 mt-7 px-7'>
              <p className='text-xs text-gray-400'>Purchased</p>
              <div className='flex items-center'>
                <p className='text-2xl font-bold'>
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalValue).format("$0.00a")
                    : "$0.00"}
                </p>

                {lastDataPoint && (
                  <p
                    className={`text-sm ${
                      lastDataPoint.changePercentage! >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } flex ml-3`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className='w-5 h-5 mr-1' />
                    ) : (
                      <TrendingDown className='w-5 h-5 mr-1' />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            {/* CHART */}
            <ResponsiveContainer
              width='100%'
              height={200}
              className='p-2'
            >
              <AreaChart
                data={purchaseData}
                margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
              >
                <XAxis
                  dataKey='date'
                  tick={false}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  tick={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type='linear'
                  dataKey='totalValue'
                  stroke='#8884d8'
                  fill='#8884d8'
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
