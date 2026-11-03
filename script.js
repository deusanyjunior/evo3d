const stages = [
  {
    id: "amor",
    title: "Amor",
    dimension: "UMA DIMENSÃO",
    axis: "love",
    symbol: "♡",
    summary: "Ao evitar manifestar o amor, manifestamos indiferença.",
    note: "O eixo que nos aproxima e reconhece o próximo.",
    hint: "Uma direção de cada vez",
  },
  {
    id: "sabedoria",
    title: "Sabedoria",
    dimension: "UMA DIMENSÃO",
    axis: "wisdom",
    symbol: "✧",
    summary: "Ao evitarmos a sabedoria, nos tornamos ignorantes.",
    note: "Compreender para escolher e agir melhor.",
    hint: "Uma direção de cada vez",
  },
  {
    id: "caridade",
    title: "Caridade",
    dimension: "UMA DIMENSÃO",
    axis: "charity",
    symbol: "✳",
    summary: "Ao evitar a caridade, somos egoístas.",
    note: "Benevolência em pensamento, palavra e ação.",
    hint: "Uma direção de cada vez",
  },
  {
    id: "humildade",
    title: "Humildade",
    dimension: "UMA DIMENSÃO",
    axis: "humility",
    symbol: "≈",
    summary: "Ao evitar a humildade, somos orgulhosos.",
    note: "Servir, aprender e fazer o bem sem ostentação.",
    hint: "Uma direção de cada vez",
  },
  {
    id: "amor-sabedoria",
    title: "Amor + sabedoria",
    dimension: "DUAS DIMENSÕES",
    axes: ["love", "wisdom"],
    symbol: "♡✧",
    summary:
      "A sabedoria nos ajuda a compreender o bem; o amor e o livre-arbítrio nos permitem escolhê-lo.",
    note: "Conhecer o bem também nos convida a escolhê-lo.",
    hint: "Duas direções em diálogo",
  },
  {
    id: "amor-caridade",
    title: "Amor + caridade",
    dimension: "DUAS DIMENSÕES",
    axes: ["love", "charity"],
    symbol: "♡✳",
    summary:
      "O amor se expressa na prática da caridade: a intenção se confirma nos atos.",
    note: "A intenção ganha forma nos atos.",
    hint: "Duas direções em diálogo",
  },
  {
    id: "amor-humildade",
    title: "Amor + humildade",
    dimension: "DUAS DIMENSÕES",
    axes: ["love", "humility"],
    symbol: "♡≈",
    summary:
      "A compaixão pode domar o egoísmo e o orgulho, conduzindo ao devotamento e à humildade.",
    note: "Sair de si para acolher o outro.",
    hint: "Duas direções em diálogo",
  },
  {
    id: "caridade-humildade",
    title: "Caridade + humildade",
    dimension: "DUAS DIMENSÕES",
    axes: ["charity", "humility"],
    symbol: "✳≈",
    summary:
      "Caridade e humildade se complementam como caminho oposto ao egoísmo e ao orgulho.",
    note: "Servir sem buscar reconhecimento.",
    hint: "Duas direções em diálogo",
  },
  {
    id: "sabedoria-caridade",
    title: "Sabedoria + caridade",
    dimension: "DUAS DIMENSÕES",
    axes: ["wisdom", "charity"],
    symbol: "✧✳",
    summary:
      "A inteligência e os recursos que temos podem ser colocados a serviço da caridade.",
    note: "Partilhar com discernimento.",
    hint: "Duas direções em diálogo",
  },
  {
    id: "sabedoria-humildade",
    title: "Sabedoria + humildade",
    dimension: "DUAS DIMENSÕES",
    axes: ["wisdom", "humility"],
    symbol: "✧≈",
    summary:
      "Nossas diferentes aptidões e experiências permitem que cada pessoa contribua de forma útil.",
    note: "Saber que cada pessoa tem algo a oferecer.",
    hint: "Duas direções em diálogo",
  },
  {
    id: "completo",
    title: "A espiral completa",
    dimension: "TRÊS DIMENSÕES",
    axes: ["love", "wisdom", "charity", "humility", "time"],
    symbol: "e³",
    summary:
      "A verdadeira pessoa do bem é aquela que pratica a lei de justiça, de amor e de caridade na sua mais completa pureza.",
    note: "O caminho completo: virtudes em movimento, ao longo do tempo.",
    hint: "A jornada em três dimensões",
  },
];

const axisConfig = [
  {
    id: "love",
    label: "Amor",
    colorClass: "love",
    points: [
      [0, 0, 0],
      [10, 0, 0],
    ],
    labels: [{ text: "Amor", p: [10, 0, 0], anchor: "start", dx: 19, dy: 4 }],
  },
  {
    id: "wisdom",
    label: "Sabedoria",
    colorClass: "wisdom",
    points: [
      [0, 0, 0],
      [-10, 0, 0],
    ],
    labels: [
      { text: "Sabedoria", p: [-10, 0, 0], anchor: "end", dx: -20, dy: -2 },
    ],
  },
  {
    id: "charity",
    label: "Caridade",
    colorClass: "charity",
    points: [
      [0, 0, 0],
      [0, 0, 10],
    ],
    labels: [
      { text: "Caridade", p: [0, 0, 10], anchor: "start", dx: 15, dy: -5 },
    ],
  },
  {
    id: "humility",
    label: "Humildade",
    colorClass: "humility",
    points: [
      [0, 0, 0],
      [0, 0, -10],
    ],
    labels: [
      { text: "Humildade", p: [0, 0, -10], anchor: "end", dx: -15, dy: 15 },
    ],
  },
  {
    id: "time",
    label: "Tempo",
    colorClass: "time",
    points: [
      [0, 0, 0],
      [0, 15, 0],
    ],
    labels: [
      { text: "Tempo", p: [0, 15, 0], anchor: "middle", dx: 0, dy: -10 },
    ],
  },
];

const project = ([x, y, z]) => ({
  x: 320 + x * 15 + z * 9,
  y: 278 - y * 12 - z * 5 + x * 2.5,
});
const svgElement = (name, attrs = {}) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attrs))
    element.setAttribute(key, value);
  return element;
};

function drawChart(prefix, activeAxes = null, showSpiral = true) {
  const axesGroup = document.getElementById(`${prefix}-axes`);
  const labelsGroup = document.getElementById(`${prefix}-labels`);
  const gridGroup = document.getElementById(`${prefix}-grid`);
  const path = document.getElementById(`${prefix}-spiral`);
  const start = document.getElementById(`${prefix}-start`);
  const end = document.getElementById(`${prefix}-end`);
  if (!axesGroup || !labelsGroup || !gridGroup || !path || !start || !end)
    return;

  axesGroup.replaceChildren();
  labelsGroup.replaceChildren();
  gridGroup.replaceChildren();
  const planePoints = [
    [-10, 0, -10],
    [10, 0, -10],
    [10, 0, 10],
    [-10, 0, 10],
    [-10, 0, -10],
  ];
  const plane = svgElement("path", {
    d: planePoints
      .map((point, index) => {
        const p = project(point);
        return `${index === 0 ? "M" : "L"} ${p.x} ${p.y}`;
      })
      .join(" "),
    fill: `url(#planeWash${prefix === "journey" ? "Journey" : ""})`,
    opacity: ".5",
  });
  gridGroup.append(plane);

  for (let i = 1; i < 5; i++) {
    const x = -10 + i * 4;
    const a = project([x, 0, -10]);
    const b = project([x, 0, 10]);
    gridGroup.append(
      svgElement("line", {
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y,
        class: "chart-grid-line",
      }),
    );
    const z = -10 + i * 4;
    const c = project([-10, 0, z]);
    const d = project([10, 0, z]);
    gridGroup.append(
      svgElement("line", {
        x1: c.x,
        y1: c.y,
        x2: d.x,
        y2: d.y,
        class: "chart-grid-line",
      }),
    );
  }

  for (const axis of axisConfig) {
    const active = !activeAxes || activeAxes.includes(axis.id);
    const from = project(axis.points[0]);
    const to = project(axis.points[1]);
    const line = svgElement("line", {
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
      class: `axis axis-${axis.colorClass}${active ? " is-active" : " is-muted"}`,
    });
    axesGroup.append(line);
    for (const item of axis.labels) {
      const p = project(item.p);
      const label = svgElement("text", {
        x: p.x + item.dx,
        y: p.y + item.dy,
        "text-anchor": item.anchor,
        class: `axis-label label-${axis.colorClass}${active ? " is-active" : " is-muted"}`,
      });
      label.textContent = item.text;
      labelsGroup.append(label);
    }
  }

  const total = 240;
  const startAngle = Math.atan2(5, -10);
  const initialRadius = Math.sqrt(125);
  const spiralPoints = [];
  for (let i = 0; i <= total; i++) {
    const u = i / total;
    const lowerRadiusBlend = Math.min(u / 0.2, 1);
    const smoothBlend =
      lowerRadiusBlend * lowerRadiusBlend * (3 - 2 * lowerRadiusBlend);
    const lowerRadiusReduction = 0.7 * (1 - smoothBlend);
    const radius = (initialRadius - lowerRadiusReduction) * (1 - u);
    const angle = startAngle + u * Math.PI * 6;
    spiralPoints.push(
      project([radius * Math.cos(angle), 15 * u, radius * Math.sin(angle)]),
    );
  }
  const origin = project([0, 0, 0]);
  const firstSpiralPoint = spiralPoints[0];
  const dx = firstSpiralPoint.x - origin.x;
  const dy = firstSpiralPoint.y - origin.y;
  const control = {
    x: (origin.x + firstSpiralPoint.x) / 2 - dy * 0.12,
    y: (origin.y + firstSpiralPoint.y) / 2 + dx * 0.12,
  };
  path.setAttribute(
    "d",
    `M ${origin.x.toFixed(2)} ${origin.y.toFixed(2)} Q ${control.x.toFixed(2)} ${control.y.toFixed(2)} ${firstSpiralPoint.x.toFixed(2)} ${firstSpiralPoint.y.toFixed(2)} ${spiralPoints
      .slice(1)
      .map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(" ")}`,
  );
  path.setAttribute("class", `spiral${showSpiral ? "" : " is-muted"}`);
  if (prefix === "journey")
    path.setAttribute("stroke", "url(#spiralGradientJourney)");
  const last = spiralPoints[spiralPoints.length - 1];
  start.setAttribute("cx", origin.x);
  start.setAttribute("cy", origin.y);
  end.setAttribute("cx", last.x);
  end.setAttribute("cy", last.y);
}

const timeline = document.getElementById("content-cards");
const originalCards = Array.from(timeline.querySelectorAll(".quote-card"));
const dimensionTransitions = {
  0: {
    label: "PRIMEIRA ETAPA",
    title: "Uma dimensão",
    description:
      "Observamos cada virtude por si: seus caminhos de crescimento e aquilo que surge quando deixamos de cultivá-la.",
    tone: "one",
  },
  4: {
    label: "SEGUNDA ETAPA",
    title: "Duas dimensões",
    description:
      "Aproximamos as virtudes em pares para perceber como se complementam e orientam escolhas concretas.",
    tone: "two",
  },
  10: {
    label: "ETAPA FINAL",
    title: "Três dimensões",
    description:
      "As virtudes se integram ao longo do tempo, compondo uma jornada de progresso moral e espiritual.",
    tone: "three",
  },
};
const timelineItems = [];
const stepSections = stages.map((stage, index) => {
  const transition = dimensionTransitions[index];
  if (transition) {
    const divider = document.createElement("section");
    divider.className = `dimension-transition dimension-${transition.tone}`;
    divider.setAttribute("aria-label", transition.title);
    const transitionLabel = document.createElement("p");
    transitionLabel.className = "dimension-transition-label";
    transitionLabel.textContent = transition.label;
    const transitionTitle = document.createElement("h2");
    transitionTitle.textContent = transition.title;
    const transitionDescription = document.createElement("p");
    transitionDescription.className = "dimension-transition-description";
    transitionDescription.textContent = transition.description;
    divider.append(transitionLabel, transitionTitle, transitionDescription);
    timelineItems.push(divider);
  }
  const section = document.createElement("section");
  section.className = "timeline-step";
  section.id = `step-${stage.id}`;
  section.dataset.stepId = stage.id;
  section.setAttribute("aria-labelledby", `step-title-${stage.id}`);

  const heading = document.createElement("div");
  heading.className = "reading-heading";
  const headingText = document.createElement("div");
  const kicker = document.createElement("p");
  kicker.className = "eyebrow";
  kicker.textContent = stage.dimension;
  const title = document.createElement("h3");
  title.id = `step-title-${stage.id}`;
  title.textContent = stage.title;
  headingText.append(kicker, title);
  const symbol = document.createElement("span");
  symbol.className = "reading-symbol";
  symbol.setAttribute("aria-hidden", "true");
  symbol.textContent = stage.symbol;
  heading.append(headingText, symbol);

  const summary = document.createElement("p");
  summary.className = "reading-summary";
  summary.textContent =
    stage.summary.charAt(0).toLocaleUpperCase("pt-BR") + stage.summary.slice(1);
  const stageLead = document.createElement("p");
  stageLead.className = "stage-lead";
  stageLead.textContent = stage.note;
  const cards = document.createElement("div");
  cards.className = "content-cards";
  originalCards
    .filter((card) => card.dataset.card === stage.id)
    .forEach((card) => {
      card.hidden = false;
      cards.append(card);
    });

  section.append(heading, stageLead, summary, cards);
  timelineItems.push(section);
  return section;
});
timeline.replaceChildren(...timelineItems);

const mapToggle = document.getElementById("map-toggle");
const mapContent = document.getElementById("journey-map-content");
const mapToggleLabel = mapToggle.querySelector(".map-toggle-label");
const mapToggleIcon = mapToggle.querySelector(".map-toggle-icon");
const mobileMapQuery = window.matchMedia("(max-width: 640px)");
function setMapExpanded(expanded) {
  mapToggle.setAttribute("aria-expanded", String(expanded));
  mapToggleLabel.textContent = expanded ? "Ocultar mapa" : "Mostrar mapa";
  mapToggleIcon.textContent = expanded ? "−" : "+";
  mapContent.hidden = !expanded;
}
mapToggle.addEventListener("click", () => {
  setMapExpanded(mapToggle.getAttribute("aria-expanded") !== "true");
});
mobileMapQuery.addEventListener("change", (event) => {
  setMapExpanded(!event.matches);
});
setMapExpanded(!mobileMapQuery.matches);

let activeStageIndex = -1;
function setActiveStage(index) {
  if (index === activeStageIndex) return;
  activeStageIndex = index;
  const stage = stages[index];
  document.body.dataset.dimension =
    index < 4 ? "one" : index < 10 ? "two" : "three";
  document.body.dataset.stage = stage.id;
  stepSections.forEach((section, sectionIndex) => {
    if (sectionIndex === index) section.setAttribute("aria-current", "step");
    else section.removeAttribute("aria-current");
  });
  document.getElementById("sticky-stage-kicker").textContent = stage.dimension;
  document.getElementById("sticky-stage-title").textContent = stage.title;
  document.getElementById("map-note-text").textContent = stage.note;
  drawChart("journey", stage.axes || [stage.axis], stage.id === "completo");
}

drawChart("hero", null, true);
setActiveStage(0);

let scrollUpdateQueued = false;
function updateStageFromScroll() {
  scrollUpdateQueued = false;
  const marker = window.innerHeight * 0.42;
  let closestIndex = 0;
  let closestDistance = Infinity;
  for (let index = 0; index < stepSections.length; index++) {
    const rect = stepSections[index].getBoundingClientRect();
    if (rect.top <= marker && rect.bottom > marker) {
      closestIndex = index;
      break;
    }
    const distance = Math.min(
      Math.abs(rect.top - marker),
      Math.abs(rect.bottom - marker),
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  }
  setActiveStage(closestIndex);
}
function queueScrollUpdate() {
  if (scrollUpdateQueued) return;
  scrollUpdateQueued = true;
  window.requestAnimationFrame(updateStageFromScroll);
}
window.addEventListener("scroll", queueScrollUpdate, { passive: true });
window.addEventListener("resize", queueScrollUpdate);
