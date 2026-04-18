const globe = Globe()
  (document.getElementById('globe-container'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .backgroundColor('#020b1a');

/* POINTS */
globe
  .pointsData(orgData)
  .pointLat(d => d.lat)
  .pointLng(d => d.lng)
  .pointColor(() => '#ff4d4d')
  .pointAltitude(0.02)
  .pointRadius(0.5);

/* PULSE */
globe
  .ringsData(orgData)
  .ringColor(() => t => `rgba(255,80,80,${1-t})`)
  .ringMaxRadius(3)
  .ringPropagationSpeed(1)
  .ringRepeatPeriod(1200);

const tooltip = document.getElementById("tooltip");
let currentPoint = null;

/* HOVER */
globe.onPointHover(point => {
  currentPoint = point;

  if (point) {
    tooltip.style.display = "block";

    tooltip.innerHTML = `
      <div style="text-align:center;">
        <strong>${point.name}</strong><br>
        <span style="font-size:13px; color:#555;">
          ${point.city}, ${point.country}
        </span><br>
        <span style="font-size:13px;">
          $${point.raised} / $${point.goal}
        </span>
      </div>
    `;
  } else {
    tooltip.style.display = "none";
  }
});

/* CLICK */
tooltip.addEventListener("click", () => {
  if (currentPoint) {
    window.location.href = `org.html?id=${currentPoint.id}`;
  }
});

globe.onPointClick(point => {
  window.location.href = `org.html?id=${point.id}`;
});

/* POSITION TOOLTIP ABOVE DOT */
document.addEventListener("mousemove", e => {
  if (!currentPoint) return;

  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;

  tooltip.style.left = (e.pageX - tooltipWidth / 2) + "px";
  tooltip.style.top = (e.pageY - tooltipHeight - 15) + "px";
});
