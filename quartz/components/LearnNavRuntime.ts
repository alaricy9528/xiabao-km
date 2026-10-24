import type { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore: bundled as an inline browser script by Quartz's esbuild pipeline
import script from "./scripts/learn-nav.inline"

const LearnNavRuntime: QuartzComponentConstructor = () => {
  const Runtime: QuartzComponent = () => null
  Runtime.displayName = "LearnNavRuntime"
  Runtime.afterDOMLoaded = script
  return Runtime
}

export default LearnNavRuntime
