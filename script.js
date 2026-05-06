const titleInput = document.querySelector("#title");
const categoryInput = document.querySelector("#category");

categoryInput.addEventListener("change", () => {

  const mood = categoryInput.value;

  if (mood === "Ruhig") {
    document.documentElement.style
      .setProperty("--color-primary", "#81F1B2");
  }

  if (mood === "Verwirrt") {
    document.documentElement.style
      .setProperty("--color-primary", "#256EFF");
  }

  if (mood === "Sehr überzeugt") {
    document.documentElement.style
      .setProperty("--color-primary", "#DB5A42");
  }

});
const textInput = document.querySelector("#text");
const secretInput = document.querySelector("#check1");
const chaosInput = document.querySelector("#check2");

const button = document.querySelector(".sh-form button");
const outputBox = document.querySelector(".sh-output");
const dashboardCard = document.querySelector("#dashboardCard");

if (dashboardCard) {
  dashboardCard.addEventListener("click", () => {
    dashboardCard.classList.toggle("is-expanded");
  });
}

// 1. INPUT TRACKING
titleInput.addEventListener("input", () => {
  gtag("event", "input_typing", {
    field: "title",
    length: titleInput.value.length,
  });
});

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

// 2. BUTTON LOGIK + OUTPUT
button.addEventListener("click", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const category = categoryInput.value;
  const text = textInput.value.trim();
  const secret = secretInput.checked;
  const chaos = chaosInput.checked;

  gtag("event", "generate_clicked", {
    category: category,
    has_title: title !== "",
    text_length: text.length,
    secret_enabled: secret,
    chaos_enabled: chaos,
  });

  if (title === "" || text === "") {
    outputBox.innerHTML = `
      <h2>Ergebnis-Zone</h2>
      <p>Bitte füll mindestens Titel und Gedanken aus. Die Maschine ist seltsam, aber nicht hellsichtig.</p>
    `;
    return;
  }

  const secretText = secret
    ? "Geheimnis aktiviert: Der Text bekommt mysteriöse Energie."
    : "Kein Geheimnis aktiviert: Alles bleibt verdächtig normal.";

  const chaosText = chaos
    ? "Standard-Chaos läuft im Hintergrund."
    : "Chaos deaktiviert. Mutige Entscheidung.";

  outputBox.innerHTML = `
    <h2>Ergebnis-Zone</h2>

    <p><strong>Name vom Ding:</strong> ${title}</p>
    <p><strong>Stimmung:</strong> ${category}</p>

    <p><strong>Analyse:</strong></p>
    <p>
      Du hast ein Ding namens <strong>${title}</strong> erstellt.
      Es wirkt <strong>${category.toLowerCase()}</strong>.
      Inhaltlich sagt es ungefähr:
    </p>

    <blockquote>
      ${text}
    </blockquote>

    <p>${secretText}</p>
    <p>${chaosText}</p>
  `;

  gtag("event", "output_created", {
    category: category,
    title_length: title.length,
    text_length: text.length,
    secret_enabled: secret,
    chaos_enabled: chaos,
  });
});

// 3. MOCK GTAG FÜR CONSOLE
function gtag(eventType, eventName, data) {
  console.log("GA4 EVENT:", {
    eventType: eventType,
    eventName: eventName,
    ...data,
  });
}
