const { PI, sqrt, asin, sin, cos } = Math;
const RadDegRatio = PI / 180;
const EarthAvgDiameter = 12742;

const degToRad = (deg) => deg * RadDegRatio;
const roundToMeters = (distance) => Math.round(distance * 1000) / 1000;

export const calculateDistance = (startLatLng, endLatLng) => {
  const { latitude: startLat, longitude: startLng } = startLatLng;
  const { latitude: endLat, longitude: endLng } = endLatLng;

  const firstSin = sin(degToRad(endLat - startLat) / 2);
  const secondSin = sin(degToRad(endLng - startLng) / 2);
  const firstCos = cos(degToRad(startLat));
  const secondCos = cos(degToRad(endLat));
  const sqrtRoot = sqrt(firstSin ** 2 + firstCos * secondCos * secondSin ** 2);
  const distance = EarthAvgDiameter * asin(sqrtRoot);

  return roundToMeters(distance);
};
