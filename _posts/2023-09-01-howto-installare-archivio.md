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

Il problema fondamentale di questo genere di installazioni è **la mancanza di uno standard**. Spesso i siti stessi (che siano siti web veri e propri o che siano dei repository git) rilasciano delle istruzioni per installare i loro software, **il primo approccio** sicuramente **è quello di informarsi tramite canali ufficiali** e seguire le guide scritte dagli sviluppatori stessi.

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

## Cartella con l'eseguibile e vari altri file

Molti software son archiviati *direttamente in una cartella con l'eseguibile* (in genere disponibile in una sotto-cartella `bin` oppure nella directory padre). Se non vi sono istruzioni di installazione oppure script di installazione inclusi si può cercare di installare seguendo lo schema che seguirà:

La prima domanda che ci si deve porrà in questo caso è dove voler installare questo software, se in un posto *raggiungibile da tutto il sistema* oppure *solo dall'utente*.

## Caso esempio NomeSoftware

Supporremo, per facilitazione, che *il software scompattato* abbia questa forma:

```
CartellaSoftware
├── config/
└── eseguibile
```

Dove *la cartella di config* (o *le cartelle di config*, generalmente config, icons, bin etc...) servono al programma per trovare i propri file di configurazione, mentre il file *eseguibile* (spesso porta il nome stesso del software) rappresenta per l'appunto il file di esecuzione del software.

Si supporrà anche che il suo nome sia `NomeSoftware`.

### Installare il software per il sistema

Installare un software per tutto il sistema significa sostanzialmente non inserirlo nella propria Home, generalmente i due path usati per software da terze parti sono: 

- `/usr/share`: normalmente utilizzata per le applicazioni installate dal package manager o da software di cui si ha a disposizione il codice sorgente
- `/opt`: per i software di qualunque tipo

Il software scompattato va copiato sotto una delle cartelle descritte sopra, ad esempio `opt`: 

```bash
mv CartellaSoftware /opt
```

Va quindi creato un link dall'eseguibile ad una della cartella coperte dalla variabile `PATH`, per consentire che il software sia raggiungibile ovunque. Una della cartella coperte da PATH è in genere `/usr/bin`:

```bash
ln -s /opt/CartellaSoftware /usr/bin
```

Manca però il launcher, ovvero l'icona che appare da menù start...

### Creare un launcher per il sistema

Esiste un articolo sul sito che descrive la [creazione del file di launcher qui](https://linuxhub.it/articles/howto-desktop-entry/), sostanzialmente si tratta di un file, con estensione `.desktop`, con questa forma: 

```properties
[Desktop Entry]

Name=NomeSoftware
Type=Application
Comment=Descrizione
Terminal=false

Exec=/opt/CartellaSoftware/eseguibile
Icon=/opt/CartellaSoftware/icone/icona

Categories=categoriasoftware
Keywords=parole;chiave
```

Sostituendo i vari valori, dovreste poter poi "cliccare" questo file da gestore dei file e si dovrebbe quindi avviare il software. Per essere visto nel menù da  tutti gli utenti il file deve essere copiato nella cartella `/usr/share/applications`:

```bash
mv NomeSoftware.desktop /usr/share/applications
```

Supponendo che il file sia stato chiamato `NomeSoftware.desktop`.
Ora il file dovrebbe essere disponibile nel menu.

### Installare il software per l'utente

Un software è installato solo per l'utente nel caso in cui risieda nella propria home.

In questo caso ognuno ha un po' le sue regole, normalmente si crea una cartella nascosta (ovvero preceduta da `.`) con il nome  stesso del software e si mettono i file al suo interno:

```bash
mv CartellaSoftware $HOME/.CartellaSoftware
```

Per non sporcare le cartelle di sistema, invece di fare un collegamento ad una di quelle si può pensare di creare una propria cartella dove posizionare i collegamenti di tutti gli eseguibili, sotto la home, ed includere nel PATH solo quella.

### La cartella .local/bin

Generalmente si preferisce creare una cartella locale con tutti gli eseguibili più che aggiornare il PATH per ogni programma installato. Normalmente questa cartella nel sistema non esiste, in tal caso si può creare scrivendo:

```bash
mkdir $HOME/.local/bin
```

È possibile ora proseguire facendo il collegamento simbolico con l'eseguibile del software appena scaricato: 

```bash
ln -s $HOME/.CartellaSoftware/eseguibile $HOME/.local/bin
```

Solo **la prima volta**, è necessario anche **aggiornare il PATH**.

### Aggiornare la variabile di PATH

Apriamo il file di startup della shell, in base alla shell questo file è differente:

- Per bash si trova in `$HOME/.bashrc`
- Per zsh si trova in `$HOME/.zshrc`
- Per fish si trova in `$HOME/.config/fish/config.fish`, ma la sintassi sarà differente da quella scritta qua sotto.

In un punto a piacere del file (magari verso la fine) è necessario scrivere: 

```bash
export PATH=$PATH:$HOME/.local/bin
```

È possibile anche ovviamente inserire il path della cartella del software stesso e non quella generica creata prima, ma generalmente si preferisce questo approccio per rendere più semplice aggiornare.

### Creare un launcher per l'utente

Come già spiegato in precedenza, il launcher è quel file che permette sia di avviare a doppio click i software che di essere facilmente trovato ed indicizzato nel menù di sistema. Si crei quindi un file con estensione `.desktop` con un contenuto simile a questo: 

```properties
[Desktop Entry]

Name=NomeSoftware
Type=Application
Comment=Descrizione
Terminal=false

Exec=/home/nomeutente/.CartellaSoftware/eseguibile
Icon=/home/nomeutente/.CartellaSoftware/icone/icona

Categories=categoriasoftware
Keywords=parole;chiave
```

Sostituendo adeguatamente nomi e percorsi.

Quindi si copi il file nella cartella `$HOME/.local/share/applications`

```bash
cp NomeSoftware.desktop $HOME/.local/share/applications
```

Supponendo che il file sia stato chiamato NomeSoftware.desktop.

Ora il file dovrebbe essere disponibile nel menu.

## Altri casi

In altri casi gli archivi hanno file di installazione inclusi al loro interno oppure riproducono 1:1 un file system tipico di linux, suggerendo quindi dove posizionare i vari file.

Se l'argomento può interessare o se riscontrate altre tipologie di archivio che non riuscite ad installare venite a chiedere supporto sui nostri gruppi Telegram. Scriveremo un articolo ad hoc.