// EXPERIMENTAL

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import figlet from 'figlet';
import terminalImage from 'terminal-image';

import { PokemonResumo } from '../types/PokemonResumo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gifPath = path.join(__dirname, '../img/pokeball.gif');
const pokeballPath = path.join(__dirname, '../img/pokeball.png');

if (process.env.TERM_PROGRAM === 'vscode') {
  //Fix VSCode terminal bug whe displaying the Unicode images
  process.env.TERM = 'xterm-256color';
  delete process.env.TERM_PROGRAM;
}

async function loadImage(pokemon: PokemonResumo, height = '50%') {
  const response = await fetch(pokemon.img);

  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }

  const arrayBuffer = await response.arrayBuffer();

  return terminalImage.buffer(Buffer.from(arrayBuffer), {
    height: height,
    preserveAspectRatio: true,
  });
}

export async function showPokemonAnimation(
  pokemon: PokemonResumo,
): Promise<void> {
  const imagePromise = loadImage(pokemon, '70%');
  process.stdout.write('\u001Bc\u001B[3J');

  await new Promise<void>((resolve) => {
    const stopAnimation = terminalImage.gifFile(gifPath, {
      height: '70%',
    });
    setTimeout(() => {
      stopAnimation();
      resolve();
    }, 3000);
  });

  const image = await imagePromise;

  process.stdout.write('\u001Bc\u001B[3J');

  console.log(image);

  const banner = figlet.textSync(pokemon.nome);
  console.log(banner);
}

export async function listarCatalogoTerminal(
  catalogo: PokemonResumo[],
): Promise<void> {
  if (catalogo.length === 0) {
    console.log('O catálogo está vazio.');
    return;
  }
  const imagePromises = catalogo.map((pokemon) => loadImage(pokemon));
  const stopAnimation = terminalImage.gifFile(gifPath, {
    height: '50%',
  });

  const [images] = await Promise.all([Promise.all(imagePromises)]);

  stopAnimation();

  process.stdout.write('\u001Bc\u001B[3J');

  Object.values(catalogo).forEach((pokemon, index) => {
    try {
      const image = images[index];

      const imageLines = image.split('\n');

      const infoLines = [
        `Nome: ${pokemon.nome.toUpperCase()}`,
        `Id: ${String(pokemon.id)}`,
        `Altura: ${String(pokemon.altura * 10)}cm`,
        `Peso: ${String(pokemon.peso / 10)}kg`,
        `Tipos: ${pokemon.tipos.join(', ')}`,
      ];

      const biggestArrayLength = Math.max(imageLines.length, infoLines.length);

      for (let i = 0; i < biggestArrayLength; i++) {
        const imageLine = imageLines[i] || '';
        const infoLine = infoLines[i] || '';

        console.log(imageLine + '    ' + infoLine);
      }
      console.log('\n');
    } catch (error) {
      console.error(error);
    }
  });
}

export function listarPokemon(pokemon: PokemonResumo): void {
  console.log('==================================================');
  console.log(`Nome: ${pokemon.nome.toUpperCase()}`);
  console.log(`Id: ${String(pokemon.id)}`);
  console.log(`Altura: ${String(pokemon.altura * 10)}cm`);
  console.log(`Peso: ${String(pokemon.peso / 10)}kg`);
  console.log(`Tipos: ${pokemon.tipos.join(', ')}\n\n`);
}

export async function showMenu() {
  const image: string = await terminalImage.file(pokeballPath, {
    height: '50%',
    preserveAspectRatio: true,
  });

  const imageLines: string[] = image.split('\n');

  const figletLines = figlet.textSync('POKEDEX').split('\n');

  const infoLines = [
    ...figletLines,
    '=========================',
    ' INSTRUÇÕES DE USO:',
    ' Busque os seus Pokemons',
    ' 1. Buscar Pokemon ',
    ' 2. Listar Pokemons',
    ' 3. Remover Pokemon',
    ' 4. Sair',
  ];

  const biggestArrayLength = Math.max(imageLines.length, infoLines.length);

  for (let i = 0; i < biggestArrayLength; i++) {
    const imageLine = imageLines[i] || '';
    const infoLine = infoLines[i] || '';

    console.log(imageLine + '    ' + infoLine);
  }
  console.log('\n');
}
