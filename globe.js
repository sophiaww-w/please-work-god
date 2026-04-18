const globe = Globe()
  (document.getElementById('globe-container'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .backgroundColor('#020b1a');

globe
  .pointsData(orgData)
  .pointLat(d => d.lat)
  .pointLng(d => d.lng)
  .pointColor(() => '#ff4d4d')
  .pointAltitude(0.02)
  .pointRadius(0.5);

globe
  .ringsData(orgData)
  .ringColor(() => t => `rgba(255,80,80,${1-t})`)
  .ringMaxRadius(3)
  .ringPropagationSpeed(1)
  .ringRepeatPeriod(1200);

const tooltip = document.getElementById("tooltip");
let currentPoint = null;

globe.onPointHover(point => {
  currentPoint = point;

  if (point) {
    tooltip.style.display = "block";
    tooltip.innerHTML = `
      <strong>${point.name}</strong><br>
      ${point.city}, ${point.country}<br>
      <span style="color:#0077ff;">Click to view</span>
    `;
  } else {
    tooltip.style.display = "none";
  }
});

tooltip.addEventListener("click", () => {
  if (currentPoint) {
    window.location.href = `org.html?id=${currentPoint.id}`;
  }
});

globe.onPointClick(point => {
  window.location.href = `org.html?id=${point.id}`;
});

document.addEventListener("mousemove", e => {
  tooltip.style.left = e.pageX + 12 + "px";
  tooltip.style.top = e.pageY + 12 + "px";
});
