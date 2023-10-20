---
class: post
title: '#howto - Usare il proprio smartphone android su linux' 
date: 2021-10-15 11:00
layout: post 
author: Floppy
author_github: raspFloppy 
coauthor: linuxhub
coauthor_github: linuxhubit
tags: 
- android 
- ubuntu
- fedora
- archlinux
---

> NOTA:
>
> Un nuovo articolo su SCRCPY è disponibile [a questo indirizzo](https://linuxhub.it/articles/howto-scrcpy-gestire-android-da-computer) con alcune nuove funzionalità descritte.

Talvolta sentiamo la necessità di utilizzare alcune applicazioni android sul nostro computer ma le alternative a nostra disposizione per farlo non ci soddisfano, vuoi perchè **Anbox** è complesso da configurare o perchè **Waydroid** è ancora in fase di sviluppo ed è necessario Wayland per farlo funzionare.
Bhé ma perchè allora non utilizziamo direttamente il nostro smartphone sul nostro pc? è esattamente quello che Scrcpy fa e di cui andiamo a parlare di seguito.


## Cos'è Scrcpy

[Scrcpy](https://github.com/Genymobile/scrcpy/) è un software open source che ci permette di visualizzare e controllare in tempo reale il proprio smartphone, senza richiedere il root al telefono, attraverso cavo USB o con una connessione TCP/IP proprio come un desktop remoto.

## Prerequisiti

Prima di tutti elenchiamo i requisiti necessari:
1. **adb** installato sul proprio PC, adb permette di controllare il proprio dispositivo android tramite linea di comando.
2. attivare il **debug usb** sul proprio smartphone tramite le *opzioni da sviluppatore*.

Per installare adb in base alla propria distrubuzione eseguire il comando:

### Ubuntu:
`apt install adb`

### Fedora:
`dnf install android-tools`

### Archlinux:

`pacman -S android-tools`

Mentre le *opzioni da sviluppatore*, sono molto spesso nascoste all'utente per questioni di sicurezza, ma si possono attivare attraverso le impostazioni, la procedura varia da telefono a telefono quindi vi consiglio di cercare "come attivare le le opzioni di da sviluppatore per il telefono x" prima di procedere ma in generale si dovrebbero attivare in `Impostazioni > Info Telefono > Numero di build` e cliccando su questa opzione vi spunterà un pop-up che vi dirà che le opzioni da sviluppatore sono state sbloccate (cliccate più volte per attivarle).

Una volta fatto cercate nelle impostazioni *Debug USB* e attivate la spunta o il check e dovreste essere a posto.


## Installazione
Okay ora che abbiamo il necessario dobbiamo installare scrcpy:

### Ubuntu:
```
apt install scrcpy
```

### Fedora:
Su Fedora dobbiamo aggiungere ai repository un **Copr** (un repository di terze parti):

```bash
dnf copr enable zeno/scrcpy
```

quindi aggiorniamo:

```bash
dnf upgrade
```

e infine installiamo il nostro pacchetto:

```bash
dnf install scrcpy
```

### Archlinux:
Su arch lo troviamo il software nell'**AUR** quindi lo installiamo tramite un **AUR-helper**, in questo caso **paru**:

```bash
paru -S scrcpy
```


## Funzionamento

Perfetto ora dovremo avere tutto, a questo punto sblocchiamo il nostro telefono e colleghiamolo tramite cavo USB al nostro PC.
Se tutto è okay dovreste poter vedere il vostro telefono collegato al pc ma per sicurezza controlliamo attraverso adb con:

```bash
adb devices
```

che dovrebbe restituire un risultato simile a questo:

```bash
List of devices attached
37b1c8c9	device
```

perfetto ora lanciamo scrcpy scrivendo sul terminale:

```bash
scrcpy
```

A questo punto ci si aprirà una finestra che mostrerà appunto lo schermo del nostro pc e potremmo controllarlo attraverso il mouse, la tavoletta grafica o il touchscreen nel caso avessimo un 2 in 1.

Bene ma possiamo fare ancora di più, come detto prima scrcpy supporta le connessioni TCP/IP e adb permette di connettersi ai dispositivi android tramite wireless (ovviamente pc e smartphone devono essere nella **stessa LAN**).
Quindi sempre con il telefono attaccato al pc tramite USB scriviamo su terminale:

```bash
adb tcpip 5555
```

dove 5555 è la porta che adb utilizza per le connessioni TCP/IP.
Una volta fatto questo colleghiamo il nostro dispositivo digitando:

```bash
adb connect 192.168.1.x
```

Dove 192.168.1.x è l'indirizzo ip del vostro telefono che potete trovare in `Impostazioni > Info Telefono > Indirizzo Ip` (Anche in questo caso può variare in base al telefono la localizzazione dell'impostazione).

Bene fatto ciò staccate il telefono dal cavo USB e collegatevi di nuovo tramite `scrcpy`, se tutto è andato a buon fine dovrebbe riapparire il vostro schermo del cellulare che potrete controllare (forse con un pò più di latenza) da "remoto".

## Alcune opzioni in più

Scrcpy ha anche alcune opzioni aggiuntive per migliorare l'esperienza finale dell'utente:

### Modificare la risoluzione

```bash
scrcpy --max-size x
```

dove x sta per i numeri di pixel in orizzontale.

### Modificare il bitrate

```bash
scrcpy --bit-rate xM
```

dove x sta per i Mbps.

### Modificare la framerate

```bash
scrcpy --max-fps x
```

dove x sta per gli FPS.

### Modificare l'orientamento dello schermo iniziale

```bash
scrcpy --lock-video-orientation     # orientamento corrente
scrcpy --lock-video-orientation=0   # orientamento base (verticale)
scrcpy --lock-video-orientation=1   # 90°  (orizzontale)
scrcpy --lock-video-orientation=2   # 180° (verticale al contrario)
scrcpy --lock-video-orientation=3   # 270° (orizzontale)
```

### Rimuovere la title-bar (per i WM enjoyer)

```bash
scrcpy --window-borderless
```

### Partire in full screen

```bash
scrcpy --fullscreen
```


## Conclusioni

Scrcpy è sicuramente un ottimo software che permette di utilizzare anche in modo wireless il proprio smartphone da pc quando, per esempio, si ha a necessità di utilizzare un'applicazione android, come capita per le app di Otp, senza doversi alzare e andare a prendere il telefono e perdere magari il workflow o comunque la concentrazione mentre si è al pc.
Di pecca però abbiamo che l'audio non viene trasmesso sul nostro computer ma viene emesso dalle casse dello smartphone e seconda cosa quando spegnamo il nostro pc, alla riaccensione dobbiamo svolgere nuovamente la procedura di adb per il wireless.
Nonostante questi difetti è sicuramente un comodo pezzo di software.
