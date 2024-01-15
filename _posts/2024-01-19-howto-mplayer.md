---
class: post
title: "#howtodev - usare mplayer: un media tool a linea di comando"
date: 2024-01-19 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: false
tags:
- ubuntu
- fedora
- archlinux
- media
---

Se pur vero che oggi giorno la nostra musica è su Spotify ed i nostri video sono su Netflix, è anche vero però che alcuni nostalgici continueranno sempre ad ascoltare le canzoni dal proprio pc e guardare video e film sul proprio schermo. Uno degli strumenti per farlo è sicuramente mplayer.

## Definizione

Mplayer è uno dei più famosi progetti open source nato per l'esecuzione di video (dallo stesso nome "**Movie Player**"), ha una discreta compatibilità di base che comunque può essere facilmente estesa con codecs esterni. Legge sia flussi audio che video.

Si può trovare [la pagina del progetto su Github](https://github.com/philipl/mplayer).

## Installazione

È installabile facilmente su tutte le distribuzioni, in genere infatti si può trovare nei repository base di tutti i vari package manager.

### Ubuntu e derivate

Per installarlo su Ubuntu e derivate digitare dal terminale: 

```bash
apt install mplayer
```

### Fedora

Per installarlo su Fedora, bisogna attivare prima i repository fusion:

```bash
dnf install http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

Quindi digitare dal terminale:

```bash
dnf install mplayer mencoder
```

### ArchLinux

Per installarlo su ArchLinux digitare dal terminale: 

```bash
pacman -S mplayer
```

## Utilizzo

Un utilizzo di base è semplicemente quello di avviarlo passando come parametro il nome del file da avviare: 

```bash
mplayer percorso/filemultimediale
```

Quindi si può controllare il flusso tramite vari comandi: 

- Con le frecce direzionali **&larr;** e **&rarr;** si può mandare indietro/avanti di 10 secondi la traccia.
- Con le frecce direzionali **&uarr;** e **&darr;** si può mandare indietro/avanti di 1 minuto la traccia.
- i tasti **pgdown** e **pgup** (per chi li ha ancora in tastiera) mandano avanti/dietro di 10 minuti la traccia.
- Con i tasti **&lt;** e **&gt;** si può mandare avanti o dietro la riproduzione di un file (se si ha più di un file a disposizione).
- I tasti **p** e **barra spaziatrice** mettono in pausa/riprende la riproduzione.
- I tasti **q** e **ESC** servono a fermare il software (ed anche la riproduzione).
- I tasti **&plus;** e **&minus;** aumentano e diminuiscono il volume.
- Il tasto **m** mette il muto (o riprende il volume)
- Il tasti **o**                cycle OSD mode:  none / seekbar / seekbar + timer
- I tasti **&#x2a;** e **&#x2a;**           increase e decrease PCM volume
- I tasti **x** e **z** slitta di 0.1 secondi i sottotitoli, per i file video associati a file sottotitoli
- I tasti **r** e **t** sposta in alto ed in basso i sottotitoli, per i file video associati a file sottotitoli

### Riproduzione di più file

Per riprodurre più file contemporaneamente (creando eventualmente delle playlist) è possibile semplicemente concatenarli separandoli da spazi a linea di comando: 

```bash
mplayer percorso/filemultimediale1 percorso/filemultimediale2
```

È possibile ovviamente utilizzare i caratteri di espansione (Leggi l'articolo su [come velocizzarsi nell'uso del terminale pt2](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt2/)) per selezionare più file contemporaneamente scrivendo poco. Ad esempio per avviare tutti i file mp3 in una determinata cartella: 

```bash
mplayer *mp3
```

## Utilizzo avanzato

Mplayer è tanto "semplice" quanto potente, il suo utilizzo è scontato ed intuitivo se si vuole utilizzare in maniera scontata ed intuitiva, tuttavia possiede anche opzioni che permettono di sfruttarne altre funzionalità. Sono diverse le sue opzioni a riga di comando:

- **vo <drv>** seleziona il driver di output video ('-vo help' per una lista)
- **ao <drv>** seleziona il driver di output audio ('-ao help' per una lista)
- **cd://<trackno>** riproduce la traccia (S)VCD (Super Video CD) (dispositivo raw, senza montare)
- **vd://<titleno>** riproduce il titolo DVD dal dispositivo invece che da un semplice file
- **alang/-slang** seleziona la lingua dell'audio/sottotitoli del DVD (utilizzando il codice a due caratteri del paese)
- **ss <position>** va alla posizione specificata (in secondi o hh:mm:ss)
- **nosound** non riproduce l'audio
- **fs** riproduzione a schermo intero (o -vm, -zoom, dettagli nella pagina di manuale)
- **x <x> -y <y>** imposta la risoluzione dello schermo (da utilizzare con -vm o -zoom)
- **sub <file>** specifica il file dei sottotitoli da utilizzare (vedi anche -subfps, -subdelay)
- **playlist <file>** specifica il file della playlist
- **vid x -aid y** seleziona il flusso video (x) e audio (y) da riprodurre
- **fps x -srate y** cambia la frequenza video (x fps) e audio (y Hz)
- **pp <quality>** abilita il filtro di post-elaborazione (dettagli nella pagina di manuale)
- **framedrop** abilita la caduta di frame (per computer lenti)

## Mplayer e Wayland

Per avere perfettamente funzionamente mplayer in un ambiente con wayland bisogna avere: 

- pipewire
- pipewire-alsa
- pipewire-jack
- xwayland