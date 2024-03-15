---
class: post
title: "#howto -  Guida all'utilizzo di GIT, parte 5: ignorare"
date: 2024-03-15 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuhubit
coauthor_github: linuhubit
published: true
tags:
  - bash
  - git
---

[&larr; Articolo precedente, parte 4: remote e branch](https://linuxhub.it/articles/howto-git-pt4/)  

Quando si parla di *software di versioning*, `Git` è sicuramente il primo programma che ci viene in mente. Rappresenta l'alternativa più diffusa a sistemi come `svn`, utilizzata anche in ambito enterprise.

Rappresenta anche uno dei primi scogli che dipendenti alle prime armi affrontano in azienda.

Ecco quindi una guida passo passo a Git, parte 5: ignorare.

## Obiettivi

Questo articolo affronterà i seguenti argomenti:

- gitignore
- throubleshoot
- caratteri jolly
- gitignore.io

## File da ignorare

Dopo aver creato un nuovo progetto, il primo passo fondamentale è indicare una serie di file e cartelle da escludere dalla sincronizzazione. Non tutti i file sono destinati a essere sincronizzati, spesso all'interno dei progetti si trovano file che possono essere rigenerati, file binari o contenenti informazioni sensibili.

Per gestire questa situazione, è necessario creare un file gitignore, che consiste in una lista di "percorsi" che Git ignorerà durante la verifica dei file modificati. Questo file risiede nella cartella principale del progetto e deve essere nominato `.gitignore` (è importante che ci sia il punto davanti).

Il file supporta anche l'utilizzo di alcuni caratteri jolly, come `*`, per indicare "qualsiasi combinazione di caratteri", molto utile per specificare ad esempio solo le estensioni dei file.

Per esempio, nel caso di un progetto Java, potrebbe essere opportuno escludere dalla verifica di Git i file binari generati durante la compilazione dei sorgenti. In tal caso, il contenuto del file `.gitignore` potrebbe essere:

```bash
bin/
*class
```

### I caratteri jolly

Come spiegato, alcuni caratteri son visti dal file di gitignore come "caratteri jolly", ovvero sono utilizzati per indicare gruppi di caratteri, negazioni o altro.
Ecco una lista completa:

- `*` indica una qualunque sequenza di caratteri. Ad esempio `*class` son tutti i file che finiscono ocn `class`
- `?` indica un qualunque carattere singolo. Ad esempio `Mari?` rappresenta sia `Mario` che `Maria` che qualunque parola che inizia con **Mari** de ha un ulteriore carattere alla fine.
- `!`: Esclude un pattern dal gitignore, utile quando si è utilizzato un carattere jolly per ignorare molti files, ma ci son eccezioni.
  - Ad esempio scrivendo prima `foglio?` e nella linea dopo `!foglio2` si escludono tutti i file che iniziano con *foglio*, continuano con un carattere, ma non *foglio2*, che fa eccezione.
- `#`: Indica un commento. Le righe che iniziano con # sono ignorate.
- `[]`: Tra le parentesi quadre si può specificare un insieme di caratteri consentiti in una posizione specifica nel nome del file.
  - Ad esempio scrivendo `foglio[0123456789]` si ignoreranno tutti i file che iniziano con *foglio* e continuano con un numero.
- `[!]`: Il contrario del precedente, indica un insieme di caratteri che devono essere esclusi dal pattern.
  - Ad esempio scrivendo `foglio[!2]` si ignoreranno tutti i file che iniziano con *foglio* e continuano con un carattere, ma non *foglio2* che fa eccezione.
- `\`: Permette di escludere caratteri speciali come [, ], *, ?, e \ stessi. Ad esempio, foo\* corrisponderà a un file chiamato foo*, ignorando il carattere jolly *.

## gitignore.io

Un sito utilizzatissimo per la gestione del gitignore è [Gitignore.io](https://www.toptal.com/developers/gitignore/), inserendo una serie di parole chiave genererà per voi un gitignore.  
Ad esempio usando le parole chiave: "java" e "maven" si avrà: 

```bash
# Created by https://www.toptal.com/developers/gitignore/api/java,maven
# Edit at https://www.toptal.com/developers/gitignore?templates=java,maven

### Java ###
# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs, see http://www.java.com/en/download/help/error_hotspot.xml
hs_err_pid*
replay_pid*

### Maven ###
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties
# https://github.com/takari/maven-wrapper#usage-without-binary-jar
.mvn/wrapper/maven-wrapper.jar

# Eclipse m2e generated files
# Eclipse Core
.project
# JDT-specific (Eclipse Java Development Tools)
.classpath

# End of https://www.toptal.com/developers/gitignore/api/java,maven
```


## Git-ignore

Un altro progetto molto interessante è git-ignore, un utility da terminale che si può [trovare a questo link Github](https://github.com/janniks/git-ignore).

Questo progettino scritto in rust amplia le funzionalità di git generando da linea di comando il gitignore.  

Per utilizzarlo innanzitutto bisogna avere **Rust**, si proceda con l'installazione.

### Installare Rust su Ubuntu

Per installare Rust su Ubuntu basta eseguire:

```bash
apt install cargo
```

### Installare Rust su Fedora

Per installare Rust su Fedora basta eseguire:

```bash
dnf install cargo
```

### Installare Rust su ArchLinux

Per installare Rust su ArchLinux basta eseguire:

```bash
pacman -S rust
```

### Scaricare ed installare git-ignore

Innanzitutto si proceda con il download il progetto con git:

```bash
git clone https://github.com/janniks/git-ignore.git
```

quindi entrate nella cartella:

```bash
cd git-ignore
```

Quindi si può compilare il progetto con il tool `cargo`, fornito insieme all'installazione di rust:

```bash
cargo build
```

il file che vi si genera nella cartella target/debug chiamato `git-ignore` è il binario da usare.

Va trasferito in una cartella coperta da variabile d'ambiente PATH, ad esempio `/usr/bin`:  

```bash
cp target/debug/git-ignore /usr/bin/git-ignore
```

Ora alla creazione di un progetto si può digitare:

```bash
git-ignore
```

Oppure:

```bash
git ignore
```

Il software si scaricherà i template dal sito (bisogna avere una connessione attiva) darà la possibilità di scegliere il template direttamente da terminale, appendendo il risultato ad un attuale `.gitignore` pre-esistente oppure creandone uno nuovo.

> Nota:
> 
> La ricerca si aggiorna in tempo reale, alla pressione dei tasti appariranno i risultati, con un invio si selezionerà il template sotto cursore. Per terminare, dare un invio senza scrivere nulla.

## Throubleshoot: Rimuovere un file precedentemente ignorato

Spesso mi è capitato di vedere la seguente scena: un progetto iniziato, alcuni file da ignorare committati e solo dopo un file .gitignore con quei file. I file però non si cancellano dal remote, e chiunque scarica il progetto se li ritroverà. Come fare?

Con queste semplici istruzioni. Per prima cosa va rimosso il file ma in cache:

```bash
git rm --cached percorso/file
```

Con questa istruzione il file verrà rimosso soltanto dalla cache ma non fisicamente, è ora possibile fare "commit di questa rimozione":

```bash
git commit
```

Infine è possibile ora fare la push:

```bash
git push
```

Dal repository remoto il file sarà sparito, tuttavia in locale sarà ancora presente.
