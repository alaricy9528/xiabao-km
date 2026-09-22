import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components"
import QuantumGardenRuntime from "./quartz/components/QuantumGardenRuntime"
import AiEvolutionRuntime from "./quartz/components/AiEvolutionRuntime"

componentRegistry.register(
  "QuantumGardenRuntime",
  QuantumGardenRuntime,
  "project/quantum-garden-runtime",
)

componentRegistry.register("AiEvolutionRuntime", AiEvolutionRuntime, "project/ai-evolution-runtime")

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
