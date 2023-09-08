---
class: post
title: "#howto - Velocizzarsi nell'uso del terminale pt. 3" 
date: 2022-11-11 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: Linuxhub
coauthor_github: linuxhub
published: true
tags: 
- terminale
- shortcut
- ubuntu
- fedora
- archlinux
---

Si è visto come muoversi nel terminale con shortcut ed espansioni atte ad evitare di scrivere lunghi comandi ripetitivi o riscrivere vecchi comandi utilizzati più volte. È tempo di vedere se esistono dei tool esterni che possono aiutare e rendere performante il nostro flusso di lavoro. Nel particolare parliamo di **thefuck**, **make** e **oh my bash**.

Se hai mancano i nostri articoli precedenti ecco una lista: 

- [Velocizzarsi nel terminale pt 1](https://linuxhub.it/articles/howto-velocizzarsi-terminale/)
- [Velocizzarsi nel terminale pt 2](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt2/)

## the fuck

Sicuramente una brutta parola, ma un ottimo progetto. [The fuck](https://github.com/nvbn/thefuck) consente facilmente di rimediare ad errori o cercare comandi semplicemente imprecando.  

### Installazione

Si può installare molto facilmente attraverso il package manager

#### Ubuntu e derivate

Per installarlo su Ubuntu scrivere:

```bash
apt install thefuck
```

#### Fedora

Per installarlo su Fedora scrivere:

```bash
dnf install thefuck
```

#### Archlinux

Per installarlo su Archlinux scrivere:

```bash
pacman -S thefuck
```

#### Tramite pip 

Pip è un package manager per moduli python, è spesso utilizzato per installare script o programmi standalone (indipendenti). 

Per installare thefuck tramite pip scrivere: 

```bash
pip install thefuck
```

### Post installazione

Dopo l'installazione è consigliato inserire gli alias suggeriti da thefuck nel proprio [file di avvio](https://linuxhub.it/articles/howto-file-avvio-shell) (bashrc, zshrc o fish.config). Per farlo scrivere nel file:

```bash
eval $(thefuck --alias)
```

### Utilizzo fuck

Esistono due possibili utilizzi per questo software, il primo presuppone sia stato sbagliato un comando:

```bash
> ehco "ciao"
bash: ehco: comando non trovato
```

Quindi è possibile imprecare per farsi correggere:

```bash
> fuck 

echo "ciao" [enter/↑/↓/ctrl+c]
```

A questo punto è possibile scorrere sopra e sotto fino a che non si trova la soluzione corretta dell'errore, quindi premere "*enter*" quando la si trova. Con `control-c` si annulla tutto.


### Utilizzo thefuck

Diverso è l'utilizzo del comando `thefuck`, infatti serve per trovare la giusta sintassi di un programma di cui non si sa il nome. Ecco un esempio di utilizzo: 

```bash
> thefuck eho

echo [enter/↑/↓/ctrl+c]
```

Se il comando `fuck` lavora a "posteriori", `thefuck` lavora *preventivamente*.

## Make file

Molti sviluppatori staranno storcendo il naso, infatti il make file è utilizzato nella programmazione per automatizzare operazioni di building dei propri progetti. Si può però pensare di utilizzare per automatizzare alcune azioni che si fanno spesso come pulizia, aggiornamenti o altro.

### Come creare un make file 

Un makefile ha una struttura molto semplice:

```make
target1: 
        istruzione 1 target 1
        istruzione 2 target 1
        istruzione 3 target 1
        etc...
target2:
        istruzione 1 target 2
        istruzione 2 target 2
        etc...  
```

ogni target identifica una serie di istruzioni o software che vengono richiamati.

Un esempio di insieme di istruzioni per fare pulizia nella home potrebbe essere:

```make
clean: 
	rm -rf ~/.cache
	rm -rf ~/Scrivania/temporaneo 
	rm octave-workspace
	rm file
	rm -r cartella
```

Si possono aggiungere poi altri target così: 

```make
clean: 
	rm -rf ~/.cache
	rm -rf ~/Scrivania/temporaneo 
	rm octave-workspace
	rm file
	rm -r cartella
ciao: 
	echo "ciao"
test:
	touch file
	mkdir cartella
	touch cartella/file2
```

### Avviare un target 

Si può ora avviare un target. Ad esempio quello di pulizia:

```bash
> make clean

rm -rf ~/.cache
rm -rf ~/Scrivania/temporaneo 
rm octave-workspace
rm file
rm -r cartella
```

Scrivendo solo `make` verrà avviato il primo target. 

```bash
> make

rm -rf ~/.cache
rm -rf ~/Scrivania/temporaneo 
rm octave-workspace
rm file
rm -r cartella
```

### make all

È possibile specificare un target che esegue più step, scrivendo dopo il nome con i due punti i nomi (separati da spazio) di tutti i target da eseguire in ordine.

```make
target13; target1 target3

target1: 
        istruzione 1 target 1
        istruzione 2 target 1
        istruzione 3 target 1
        etc...
target2:
        istruzione 1 target 2
        istruzione 2 target 2
        etc...  
target3:
        istruzione 1 target 3
        istruzione 2 target 3
        istruzione 3 target 3
        istruzione 4 target 3
        etc...  
```

Nell'esempio di cui sopra, eseguendo target13 verranno eseguiti in ordine sia target1 che target3:

```bash
make target13
```

Questo predispone la possibilità anche di creare una regola che li esegua tutti.

```make
all: target1 target2 target3

target13; target1 target3

target1: 
        istruzione 1 target 1
        istruzione 2 target 1
        istruzione 3 target 1
        etc...
target2:
        istruzione 1 target 2
        istruzione 2 target 2
        etc...  
target3:
        istruzione 1 target 3
        istruzione 2 target 3
        istruzione 3 target 3
        istruzione 4 target 3
        etc...  
```

Facendo ora:

```bash
make all
```

## Oh my bash

Abbiamo parlato di [oh my zsh in questo articolo](https://linuxhub.it/articles/howto-installare-e-configurare-oh-my-zsh/). Esiste una cosa simile per bash?

Per chi non sapesse di cosa si sta parlando, i software del tipo "oh my X" son gestori di temi per i nostri interpreti che modificano il prompt in modo da fornire informazioni utili ed anche un pizzico di effetto estetico al nostro terminale.

### Backup

Prima di andare oltre c'è da sapere che oh-my-bash sovrascrive il vostro bashrc, quindi potrebbe essere utile fare un backup per riportare eventuali configurazioni importanti:

```bash
cp $HOME/.bashrc $HOME/.bashrc.old
```

In realtà in ogni caso dopo l'installazioni si dovrebbe trovare **anche un backup fatto da oh my bash stesso**, ma siccome la sicurezza non è mai troppa...

### Installare Oh my bash

L'installazione di oh my bash è molto semplice, basta dare questo comando:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh)"
```

Avviene in locale, per cui non c'è necessità di permessi.

Dopo tutta la procedura viene creato nella home un nuovo file, backup del vecchio bashrc, il quale nome inizia con `.bashrc.omb-backup`.

In caso non vi siano differenze con il backup fatto in precedenza, potreste pensare di tenerne solo uno dei due.

Per vedere le differenze si può utilizzare il software `diff`:

```bash
diff .bashrc.old .bashrc.omb-backup*
```

### La cartella .oh-my-bash

Sempre post-installazione di oh-my-bash si dovrebbe trovare nella home la cartella `.oh-my-bash`.

```bash
cd $HOME/oh-my-bash

ls
```

Al suo interno si trovano una serie di cartelle e file che vengono utilizzati:

```plain
aliases
cache
CODE_OF_CONDUCT.md
completions
CONTRIBUTING.md
custom
img
lib
LICENSE.md
log
oh-my-bash.sh
plugins
README.md
templates
themes
tools
```

Tra questi, son particolarmente interessanti la cartella plugins (dove ci sono i plugins che si possono utilizzare e dove posizionare eventualmente nuovi plugin) ed i temi (dove ci sono i temi che si possono utilizzare e dove posizionare eventualmente nuovi temi)

### Temi

I temi sono un po' la motivazione principale per utilizzare questi strumenti. Non solo per motivi grafici, ma anche perché mettono a schermo una serie di informazioni che possono essere ritenute utili in alcuni contesti.

Il tema più famoso è sicuramente "*powerline*", disponibile in tantissime salse ed abbastanza informativo. Per cambiare tema aprire il file "`$HOME/.bashrc`" con un editor di testo

```bash 
nano $HOME/bashrc
```

Quindi cercare la scritta `OSH_THEME` e sostituire il valore: 

```bash
OSH_THEME="powerline"
```

Altri temi che potrebbero essere interessanti sono:

- cupcake
- sexy
- bobby

### Altre funzioni

Scorrendo nel bashrc è sicuramente possibile trovare altre funzioni che possono aiutare il flusso di lavoro (come il CASE SENSITIVE, i plugins e le completions). Se l'argomento è di vostro interesse fatecelo sapere nel [nostro gruppo telegram](https://t.me/linuxpeople)! Provvederemo con un articolo ad hoc.
