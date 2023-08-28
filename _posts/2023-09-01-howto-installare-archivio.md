---
class: post
title: '#howto - installare software da archivio'
date: 2023-09-01 07:00
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
- archivio
---

La maggioranza dei software disponibili nel panorama GNU/Linux sono disponibili attraverso il package manager, sotto forma di pacchetti facilmente installabili tramite esso oppure ancora attraverso i nuovi formati Flatpak e AppImage.

Ma spesso ancora nei nostri gruppi molti utenti chiedono supporto su come installare archivi tar.gz o archivi di altro genere. Vediamo come ci si può approcciare a tale problema

## Il problema della mancanza di uno standard

Il problema fondamentale di questo genere di installazioni è la mancanza di uno standard. Spesso i siti stessi (che siano siti web veri e propri o che siano dei repository git) rilasciano delle istruzioni per installare i loro software, **il primo approccio** sicuramente **è quello di informarsi tramite canali ufficiali** e seguire le guide scritte dagli sviluppatori stessi.

Per tutti gli altri casi si può cercare di distinguere tra alcuni casi più comuni.

## Un concetto prerequisito: il PATH di sistema

Il PATH di sistema è una particolare variabile (detta variabile d'ambiente) impostata all'avvio in cui vi è una lista di percorsi dove si possono trovare gli eseguibili che devono essere richiamati solo tramite nome.

Si può interrogare in qualunque momento il proprio PATH tramite l'istruzione:

```bash
echo $PATH
```

L'output dovrebbe essere di questo tipo: 

```bash
/usr/local/sbin:/usr/local/bin:/usr/bin
```

Dove ogni path è diviso dall'altro tramite carattere `:`.

I programmi che vengono installati normalmente finiscono in una della cartelle elencate dal PATH. Alcuni casi particolari aggiungono **nuovi percorsi** nel path.

## Caso 1: Cartella con l'eseguibile e vari altri file

Molti software son archiviati *direttamente in una cartella con l'eseguibile* (in genere disponibile in una sotto-cartella `bin` oppure nella directory padre). 

La prima domanda che ci si deve porrà in questo caso è dove voler installare questo software, se in un posto raggiungibile da tutto il sistema oppure solo dall'utente.

### Installare il software per il sistema

Installare un software per tutto il sistema significa non inserirlo nella cartella /home 

 /usr/share /opt 