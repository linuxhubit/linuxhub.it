---
class: post
title: "#howto - Parallel: lanciare comandi in simultanea"
date: 2024-06-14 07:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor:
coauthor_github:
published: true
tags:
- ubuntu
- fedora
- archlinux
- android
---

`GNU Parallel` è uno strumento a riga di comando che consente di eseguire comandi tra loro indipendenti, sfruttando più core (o più computer) in contemporanea.

In questo modo, le istruzioni funzionalmente indipendenti tra loro possono essere eseguite in parallelo piuttosto che in sequenza: si tratta infatti del `parallelismo`.


## Installazione

Sul sito ufficiale si trova la [pagina dei download](https://www.gnu.org/software/parallel/) contenente l'elenco dei pacchetti, sia ufficiali che gestiti dalla community.

### Ubuntu

Il modo più semplice per installare GNU Parallel è farlo da apt:

```bash
apt install parallel
```

Tuttavia, il comando "parallel" è fornito anche dal pacchetto "moreutils" e perciò i due vanno in conflitto.

Un metodo di installazione alternativo è usare una repository esterna (sostituendo il 22.04 nelle prime due righe con la versione di Ubuntu utilizzata).

```bash
echo 'deb http://download.opensuse.org/repositories/home:/tange/xUbuntu_22.04/ /' | sudo tee /etc/apt/sources.list.d/home:tange.list
curl -fsSL https://download.opensuse.org/repositories/home:tange/xUbuntu_22.04/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/home_tange.gpg > /dev/null
sudo apt update
sudo apt install parallel
```

### Fedora

```bash
dnf install parallel
```

### Arch Linux

```bash
pacman -S parallel
```

### Android (via Termux)

```bash
pkg install parallel
```

### Da sorgente

L'installazione da sorgente (qui il [download](https://ftpmirror.gnu.org/parallel/parallel-latest.tar.bz2) dal sito ufficiale) richiede `bzip2`, `tar` e `make`.

Innanzitutto è necessario estrarre i contenuti dell'archivio:

```bash
bzip2 -dc parallel-latest.tar.bz2 | tar xvf -
```

Segue la solita procedura caratterizzata dai seguenti tre comandi:


```bash
./configure
make
sudo make install
```

Una volta eseguito l'ultimo comando, salvo errori, `parallel` potrà essere utilizzato via terminale.


## Primo lancio

Al primo avvio, GNU Parallel richiede che l'utente finale acconsenta a citare lo strumento nelle proprie pubblicazioni accademiche.

Sebbene sia una richiesta che comprensibilmente interessa solo una frazione minima degli utilizzatori di questo software, basterà accettare eseguendo `parallel --citation` un'unica volta per attivare effettivamente il software.


## Operare su più file in una cartella

Flac è un ottimo formato di archiviazione audio, mentre Opus è un ottimo formato per la riproduzione audio in generale (nonché una delle migliori soluzioni per un compromesso qualità/peso, ben più del vecchio MP3).

Si consideri il caso in cui si voglia comprimere una serie di file musicali (.flac) usando `opusenc`.

**Sequenzialmente** (sfruttando un unico core alla volta) usare un ciclo for è la soluzione più semplice.

```bash
find . -iname '*.flac' -print0 | while IFS= read -r -d $'\0' file; do
  opusenc --framesize 60 --bitrate 128 "$file" "${file%.*}.opus"
done
```

> La prima riga del comando potrebbe sembrare complicata ben più del dovuto, ma in realtà è necessaria per gestire i file con i nomi meno comuni; infatti:
> - `-print0` importa il carattere `␀` (NUL) come delimitatore. Il carattere `\n` (linea a capo) non è adatto siccome, sorprendentemente, un nome del file può contenere linee a capo;
> - `IFS=` fa sì che ciascuna riga di `find` (ossia, ciascun nome file) non sia diviso in parole (problematico nel caso di file contenenti spazi, tab, linee a capo);
> - `-r` istruisce `read` nel leggere l'input interamente così com'è (altrimenti si verificherebbe un errore per i nomi file che inizierebbero per linee a capo).
> - `-d $'\0'` imposta come delimitatore il carattere `␀` (NUL).

**Parallelamente**, ottimizzando le risorse disponibili, si può utilizzare `parallel`:

```bash
find . -iname '*.flac' | parallel opusenc --framesize 60 --bitrate 128 '{}' '{.}.opus'
```

Come visibile, non solo la versione parallela è **più efficiente** e **più rapida**, ma è anche più semplice da scrivere, più breve in lunghezza, più facile da ricordare, e perciò meno incline a far commettere errori.


## Parametri in ingresso

Un modo alternativo per risolvere lo stesso problema precedente consiste nell'utilizzare l'operatore `:::`.

La sequenza `:::` delimita l'inizio dei **parametri di ingresso**.

```bash
parallel "opusenc --framesize 60 --bitrate 128 {} {.}.opus" ::: **/*.flac
```


## Generatore di sequenze

Per dimostrare le potenzialità di GNU Parallel, ecco come può essere utilizzato per generare delle sequenze.

Negli esempi successivi, il parametro `-k` (opposto di `--shuf`) viene utilizzato per **preservare l'ordine** delle righe di output (altrimenti, ogni esecuzione dello stesso comando potrebbe dare output diversi).


### Contare in binario

GNU Parallel consente di utilizzare l'operatore `:::` più volte, così da combinare i parametri di ingresso.

```bash
parallel -k echo ::: 0 1 ::: 0 1 ::: 0 1
```

Verranno ordinatamente stampate in console otto righe, le quali sono: 000, 001, 010, 011, 100, 101, 110, 111.


### Mazzo di carte francesi

Supponendo di dover creare un gioco che fa uso delle carte francesi utilizzando solo lo scripting BASH (o UNIX in generale), è opportuno creare il mazzo.

Anziché scrivere una ad una ciascuna delle 52 carte, oppure utilizzare due for innestati, GNU Parallel risolve il problema con un singolo (ed elegante) comando, di un'unica riga:

```bash
parallel -k echo 'Seme: {1} - Rango: {2}' ::: Cuori Quadri Picche Fiori ::: A 2 3 4 5 6 7 8 9 10 J Q K
```

## Distribuzione di carico

Sebbene GNU Parallel utilizzi tutte le risorse disponibili per impostazione predefinita, ciò non è sempre auspicabile.

Utilizzare tutte le risorse disponibili, infatti, significa anche che non ne rimangono di libere per eseguire una qualsiasi altra operazione.

A tal proposito, `parallel` consente di specificare il numero di massimo di thread da utilizzare mediante il parametro `-j` seguito da un numero o una percentuale.

Per operare a metà carico è sufficiente usare `-j 50%`; per utilizzare due thread si può usare `-j 2`; per lasciare liberi 4 thread (e usare i restanti) va usato `-j -4`.


## Comandi via SSH

GNU Parallel consente di eseguire più compiti non solo su più core, ma anche su più macchine.

Nel seguente esempio, i numeri da 1 a 10 sono passati in input all'host `:` (host speciale per GNU Parallel, che indica la macchina locale).

Dopodiché, al comando `echo` sono passati uno ad uno i parametri (numeri), in modo che vengano eseguiti `echo 1` fino ad `echo 10`.

```bash
seq 10 | parallel -S : echo
```

Di fatto, il `-S :` è ridondante e non necessario.

Per distribuire il carico su più host (ad esempio, hostA e hostB), ci sono due alternative:

```bash
seq 10 | parallel -S hostA,hostB,: echo
```

oppure, facendo affidamento ad un file in cui su ciascuna riga compare un host SSH:

```bash
echo 'hostA\nhostB\n:' > hosts

seq 10 | parallel --sshloginfile hosts echo
```


## Imparare ad usare GNU Parallel

GNU Parallel è uno strumento estremamente potente ma anche piuttosto difficile da padroneggiare in tutti i suoi aspetti.

È lo stesso autore di GNU Parallel a fornire delle risorse ufficiali per imparare ad usare `parallel` e tutte le sue funzionalità:

- Per i principianti è disponibile la [**Reader's guide**](https://doi.org/10.5281/zenodo.1146014) in formato PDF ([download diretto](https://zenodo.org/records/1146014/files/GNU_Parallel_2018.pdf?download=1)).

- Per chi preferisce un approccio audiovisivo, la [playlist YouTube](https://www.youtube.com/playlist?list=PL284C9FF2488BC6D1) fornisce una breve introduzione;

- Da terminale sono disponibili ulteriori risorse:

    - Il manuale di riferimento è consultabile via `man parallel` oppure [online](https://www.gnu.org/software/parallel/man.html);

    - Altri esempi di utilizzo sono disponibili via `man parallel_examples`;

    - Un tutorial avanzato ed esaustivo, pensato per chiunque voglia avere una panoramica completa, è incluso in `man parallel_tutorial`.
