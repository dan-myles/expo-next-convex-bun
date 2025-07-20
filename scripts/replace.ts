#!/usr/bin/env bun
import { existsSync } from "fs"
import { readdir, readFile, stat, writeFile } from "fs/promises"
import { join } from "path"
import * as prompts from "@clack/prompts"

type ReplaceOptions = {
  oldPrefix: string
  newPrefix: string
  excludeDirs: string[]
  includeExtensions: string[]
}

async function getAllFiles(
  dir: string,
  excludeDirs: string[],
  includeExtensions: string[],
): Promise<string[]> {
  const files: string[] = []

  async function traverse(currentDir: string) {
    const entries = await readdir(currentDir)

    for (const entry of entries) {
      const fullPath = join(currentDir, entry)
      const stats = await stat(fullPath)

      if (stats.isDirectory()) {
        if (!excludeDirs.includes(entry) && !entry.startsWith(".")) {
          await traverse(fullPath)
        }
      } else if (stats.isFile()) {
        const ext = entry.split(".").pop()?.toLowerCase()
        if (ext && includeExtensions.includes(ext)) {
          files.push(fullPath)
        }
      }
    }
  }

  await traverse(dir)
  return files
}

async function replaceInFile(
  filePath: string,
  oldPrefix: string,
  newPrefix: string,
): Promise<{ changed: boolean; matches: number }> {
  const content = await readFile(filePath, "utf-8")
  const regex = new RegExp(`@${oldPrefix}/`, "g")
  const specialRegex = new RegExp(`<TYPES>\\^@${oldPrefix}`, "g")

  const matches =
    (content.match(regex)?.length || 0) +
    (content.match(specialRegex)?.length || 0)

  if (matches === 0) {
    return { changed: false, matches: 0 }
  }

  let newContent = content.replace(regex, `@${newPrefix}/`)
  newContent = newContent.replace(specialRegex, `<TYPES>^@${newPrefix}`)
  await writeFile(filePath, newContent, "utf-8")

  return { changed: true, matches }
}

async function checkMonorepoRoot(): Promise<boolean> {
  // Check for common monorepo indicators
  const indicators = ["bun.lock", "turbo.json"]

  return indicators.some((file) => existsSync(file))
}

async function main() {
  console.log("🔄 Repository Package Prefix Replacer\n")

  // Check if we're likely in a monorepo root
  const isLikelyMonorepoRoot = await checkMonorepoRoot()

  if (!isLikelyMonorepoRoot) {
    console.log(
      "⚠️  Warning: This doesn't appear to be a monorepo root directory.",
    )
    console.log("   (No bun.lock or workspace config found)\n")
  }

  // Show warning and get confirmation
  console.log(
    "⚠️  WARNING: This script will modify files throughout the entire repository!",
  )
  console.log("   • Make sure you're in the ROOT of your monorepo")
  console.log("   • Ensure you have committed or backed up your changes")
  console.log(
    "   • This will replace ALL instances of @oldPrefix/* with @newPrefix/*\n",
  )

  const shouldContinue = await prompts.confirm({
    message: "Are you sure you want to continue?",
    initialValue: false,
  })

  if (!shouldContinue) {
    console.log("❌ Operation cancelled")
    process.exit(0)
  }

  // Get user input
  const oldPrefix = (await prompts.text({
    message: "Enter the current prefix to replace (without @):",
    placeholder: "acme",
    validate: (value) => {
      if (!value || value.trim().length === 0) {
        return "Please enter a valid prefix"
      }
      return
    },
  })) as string

  const newPrefix = (await prompts.text({
    message: "Enter the new prefix:",
    placeholder: "mycompany",
    validate: (value) => {
      if (!value || value.trim().length === 0) {
        return "Please enter a valid prefix"
      }
      if (value.includes("/") || value.includes("@")) {
        return "Prefix should not contain @ or /"
      }
      return
    },
  })) as string

  // Final confirmation with the actual replacement pattern
  console.log(
    `\n🔄 About to replace: @${oldPrefix.trim()}/* → @${newPrefix.trim()}/*`,
  )

  const finalConfirm = await prompts.confirm({
    message: "Proceed with replacement?",
    initialValue: false,
  })

  if (!finalConfirm) {
    console.log("❌ Operation cancelled")
    process.exit(0)
  }

  const options: ReplaceOptions = {
    oldPrefix: oldPrefix.trim(),
    newPrefix: newPrefix.trim(),
    excludeDirs: [
      "node_modules",
      ".git",
      "dist",
      "build",
      ".next",
      "coverage",
      ".turbo",
      ".cache",
    ],
    includeExtensions: [
      "ts",
      "tsx",
      "js",
      "cjs",
      "mjs",
      "jsx",
      "json",
      "md",
      "mdx",
      "yaml",
      "yml",
    ],
  }

  console.log(`\n🔍 Searching for @${options.oldPrefix}/* patterns...`)
  console.log(`🚫 Excluding: ${options.excludeDirs.join(", ")}`)
  console.log(`📄 File types: ${options.includeExtensions.join(", ")}\n`)

  try {
    // Get all files
    const files = await getAllFiles(
      ".",
      options.excludeDirs,
      options.includeExtensions,
    )

    console.log(`📊 Found ${files.length} files to check\n`)

    // Process files
    let totalMatches = 0
    let changedFiles = 0
    const results: { file: string; matches: number }[] = []

    for (const file of files) {
      try {
        const result = await replaceInFile(
          file,
          options.oldPrefix,
          options.newPrefix,
        )

        if (result.changed) {
          changedFiles++
          totalMatches += result.matches
          results.push({ file, matches: result.matches })
          console.log(
            `✅ ${file.replace("./", "")} (${result.matches} replacements)`,
          )
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error)
      }
    }

    // Summary
    console.log(`\n📈 Summary:`)
    console.log(`   Files changed: ${changedFiles}`)
    console.log(`   Total replacements: ${totalMatches}`)
    console.log(`   Pattern: @${options.oldPrefix}/* → @${options.newPrefix}/*`)

    if (totalMatches > 0) {
      console.log(`\n✨ Done! Remember to test your changes and commit them.`)
      console.log(
        `\n💡 P.S. Run 'bun clean' and 'bun install' before committing.`,
      )
    } else {
      console.log(`\n🤷 No matches found for @${options.oldPrefix}/*`)
    }
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

main().catch(console.error)
