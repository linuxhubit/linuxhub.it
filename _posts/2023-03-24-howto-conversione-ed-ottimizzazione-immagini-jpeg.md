---
class: post
title: '#howto - Conversione ed ottimizzazione immagini: JPEG'
date: 2023-03-24 08:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags:
- ubuntu
- fedora
- archlinux
---


**Ottimizzare** è un procedimento che consiste principalmente nella riduzione dello spazio cromatico (il totale dei diversi colori presenti in un'immagine) e, quando possibile, nella variazione dell'algoritmo di compressione con uno più efficiente: il tutto, al fine di diminuire il tempo di decodifica e il peso finale del file senza che la qualità ne sia eccessivamente compromessa.

In questo articolo vedremo come ottimizzare le dimensioni di immagini in alcuni formati.


## JPEG

`JPEG` è il formato immagine più utilizzato di sempre: è un primato che detiene ancora oggi, a distanza di poco più di 30 anni dalla sua creazione (risalente al 1992).

A contribuire alla sua diffusione è stata la particolarità di essere un formato **lossy** (un tipo di compressione che rimuove definitivamente alcuni - solitamente impercettibili - dettagli, dopo ogni modifica o salvataggio): è uno dei fattori che consente alle immagini in questo formato di occupare poco spazio.

Funziona bene per immagini molto complesse, ma a non è adatto a ricoprire tutte le casistiche: tra i principali difetti c'è infatti quello di non supportare la trasparenza e le animazioni.



## jpegoptim

Uno degli strumenti più usati, consente di ottimizzare le immagini in modo diverso, sia ricorrendo a procedure lossy che lossless.

```bash
# Ottimizzazione lossless
jpegoptim --strip-all --stdout input.jpg > output.jpg

# Conversione lossy - ricompressione a qualità 75
jpegoptim --max=75 --all-progressive --strip-all --stdout input.jpg > output.jpg

# Conversione lossy - target di 64KB
jpegoptim --size=64 --all-progressive --strip-all --stdout input.jpg > output.jpg

# Conversione lossy - target di -10%
jpegoptim --size=90% --all-progressive --strip-all --stdout input.jpg > output.jpg

# Nota bene: è solitamente una cattiva idea convertire immagini da un formato lossy ad uno lossy.
# (come JPEG -> JPEG, a meno che il procedimento non sia sicuramente lossless).
```

### Ubuntu

```bash
apt-get install jpegoptim
```

### Fedora

```bash
dnf install jpegoptim
```

### Arch Linux

```bash
pacman -S jpegoptim
```


## jpegtran

È un tool che principalmente permette di applicare delle trasformazioni lossless (senza perdità di qualità: rotazione, capovolgimento orizzontale, capovolgimento verticale, e in alcuni casi anche di ritaglio e cancellazione).

Il parametro `-optimize` consente di ottimizzare le tabelle di Huffman, riducendo perciò la dimensione del file.

Il parametro `-copy` impostato a `none` permette di ridurre ulteriormente le dimensioni tralasciando eventuali commenti e altri metadati.

```bash
jpegtran -optimize -copy none input.jpg > output.jpg
```


### Ubuntu

```bash
apt-get install jpegtran
```

### Fedora

```bash
dnf install jpegtran
```

### Arch Linux

```bash
pacman -S jpegtran
```


## cjpeg

Fa parte della libreria libjpeg-turbo, ampiamente utilizzata in numerosi software.

Il parametro -optimize allunga i tempi facendo solo diminuire il peso del file

Il parametro -quality accetta valori interi fino a 100 (l'ottimale è 50-95; di default è 75)

```bash
cjpeg -optimize -quality 80 -outfile output.jpg input.jpg
```

### Ubuntu

```bash
apt-get install libjpeg-turbo-progs
```

### Fedora

```bash
dnf install libjpeg-turbo-utils
```

### Arch Linux

```bash
pacman -S libjpeg-turbo
```


## mozjpeg

Si tratta di un fork della libreria libjpeg-turbo, creato da Mozilla, in cui le differenze dal progetto originario mirano ad essere "minimali".

Le principale feature sono il supporto a un diverso tipo di quantizzazione (una delle fasi di compressione che "prepara" i dati per poter essere maggiormente compressi; permette di ridurre un intervallo di numeri più grande in un intervallo più piccolo)

Ufficialmente è sconsigliato l'utilizzo dell'interfaccia CLI (da terminale) in quanto l'interfaccia primaria è quella programmatica.

### Compilazione

I sorgenti disponibili su GitHub vanno compilati:

```bash
# Per Ubuntu
apt install autoconf automake libtool nasm make pkg-config git

# Per Fedora
pacman -S autoconf automake libtool nasm make pkgconf-pkg-config git

# Per Arch Linux
pacman -S autoconf automake libtool nasm make pkgconf-pkg-config git

# Il resto dei passaggi in comune:

git clone https://github.com/mozilla/mozjpeg.git

cd mozjpeg

./configure

make

make install
```


## guetzli

È un tool sviluppato da Google che utilizza un diverso approccio per la compressione: si basa su un algoritmo più complesso che individua la migliore combinazione di parametri in base all'immagine.

Nonostante la fase compressione sia più lenta e richieda molte più risorse (specie RAM, ma anche di tempo) rispetto ad altri strumenti simili, ciò consente una migliore ottimizzazione e una maggiore fedeltà qualitativa (grazie alle "ottimizzazioni psicovisive", le immagini appaiono infatti migliori alla percezione umana).

```bash
guetzli --quality quality_value input.jpg output.jpg
```

### Ubuntu

```bash
apt-get install guetzli
```

### Fedora

```bash
dnf install guetzli
```

### Arch Linux

```bash
pacman -S guetzli
```


## ImageMagick

ImageMagick è un tool generico che permette di mostrare, generare, convertire (anche da un formato all'altro) e modificare immagini raster e vettoriali.

Anche ImageMagick può essere utilizzato per ottimizzare immagini (non solamente immagini JPEG).

```bash
# Parametri ampiamente usati per la compressione di un'immagine (lossless -> lossy):
# -interlace Plane (in questo caso indica di generare un'immagine JPEG progressiva)
# -define jpeg:dct-method=float (permette una migliore ottimizzazione impiegando però più tempo)
# -sampling-factor 4:2:0 (tipico delle immagini lossy, viene data maggiore rilevanza alla scala di grigi e meno alla componente cromatica)
# -quality 85% (imposta la qualità a un livello molto alto)
# -strip (rimuove eventuali commenti ed altri metadati)

convert input.png -interlace Plane -define jpeg:dct-method=float -sampling-factor 4:2:0 -quality 85% -strip output.jpg
```

### Ubuntu

```bash
apt-get install imagemagick
```

### Fedora

```bash
dnf install imagemagick6
```

### Arch Linux

```bash
pacman -S imagemagick6
```

Per ulteriori informazioni, è possibile consultare la [documentazione ufficiale](https://imagemagick.org/script/command-line-options.php).
