export default function waveformVisualizer(analyser) {
	analyser.fftSize = 2048;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);
	analyser.getByteTimeDomainData(dataArray);

	var canvas = document.getElementById('visualizer');
	var canvasCtx = canvas.getContext('2d');
	const WIDTH = canvas.width;
	const HEIGHT = canvas.height;

	canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

	function draw() {
		requestAnimationFrame(draw);
		analyser.getByteTimeDomainData(dataArray);

		canvasCtx.fillStyle = 'rgb(200, 200, 200)';
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

		canvasCtx.lineWidth = 2;
		canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
		canvasCtx.beginPath();

		const sliceWidth = (WIDTH * 1.0) / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = (v * HEIGHT) / 2;

			if (i === 0) {
				canvasCtx.moveTo(x, y);
			} else {
				canvasCtx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		canvasCtx.lineTo(canvas.width, canvas.height / 2);
		canvasCtx.stroke();
	}

	draw();
}
