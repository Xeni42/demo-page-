const titleInput = document.querySelector("#title");
const categoryInput = document.querySelector("#category");
const textInput = document.querySelector("#text");
const secretInput = document.querySelector("#check1");
const chaosInput = document.querySelector("#check2");

const button = document.querySelector(".sh-form button");
const outputBox = document.querySelector(".sh-output");
const dashboardCard = document.querySelector("#dashboardCard");

const visitsCount = document.querySelector("#visitsCount");
const clicksCount = document.querySelector("#clicksCount");
const formsCount = document.querySelector("#formsCount");
const rateCount = document.querySelector("#rateCount");
const qualityBadge = document.querySelector("#qualityBadge");

let visits = 1;
let clicks = 0;
let forms = 0;

function updateDashboard() {
  visitsCount.textContent = visits;
  clicksCount.textContent = clicks;
  formsCount.textContent = forms;

  const rate = clicks > 0 ? ((forms / clicks) * 100).toFixed(1) : 0;
  rateCount.textContent = `${rate}%`;
}

function updateTextQuality() {
  const textLength = textInput.value.trim().length;
  const secret = secretInput.checked;
  const chaos = chaosInput.checked;

  qualityBadge.className = "sh-quality";

  if (secret && chaos && textLength > 80) {
    qualityBadge.textContent = "Textqualität: Experimental";
    qualityBadge.classList.add("is-experimental");
    return;
  }

  if (textLength < 50) {
    qualityBadge.textContent = "Textqualität: Schwach";
    qualityBadge.classList.add("is-weak");
    return;
  }

  if (textLength < 150) {
    qualityBadge.textContent = "Textqualität: Okay";
    qualityBadge.classList.add("is-okay");
    return;
  }

  qualityBadge.textContent = "Textqualität: Stark";
  qualityBadge.classList.add("is-strong");
}

categoryInput.addEventListener("change", () => {
  const mood = categoryInput.value;

  document.body.classList.remove(
    "theme-ruhig",
    "theme-verwirrt",
    "theme-ueberzeugt"
  );

  document.body.classList.add(`theme-${mood}`);

  gtag("event", "mood_changed", {
    mood,
  });
});

if (dashboardCard) {
  dashboardCard.addEventListener("click", () => {
    dashboardCard.classList.toggle("is-expanded");
    document.body.classList.toggle("is-modal-open");

    gtag("event", "dashboard_expanded", {
      expanded: dashboardCard.classList.contains("is-expanded"),
    });
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    dashboardCard &&
    dashboardCard.classList.contains("is-expanded")
  ) {
    dashboardCard.classList.remove("is-expanded");
    document.body.classList.remove("is-modal-open");
  }
});

titleInput.addEventListener("input", () => {
  gtag("event", "form_started", {
    field: "title",
    length: titleInput.value.length,
  });
});

textInput.addEventListener("input", updateTextQuality);
secretInput.addEventListener("change", updateTextQuality);
chaosInput.addEventListener("change", updateTextQuality);

textInput.addEventListener("focus", () => {
  gtag("event", "field_focus", {
    field: "text",
  });
});

textInput.addEventListener("blur", () => {
  gtag("event", "field_blur", {
    field: "text",
  });
});

button.addEventListener("click", (event) => {
  event.preventDefault();

  clicks++;
  updateDashboard();

  const title = titleInput.value.trim();
  const category = categoryInput.value;
  const text = textInput.value.trim();
  const secret = secretInput.checked;
  const chaos = chaosInput.checked;

  gtag("event", "generate_clicked", {
    category,
    has_title: title !== "",
    text_length: text.length,
    secret_enabled: secret,
    chaos_enabled: chaos,
  });

  outputBox.classList.remove("is-empty", "is-error", "is-success");

  if (title === "" || text === "") {
    outputBox.classList.add("is-error");

    outputBox.innerHTML = `
      <h2>Ergebnis-Zone</h2>
      <p>Bitte füll mindestens Titel und Gedanken aus. Die Maschine ist seltsam, aber nicht hellsichtig.</p>
    `;

    gtag("event", "validation_error", {
      reason: "missing_title_or_text",
    });

    return;
  }

  const secretText = secret
    ? "Geheimnis aktiviert: Der Text bekommt mysteriöse Energie."
    : "Kein Geheimnis aktiviert: Alles bleibt verdächtig normal.";

  const chaosText = chaos
    ? "Standard-Chaos läuft im Hintergrund."
    : "Chaos deaktiviert. Mutige Entscheidung.";

  outputBox.classList.add("is-success");

  outputBox.innerHTML = `
    <h2>Ergebnis-Zone</h2>

    <p><strong>Name vom Ding:</strong> ${title}</p>
    <p><strong>Stimmung:</strong> ${category}</p>

    <p><strong>Analyse:</strong></p>
    <p>
      Du hast ein Ding namens <strong>${title}</strong> erstellt.
      Es wirkt <strong>${category}</strong>.
      Inhaltlich sagt es ungefähr:
    </p>

    <blockquote>${text}</blockquote>

    <p>${secretText}</p>
    <p>${chaosText}</p>
  `;

  forms++;
  updateDashboard();

  gtag("event", "output_created", {
    category,
    title_length: title.length,
    text_length: text.length,
    secret_enabled: secret,
    chaos_enabled: chaos,
  });
});

const trackedSections = document.querySelectorAll(
  "#hero, #cards, #form, #output"
);

const viewedSections = new Set();

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !viewedSections.has(entry.target.id)
      ) {
        viewedSections.add(entry.target.id);

        gtag("event", "section_viewed", {
          section: entry.target.id,
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

trackedSections.forEach((section) => {
  sectionObserver.observe(section);
});

function gtag(eventType, eventName, data) {
  console.log("GA4 EVENT:", {
    eventType,
    eventName,
    ...data,
  });
}

updateDashboard();
updateTextQuality();