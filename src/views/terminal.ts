// EXPERIMENTAL

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import figlet from 'figlet';
import terminalImage from 'terminal-image';

import { PokemonResumo } from '../types/PokemonResumo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gifPath = path.join(__dirname, '../img/pokeball.gif');

if (process.env.TERM_PROGRAM === 'vscode') {
  process.env.TERM = 'xterm-256color';
  delete process.env.TERM_PROGRAM;
}

export async function showPokemonAnimation(
  pokemon: PokemonResumo,
): Promise<void> {
  async function loadImage() {
    const response = await fetch(pokemon.img);

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const arrayBuffer = await response.arrayBuffer();

    return terminalImage.buffer(Buffer.from(arrayBuffer), {
      height: '50%',
      preserveAspectRatio: true,
    });
  }

  const imagePromise = loadImage();
  console.clear();

  await new Promise<void>((resolve) => {
    const stopAnimation = terminalImage.gifFile(gifPath, {
      height: '50%',
    });

    setTimeout(() => {
      stopAnimation();
      resolve();
    }, 4000);
  });

  process.stdout.write('\u001Bc\u001B[3J');

  const image = await imagePromise;

  console.log(image);

  const banner = figlet.textSync(pokemon.nome);
  console.log(banner);
}

async function loadImage(pokemon: PokemonResumo) {
  const response = await fetch(pokemon.img);

  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }

  const arrayBuffer = await response.arrayBuffer();

  return terminalImage.buffer(Buffer.from(arrayBuffer), {
    height: '35%',
    preserveAspectRatio: true,
  });
}

export async function listarCatalogo(catalogo: PokemonResumo[]): Promise<void> {
  if (catalogo.length === 0) {
    console.log('O catálogo está vazio.');
    return;
  }
  const imagePromises = catalogo.map((pokemon) => loadImage(pokemon));

  const animationPromise = new Promise<void>((resolve) => {
    const stopAnimation = terminalImage.gifFile(gifPath, {
      height: '50%',
    });

    setTimeout(() => {
      stopAnimation();
      resolve();
    }, 5000);
  });

  const [images] = await Promise.all([
    Promise.all(imagePromises),
    animationPromise,
  ]);

  process.stdout.write('\u001Bc\u001B[3J');

  Object.values(catalogo).forEach((pokemon, index) => {
    try {
      const image = images[index];

      const imageLines = image.split('\n');

      const infoLines = [
        `Name: ${pokemon.nome}`,
        `Id: ${String(pokemon.id)}`,
        `Height: ${String(pokemon.altura)}`,
        `Weight: ${String(pokemon.peso)}`,
        `Type: ${pokemon.tipos.join(', ')}`,
      ];

      const biggestArrayLength = Math.max(imageLines.length, infoLines.length);

      for (let i = 0; i < biggestArrayLength; i++) {
        const imageLine = imageLines[i] || '';
        const infoLine = infoLines[i] || '';

        console.log(imageLine + '    ' + infoLine);
      }
    } catch (error) {
      console.error(error);
    }
  });
}
