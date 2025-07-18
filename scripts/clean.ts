#!/usr/bin/env bun
import { $ } from "bun"

class Spinner {
  private frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
  private interval: Timer | null = null
  private frameIndex = 0

  start(message: string) {
    process.stdout.write(`${this.frames[0]} ${message}`)
    this.interval = setInterval(() => {
      process.stdout.write(`\r${this.frames[this.frameIndex]} ${message}`)
      this.frameIndex = (this.frameIndex + 1) % this.frames.length
    }, 80)
  }

  succeed(message: string) {
    this.stop()
    console.log(`\r✅ ${message}`)
  }

  fail(message: string) {
    this.stop()
    console.log(`\r❌ ${message}`)
  }

  warn(message: string) {
    this.stop()
    console.log(`\r⚠️  ${message}`)
  }

  private stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }
}

async function checkTurboInstalled(): Promise<boolean> {
  try {
    await $`turbo --version`.quiet()
    return true
  } catch {
    return false
  }
}

async function runCleanTask(name: string, command: string[]) {
  try {
    await $`${command}`.quiet()
    return { success: true, name }
  } catch (error) {
    return { success: false, name, error }
  }
}

function showWarning() {
  const warningBox = `
╔═══════════════════════════════════════════════════════════════╗
║                          ⚠️  WARNING  ⚠️                      ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🗑️  CACHE AND NODE_MODULES HAVE BEEN CLEARED!                ║
║                                                               ║
║  📦 You MUST run the following command before continuing:     ║
║                                                               ║
║      bun install                                              ║
║                                                               ║
║  This will restore your dependencies and rebuild the cache.   ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`

  console.log(warningBox)
}

async function main() {
  console.log("🧹 Starting comprehensive clean operation...\n")

  // Check if Turbo is installed
  const spinner = new Spinner()
  spinner.start("Checking for Turbo installation")

  const hasTurbo = await checkTurboInstalled()

  if (hasTurbo) {
    spinner.succeed("Turbo detected - will clean workspaces")
  } else {
    spinner.warn("Turbo not found - skipping workspace clean")
  }

  console.log()

  // Prepare tasks
  const tasks = [
    {
      name: "Root Clean",
      command: ["git", "clean", "-xdf", "dist", "node_modules", ".cache"],
      spinner: new Spinner(),
    },
  ]

  if (hasTurbo) {
    tasks.push({
      name: "Workspace Clean",
      command: ["turbo", "run", "clean"],
      spinner: new Spinner(),
    })
  }

  // Start all spinners
  tasks[0].spinner.start(
    "Cleaning root (git clean -xdf dist node_modules .cache)",
  )

  if (tasks.length > 1) {
    await new Promise((resolve) => setTimeout(resolve, 100))
    console.log()
    tasks[1].spinner.start("Cleaning workspaces (turbo run clean)")
  }

  // Run tasks in parallel
  const results = await Promise.all(
    tasks.map((task) => runCleanTask(task.name, task.command)),
  )

  // Update spinners based on results
  results.forEach((result, index) => {
    const task = tasks[index]
    if (result.success) {
      if (result.name === "Root Clean") {
        task.spinner.succeed(
          "Root clean completed - removed dist, node_modules, and .cache",
        )
      } else {
        task.spinner.succeed("Workspace clean completed")
      }
    } else {
      task.spinner.fail(`${result.name} failed`)
      console.log("   Error:", result.error)
    }
  })

  const hasFailures = results.some((result) => !result.success)

  if (hasFailures) {
    console.log("\n💥 Some clean tasks failed!")
    process.exit(1)
  } else {
    console.log("\n🎉 All clean tasks completed successfully!")

    if (!hasTurbo) {
      console.log(
        "ℹ️  Note: Turbo was not installed, so workspace cleaning was skipped.",
      )
    }

    // Show the big warning
    showWarning()
  }
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n\n👋 Clean operation cancelled.")
  process.exit(0)
})

main().catch((error) => {
  console.error("\n💥 Unexpected error:", error)
  process.exit(1)
})
