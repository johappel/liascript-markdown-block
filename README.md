# Liascript Markdown Block

Dieses WordPress-Plugin fügt einen neuen Blocktyp zum Gutenberg-Editor hinzu, der es ermöglicht, LiaScript-Markdown direkt im Editor zu verwenden. Der Block rendert eine Live-Vorschau des LiaScript-Markdowns in einem `iframe`.

## Features

- Ermöglicht das Schreiben von LiaScript-Markdown im WordPress Block-Editor.
- Bietet eine Live-Vorschau des Markdown-Inhalts mithilfe eines `iframe`.
- Unterstützt die Anpassung der `iframe`-Höhe durch den Benutzer im Editor.
- Erlaubt die Ausrichtung des Blocks auf "Weite Breite" oder "Gesamte Breite" für eine bessere visuelle Integration.

## Installation

1. Laden Sie das Plugin-Verzeichnis in das `/wp-content/plugins/`-Verzeichnis Ihrer WordPress-Installation hoch.
2. Aktivieren Sie das Plugin über das 'Plugins'-Menü in WordPress.

## Verwendung

Nach der Aktivierung des Plugins finden Sie den 'Liascript Markdown'-Block in der Kategorie 'Widgets' des Gutenberg-Editors. Fügen Sie den Block zu Ihrem Beitrag oder Ihrer Seite hinzu und beginnen Sie, LiaScript-Markdown zu schreiben. Eine Vorschau Ihres Inhalts wird automatisch im `iframe` angezeigt.

## Developer-Hinweise

### Struktur

Das Plugin folgt der Standard-WordPress-Blockstruktur:

```
liascript-markdown-block/
├── build/
│   ├── index.js
│   ├── style-index.css
├── src/
│   ├── edit.js
│   ├── save.js
│   ├── createGzipBase64Data.js
├── node_modules/
├── block.json
├── liascript-markdown-block.php
├── README.md
├── package.json
└── package-lock.json
```

### Komponenten

- `edit.js`: Enthält die React-Komponente für den Editor-Modus des Blocks.
- `save.js`: Enthält die React-Komponente für das Speichern und Rendern des Blocks auf der Website.
- `createGzipBase64Data.js`: Hilfsfunktion zur Erzeugung von gzip-kodierten und Base64-kodierten Daten für `iframe`-Quellen.

### Skripte

Um das Projekt zu bauen, führen Sie:

```
npm run build
```

Für die Entwicklung können Sie den folgenden Befehl verwenden, der den Build-Prozess im Watch-Modus ausführt:

```
npm start
```

### Abhängigkeiten

Das Plugin verwendet [pako](https://www.npmjs.com/package/pako) zur Gzip-Komprimierung von Textdaten. Stellen Sie sicher, dass Sie `npm install` ausführen, um alle notwendigen Abhängigkeiten zu installieren, bevor Sie das Projekt bauen.

## Lizenz

Das Plugin ist lizenziert unter der GPL-2.0-or-later Lizenz.
