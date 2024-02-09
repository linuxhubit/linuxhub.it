---
class: post
title: "#howto - FFmpeg: un'introduzione"
date: 2024-02-09 07:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
tags:
- ubuntu
- fedora
- archlinux
- windows
- macos
- android
---

**FFmpeg** è il software di riferimento per la manipolazione di file audio e video.

Si utilizza via riga di comando e consente di operare su file multimediali dai più svariati formati, dai più sconosciuti ai più recenti.

Tra le sue potenzialità: si può ritagliare un video, estrarne uno spezzone, unire più segmenti, cambiarne il formato, comprimerlo per guadagnare spazio su disco, ma anche aggiungere o estrarre tracce audio e sottotitoli, giusto per citare alcune delle operazioni più comuni.

## Installazione

Di seguito le informazioni su come installare FFmpeg su vari sistemi operativi.

Per maggiori informazioni, è sempre possibile consultare la [pagina ufficiale](https://ffmpeg.org/download.html) dei download, che comprende anche eseguibili **statici** nonché versioni meno recenti.

### Da sorgente

Sebbene compilare da sé un software non sia la scelta più conveniente, FFmpeg costituisce un'eccezione: FFmpeg supporta un numero consistente di codec e formati (di cui sarà discusso più in avanti), ma alcuni vengono esclusi dai pacchetti pre-compilati per le motivazioni più disparate: problemi di licenza, di spazio occupato.

Un ulteriore vantaggio risiede nel fatto che compilare un software da sé **potrebbe** consentire al compilatore di ottimizzare un po'meglio l'eseguibile, qualora vengano forniti i giusti parametri.

Siccome la manipolazione di file multimediali può richiedere tempi e costi esorbitanti, e viste anche le continue migliorie (si pensi all'aumento delle prestazioni o alla risoluzione di bug), allora la compilazione nel caso di software critici come FFmpeg è ancor più indicata.

Per compilare FFmpeg senza alcuna modifica di sorta ai sorgenti:

```bash
git clone https://git.ffmpeg.org/ffmpeg.git

cd ffmpeg

./configure

make

make install
```

In caso di problemi, potrebbe essere necessario disabilitare alcune funzionalità o, in alternativa, installare i pacchetti di dipendenze mancanti.

A tal proposito, sulla wiki di FFmpeg è possibile trovare sia la [guida ufficiale generica](https://trac.ffmpeg.org/wiki/CompilationGuide/Generic) che le guide specifiche per le distribuzioni basate [su Ubuntu](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu) o appartenenti alla famiglia di [Red Hat](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos).

### Ubuntu

FFmpeg è disponibile all'installazione via `apt` su Ubuntu e derivate:

```bash
apt install ffmpeg
```

### Fedora

L'installazione su Fedora richiede un passaggio in più, siccome di base `ffmpeg` non è disponibile nei repository ufficiali per loro scelta.

Dunque, bisogna prima abilitare i repository [RPM Fusion](https://rpmfusion.org/Configuration) (nello specifico, la repository "free"):

```bash
dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
```

A questo punto, non resta che aggiornare l'elenco dei repository e installare `ffmpeg`.

```bash
dnf update

dnf install ffmpeg
```

Nota: nel caso di Fedora Silverblue, le istruzioni sono identiche una volta sostituito il comando `dnf` con `rpm-ostree` (in più, è necessario riavviare).

### Arch Linux

Esistono tre diverse opzioni nel caso di Arch Linux: `ffmpeg` (dalle repository ufficiali), `ffmpeg-git` (da AUR, sincronizzato con la repository Git di FFmpeg) e `ffmpeg-full` (anche qui da AUR, che include anche encoder e decoder solitamente lasciati fuori da altri pacchetti).

Solitamente, installare il pacchetto `ffmpeg` è sufficiente:

```bash
pacman -S ffmpeg
```

### Windows

Il pacchetto base per Windows è disponibile via Chocolatey:

```bash
choco install ffmpeg
```

In alternativa, via [Winget](https://learn.microsoft.com/it-it/windows/package-manager/winget/):

```bash
winget install "FFmpeg (Essentials Build)"
```

Su [Scoop](https://scoop.sh) è disponibile il pacchetto "full":

```bash
scoop install ffmpeg
```

### MacOS

Su MacOS, FFmpeg è disponibile via Homebrew:

```bash
brew install ffmpegff
```

### Android

Grazie a [Termux](https://linuxhub.it/articles/howto-termux-linux-su-android/), è possibile utilizzare FFmpeg direttamente dal proprio smartphone Android.

Pur non essendo indicato per compiti più complessi (a causa delle prestazioni dei dispositivi mobili), resta comunque un'ottima opzione per manipolare video e audio in assenza di un computer.

```bash
pkg install ffmpeg
```

## Alcune definizioni

Per poter avere una vaga idea di come utilizzare al meglio FFmpeg (anche solo per comprendere che cosa cercare o come chiedere aiuto) è fondamentale conoscere, almeno a grandi linee, un po'di terminologia.

### Contenitore

Un **contenitore** è una struttura di dati il cui nome, solitamente, coincide con l'estensione del file multimediale.

In un file multimediale, il suo contenitore si occupa di contenere i vari [formati](#Formato) e metadati (autore, descrizione, tag, durata, data di creazione, e così via, alcuni dei quali sono inclusi anche negli stessi formati).

> MP4, MOV, MKV, WEBM sono contenitori di flussi audio, video e sottotitoli.

> Esistono anche contenitori specifici, sebbene meno utilizzati: M4V è il contenitore di un [formato](#Formato) solo video (spesso H264) mentre M4A, analogamente, è il contenitore di un formato solo audio (spesso AAC).

### Formato

Un **formato** è un flusso (stream) che rappresenta ciascuna delle singole parti che compongono il [contenitore](#Contenitore) di un file multimediale.

Sono tre i tipi di formati principali da ricordare: **audio**, **video** e **sottotitoli**.

> H264 (o AVC) è il formato video più diffuso in assoluto al momento di scrittura dell'articolo.
>
> Analogamente, AAC è il formato audio che solitamente accompagna il formato video H264 nei contenitori MP4.
> L'intera lista dei formati per la propria installazione di ffmpeg è disponibile digitando `ffmpeg -formats`

### Lossy e lossless

Quando un formato consente di conservare le informazioni senza perdita, **a prescindere** o meno che ci sia una compressione, allora si definisce **lossless**.

Al contrario, usare un formato **lossy** implica perdere qualità ad ogni successiva modifica del file.

I formati lossy comprimono meglio, occupano meno e richiedono meno risorse per essere inviati e riprodotti: sono i più adatti alla **distribuzione**.

I formati lossless, invece, sono preferibili in caso di **archiviazione**.

> FLAC e WAV sono esempi di formati audio lossless.
>
> MP3, AAC, OPUS e Vorbis sono esempi di formati audio lossy.
>
> Molti altri formati sono lossy o lossless a seconda dei casi.

### Codec

Un **codec** è spesso ed erroneamente confuso con quello che in realtà è un **formato**.

Derivando dall'unione di en**co**der e **dec**oder, un **codec** fornisce entrambe le funzionalità per codificare o decodificare un flusso in un dato [formato](#formato).

Esistono due tipi di codec: *software* e *hardware*. Solitamente i codec hardware, inclusi direttamente nei SoC, sono più rapidi ed efficienti delle controparti software.

> Esempi di codec sono libx264, libmp3lame, libopus, libvpx, libdav1d
> L'intera lista dei codec per la propria installazione di ffmpeg è disponibile digitando `ffmpeg -codecs`

### Muxer e demuxer, encoder e decoder

![ffmpeg transcoding demux-decode-encode-mux](https://telegra.ph/file/6823ca2995aa60924d442.png)

In breve, **muxer** e **demuxer** lavorano sul contenitore, combinando o estraendo i singoli flussi.

Al contrario, **encoder** e **decoder** lavorano sui singoli flussi, convertendo ad un dato formato o effettuando l'operazione inversa.

### Transcoding

Con **transcoding**, quindi con un'operazione di **transcodifica**, si intende l'utilizzo di un codec per convertire un formato in un altro formato (non necessariamente diversi).

Ciò implica che i dati di un file multimediale passano, in ordine, attraverso un demuxer, un decoder, un encoder e un muxer.

> Non bisognerebbe [**MAI**](#Conversioni_lossy_e_lossless) effettuare una transcodifica da un formato Lossy a un formato Lossless.

## Esempi

Di seguito alcuni esempi di utilizzo, tenendo a mente che la sintassi di `ffmpeg` è la seguente:

```bash
ffmpeg [parametri globali] {[parametri di input] -i input} ... {[parametri di output] output} ...
```

Le **parentesi quadre** indicano che quegli argomenti sono facoltativi, le **parentesi graffe** indicano che sono mandatori, mentre i **tre puntini di ellissi** indicano che il precedente argomento può essere ripetuto una o più volte.

### Conversione da un formato ad un altro

Per convertire un video intero da WEBM a MP4 non è necessario specificare alcun parametro aggiuntivo, oltre ai file di input e output:

```bash
ffmpeg -i video.webm video.mp4
```

### Estrazione della traccia audio da un video

Utilizzando `-vn` si esclude il flusso video, preservando perciò solamente quello audio.

```bash
ffmpeg -i video.mp4 -vn video.aac
```

Tuttavia, questa soluzione non è la migliore: viene infatti effettuato il **transcoding** (o re-encoding), ossia, FFmpeg ri-codificherà da capo l'intera traccia audio: un gran spreco di risorse, tempo e di qualità.

La migliore soluzione, quando possibile, sta invece nel copiare il flusso così com'è in output specificando `-c copy`: in altre parole, saranno effettuate le sole operazioni di demux e mux, quindi nessun decoding o encoding.

Ciò consente di ottenere risultati quasi istantaneamente, essendo il grosso del lavoro limitato dalla velocità del disco e non più dalla CPU:

```bash
ffmpeg -i video.mp4 -vn -c:a copy video.aac
```

Il `:a` in `-c:a copy` indica che il parametro è relativo, nello specifico, al flusso audio.

### Estrarre uno spezzone da un video

Per estrarre una parte di video è necessario ricorrere ai parametri `-ss`, `-to` e `-t`, come nel seguente esempio:

```bash
ffmpeg -i video.mp4 -ss 00:00:04 -to 00:00:09.5 -c copy video_di_5_secondi_e_mezzo.mp4
```

Un comando del tutto equivalente, specificando durata (`-t`) anziché la fine (`-to`), è il seguente:

```bash
ffmpeg -i video.mp4 -ss 4 -t 5.5 -c copy 5_secondi_e_mezzo.mp4
```

Come visibile, la durata può essere espressa in vari modi, tra cui in formato HH:MM:SS (specificando eventualmente anche i millisecondi) o in formato unitario (in numero di secondi).

### Aumentare il volume

Per aumentare il volume di una traccia audio, è possibile ricorrere a un **filtro lineare**.

I filtri consentono di manipolare un flusso nei modi più disparati.

Il parametro `-filter` (abbreviato `-f`) viene fatto seguire dal nome del filtro e i parametri del filtro.

Nel seguente esempio, ad un file audio viene raddoppiato il volume predefinito (nota: sono supportate anche le unità in decibel, dB).

```bash
ffmpeg -i audio.ogg -filter:a volume=2 audio_v2.ogg
```

## Parametri più usati

| Parametro | Descrizione                                                |
|-----------|------------------------------------------------------------|
| `-i`      | Considera un URL di input (come un file o un collegamento) |
| `-ss`     | Indica il punto in cui la riproduzione deve iniziare e può essere usato sia come parametro di input che di output (con qualche piccola ma [importante differenza](#Inizio_e_fine)) |
| `-to`     | Indica il punto in cui la riproduzione deve terminare; è un'alternativa a `-t` |
| `-t`      | Indica la durata della riproduzione e dunque si configura come alternativa a `-to` |
| `-c`      | Indica il [codec](#Codec) da utilizzare (il valore `copy` indica nessun transcoding) |
| `-c:a`    | Come `-c`, ma si applica soltanto ai flussi audio (alias di `-acodec`) |
| `-c:v`    | Come `-c`, ma si applica soltanto ai flussi video (alias di `-vcodec`) |
| `-c:s`    | Come `-c`, ma si applica soltanto ai flussi di sottotitoli (alias di `-scodec`) |
| `-an`     | Esclude tutti i flussi di tipo audio |
| `-vn`     | Esclude tutti i flussi di tipo video |
| `-sn`     | Esclude tutti i flussi di sottotitoli |
| `-f`      | Filtro lineare (abbreviazione di `-filter`) |
| `-f:a`    | Come -f, ma si applica soltanto ai flussi audio (alias di `-afilter`) |
| `-f:v`    | Come -f, ma si applica soltanto ai flussi video (alias di `-vfilter`) |

## Errori da evitare e consigli

### Tagli e compromessi

Sebbene effettuare una **stream copy** (`-c copy`) sia vantaggioso, esiste anche un costo non indifferente che si manifesta in condizioni più particolari.

Ad esempio, se si volesse tagliare un file MP4 con una precisione al **frame** (usando `-ss` e `-to` / `-t`), allora il transcoding diventa necessario (ovvero, bisogna rinunciare a `-c copy`).

Il transcoding infatti, sebbene comporti un costo computazionale maggiore, consente una precisione frame-per-frame.

Una stream copy, al contrario, è un'operazione imprecisa nel caso di un taglio siccome permette di avvicinarsi solo ai fotogrammi chiave più vicini (keyframes, frame che hanno un'importanza maggiore), sacrificando perciò la precisione per una maggiore efficienza.

### Inizio e fine

I parametri `-ss`, `-t` e `-to` possono essere indicati sia come parametri di input che come parametri di output.

La differenza fondamentale sta nel modo in cui FFmpeg li interpreta in fase di demux/mux e codifica/decodifica.

Quando posizionati come parametri di input, FFmpeg cercherà di avvicinnarsi il più possibile al punto voluto senza la sicurezza di alcuna precisione (per le stesse motivazioni descritte nel [paragrafo precedente](#Tagli_e_compromessi)).

Come parametri di output, invece, il transcoding fa sì che il risultato sia quello cercato, al costo di ri-codificare tutti i frame.

### Conversioni lossy e lossless

È un errore convertire un file **lossy** in uno **lossless**: proprio per definizione, un'informazione lossy non possiede più lo stesso grado di dettaglio della sua analoga lossless.

Convertire un MP3 (lossy) in FLAC (lossless), ad esempio, costituisce un errore: non è possibile recuperare lo il livello di accuratezza perso, e l'unico risultato che si ottiene è nient'altro che un sensibile aumento dello spazio occupato.

L'ideale è limitare le conversioni da lossless a lossy o, se proprio necessario e in mancanza di alternative, da lossy a lossy.

Le conversioni da lossless a lossless invece non sono problematiche, generalmente.

## Non solo ffmpeg

FFmpeg in realtà non è un singolo eseguibile, ma il nome di un **progetto** che comprende un'intera suite di altri strumenti e librerie.

Mentre **ffmpeg** si occupa della manipolazione di file multimediali, **ffplay** ne consente la riproduzione (si pensi a una sorta di [mpv](https://linuxhub.it/articles/howto-installazione-di-mpv-su-linux/)) e **ffprobe** ne fornisce informazioni dettagliate (sul contenitore e sui flussi, come durata, bitrate, framerate, e così via).

Proprio come `ffmpeg`, entrambi sono accessibili via riga di comando: `ffplay` e `ffprobe`, a cui si fa seguire il percorso di un file multimediale.

Dietro le quinte, tutti e tre gli strumenti a riga di comando qui citati fanno utilizzo delle medesime librerie, che costituiscono il cuore del progetto FFmpeg: le principali sono **libavcodec** (dedicata a encoder e decoder) e **libavformat** (dedicata a muxer e demuxer).

Per comprendere l'importanza di tali librerie, si consideri che sono molti gli editor e i player in GUI ad utilizzarle: VLC, mpv, [Kdenlive](https://linuxhub.it/articles/howto-installazione-di-kdenlive/), [ImageMagick](https://linuxhub.it/articles/howto-modificare-immagini-imagemagick/) e, parzialmente, addirittura in browser come Chrome e Firefox.

## Risorse

La [documentazione ufficiale](https://ffmpeg.org/ffmpeg.html) è insostituibile per destreggiarsi con `ffmpeg`, per conoscere tutti i parametri e il loro funzionamento (considerato anche che, tra i vari encoder/decoder, potrebbero avere comportamenti diversi o, peggio, non essere proprio supportati).

Molto utile è anche la [wiki ufficiale](https://trac.ffmpeg.org/wiki) su cui sono disponibili pagine guida per operazioni molto specifiche, come l'[encoding di H.264](https://trac.ffmpeg.org/wiki/Encode/H.264) (il principale formato video in circolazione, attualmente) o la [registrazione del desktop](https://trac.ffmpeg.org/wiki/Capture/Desktop).
