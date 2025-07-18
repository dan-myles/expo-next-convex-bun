import baseConfig from "@acme/eslint-config/base"
import nextjsConfig from "@acme/eslint-config/nextjs"
import reactConfig from "@acme/eslint-config/react"

export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...nextjsConfig,
  ...reactConfig,
]
