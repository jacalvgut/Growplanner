/**
 * Script para verificar los nombres esperados de las imágenes
 * Ejecutar con: node scripts/verificar-nombres-imagenes.js
 */

const trees = [
  { name: 'Aguacatero Hash', id: 'aguacaterohash' },
  { name: 'Aguacatero Cuba', id: 'aguacaterocuba' },
  { name: 'Naranjero 1', id: 'naranjero1' },
  { name: 'Naranjero 2', id: 'naranjero2' },
  { name: 'Peral', id: 'peral' },
  { name: 'Manzanero', id: 'manzanero' },
  { name: 'Ciruelero', id: 'ciruelero' },
  { name: 'Limonero', id: 'limonero' },
];

function normalizeImageName(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
    .replace(/\s+/g, '') // Elimina espacios
    .trim();
}

console.log('=== NOMBRES DE ARCHIVOS ESPERADOS ===\n');
console.log('Coloca las imágenes en: public/images/fruit-trees/\n');

trees.forEach((tree) => {
  const normalized = normalizeImageName(tree.name);
  console.log(`${tree.name.padEnd(20)} -> ${normalized}.jpg o ${normalized}.png`);
});

console.log('\n=== RUTAS COMPLETAS ===\n');
trees.forEach((tree) => {
  const normalized = normalizeImageName(tree.name);
  console.log(`/images/fruit-trees/${normalized}.jpg`);
  console.log(`/images/fruit-trees/${normalized}.png`);
});

