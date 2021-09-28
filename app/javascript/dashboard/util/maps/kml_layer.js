export function getKMLLayerAsString(latLngs) {
  const { latitude: startLat, longitude: startLng } = latLngs[0];
  const { latitude: endLat, longitude: endLng } = latLngs.slice(-1)[0];
  const coordinates = latLngs
    .map(({ latitude, longitude }) => `${longitude}, ${latitude}`)
    .join(' ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Run Path</name>
    <Style id="start-placemark">
      <IconStyle>
        <Icon>
          <href>https://maps.google.com/mapfiles/kml/paddle/go-lv.png</href>
        </Icon>
      </IconStyle>
    </Style>
    <Style id="end-placemark">
      <IconStyle>
        <Icon>
          <href>https://maps.google.com/mapfiles/kml/paddle/stop-lv.png</href>
        </Icon>
      </IconStyle>
    </Style>
    <Placemark>
      <name>Start position</name>
      <styleUrl>#start-placemark</styleUrl>
      <Point>
        <coordinates>${startLng}, ${startLat}</coordinates>
      </Point>
    </Placemark>
    <Placemark>
      <name>End position</name>
      <styleUrl>#end-placemark</styleUrl>
      <Point>
        <coordinates>${endLng}, ${endLat}</coordinates>
      </Point>
    </Placemark>
    <Placemark>
      <name>Run Route</name>
      <LineString>
        <coordinates>${coordinates}</coordinates>
      </LineString>
    </Placemark>
  </Document>
</kml>
`;
}
