import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components"
import QuantumGardenRuntime from "./quartz/components/QuantumGardenRuntime"

componentRegistry.register(
  "QuantumGardenRuntime",
  QuantumGardenRuntime,
  "project/quantum-garden-runtime",
)

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
