interface IDiffusionLabImageGenerationData {
  clientId: number,
  model: string,
  prompt: {
    positive: string,
    negative: string
  },
  steps: number, // the number of diffusion steps (20 by default)
  dimensions: { width: number, height: number },
  seed: number, // use specific seed if provided otherwise use -1 for random
  extensions: { name: string, options: any }[],
  vae?: string,
  batch: {
    size: number,
    quantity: number
  }
}

export { type IDiffusionLabImageGenerationData }
