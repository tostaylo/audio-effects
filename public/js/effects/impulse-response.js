export default async function impulseResponse(context) {
  const convolver = new ConvolverNode(context);

  const response = await fetch(
    'sounds/rocksta-reactions-fender-twin-reverb-seiren-pro-l-a-8-4-45-45.wav'
  );
  const buffer = await response.arrayBuffer();
  await context.decodeAudioData(buffer, (decoded) => {
    convolver.buffer = decoded;
  });

  return convolver;
}
