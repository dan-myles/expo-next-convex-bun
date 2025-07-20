import baseConfig from "@acme/eslint-config/base"
import reactConfig from "@acme/eslint-config/react"

export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
]
