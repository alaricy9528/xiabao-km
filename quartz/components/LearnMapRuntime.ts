import type { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore: bundled as an inline browser script by Quartz's esbuild pipeline
import script from "./scripts/ai-learn-map.inline"

const LearnMapRuntime: QuartzComponentConstructor = () => {
  const Runtime: QuartzComponent = () => null
  Runtime.displayName = "LearnMapRuntime"
  Runtime.afterDOMLoaded = script
  return Runtime
}

export default LearnMapRuntime
