---
class: post
title: "#howto - leggere RSS da terminale con Termfeed"
date: 2023-10-27 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi 
coauthor_github: MichaelMessaggi
published: true
tags:
- ubuntu
- fedora
- archlinux
- feed
- rss
---

Linux/hub ha i feed rss. Lo sapevate? Ora lo sapete.  
Detto questo, leggere i feed dalla propria distribuzione Linux preferita non è assolutamente un problema.  
Ci sono infatti diverse applicazioni che consentono di utilizzare i feed RSS dai propri siti preferiti.
Ad esempio, TermFeed.

## TermFeed

TermFeed è un progetto open source scritto in Python. Il codice è reperibile su [Github](https://github.com/iamaziz/TermFeed) anche se, gli ultimi aggiornamenti, risalgono ormai al lontano 2015.

TermFeed è reperibile come pacchetto PIP.

## PIP

PIP è un installatore di pacchetti Python, installare un pacchetto tramite questo sistema è molto semplice ma necessita che sia installato.

### Installazione su Ubuntu e derivate

Per installare PIP su Ubuntu e derivate basta digitare:

```bash
apt install python3-pip
```

### Installazione su Fedora

Per installare PIP su Fedora basta digitare:

```bash
dnf install python3-pip
```

### Installazione su ArchLinux

Per installare PIP su ArchLinux o sistemi che utilizzano pacman basta digitare: 

```bash
pacman -S python-pipx
```

### Installazione di TermFeed

Una volta installato pip basta scrivere: 

```bash
pip install termfeed
```

Tranne su Archlinux dove si dovrebbe utilizzare il tool `pipx`:

```bash
pipx install termfeed
```

### Fix "termfeed.db"

In alcuni sistemi potrebbe non riuscire a creare il db nella home. Dare il comando:

```bash
touch $HOME/.termfeed.db
```

Per sistemare il problema

## Utilizzo

I feed sono divisi per Categoria, per cui ogni aggiunta va indicato il sito e la categoria.

Già post-installazione si dovrebbe avere una lista di feed predefiniti.

### Aggiungere un feed

Per aggiungere un nuovo feed:

```bash
feed -a SITO CATEGORIA
```

Ad esempio si può aggiungere il sito di linux/hub alla categoria (da creare) Linux:

```bash
feed -a https://linuxhub.it/feed.xml Linux
```

### Consultare le categorie

Si possono consultare le categorie scrivendo:

```bash
feed -t
```

Molte categorie sono già create dall'inserimento di alcuni siti inseriti a tempo di installazione.

È possibile consultare la lista dei siti per categoria scrivendo in coda al comando la categoria stessa, ad esempio per la categoria "Linux":

```bash
feed -t Linux
```

### Cancellare una categoria (con tutti i feed dentro)

Per eliminare una categoria si può scrivere: 

```bash
feed -D CATEGORIA
```

Ottimo per eliminare tutti i feed già presenti dopo l'installazione.

### Navigare i feed per categoria

I feed si possono navigare per categoria scrivendo:

```bash
feed -b
```

Selezionare la categoria e quindi il feed da aprire.

Una volta aperto un feed è possibile aprire nel browser predefinito il link dell'articolo che punta premendo `y`.

### Navigare i feed per URL

Per navigare i feed dato un URL digitare `feed` seguito dall'url:

```bash
feed https://linuxhub.it/feed.xml
```

Selezionare il feed da aprire; una volta aperto un feed è possibile aprire nel browser predefinito il link dell'articolo che punta premendo `y`.

### Rimuovere un URL

Per rimuovere un URL dai feed scrivere:

```bash
feed -d URL
```

Ad esempio:

```bash
feed -d https://linuxhub.it/feed.xml
```

Per eliminare il feed di Linux/hub.

### Help

Si può sempre consultare l'help ufficiale digitando: 

```bash
feed -h
```

## Disinstallare tramite PIP

Per disinstallare TermFeed tramite PIP scrivere: 

```bash
pip uninstall termfeed
```

Su ArchLinux:

```bash
pipx uninstall termfeed
```

## Conclusioni

Conoscete altri feed reader? segnalateli sul nostro gruppo Telegram e magari, nel prossimo futuro, saranno oggetto di un nostro prossimo articolo!
