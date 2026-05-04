import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

/**
 * Theme mapping for CSS variables
 */
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType<any>
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

/* -----------------------------
   CONTEXT
------------------------------ */

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

/* -----------------------------
   CHART CONTAINER
------------------------------ */

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

/* -----------------------------
   STYLE
------------------------------ */

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.theme || cfg.color
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            return `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, item]) => {
    const color =
      item.theme?.[theme as keyof typeof item.theme] || item.color
    return color ? `  --color-${key}: ${color};` : ""
  })
  .join("\n")}
}
`
          })
          .join("\n"),
      }}
    />
  )
}

/* -----------------------------
   TOOLTIP (FIXED)
------------------------------ */

type TooltipItem = {
  value: any
  name?: string
  dataKey?: string
  color?: string
  payload?: any
  type?: string
}

type ChartTooltipProps = {
  active?: boolean
  payload?: TooltipItem[]
  label?: any
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    ChartTooltipProps & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      labelFormatter?: (value: any, payload: any) => React.ReactNode
      formatter?: (value: any, name: any, item: any) => React.ReactNode
    }
>(
  (
    {
      active,
      payload,
      className,
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      formatter,
    },
    ref
  ) => {
    const { config } = useChart()

    if (!active || !payload?.length) return null

    const tooltipLabel =
      !hideLabel && label ? (
        <div className="font-medium">
          {labelFormatter ? labelFormatter(label, payload) : label}
        </div>
      ) : null

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] gap-1.5 rounded-lg border bg-background p-2 text-xs shadow",
          className
        )}
      >
        {tooltipLabel}

        <div className="grid gap-1.5">
          {payload.map((item, i) => {
            const key = item.dataKey || item.name || "value"
            const cfg = (config as any)[key] || {}

            const color = item.color || item.payload?.fill

            return (
              <div key={i} className="flex items-center gap-2">
                {!hideIndicator && (
                  <div
                    className="h-2 w-2 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                )}

                <span className="text-muted-foreground">
                  {cfg.label || item.name}
                </span>

                <span className="ml-auto font-mono">
                  {formatter
                    ? formatter(item.value, item.name, item)
                    : item.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)

ChartTooltipContent.displayName = "ChartTooltipContent"

/* -----------------------------
   LEGEND
------------------------------ */
const ChartTooltip = RechartsPrimitive.Tooltip
const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & any
>(({ payload, className }, ref) => {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div ref={ref} className={cn("flex gap-4", className)}>
      {payload.map((item: any) => {
        const key = item.dataKey || item.value
        const cfg = (config as any)[key] || {}

        return (
          <div key={key} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span>{cfg.label || item.value}</span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

/* -----------------------------
   EXPORTS
------------------------------ */

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}