import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

export function ScreenshotTool() {
	const captureScreenshot = async (elementId: string, filename: string) => {
		try {
			const element = document.getElementById(elementId) || document.body;

			const canvas = await html2canvas(element, {
				backgroundColor: '#ffffff',
				scale: 2, // Higher quality
				logging: false,
			});

			// Convert to blob and download
			canvas.toBlob((blob) => {
				if (blob) {
					const url = URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = url;
					link.download = `${filename}.png`;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(url);
				}
			});
		} catch (error) {
			console.error('Error al capturar pantalla:', error);
			alert('Error al capturar pantalla');
		}
	};

	return (
		<div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs">
			<div className="flex items-center gap-2 mb-3">
				<Download size={16} />
				<h3 className="font-semibold text-sm">Capturar Pantalla</h3>
			</div>
			<div className="space-y-2">
				<button
					onClick={() => captureScreenshot('root', 'screenshot')}
					className="w-full px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition"
				>
					📸 Capturar Actual
				</button>
				<p className="text-xs text-gray-500 text-center">
					La imagen se descargará automáticamente
				</p>
			</div>
		</div>
	);
}
