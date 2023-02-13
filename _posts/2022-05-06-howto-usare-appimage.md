---
class: post
title: '#howto - Usare appimage'
date: 2022-05-06 11:00 
layout: post
author: Floppy
author_github: raspFloppy
coauthor: linuxhub
coauthor_github: linuxhubit
published: true
tags:
- appimage
---

Immaginate di poter installare e disinstallare un'applicazione rimuovendo un semplice file e poterlo utilizzare su qualsiasi distribuzione indipendetemente dal package manager, ecco questi sono gli **Appimage**.

## Cosa sono
Le AppImage sono un formato di packaging che permette di racchiudere un' applicazione e le sue librerie in un unico file `.AppImage`

## Installazione
Le appimage contengono un'immagine che in eseguzione verrà montata con all'interno un filesystem (contenente l'applicazione e le dipendenze) nel quale viene eseguito il programma.

Non hanno un repository ufficiale come flathub, perciò dovremmo trovare noi le applicazioni che usano questo formato, [qui](https://appimage.github.io/apps/) una piccola lista di software che usano questo sistema. 

Generalmente nel sito dell'app, nella sezione download dovrebbe esserci l'opzione per questo formato se esso lo usa.

### Repository e package manager non ufficiali

Esistono tuttavia alcuni metodi di installazione di terze parti sicuri da poter utilizzare. 

Ad esempio [AppImageHub](https://www.appimagehub.com), dove potete trovare una lista di appimage da scaricare con tanto di ricerca dedicata. 

O ancora il package manager zap, di cui abbiamo parlato [in quest'altro articolo](https://linuxhub.it/articles/howto-installazione-ed-utilizzo-di-zap-gestore-pacchetti-per-appimage/).

Infine un ulteriore strumento è **[Appimage Pool](https://github.com/prateekmedia/appimagepool)**, uno store non ufficiale per installare appimage installabile tramite flatpak, installatelo tramite: 

```bash
flatpak install flathub io.github.prateekmedia.appimagepool
```

## Come funzionano

Una volta installato il file, apriamo il terminale ed eseguiamo:
```bash
chmod +x nomefile.AppImage
```

In questo modo avremo reso il file eseguibile e scrivendo:

```bash
./nomefile.AppImage
```
Eseguiremo la nostra applicazione.

> CONSIGLIO:
> Create una cartella `~/Applications` o denominata a piacere per inserire tutte le vostre appimage


## Vantaggi e Svantaggi
Il vantaggio principale delle Appimage è che ci permette di avere la stessa applicazione con le stesse dipendenze su distribuzioni differenti senza incorrere in conflitti di alcun genere in quanto il filesystem del nostro sistema non viene intaccato, inoltre possiamo usufruire dell'estrema portabilità e facilità di installazione/disinstallazione dell'applicazione. Infatti basterà aggiungere e rimuovere il file ed il gioco è fatto.

Abbiamo però alcuni svantaggi, uno di questo è il fatto di non poter aggiornare automaticamente l'Appimage (qui entrerebbe in gioco l'utilità di zap, [il package manager di cui sopra](#title2)) a meno che chi distribuisce il software non inserisca nel immagine un modulo per cercare, verificare ed installare una nuova versione del programma.

Inoltre al momento dell'installazione non viene creata nessuna entry nel nostro menù delle app obbligandovi a crearle manualmente. 

### Desktop entry per AppImage
Esiste un tool per la creazione di entry nelle nostre appimage, che va a risolvere quella mancanza di cui sopra: **[Appimagelauncher](https://github.com/TheAssassin/AppImageLauncher)**.
