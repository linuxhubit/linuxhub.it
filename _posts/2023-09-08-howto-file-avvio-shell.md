---
class: post
title: '#howto - i file di avvio delle shell'
date: 2023-09-08 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags:
- ubuntu
- fedora
- archlinux
- MacOSX
- shell
- bash
- zsh
- fish
---

Quando aprite un terminale vengono sempre eseguite alcune istruzioni prima che vi venga data la possibilità di scrivere.  
Queste operazioni sono descritte e distribuite in vari file, che fanno da "file di avvio" delle shell.

Vediamo quali sono e come modificarli.

## Profile

Il file profile viene eseguito alla login dell'utente, rappresenta un file un po' un punto di ingresso dove poter impostare le proprie variabili d'utente ad esempio oppure dove preparare l'ambiente per la propria shell. Normalmente questo file viene legato alla shell `bash`, tuttavia è giusto sapere che è *il punto di partenza per diverse* shell.

> **NOTA BENE**:
> 
> Il file profile viene detto file di avvio delle "Login shell". È possibile avviare alcune shell in questa modalità forzandola con il parametro `-l`. Ad esempio per bash: `bash -l`.

Il file si trova nel percorso `/etc/profile`.

Il suo scopo può essere molteplice:

- Impostare le variabili d'ambiente ed esportarle
- Avviare ulteriori script iniziali
- Configurare la Prompt Shell, ovvero colori e informazioni che appaiono a linea di comando

### La cartella profile.d

Uno dei compiti del file `/etc/profile` è verificare se ci sono script nella cartella `/etc/profile.d` ed eventualmente avviarli. Questo controllo avviene in genere con le seguenti istruzioni:

```bash
for i in /etc/profile.d/*.sh /etc/profile.d/sh.local ; do
    if [ -r "$i" ]; then
        if [ "${-#*i}" != "$-" ]; then
            . "$i"
        else
            . "$i" >/dev/null
        fi
    fi
done
```

Come si può notare, vengono ricercati all'interno della cartella `/etc/profile.d` i file con estensione `.sh` ed il file `sh.local`, questi file vengono caricati non appena si fa la login nel sistema.

### File profile locale

In realtà questo file dipende strettamente dalla shell in uso. Normalmente è memorizzato con il percorso `/home/nomeutente/.profile`, è possibile anche trovarlo come:

- `/home/nomeutente/.profile`
- `/home/nomeutente/.bash_login`

Come descritto nella [wiki di archlinux](https://wiki.archlinux.org/title/bash) l'ordine in cui viene controllato su bash è il seguente:

- `.bash_profile`
- `.bash_login`
- `.profile`

Cambiando shell *è possibile che questo file venga sostituito*, è meglio sempre leggere la documentazione. 
Nel caso di ZSH è probabile sia rappresentato da `/home/nomeutente/.zprofile`.

## Bash

La prima shell con la quale si ha confidenza è sicuramente BASH, il punto di ingresso di qualunque utente linux, preinstallato sulla maggior parte delle distribuzioni.

La bash ha due diversi files che vengono eseguiti:

- bashrc globale: comunemente il file `/etc/bash.bashrc` o `/etc/bashrc`, ma meglio guardare il profile
- bashrc locale: il file `$HOME/.bashrc`

### File bashrc globale

Il file bashrc globale si trova nella cartella `etc` con nome `bash.bashrc`, il percorso completo è: `/etc/bash.bashrc`. In alcuni sistemi (come su Fedora) è possibile trovare il file `/etc/bashrc` con la stessa funzione, per essere sicuri di quale file venga usato è meglio controllare il file `/etc/profile` che dovrebbe richiamarlo esplicitamente.

Normalmente in questo file vengono richiamete tutte quelle direttive che migliorano l'esperienza di bash, ovvero plugin e personalizzazioni. Ad esempio:

- La bash **completions**, ovvero quella funzione che completa con il tab il comando o i parametri
- La decorazione del PS1, ovvero della *prompt shell*, come nome utente e nome del pc sul terminale ad inizio comando.
- Le shell options, ovvero i plugin di bash. Questo argomento è stato trattato nell'articolo "[velocizzarsi nell'uso del terminale pt. 2 - history e shell options](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt2/)".

### File bashrc locale

Il file locale è quello probabilmente più conosciuto e sfruttato nel mondo linux. Rappresenta un po' un punto di ingresso di tutti quei curiosi che aggiungono programmi manualmente o iniziano a personalizzare la propria shell.

Ìl file si trova nel percorso `/home/nomeutente/.bashrc` e viene eseguito per ultimo, nella catena dei vari file eseguiti all'avvio.

È ovviamente possibile metterci tutto quello che si vuole:

- modifiche a variabili d'ambiente
- esecuzione di altri script di avvio
- modificare ulteriormente il prompt
- richiamare nuove estensioni o shell options

E molto altro

## ZSH

ZSH è la shell avanzata per eccellenza, si è distinta soprattutto per il tool "`oh-my-zsh`" che permette una configurazione veloce di tema e plugin della shell.

ZSH usa i seguenti file di avvio:

- `/etc/zsh/zprofile` come file per la *login shell globale*. Questo file richiama dietro le quinte `/etc/profile`.
- `/etc/zsh/zshrc` Come file di avvio per *la shell interattiva globale*.
- `/home/nomeutente/.zprofile` per *la login shell locale*.
- `/home/nomeutente/.zshrc` per *la shell interattiva locale*.

Le modalità in cui vengono usate son le stesse di cui sopra: 

- I file di *login shell* (`zprofile`) vengono eseguiti solo alla login dell'utente oppure se si avvia la shell con il parametro `zsh -l`
- I file di *shell interattiva* (`zshrc`) vengono eseguiti ogni volta che si apre una shell.

L'ordine di esecuzione è il seguente:

- profile globale
- profile locale
- zshrc glopbale
- zshrc locale

## Fish

FISH è una shell molto avanzata, con una sintassi totalmente diversa da quella che viene utilizzata per le shell più comuni come bash o zsh.

A differenza di bash o zsh, non utilizza `/etc/profile` e questo normalmente può rappresentare un problema in quanto spesso i software tendono ad aggiungere il loro path di esecuzione o le loro variabili d'ambiente in questo file o nella cartella `/etc/profile.d`. Questa pratica è infatti errata, perché il giusto modo di impostare una variabile d'ambiente dovrebbe essere quella di assegnarla in `/etc/environments`, tuttavia spesso viene fatto questo errore in alcuni software.

Il file utilizzato da fish per l'avvio è invece `fish.config` sia nel caso di **shell interattive** che nel caso di **shell di login** (vi son ovviamente dei metodi per distinguere i due casi). Nello specifico si ha:

- Il file `/etc/fish/config.fish` come file di avvio *globale*.
- Il file `/home/nomeutente/.config/fish/fish.config` per l'avvio *locale*.

Ma per impostare invece le **variabili d'ambiente** in locale si può usare il file `/home/nomeutente/.config/fish/fish_variables` aggiungendo con la seguente sintassi il contenuto della variabile:

```fish
SETUVAR NOMEVARIABILE:valorevariabile
```

### Login interattiva su FISH

Per identificare, in uno dei file di configurazione, *la shell interattiva* su FISH basta inserire le proprie istruzioni all'interno di questo blocco if 

```fish
if status is-interactive
	#QUI SCRIVI LE ISTRUZIONI
endh
```

### Shell login su FISH

Per identificare, in uno dei file di configurazione, *una login shell* su FISH basta inserire le proprie istruzioni all'interno di questo blocco if:

```fish
if status is-login
	#QUI SCRIVI LE ISTRUZIONI
endh
```

Per avviare una shell di login con fish in maniera forzata si può digitare: 

```bash
fish -l
```

### Bass

[Bass](https://github.com/edc/bass) è un interessante tool open source per utilizzare script bash dentro la shell fish. È utile soprattutto se si pensa di dover riscrivere file di configurazione importanti come quelli presenti nella cartella `/etc/profile.d`. Fondamentalmente si tratta di un plugin per FISH che si può installare come segue:

```bash
git clone https://github.com/edc/bass

cd bass

make install
```

Per utilizzarlo basta scrivere:

```bash
bass istruzione bash
```

Ad esempio per fare il source di profile scrivere:

```bash
bash source /etc/profile
```
