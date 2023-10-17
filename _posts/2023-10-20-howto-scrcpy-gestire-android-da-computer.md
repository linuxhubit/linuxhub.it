---
class: post
title: "#howto - Scrcpy: gestire Android da computer"
date: 2023-10-20 07:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor:
coauthor_github:
published: false
tags:
- ubuntu
- fedora
- archlinux
- windows
- macos
---

Un computer può essere controllato da Android mediante l'utilizzo di principalmente due protocolli, principalmente, ossia [SSH](https://linuxhub.it/articles/howto-ssh-controllo-remoto-del-desktop-da-mobile/) e [VNC](https://linuxhub.it/articles/howto-vnc-controllo-remoto-del-desktop-da-mobile/).

Anche l'inverso è possibile, come dimostra Scrcpy (contrazione di "screen copy").

Scrcpy permette di trasferire l'audio in uscita dello smartphone al computer, di inviare file via drag & drop, di condividere e registrare lo schermo, di utilizzare il telefono come webcam, di simulare il collegamento di mouse e tastiera, di condividere la clipboard (copia-incolla), e molto altro.

Scrcpy funziona senza permessi di root, essendo uno strumento che si affida ad [ADB](https://developer.android.com/tools/adb) (Android Debug Bridge).


## Prerequisiti

Per utilizzare Scrcpy è fondamentale abilitare sia le opzioni sviluppatore che il debug USB.

I pochi passaggi necessari dipendono non solo da dispositivo a dispositivo ma anche da versione a versione, e [la pagina dedicata su android.com](https://developer.android.com/studio/debug/dev-options?hl=it) spiega come attivare entrambe.

Per altri dispositivi, è solitamente sufficiente effettuare una ricerca in rete.

L'altro requisito fondamentale è `ADB`, che in ambienti Linux è solitamente una dipendenza già prevista implicitamente e perciò automaticamente installata.

## Installazione

### Debian e Ubuntu

Sebbene Scrcpy si possa installare via Apt,

```bash
apt install scrcpy
```

la versione disponibile nei repository (al momento di scrittura) è obsoleta e non supporta nuove funzionalità (come il trasferimento dell'audio).

In tal caso, è **consigliato** installare Scrcpy in altri modi, ad esempio [da sorgente](https://github.com/Genymobile/scrcpy/blob/master/doc/linux.md#latest-version).

### Fedora

```bash
dnf copr enable zeno/scrcpy && dnf install scrcpy
```

### Arch Linux

```bash
pacman -S scrcpy
```

### Windows

L'installazione Windows può essere sia manuale ([pagina delle release](https://github.com/Genymobile/scrcpy/releases/latest)) oppure effettuata via Winget, Chocolatey o Scoop:

```bash
winget install scrcpy
choco install adb scrcpy
scoop install adb scrcpy
```

Maggiori informazioni sulla [pagina GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/windows.md).

### MacOS

```bash
brew install android-platform-tools scrcpy
```

Maggiori informazioni sulla [pagina GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/macos.md).

### Altre installazioni (Linux)

Consultare la [pagina GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/linux.md) dedicata.


## Come trasferire l'audio in uscita

> Nota: funziona su Android 11 e a partire da Scrcpy 2.

Per far sì che l'audio passi dallo smartphone al computer via ADB, è necessario che lo schermo sia acceso nel momento in cui viene invocato Scrcpy.

Solitamente è sufficiente invocare `scrcpy`:

```bash
scrcpy
```

Qualora lo schermo fosse spento o non fosse possibile connettere il flusso audio, Scrcpy fallirà silenziosamente.
Per forzare Scrcpy a non partire senza il trasferimento audio, bisogna ricorrere alla flag `--require-audio`.

```bash
scrcpy --require-audio
```


## Come inviare file via drag & drop

Scrcpy consente il trasferimento di file sul dispositivo semplicemente trascinando e rilasciando (drag & drop) i file sulla finestra di Scrcpy.

Scrcpy, di default, salva i file nella cartella dei download, ossia `/sdcard/Download/`. La cartella di destinazione si può modificare grazie al parametro `--push-target` seguita dal percorso della cartella sul dispositivo.

In particolare, quando viene trascinato un file APK, Scrcpy tenterà di installarlo come applicazione.


## Come condividere lo schermo

È sufficiente invocare `scrcpy`:

```bash
scrcpy
```

In caso di problemi, specie su versioni obsolete di Scrcpy, può essere utile limitare la lunghezza del lato maggiore utilizzando il parametro `-m`:

```bash
scrcpy -m 1920
```

Per disabilitare qualsiasi interazione con il dispositivo (modalità read-only) si può usare la flag `--no-control`:

```bash
scrcpy --no-control
```

Siccome lo schermo viene condiviso su un'altro schermo, potrebbe essere utile spegnere lo schermo fisico e al contempo anche evitare che il telefono vada in stand-by:

```bash
scrcpy --turn-screen-off --stay-awake
```


## Come registrare lo schermo

Il principio di funzionamento di Scrcpy lo rende particolarmente adatto nel caso sia necessario registrare schermate che sarebbero troppo dispendiose per l'accoppiata processore e memoria interna.

Utilizzando Scrcpy, il flusso video viene direttamente trasferito al computer che si occuperà di salvare su disco la registrazione, in modo da non far riportare evidenti perdite di performance sul dispositivo Android.

Nell'esempio seguente, viene fatta partire la registrazione del solo flusso video, escludendo quello audio a causa della flag `--no-audio`:

```bash
scrcpy --no-audio --record=file.mkv
```

## Come utilizzare il telefono come webcam

Grazie ai driver V4L, è possibile creare un dispositivi virtuali, come videocamere, e far loro trasmettere flussi video arbitrari.

Per maggiori informazioni su come iniziare il setup di `v4l2loopback`, un modulo per il kernel Linux necessario per creare una videocamera virtuale, è possibile consultare [questa pagina GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/v4l2.md).

Una volta terminata la configurazione di v4l2loopback, va istruito Scrcpy a trasmettere il flusso video a `/dev/videoN`, dove `N` è in genere un numero piccolo (solitamente 1 o 2):

```bash
scrcpy --v4l2-sink=/dev/videoN
```

La finestra di playback può essere disattivata con la flag `--no-video-playback`: qualora si scelga di disattivarla si tenga presente che, se proprio necessario, è sempre possibile controllare cosa stia trasmettendo la propia videocamera utilizzando ffplay, VLC o MPV:

```bash
ffplay -i /dev/videoN
vlc v4l2:///dev/videoN
mpv v4l2:///dev/videoN
```


## Come condividere la clipboard (copia-incolla)

Di default, Scrcpy consente già la sincronizzazione della clipboard tra computer e Android.

Qualora la clipboard non venga sincronizzata (da computer ad Android), potrebbe essere necessario ricorrere al metodo basato su key events, attivabile con la flag `--legacy-clipboard`.

Al contrario, la flag `--no-clipboard-autosync` disabilita questo comportamento, che di default non è sempre desiderabile per motivi di privacy e sicurezza.


## ADB via tunnel SSH

Su reti non sicure è possibile avviare il server ADB dietro tunnel SSH.

Questa soluzione si applica ad esempio nei casi in cui ci si voglia connettere a un dispositivo via Internet.

Istruzioni e maggiori informazioni sono disponibili su [GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/tunnels.md).


## Maggiori informazioni

I sorgenti di Scrcpy sono disponibili su [GitHub](https://github.com/Genymobile/scrcpy), mentre il subreddit dedicato è raggiungibile su [r/scrcpy](https://www.reddit.com/r/scrcpy).
