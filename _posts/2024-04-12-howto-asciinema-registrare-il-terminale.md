---
class: post
title: "#howto - Asciinema: registrare il terminale"
date: 2024-04-12 07:00
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
- windows
- android
---


Per effettuare una registrazione del proprio terminale, salvando input e output che compaiono a schermo man mano che passa il tempo, normalmente si può ricorrere a un qualsiasi video recorder.  
Tuttavia, la registrazione video di un terminale comprenderebbe unicamente dei caratteri e molto più di rado altri elementi grafici (di complessità tale da giustificare una registrazione video).  

Un buon modo per registrare il terminale nel modo più semplice possibile è utilizzando Asciicinema.

## Definizione

**Asciinema** è uno strumento che permette di semplificare e migliorare la registrazione della sessione di terminale attualmente aperta:

- se si valuta lo **spazio occupato**, il formato in cui sono salvate le registrazioni di Asciinema ([asciicast](https://docs.asciinema.org/manual/asciicast/v2/)) è ben più "leggero": sono salvati i caratteri, non i singoli pixel (in più, ciò consente di raggiungere un'alta compressione quando i file vengono zippati, occupando ancor meno spazio);

- sono file **testuali**, prevalentemente: questo significa che non è strettamente necessario "riprodurli" (sebbene sia consigliato) ma è anche possibile leggerli manualmente, nonché effettuare operazioni sul contenuto (via grep, awk, jq, e così via);

- sul piano delle **prestazioni**, Asciinema consente un consumo minimo di risorse se confrontato con una registrazione video classica;

- inoltre le registrazioni sono facilmente **modificabili**: non è necessario essere degli abili video editor per effettuare dei fotomontaggi e correggere piccoli ed eventuali mancanze, o peggio dover effettuare una registrazione da capo, perché è sufficiente saper utilizzare un text editor.

## Installazione

L'installazione sui sistemi operativi qui non elencati e le relative istruzioni sono disponibili sul [sito ufficiale](https://docs.asciinema.org/manual/cli/installation/).

### Ubuntu

```bash
apt install asciinema
```

### Fedora

```bash
dnf install asciinema
```

### Arch Linux

```bash
pacman -S asciinema
```

### Android (via Termux)

```bash
pkg i asciinema
```

### Via Pipx

[Pipx](https://pipx.pypa.io/stable/) è un'installer di programmi Python pensati per essere utilizzati via riga di comando.

Usare il ben più noto `pip` funzionerebbe ugualmente, ma con qualche svantaggio:

- i vari pacchetti non sarebbero isolati gli uni dagli altri e si rischierebbe di avere versioni multiple delle stesse dipendenze;
- si ingombrerebbe la lista dei pacchetti manualmente installati con quelli delle loro relative dipendenze, installate automaticamente;
- la disinstallazione sarebbe difficoltosa a causa dei pacchetti residui che resterebbero (e che andrebbero eliminati manualmente).

Nel caso si voglia procedere utilizzando pipx, è prima necessario installarlo:

```bash
python3 -m pip install --user pipx
```

In seguito, non resta che installare Asciinema via pipx:

```bash
pipx install asciinema
```

## Avviare la registrazione

Per avviare la registrazione e salvare il testo a schermo nel file registrazione.cast, è sufficiente usare il sottocomando "rec":

```bash
asciinema rec
```

Al termine della registrazione, Asciinema chiederà cosa fare della registrazione: se salvarla su disco, caricarla in rete oppure scartarla.

Nel caso si decida di salvare la registrazione su disco, è bene tener presente che di default Asciinema salva la registrazione in una cartella temporanea, e perciò potrebbe essere più comodo salvarla in un percorso preimpostato, così come nel seguente esempio:

```bash
asciinema rec registrazione.cast
```

> Suggerimento: il parametro `-i` consente di limitare il tempo perso in inattività, come ad esempio quando il terminale rimane in attesa di un nuovo input oppure mentre sta processando l'output.
>
> Ciò è particolarmente utile per limitare la durata dei tempi morti all'interno delle proprie registrazioni.
>
> Nel seguente esempio, il tempo di inattività è limitato a 2.5 secondi: `asciinema rec -i 2.5 registrazione.cast`.

## Fermare la registrazione

Per terminale la registrazione, bisogna uscire dalla shell avviatasi nel momento in cui è cominciata la registrazione.

Quando possibile, è sufficiente usare la combinazione di tasti `CTRL+d` o digitare `exit`.

In altre circostanze, ad esempio se si stanno usando programmi in TUI (come `htop` o [ncdu](https://linuxhub.it/articles/howto-gestire-file-e-cartelle-pesanti-con-ncdu)), allora è prima necessario terminare l'esecuzione di ciascun programma.

All'occorrenza, la registrazione può essere fermata anche da un secondo terminale: siccome Asciinema monitora il segnale di interrupt **SIGINT** (2), basterà inviarlo al suo processo utilizzando comandi come `pkill -INT asciinema` oppure `kill -INT PID` (dove `PID` è l'ID del processo) o ancora si può ricorrere a `htop`.

## Riprodurre una registrazione

È molto semplice riprodurre una registrazione salvata su disco:

```bash
asciinema play registrazione.cast
```

Nel caso di una registrazione caricata online, è sufficiente sostituire il percorso al file con l'URL:

```bash
asciinema play 'https://asciinema.org/a/567970'
```

> Nota: sono supportati gli URL sia di protocollo HTTPS che IPFS.

Analogamente al caso di registrazione, è possibile limitare la durata dei tempi di inattività anche in fase di playback:

```bash
asciinema play -i 2.5 registrazione.cast
```

È anche possibile riprodurre una registrazione in loop e variarne la velocità (triplicandola, ad esempio), come nel seguente caso:

```bash
asciinema play --loop --speed 3 'https://asciinema.org/a/567970'
```

## Condividere una registrazione

Per condividere una registrazione, ci sono due modi:

- Dopo aver avviato e terminato una registrazione mediante `asciinema rec`, basterà digitare `u` per caricarla su [https://asciinema.org](asciinema.org);

- Nel caso di una registrazione già conclusa e salvata su disco, si può utilizzare `asciinema upload registrazione.cast`.

Le registrazioni caricate in rete hanno una durata limitata a una settimana, dopodiché sono automaticamente cancellate.

Per evitare che le registrazioni vengano rimosse, è necessario [registrare un account](https://asciinema.org/login/new) sul sito ufficiale oppure, in alternativa, [hostare un proprio server](https://docs.asciinema.org/manual/server/).

## Ulteriori informazioni

La pagina del progetto è [asciinema.org](https://asciinema.org) e la [repository ufficiale](https://github.com/asciinema/asciinema) si trova su GitHub.
