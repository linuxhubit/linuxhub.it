---
class: post
title: "#howto - usare earlyoom"
date: 2024-01-05 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags:
- ubuntu
- fedora
- archlinux
- oomd
- ram
- earlyoom
---

Siamo in un'era in cui, é necessario dirlo, anche 8GB di RAM iniziano ad essere pochi.
Alcune delle soluzioni per utilizzare un sistema poco performante, o magari non "aggiornabile" sono: kernel piú efficienti, memoria virtuale, gestione compressa della RAM, ambienti grafici piú leggeri...
L' approccio affrontato in questo articolo invece è la gestione dei processi attivi: o meglio agire preventivamente con un "demone" che liberi la RAM e la memoria virtuale, la SWAP, quando queste sono quasi completamente occupate.
É ora di scoprire come funzionano gli "OOMD".

## Cos'é un OOMD

**Out Of Memory** Daemon, ovvero quel componente che interviene a liberare la RAM e la SWAP quando si stanno per riempire, evitando che si presenti un errore del tipo **Out Of Memory**.
Per chi fosse poco avvezzo al termine, gli errori di questo tipo si presentano quando vi sono dei tentativi di accesso in memoria volatile che supera il quantitativo di RAM e SWAP disponibile sul sistema.

Sui sistemi GNU/Linux normalmente *non c'è un OOMD attivo* per opzione predefinita (tranne in alcune distribuzioni come *Fedora*), tuttavia ce ne sono diversi che si possono configurare.
In questo articolo sarà spiegato come usarne uno: [earlyoom](https://github.com/rfjakob/earlyoom).

### Una raccomandazione sulla SWAP

Anche avere una RAM capiente non è una scusa per non avere della SWAP sul sistema.
La presenza di un'area di SWAP è necessaria per una gestione della memoria efficiente, non solo in condizioni di mancanza di memoria ma anzi, proprio per evitare che la RAM si possa saturare facilmente.
Vorrei lasciare qui a disposizione dei lettori un articolo proprio [sull' importanza di avere un area di swap attiva sul proprio sistema](https://chrisdown.name/2018/01/02/in-defence-of-swap.html).

Alcuni degli OOMD sotto elencati necessitano che si abbia un area di SWAP attiva per il corretto funzionamento.

### ATTENZIONE: Cosa succede se uso un OOMD

Un OOMD controlla costantemente il consumo di RAM, se questo aumenta fino ad eccedere le soglie configurate, decide (in base ad alcuni parametri interni che variano da software a software) di terminare uno o più processi per riportare la situazione sotto la soglia.
Prima di avventurarsi nell'uso di uno di questi strumenti vorrei sottolineare che con il loro utilizzo alcuni processi potrebbero essere terminati in modo improvviso, pertanto è possibile che si verifichino perdite di dati importanti.
Per evitare che ciò accada vi consigliamo di utilizzare software che integrino funzioni di salvataggio automatico e di tenere sott'occhio l'occupazione della RAM e della SWAP mentre lavorate.

### Simulare un memory leak per testare il proprio OOMD

Allo scopo di testare questi software ci si può adoperare in due modi diversi:

- Iniziare ad aprire più software pesanti contemporaneamente (browser, macchine virtuali, etc...)
- Simulare un memory leak

Per la seconda opzione, basta digitare:

```bash
tail /dev/zero
```

## earlyoom

Questo progetto è nato per sopperire a varie mancanze e coprire alcuni malfunzionamenti di quelli che erano i tradizionali OOMD che utilizzavano le direttive del kernel per terminare i processi che esulavano dalla memoria. 
Tutti i dettagli del progetto si possono trovare [al repository ufficiale su Github](https://github.com/rfjakob/earlyoom).

### Installare earlyoom su Ubuntu

Per installare earlyoom su Ubuntu e derivate basta digitare nel proprio terminale:

```bash
apt install earlyoom
```

### Installare earlyoom su Fedora

Per installare earlyoom su Fedora basta digitare nel proprio terminale:

```bash
dnf install earlyoom
```

### Installare earlyoom su Archlinux

Per installare earlyoom su Archlinux basta digitare nel proprio terminale:

```bash
pacman -S earlyoom
```

### Installare earlyoom a mano

Se la distribuzione che si sta utilizzando non fornisce di default il pacchetto lo si può sempre installare a mano.
Per farlo basta scaricare il repository ed avviare gli script con make. Si digiti:

```bash
git clone https://github.com/rfjakob/earlyoom.git
cd earlyoom
make
```

Quindi con i permessi di root:

```bash
make install 
```

Sulle istruzioni del repository ci sono altre istruzioni di compilazione anche per i sistemi che *non utilizzano systemd*.

### Utilizzo di earlyoom

Nelle normali installazioni il demone di earlyoom deve essere avviato con systemd:

```bash
systemctl enable --now earlyoom
```

Si può monitornarne l'utilizzo scrivendo sul terminale:

```bash
journalctl -f earlyoom
```

Apparirà un messaggio ogni 3600 secondi (ogni ora).  

Normalmente il software decide di mandare dei SIGTERM (ovvero segnali gentili di chiusura) se la memoria disponibile é al di sotto del 10% e se la swap disponibile é anch'essa al di sotto del 10%.

Inizia invece un comportamento più aggressivo inviando SIGKILL (chiusura forzata) se entrambe scendono al di sotto del 5%.
Queste impostazioni possono essere anche verificate dopo aver dato il comando `journalctl -f earlyoom`, appariranno subito dopo l'avvio:

```plain
sending SIGTERM when mem <= 10.00% and swap <= 10.00%,
        SIGKILL when mem <=  5.00% and swap <=  5.00%
```

### Configurazioni di earlyoom

Per personalizzare il livello delle soglie basta scrivere nel file `/etc/default/earlyoom`.
Questo file dovrebbe già contenere degli esempi di configurazione opportunamente commentati e una linea di configurazione non commentata.
Per aggiungere o modificare le opzioni di avvio basta modificare quindi quell'opzione decommentata.

```bash
EARLYOOM_ARGS="-r 3600 -n --avoid '(^|/)(init|systemd|Xorg|sshd)$'"
```

Per personalizzare le soglie aggiungere le opzioni `-m` per la soglia di RAM e `-s` per la soglia di SWAP, utilizzando questa sintassi:

```properties
-m x,y -s w,z
```

Al posto di `x` inserire la soglia di *RAM disponibile minima* prima di mandare un **SIGTERM**, al posto di `y` la soglia di *RAM disponibile minima* prima di mandare un **SIGKILL**.

Ad esempio per impostare le soglie al 5% per il SIGTERM ed al 2% per il SIGKILL, le due opzioni diventano:

```properties
-m 5,2 -s 5,2
```

Aggiungendole al file di configurazione diventa:

```properties
EARLYOOM_ARGS="-r 3600 -n --avoid '(^|/)(init|systemd|Xorg|sshd)$' -m 5,2 -s 5,2"
```

Dopo la modifica si può riavviare il demone Systemd:

```bash
systemctl restart earlyoom
```

Per verificare se la modifica è avvenuta correttamente basta guardare i log del programma:

```bash
journalctl -f earlyoom
```

Adesso all'avvio si dovrebbe leggere:

```plain
sending SIGTERM when mem <=  5.00% and swap <=  5.00%,
        SIGKILL when mem <=  2.00% and swap <=  2.00%
```

Per sapere tutte le opzioni modificabili è possibile consultare la lista dei flag attraverso il comando:

```bash
earlyoom -h
```

### Test del corretto funzionamento

Dopo aver dato `earlyoom` per controllare il flusso del software si puó aprire un altro terminale e scrivere: 

```bash
tail /dev/zero
```

Si dovrebbe iniziare a vedere la memoria disponibile scendere e quindi ad un certo punto un messaggio di questo tipo:

```plain
mem avail:   972 of  7935 MiB (12.25%), swap free:    0 of    0 MiB ( 0.00%)
mem avail:   747 of  7935 MiB ( 9.41%), swap free:    0 of    0 MiB ( 0.00%)
low memory! at or below SIGTERM limits: mem 10.00%, swap 10.00%
memory situation has recovered while selecting victim
```

(I numeri ovviamente possono cambiare).

Il programma `tail` dovrebbe quindi essere stato tempestivamente terminato.

## Note di fine articolo: systemd-oomd

Le distribuzioni con preinstallato **systemd** dovrebbero poter nativamente accedere (anche se per opzione predefinita disattivato in tutte le distruzioni eccetto che Fedora) a systemd-oomd.
Perché nell'articolo non viene menzionato?

La risposta é presto detta, infatti ho trovato caotica e poco alla mano la documentazione, che non presenta nemmeno una propria e vera guida unica ma sembra essere divisa in piú pagine della documentazione ufficiale di Systemd, di cui alcune non correlate direttamente tra di loro.  
Lascio di seguito le documentazioni che ho trovato nel caso in cui il lettore volesse cimentarsi da solo nell'impresa di configurarlo, se ci provate raccontateci com'è andata sul gruppo Telegram:

- [Manuale ufficiale di systemd-oomd](https://www.freedesktop.org/software/systemd/man/latest/systemd-oomd.service.html)
- [Manuale ufficiale per oomd.conf, il file di configurazione di systemd-oomd](https://www.freedesktop.org/software/systemd/man/latest/oomd.conf.html)
- [Manuale ufficiale con elenco opzioni per la gestione di memoria di systemd](https://www.freedesktop.org/software/systemd/man/latest/systemd.resource-control.html)
- [Reddit archlinux esempio configurazione](https://www.reddit.com/r/archlinux/comments/mk2lg6/how_to_properly_configure_systemdoomd/)
- [Pagina AUR per installare configurazioni fedora su Archlinux](https://aur.archlinux.org/packages/systemd-oomd-defaults)
