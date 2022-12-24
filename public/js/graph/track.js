const createTrackGraph = (nodes, track) =>
  nodes.reduce((acc, node) => acc.connect(node), track);

// const modifyTrack = (nodes, track, pos) => {
//   const newNodes = [...nodes.slice(pos)];
//   nodes.reverse().forEach((node) => node.disconnect());
//   return createTrack(newNodes, track);
// };

export { createTrackGraph };
