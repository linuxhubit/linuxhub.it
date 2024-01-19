---
class: post
title: "#howtodev - usare MPlayer: un media tool a linea di comando"
date: 2024-01-19 07:00
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
- media
---

Se pur vero che oggi giorno la nostra raccolta musicale è su Spotify e la cineteca è su Netflix, è anche vero che alcuni, più nostalgici, continuano ad ascoltare le canzoni, guardare video e film in locale, dal proprio pc.
Uno degli strumenti per farlo è sicuramente MPlayer.

## Definizione

MPlayer è uno dei più famosi progetti open source nato per l'esecuzione di video (dallo stesso nome "**Movie Player**"), ha una discreta compatibilità di base che comunque può essere facilmente estesa con codecs esterni.
Permette di riprodurre sia flussi audio che video.

Si può trovare [la pagina del progetto su Github](https://github.com/philipl/mplayer).

## Installazione

È installabile facilmente su tutte le distribuzioni, in genere infatti si può trovare nei repository base di tutti i vari package manager.

### Ubuntu e derivate

Per installarlo su Ubuntu e derivate digitare dal terminale: 

```bash
apt install mplayer
```

### Fedora

Per installarlo su Fedora, bisogna attivare prima i repository RPMFusion:

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
- Il tasti **o** cycle OSD mode: none / seekbar / seekbar + timer
- I tasti **&#x2a;** e **&#x2a;** increase e decrease PCM volume
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

MPlayer è tanto "semplice" quanto potente, il suo utilizzo è scontato ed intuitivo se si vuole utilizzare in maniera scontata ed intuitiva, tuttavia possiede anche opzioni che permettono di sfruttarne altre funzionalità. Sono diverse le sue opzioni a riga di comando, eccone alcune:

- **-vo driver** seleziona il driver di output video ('-vo help' per una lista)
- **-ao driver** seleziona il driver di output audio ('-ao help' per una lista)
- **-alang/-slang** seleziona la lingua dell'audio/sottotitoli del DVD (utilizzando il codice a due caratteri del paese)
- **-ss numero** va alla posizione specificata (in secondi o "hh:mm:ss")
- **-nosound** non riproduce l'audio
- **-fs** riproduzione a schermo intero 
- **-x numero -y numero** imposta la risoluzione dello schermo, quest'opzione scala anche il video quindi assicuratevi di mettere la giusta proporzione 
- **-sub file** specifica il file dei sottotitoli da utilizzare (vedi anche -subfps, -subdelay)
- **-playlist file** specifica il file della playlist
- **-vid x -aid y** seleziona il flusso video (x) e audio (y) da riprodurre
- **-fps x -srate y** cambia la frequenza video (x fps) e audio (y Hz)
- **-pp quality** abilita il filtro di post-elaborazione (dettagli nella pagina di manuale)
- **-framedrop** abilita la caduta di frame (per computer lenti)
- **-cache numero** utile per riproduzioni in streaming, imposta una cache in Kb
- **-cache-min numero** imposta la dimensione minima della cache (in percentuale) prima di riprodurre il file

In ogni caso è possibile sempre richiamare l'help con: 

```bash
mplayer --help
```

Oppure in maniera più completa il manuale:

```bash
man mplayer
```

Che contiene tutte le opzioni.

### Qualche esempio

Ecco qualche esempio di utilizzo:

Per far partire un file da 1 minuto e 30 secondi dall'inizio scriviamo: 

```bash
mplayer -ss "00:01:30" percorso/file
```

Oppure:

```bash
mplayer -ss 90 percorso/file
```

Per far partire un video in 1080p scrivere:

```bash
mplayer -x 1920 -y 1080 percorso/video
```

Per riprodurre la radio "Radio freccia" usando massimo 16Mb la cache:

```bash
mplayer http://shoutcast.rtl.it:3060/ -cache 16384 -cache-min 10
```

