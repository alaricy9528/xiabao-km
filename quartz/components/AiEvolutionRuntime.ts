import type { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore: bundled as a CSS string by Quartz's esbuild pipeline
import atlasStyle from "./styles/ai-atlas.scss"
// @ts-ignore: bundled as a CSS string by Quartz's esbuild pipeline
import consoleStyle from "./styles/ai-console.scss"
// @ts-ignore: bundled as an inline browser script by Quartz's esbuild pipeline
import script from "./scripts/ai-console.inline"

const AiEvolutionRuntime: QuartzComponentConstructor = () => {
  const Runtime: QuartzComponent = () => null
  Runtime.displayName = "AiEvolutionRuntime"
  // Home console (.ai-console) and learning atlas (.ai-learn) share one visual
  // language but live under distinct roots, so their styles never collide.
  Runtime.css = `${atlasStyle}\n${consoleStyle}`
  Runtime.afterDOMLoaded = script
  return Runtime
}

export default AiEvolutionRuntime
