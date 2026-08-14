import type { QuartzComponent, QuartzComponentConstructor } from "./types"

// @ts-ignore: bundled as a CSS string by Quartz's esbuild pipeline
import style from "./styles/quantum-garden.scss"
// @ts-ignore: bundled as an inline browser script by Quartz's esbuild pipeline
import script from "./scripts/quantum-garden.inline"

const QuantumGardenRuntime: QuartzComponentConstructor = () => {
  const Runtime: QuartzComponent = () => null
  Runtime.displayName = "QuantumGardenRuntime"
  Runtime.css = style
  Runtime.afterDOMLoaded = script
  return Runtime
}

export default QuantumGardenRuntime
