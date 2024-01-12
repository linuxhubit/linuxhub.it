---
class: post
title: "#howtodev - Scriptisto: programmi eseguibili da sorgente"
date: 2024-01-12 07:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
tags:
- ubuntu
- fedora
- archlinux
- shebang
---

Bash non è solamente il nome della shell più conosciuta e utilizzata, ma anche il nome del linguaggio in cui molti script sono scritti.  
Uno dei vantaggi fondamentali forniti da Bash è quello della portabilità: salvo alcune eccezioni, lo si ritrova installato su ogni moderno sistema Linux.  

Tuttavia, la portabilità a volte arriva con un costo non indifferente: la comodità di sviluppare in quel linguaggio, una più frequente complessità e la difficoltà a scrivere codice per compiere operazioni spesso molto banali in altri linguaggi di programmazione.

Per fornire qualche esempio si pensi all'aritmetica dei numeri decimali (nativamente non supportata), alla mancanza di supporto per strutture dati complesse e così via.

Questa situazione rende Bash idoneo per script molto semplici, ma non così tanto per software più complessi o che tendono velocemente a evolvere.

Esiste un'alternativa?

> Nota bene:
>  
> Per una panoramica su come fare calcoli in bash leggi anche: [#howto - Fare calcoli con Linux: Bash e non solo](https://linuxhub.it/articles/howto-fare-calcoli-con-linux/).

## Una breve premessa

Potrebbe non essere immediatamente noto a chiunque, ma **non è obbligatorio** che gli script siano scritti nel linguaggio della Shell attualmente utilizzata.

La prima riga di uno script è utile proprio a questo: viene fatta iniziare con lo **Shebang**, la sequenza di caratteri `#!`, seguita dal percorso **assoluto** del programma interprete (più eventuali parametri, se necessario). Nel caso di uno script in Bash:

```bash
#!/bin/bash
```

Specificare il percorso assoluto non è sempre semplice (determinati interpreti si potrebbero trovare in una delle tante svariate cartelle incluse nel `$PATH`).

Oppure, in caso l'utente stia utilizzando un sistema non conforme a [FHS](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard), allora i percorsi potrebbero essere totalmente diversi.

Perciò, in caso di dubbi sul percorso, è buona norma ricorrere ad `env` aggiungendolo prima del nome dell'eseguibile in questione:

```bash
#!/usr/bin/env bash
```


## I linguaggi interpretati

Nel caso si voglia utilizzare un qualsiasi altro linguaggio, ad esempio Python, è necessario sostituire "bash" con "python" (o ancora meglio "python3", nel caso si scelga di utilizzare Python 3 su un sistema dove è installato anche Python 2)

```bash
#!/usr/bin/env python3
```

Anche se l'estensione del file raccomandata dovrebbe essere attinente al suo contenuto (ad esempio che per uno script in Python bisognerebbe scegliere il suffisso .py), è interessante notare che non è obbligatorio inserire l'estensione giusta: lo Shebang corretto è tutto ciò che serve per eseguire uno script, in quanto l'estensione è ininfluente.

| Linguaggio          | Shebang                    |
|---------------------|----------------------------|
| Bash                | #!/usr/bin/env bash        |
| JavaScript (NodeJS) | #!/usr/bin/env node        |
| JavaScript (Deno)   | #!/usr/bin/env -S deno run |
| Julia               | #!/usr/bin/env julia       |
| Lua                 | #!/usr/bin/env lua         |
| Perl                | #!/usr/bin/env perl        |
| PHP                 | #!/usr/bin/env php         |
| Powershell          | #!/usr/bin/env pwsh        |
| Python2             | #!/usr/bin/env python2     |
| Python3             | #!/usr/bin/env python3     |
| Ruby                | #!/usr/bin/env ruby        |

Il parametro `-S` di `env` va usato ogni volta che i parametri seguenti il nome dell'eseguibile vengano divisi da spazi (e perciò non considerati come un tutt'uno).

> Ovviamente, non va dimenticato di dare ad ogni script i giusti permessi: `chmod +x percorso_eseguibile`.
> In caso contrario, le shell si rifiuteranno di eseguire lo script.

Potrebbe non sembrare un gran guadagno: in questa semplice e specifica casistica, in effetti, lo stesso risultato si sarebbe potuto ottenere invocando il nome dell'eseguibile prima del file sorgente.


## I linguaggi compilati

Nel caso dei linguaggi compilati, però, la situazione si complica perché il codice sorgente **non** coincide con il codice eseguibile.

Questo implica che ogni cambiamento "al volo" nel sorgente non si rispecchi nell'eseguibile fin tanto che il tutto non viene ricompilato manualmente.


## La soluzione: Scriptisto

[Scriptisto](https://github.com/igor-petruk/scriptisto) consente di nascondere tutto il lavoro in più richiesto dai linguaggi compilati.

In più, l'**overhead** è minimo (circa 1 ms riportato sugli script eseguiti senza apportare cambiamenti), quindi l'uso extra di risorse è praticamente nullo.

Tra i vantaggi:

- **Facile distribuzione**, siccome tutto è incluso in un unico file e all'utente non è richiesto di seguire nessun procedimento per la compilazione;
- **Risoluzione delle dipendenze**, siccome Scriptisto è capace di tenerne automaticamente traccia (il che è un bonus anche per i linguaggi interpretati);
- **Rapida prototipazione**, nel caso in cui si voglia testare rapidamente senza perdere tempo nella configurazione di un nuovo progetto;
- **Neutro rispetto al linguaggio**, siccome ogni file dall'esterno è un eseguibile come gli altri - in base al linguaggio cambia la compilazione, ma ciò è nascosto all'interno e perciò non fa differenza.

Tra i chiari **svantaggi** c'è sicuramente il fatto che potrebbero verificarsi problemi di completamento, formattazione, evidenziamento negli IDE.

Scriptisto specifica all'interno del file sorgente stesso le dipendenze richieste e il comando di compilazione. Questo vuol dire che questa sintassi extra (automaticamente ignorata da Scriptisto in fase di esecuzione, chiaramente) possa essere tuttavia vista come errore in fase di modifica da parte degli editor di testo più avanzati.

Sebbene parte del problema si possa aggirare facilmente solo utilizzando commenti specifici del linguaggio che si intende usare (più informazioni in seguito), resta il problema dello Shebang (che alcuni editor potrebbero automaticamente rilevare e ignorare, ma non sempre è scontato) e delle dipendenze (Scriptisto sa se i sorgenti dipendono da codice esterno, mentre gli editor e gli IDE no).

## Installazione

### Eseguibile standalone

Si tratta di un eseguibile che richiede i soli `bash` ed `env`, supportato perciò su virtualmente ogni distribuzione.

Il download si trova sulla [pagina dei rilasci](https://github.com/igor-petruk/scriptisto/releases/latest), nello specifico si tratta del file `.bz2` (uno per Linux, l'altro per MacOS).

L'eseguibile si trova all'interno dell'archivio per preservare il permesso di esecuzione, dunque per scompattarlo bisogna usare:

```bash
tar xjvf scriptisto*.bz2
```

Fatto ciò, è possibile eseguire Scriptisto con `./scriptisto`.

> È consigliato spostare l'eseguibile in una delle cartelle del `$PATH` così che anche solo "scriptisto" funzioni, anziché dover specificare ogni volta il percorso relativo o assoluto dell'eseguibile.

### Via Crates.io

Nel caso in cui sia installato Cargo (per Rust), l'installazione è comune a tutte le distribuzioni:

```bash
cargo install scriptisto
```

### Debian, Ubuntu

Il pacchetto di installazione `.deb` per Debian e derivati si trova sulla [pagina dei rilasci](https://github.com/igor-petruk/scriptisto/releases/latest).

Una volta scaricato, il comando di installazione è il seguente (potrebbero essere necessari i permessi di root):

```bash
dpkg -i scriptisto*.deb
```

### Fedora, distro basate su RPM

Analogamente, sulla [pagina dei rilasci](https://github.com/igor-petruk/scriptisto/releases/latest) è disponibile il pacchetto `.rpm`, così installabile:

```bash
rpm -i scriptisto*.rpm
```

## Archlinux

Si può invece trovare scriptisto su AUR per quanto riguarda archlinux : 

```bash
git clone https://aur.archlinux.org/scriptisto.git
cd scriptisto
makepkg -si
```

### Installazione da sorgente

Per compilare da sorgente il software bisogna scaricare da GitHub i file e compilarli con Cargo:

```bash
git clone https://github.com/igor-petruk/scriptisto.git
cd scriptisto
cargo install --path .
```

### Altro

Consultare la pagina per le [installazioni](https://github.com/igor-petruk/scriptisto/wiki/Installation).

## Utilizzo

Prima di creare un nuovo progetto con Scriptisto bisogna consultare i linguaggi supportati:

```bash
scriptisto template ls
```

In base al template scelto, Scriptisto si occuperà di creare una base quasi minimale da cui partire. Automaticamente, Scriptisto sceglie per la propria configurazione interna il prefisso più comodo, ossia quello che coincide con i commenti del dato linguaggio.

In altre parole, le righe `scriptisto-start` e `scriptisto-end` (che indicano inizio e fine della configurazione) avranno prefisso `//` sui linguaggi C-like, così che gli editor di testo possano ignorare senza problemi la parte estranea al codice sorgente.

Nel caso del linguaggio di programmazione `C`, ad esempio:

```bash
scriptisto new c | tee ./hello-world-in-C
```

Dopodiché va solo abilitato il file ad essere un eseguibile mediante `chmod`:

```bash
chmod +x ./hello-world-in-C
```

Non rimane altro che eseguire lo script:

```bash
./hello-world-in-C
```

## Maggiori informazioni

I sorgenti di Scriptisto sono disponibili su [GitHub](https://github.com/igor-petruk/scriptisto), inclusa la [Wiki](https://github.com/igor-petruk/scriptisto/wiki).
