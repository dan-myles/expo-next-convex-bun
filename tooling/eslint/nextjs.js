import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  ...compat.config({
    extends: ["plugin:@next/next/recommended"],
  }),
]
