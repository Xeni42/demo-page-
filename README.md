# Seltsame Seite v0

Eine kleine HTML/CSS/JavaScript-Übungsseite.

Das Projekt ist eine kleine Sammlung von Themen und Techniken, die wir bisher gelernt haben, kombiniert in einem einfachen Gesamtprojekt.

Enthalten sind unter anderem:

* HTML-Struktur
* CSS Grid
* Flexbox
* Responsive Layouts
* CSS Variablen
* Hover-Effekte
* Formulare
* JavaScript DOM-Manipulation
* Dynamische Styles
* Kleine Event-Logik
* Mock-Tracking für GA4

---

## Dateien

### index.html

Enthält die Struktur der Seite:

* Header
* Sections
* Cards
* Formulare
* Output-Bereich

---

### style.css

Enthält:

* Layout-System
* Grid & Flexbox
* Farben & CSS Variablen
* Buttons
* Hover-Animationen
* Responsive Verhalten
* Form-Styles

---

### script.js

Enthält kleine JavaScript-Beispiele:

* Formular-Eingaben lesen
* Inhalte dynamisch verändern
* Farben per CSS Variable ändern
* Klick-Events
* Dynamisches Output erzeugen
* Mock-Tracking mit einer simulierten `gtag()` Funktion

Das Tracking ist nur ein Beispiel dafür, wie man später Nutzeraktionen oder GA4-Events testen könnte.

Beispiele:

* Input erkannt
* Button geklickt
* Output erzeugt

Die Events werden aktuell nur in der Browser-Konsole angezeigt.

---

## Events in der Console sehen

1. Seite im Browser öffnen
2. Rechtsklick → „Untersuchen“ / „Inspect“
3. Tab „Console“ öffnen

Oder Shortcut:

### Chrome / Edge

```txt id="nxs3i9"
F12
```

oder

```txt id="2l7m3s"
CTRL + SHIFT + J
```

### Mac

```txt id="7h5r2w"
CMD + OPTION + J
```

Dann:

* in die Form schreiben
* Buttons klicken
* Checkboxen ändern

In der Console erscheinen dann die simulierten Events.

Beispiel:

```txt id="j0v4tb"
GA4 EVENT:
{
  eventType: "event",
  eventName: "generate_clicked",
  category: "Ruhig",
  text_length: 42
}
```

---

## Projekt starten

### Möglichkeit 1

Einfach:

* `index.html` doppelklicken

Dann öffnet sich die Seite direkt im Browser.

---

### Möglichkeit 2 (empfohlen)

Mit VS Code + Live Server:

1. Projektordner öffnen
2. Rechtsklick auf `index.html`
3. „Open with Live Server“

---

### Möglichkeit 3 (XAMPP)

Da viele bereits XAMPP haben:

1. Projekt in den `htdocs` Ordner kopieren
2. Apache starten
3. Im Browser öffnen:

```txt id="5nq6e0"
http://localhost/ordnername
```

---

## Experimentieren

Ihr könnt gerne:

* Farben ändern
* Grid-Spalten verändern
* Neue Cards hinzufügen
* Buttons umbauen
* JavaScript erweitern
* Formulare anpassen
* Eigene Sections bauen

Das Projekt ist absichtlich einfach gehalten, damit man besser versteht, wie HTML, CSS und JavaScript zusammenarbeiten.

---

## Hinweis

Das ist kein fertiges Produkt, sondern ein kleines Lern- und Experimentierprojekt zum Verstehen von Frontend-Grundlagen und UI-Strukturen.
