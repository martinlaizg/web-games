#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'public', 'screenshots');
const BASE_URL = 'http://localhost:3001';

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
	fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

interface ScreenshotConfig {
	name: string;
	url: string;
	description: string;
}

const screenshots: ScreenshotConfig[] = [
	{
		name: 'home',
		url: `${BASE_URL}/`,
		description: 'Pantalla de inicio con catálogo de juegos',
	},
	{
		name: 'impostor-setup',
		url: `${BASE_URL}/impostor`,
		description: 'Pantalla de configuración del juego Impostor',
	},
	{
		name: 'toc-guide',
		url: `${BASE_URL}/toc`,
		description: 'Guía de reglas TOC',
	},
];

console.log('📸 Web Games - Herramienta de Captura de Pantallas');
console.log('='.repeat(50));
console.log('');
console.log('✅ Instrucciones para capturar pantallas:');
console.log('');

screenshots.forEach((config, index) => {
	console.log(`${index + 1}. ${config.name.toUpperCase()}`);
	console.log(`   Descripción: ${config.description}`);
	console.log(`   URL: ${config.url}`);
	console.log(`   Pasos:`);
	console.log(`     a) Abre la URL en tu navegador`);
	console.log(`     b) Presiona Cmd+Shift+4 para capturar región`);
	console.log(`     c) Guarda como: public/screenshots/${config.name}.png`);
	console.log('');
});

console.log('💡 Alternativa automática:');
console.log('   1. Asegúrate de que el servidor esté corriendo: npm run dev');
console.log('   2. Abre el navegador en dispositivo móvil: http://<tu-ip>:3001');
console.log('   3. En cada página, presiona botón de captura de pantalla del móvil');
console.log('   4. Mueve las imágenes a public/screenshots/');
console.log('');

console.log('📝 Formato de nombres esperados:');
screenshots.forEach((config) => {
	console.log(`   - ${config.name}.png (mínimo 390x844px para móvil)`);
});
console.log('');
console.log('✨ Una vez listo, actualiza el README con las rutas de imagen.');
