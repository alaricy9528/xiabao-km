import type { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore: bundled as a CSS string by Quartz's esbuild pipeline
import style from "./styles/ai-evolution.scss"
// @ts-ignore: bundled as an inline browser script by Quartz's esbuild pipeline
import script from "./scripts/ai-evolution.inline"

const AiEvolutionRuntime: QuartzComponentConstructor = () => {
  const Runtime: QuartzComponent = () => null
  Runtime.displayName = "AiEvolutionRuntime"
  Runtime.css = style
  Runtime.afterDOMLoaded = script
  return Runtime
}

export default AiEvolutionRuntime
