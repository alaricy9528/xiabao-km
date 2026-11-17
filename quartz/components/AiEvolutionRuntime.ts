import type { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore: bundled as a CSS string by Quartz's esbuild pipeline
import evolutionStyle from "./styles/ai-evolution.scss"
// @ts-ignore: bundled as a CSS string by Quartz's esbuild pipeline
import consoleStyle from "./styles/ai-console.scss"
// @ts-ignore: bundled as an inline browser script by Quartz's esbuild pipeline
import script from "./scripts/ai-console.inline"

const AiEvolutionRuntime: QuartzComponentConstructor = () => {
  const Runtime: QuartzComponent = () => null
  Runtime.displayName = "AiEvolutionRuntime"
  // Keep the legacy stylesheet: the learning directory (.ai-learn) still uses
  // it. Both are scoped by distinct root classes so they never collide.
  Runtime.css = `${evolutionStyle}\n${consoleStyle}`
  Runtime.afterDOMLoaded = script
  return Runtime
}

export default AiEvolutionRuntime
