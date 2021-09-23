const { PI, sqrt, asin, sin, cos } = Math;
const RadDegRatio = PI / 180;
const EarthAvgDiameter = 12742;

const degToRad = (deg) => deg * RadDegRatio;

export const calculateDistance = (
  { lat: lat1, lng: lng1 },
  { lat: lat2, lng: lng2 }
) =>
  EarthAvgDiameter *
  asin(
    sqrt(
      sin(degToRad(lat2 - lat1) / 2) ** 2 +
        cos(degToRad(lat1)) *
          cos(degToRad(lat2)) *
          sin(degToRad(lng2 - lng1) / 2) ** 2
    )
  );
