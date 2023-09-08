---
class: post
title: '#howto - Installazione e utilizzo del comando autojump'
date: 2020-08-17
layout: post
author: Alessandro Zangrandi
author_github: AlexzanDev
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - python  - github  - bash
---
`autojump` è un comando utilizzabile da terminale simile a  `cd`. A differenza di quest'ultimo, aiuta a velocizzare la navigazione tra le cartelle mantenendo una cronologia di quelle navigate in precedenza. Se ci sono più cartelle con lo stesso nome, autojump mantiene una storia che favorisce quella con più accessi.

In questa guida vedremo come installare e utilizzare `autojump`.

## Installazione di autojump

### Debian, Ubuntu e derivate

Per installare `autojump` su **Ubuntu, Debian** e derivate possiamo utilizzare `apt`:

```bash
apt install autojump
```

su distribuzioni derivate da Debian (come Ubuntu) dobbiamo aggiungere una riga di testo [al file di avvio della shell](https://linuxhub.it/articles/howto-file-avvio-shell):

```bash
. /usr/share/autojump/autojump.sh
```

ed effettuare il *source* di uno dei due file:

```bash
# Bash
source .bashrc

# Zsh
source .zshrc
```

### CentOS, RHEL e derivate

Per installare `autojump` su **CentOS, RHEL** e derivate possiamo utilizzare invece `yum`:

```bash
yum install autojump
```

### Arch Linux

`autojump` non è presente nelle repository di default di **Arch Linux**, bensì nell'**AUR** (Arch User Repository).

Per poterlo installare su Arch Linux, dobbiamo utilizzare `yay`, di cui abbiamo già parlato in una [guida dedicata](https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper#title2).

```
yay -S autojump
```

### Installazione manuale

`autojump` è anche installabile manualmente scaricando la repo Git ed eseguendo lo script di installazione scritto in **Python**.

Assicuriamoci di avere installato Python (supportato Python 2.6+, Python 3.0+):

```bash
python -V
```

cloniamo la repo da GitHub:

```bash
git clone https://github.com/wting/autojump

```

entriamo nella cartella ed eseguiamo lo script in Python:

```bash
cd autojump
python install.py
```

## Utilizzo del comando

Sia il comando `autojump` che `j` possono essere utilizzati. Quest'ultimo, che sfrutteremo nella guida, viene preferito per convenienza.

Prima di viaggiare in qualche cartella, vediamo quanto pesa l'installazione (e vedere la cronologia) con l'argomento *-s*:

```bash
j -s
```

siccome non abbiamo visto nessuna cartella da quando abbiamo installato il programma, l'output sarà simile al seguente:

```bash
________________________________________

0:       total weight
0:       number of entries
0.00:    current directory weight

data:    /home/alessandro/.local/share/autojump/autojump.txt
```

Per provare `autojump`, creiamo una cartella d'esempio e visitiamola, assieme ad una sottocartella:

```bash
mkdir test
mkdir test/prova
cd test
cd prova
cd --
```

Tornati alla home, vediamo di nuovo la storia di `autojump` con:

```bash
j -s
```

questa volta l'output dovrebbe essere simile al seguente:

```bash
10.0:   /home/alessandro/test
10.0:   /home/alessandro/test/prova
________________________________________

20:      total weight
2:       number of entries
0.00:    current directory weight

data:    /home/alessandro/.local/share/autojump/autojump.txt
```

### Visitare una cartella

Per **visitare velocemente una cartella** con `autojump` possiamo utilizzare `j` seguito dal nome della cartella selezionata (deve essere nella cronologia):

```
j test
```

### Visitare una sottocartella

Per **visitare una sottocartella** possiamo utilizzare invece `jc` (*c* significa child directory, cartella figlia) seguito poi dal nome della cartella. Non è necessario inserire il path assoluto, ma solo il suo nome:

```bash
jc prova
```

### Visitare una cartella con argomenti multipli

Non vi ricordate il nome preciso di una cartella a cui volete andare? Nessun problema, basta che inseriate **solo una parte** del suo nome. Non sappiamo ad esempio come si chiama "test"? Per entrarci possiamo utilizzare:

```bash
j te
j est
j es
j tet
```

e via dicendo. Se vogliamo entrare anche nella sottocartella possiamo farlo, come argomento multiplo:

```bash
j test pro
```

Anche in questo caso i nomi delle due cartelle possono essere parziali, e `autojump` li riconoscerà.

### Aprire una cartella con un file manager

`autojump` ci permette di aprire una cartella con un file manager semplicemente con il comando `jo`, utilizzabie assieme a `jc` se necessario:

```bash
jco prova
```

### Rimuovere cartelle eliminate dalla cronologia

Quando una cartella viene cancellata, `autojump` si ricorda della sua esistenza. Per cancellarla **anche dalla cronologia**, possiamo procedere in questo modo.

Cancelliamo la cartella dalla nostra cartella *home*:

```
rm -rf test/prova
```

e utilizziamo l'argomento *--purge*:

```bash
j --purge
```

La cartella cancellata ora non sarà più nella storia di `autojump`.



Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).