---
class: post
title: '#howto - Modificare le immagini con ImageMagick'
date: 2023-05-05 08:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags:
- imagemagick
- ubuntu
- archlinux
- fedora
- meme
- immagini
---


Anche il terminale è una buona risorsa per modificare immagini, ridimensionarle, creare scritte o sfocarle.

## Installare ImageMagick

ImageMagick è disponibile in genere per tutte le distribuzioni tramite package manager. 

### Ubuntu e derivate

Per installare ImageMagick su Ubuntu digitare

```bash
apt install imagemagick
```

### Fedora

Per installare ImageMagick su Fedora digitare

```bash
dnf install imagemagick
```

### ArchLinux

Per installare ImageMagick su ArchLinux digitare

```bash
pacman -S imagemagick
```

## Aggiungere scritte e fare meme

In genere i meme hanno quasi tutti la stessa struttura: un immagine di base e delle scritte posizionate in diversi punti: ad esempio in alto e in basso oppure in un determinato punto.

Per aggiungere delle scritte sull'immagine con ImageMagick scriviamo:

```bash
convert immagine-da-memare.png -font percorso/font/bello.ttf -fill <colorefont> -pointsize <dimensione> -stroke <colorecontorno> -strokewidth <dimensione contorno> -gravity <dove scrivere> -annotate +0+0 'TESTO' immagine-memata.png
```

Facendo un esempio concreto: 

- Usando il carattere **LiberationSerif Regular**
- Il carattere sarà colorato di bianco
- La linea esterna, o il contorno che dir si voglia, del carattere sarà nera
- Lo spessore del contorno sarà 2 pixel
- La scritta sarà posizionata in basso

Ecco un comando completo: 

```bash
convert immagine-da-memare.png -font /usr/share/fonts/liberation/LiberationSerif-Regular.ttf -fill white -pointsize 30 -stroke black -strokewidth 2 -gravity south -annotate +0+0 'MEME DA TERMINALE YEAH :D' immagine-memata.png 
```

Come si può notare, il parametro "gravity" riceve come valore una posizione "cardinale", altri valori validi sarebbero stati:

- north
- east
- west

Vanno bene anche le "intersezioni" tra le varie coordinate.

Il numero presente vicino il parametro `annotate` specifica "l'offset" rispetto al lato scelto, in verticale e quindi in orizzontale.

### Più scritte

Ovviamente reiterando più volte il procedimento si potranno aggiungere ulteriori scritte, per fare un meme con la scritta sia sopra che sotto basterà farlo una volta indicando "south" come gravity e un altra volta "north". 

Oppure si può unire tutto in un comando solo indicando entrambe le gravità ed entrambe le scritte così:

```bash
convert immagine-da-memare.png -font /usr/share/fonts/liberation/LiberationSerif-Regular.ttf -fill white -pointsize 30 -stroke black -strokewidth 2 -gravity north -annotate +0+0 'QUESTA SCRITTA SARÀ SOPRA' -gravity south -annotate +0+0 'QUESTA SCRITTA SARÀ SOTTO' immagine-memata.png
```

## Screenshot da terminale

Esistono vari tool per scattare screenshot da terminale, ma anche ImageMagick fa il suo lavoro in maniera eccellente. Per farlo si può utilizzare il programma "`import`":

```bash
import -window root percorso/nomescreenshot.jpg
```

Con "root" indichiamo tutto lo schermo come fonte dello screenshot.


### Screenshot ridimensionato 

Si può pensare di fare una resize dell'immagine uscente:

```bash
import -window root -resize [percentuale_di_ridimensionamento]%  percorso/nomescreenshot.jpg
```

Ad esempio 50%: 

```bash
import -window root -resize 50%  percorso/nomescreenshot.jpg
```

### Screenshot Ritagliato

```bash
import -window root -crop [larghezza]x[altezza]+[offsetX]+[offsetY]  percorso/nomescreenshot.jpg
```

Ad esempio una regione 100x250 a 10 pixel dallo schermo da destra e 15 pixel dall'alto: 

```bash
import -window root -crop 100x250+10+15  percorso/nomescreenshot.jpg
```

## Sfocatura

Vanno ormai molto di moda le immagini sfocate con la gaussiana, in genere messe sotto un elemento che rimane chiaro e ben visibile. Come si sfoca un immagine da terminale?

Ancora una volta ci aiuta imagemagick con l'attributo "`blur`": 


```bash
convert <nomeimmagine> -blur <radius>x<sigma> <nomeimmagineoutput>
```

Ora per capire bene il significato di radius e sigma bisogna capire come funziona la sfocatura gaussiana.

### Raggio di sfocatura

> Non me ne vogliano quelli più esperti che sanno perfettamente cos'è una sfocatura gaussiana, ma la definizione sarà molto approssimativa ed esemplificata per far capire a tutti come aggiustare i parametri.

Quando un immagine viene sfocata, è come se venisse passata una lente con un certo raggio di sopra che esamina poco a poco delle parti dell'immagine, le parti esaminate vengono "mescolate" tra di loro introducendo anche un "elemento di disordine". 

Quel che deteremina quanto è grande la lente è la variabile sopra definita come "`radius`", mentre l'elemento di disordine è "`sigma`". Più sigma è elevato, più il blur è "efficace".

Ad esempio sfochiamo con raggio 1 e sigma 10:

```bash
convert /path/immaginedasfocare.png -blur <radius>x<sigma> /path/immaginesfocata.png
```

### Tornare indietro nelle modifiche

Si può tornare indietro nelle modifiche, ovvero "rimettere a fuoco" l'immagine sfocata se si conoscono i parametri di sfocatura, grazie al parametro "sharpen":

```bash
convert immaginesfocata.jpg -sharpen <radius>x<sigma> immagineMENOsfocata.jpg
```

ovviamente non fa miracoli, potrebbe risultare "meno sfocata" oppure non sfocata in base ai casi. Ecco un esempio opposto a quello di cui 
sopra:

```bash
convert immaginesfocata.jpg -sharpen 0x10 immagineMENOsfocata.jpg
```
