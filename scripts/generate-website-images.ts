import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const zai = await ZAI.create();

const outputDir = './public/images';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = [
  {
    name: 'hero-athlete.jpg',
    prompt: 'Professional athlete in dynamic pose, mid-air jump, black and white photography, high contrast, dramatic lighting, motion blur background, sports photography, elite athlete, powerful, cinematic, Nike style',
    size: '1440x720' as const,
  },
  {
    name: 'product-shoe.jpg',
    prompt: 'Premium athletic sneaker, product photography, minimalist white background, studio lighting, sleek design, modern sportswear, Nike style, high quality, professional, side view',
    size: '1024x1024' as const,
  },
  {
    name: 'collection-men.jpg',
    prompt: 'Male athlete training, gym environment, dynamic action shot, black and white, dramatic shadows, powerful pose, athletic wear, Nike campaign style, cinematic',
    size: '1344x768' as const,
  },
  {
    name: 'collection-women.jpg',
    prompt: 'Female athlete running, outdoor track, sunset lighting, silhouette, powerful motion, athletic wear, Nike campaign style, cinematic, editorial',
    size: '1344x768' as const,
  },
  {
    name: 'collection-kids.jpg',
    prompt: 'Young athlete in motion, joyful expression, outdoor play, vibrant energy, athletic wear, Nike style, bright and dynamic, professional photography',
    size: '1344x768' as const,
  },
  {
    name: 'lifestyle-athlete.jpg',
    prompt: 'Elite athlete portrait, intense focus, dramatic lighting, black and white, close-up, determination, sweat detail, Nike campaign style, cinematic sports photography',
    size: '1440x720' as const,
  },
];

console.log('Starting image generation...');

for (const image of images) {
  try {
    console.log(`Generating: ${image.name}...`);

    const response = await zai.images.generations.create({
      prompt: image.prompt,
      size: image.size,
    });

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');
    const outputPath = path.join(outputDir, image.name);

    fs.writeFileSync(outputPath, buffer);

    console.log(`✓ Generated: ${image.name} (${buffer.length} bytes)`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`✗ Failed to generate ${image.name}:`, errorMessage);
  }
}

console.log('\nImage generation complete!');
