---
class: post
title: "#howto - usare e comprendere i getty terminals"
date: 2024-02-02 07:00
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
- getty
---

Qualche giorno fa, per la prima volta in 10 anni, mi si è rotta ArchLinux durante un aggiornamento.
Nello specifico, non partivano i terminali TTY: cosa sono? come si avviano? Ecco un infarinatura di base sui getty service.

## Definizione

Con il termine "getty" ci si riferisce ad una famiglia di software che instanziano un emulatore di terminale a schermo intero che generalmente fa da punto di login per un sistema UNIX. Probabilmente ogni utente linux che non sia esattamente novizio ha avuto a che fare almeno una volta direttamente con uno di questi software (spesso abbreviati in TTY).

Normalmente si può attivare una di queste console con la combinazione `CTRL+ALT+FXX` (dove FXX è uno dei tasti funzione da `F1` a `F12`), in genere inoltre ogni sistema possiede 6 o 7 TTY utilizzabili (quindi da `F1` a `F6` o `F7`).

### Getty come punto di partenza

I servizi getty generalmente son punti di partenza per i Display Manager quanto per i server grafici. In alcuni casi:

- TTY1 o TTY2 vengono usati per la login.
- TTY1 (se non usata per la login) o TTY6 vengono usati per il server grafico.

Tuttavia questi non sono numeri standard né vere e proprie convenzioni, quindi potrebbero variare da sistema a sistema.

### Switch di tty dentro un tty

Tramite DM e DE si viene automaticamente autenticati in un tty piuttosto che un altro. Ma tramite la combinazione di tasti: `CTRL+ALT+FXX` come già detto si può cambiare tty.
Tuttavia, mentre si è già in un terminale virtuale senza GUI, su alcuni sistemi la shortcut si accorcia in `ALT+FX` o addirittura `ALT+freccie direzionali`.
Questo disabilita alcune combinazioni di tasti che normalmente si possono usare su linea di comando.

## I vari Getty

Come già detto, per getty si intende una famiglia di software con le caratteristiche sopra citate in comune.
Questo ovviamente significa che ci son più software diversi utilizzati tra le varie distro.
Le più comuni alternative di getty sono:

- [agetty](https://github.com/util-linux/util-linux/blob/master/term-utils/agetty.c)
- [mingetty](https://sourceforge.net/projects/mingetty/)
- [mgetty](http://mgetty.greenie.net)
- [kmscon](https://cgit.freedesktop.org/~dvdhrm/kmscon/tree/README) Probabilmente il più interessante, è una console di login che consente di abilitare alcune feature avanzate come i font-awesome, tuttavia richiede KMS per essere abilitata.

Tuttavia, normalmente, viene installato `agetty` nei vari sistemi operativi, l'articolo quindi si concentrerà su quest'ultima.

## I parametri agetty

Se pur è in genere il servizio di init che si occupa di avviare agetty, potrebbe essere bene sapere qualcosa sui parametri di avvio.

Innazitutto agetty legge i parametri sia dall'istruzione di avvio che dal file `/etc/login.defs` (nel quale si trovano le opzioni già commentate).

Non si andranno ad elencare tutte le opzioni, eventualmente è comunque possibile trovare una lista completa tramite comando `man`:

```bash
man agetty
```

Dunque:

- `--noclear` consente di evitare che venga cancellata la console al login ogni volta che si deve inserire il nome utente.
- `--autologin` seguito da un username, permette di effettuare la login automaticamente senza chiedere né password né username (non usare se si ha `ecryptfs` sulla home).

## Getty e SystemD

In generale per ogni console virtuale presente nel sistema esiste un getty separato.

> **Attenzione:**
> I file di configurazione di getty regolano l'accesso al sistema, potreste non essere in grado di fare più il login o di non farlo tramite tty sbagliando qualche configurazione. Consiglio innanzitutto di fare tutti i test su una console virtuale non tra quelle avviate con il sistema, inoltre se possibile fate un backup oppure fate i test su una macchina non importante per la vostra produttività.

### Cambiare i terminali virtuali di default

Per cambiare il numero di console si deve modificare nel file di configurazione `/etc/systemd/logind.conf` il parametro `NAutoVTs`, il numero di default è 6.

### Servizio SystemD

I servizi SystemD legati a getty hanno nomi simili tra di loro e differiscono in genere per un numero:

```bash
getty@ttyX.service
```

Al posto di `X` vi si può porre il numero del tty da eseguire. Il primo ad esempio potrà essere richiamato così:

```bash
getty@tty1.service
```

### Instanziare nuovi tty

Si può creare al volo un altro tty con systemd, ad esempio per creare il settimo:

```bash
systemctl start getty@tty7.service
```

> **Attenzione**:
>
> Non sovrascrivete terminali esistenti, ad esempio ricreando il secondo (getty@tty2.service) potreste perdere la sessione utente corrente.

### Abilitare/disabilitare servizi getty

Come già specificato in precedenze, il file `login.conf` si occupa già di prelevare un certo numero di tty.
Se tuttavia si dovessero creare situazioni in cui non si ha più accesso alle console, si potrebbe provare con disabilitare/abilitare manualmente delle sessioni tty alla login.

Innanzitutto per verificare quali servizi vengono automaticamente creati alla login da systemd senza passare per il file di login si può digitare:

```bash
ls /etc/systemd/system/getty.target.wants
```

A questo punto si possono disabilitare tutti:

```bash
systemctl disable getty@ttyN.service
```

Sostituendo il `N` con i numeri corretti.

Non dovrebbe essere necessario abilitare alcun altro servizio, ma nel caso ci fossero problemi con la fase di login si può provare ad abilitarne uno così:

```bash
systemctl enable getty@ttyN.service
```

### Modificare i parametri di avvio

Per modificare i parametri di avvio si può creare un servizio systemd per un particolare getty:

Creare una cartella nel sistema con il nome del getty da modificare: 

```bash
mkdir /etc/systemd/system/getty@ttyNUMERO.service.d/
```

Creare un file `autologin.conf`, con la modifica della stringa di esecuzione aggiungendo i parametri desiderati (nell'ultima riga):

```properties
[Service]
ExecStart=
ExecStart=-/sbin/agetty -o '-p -- \\u' --noclear - $TERM
```

Sulla wiki di arch si hanno diversi [esempi tra i più ricercati in genere](https://wiki.archlinux.org/title/Getty#Prompt_only_the_password_for_a_default_user_in_virtual_console_login).

Consiglio di provare le modifiche su tty a numerazione alta (TTY7 ad esempio) non gestiti dalla login.conf, e di provarli subito dopo scrivendo: 

```bash
systemctl stop getty@ttyNUMERO.service

systemctl daemon-reload

systemctl start getty@ttyNUMERO.service
```

## Configurazioni font e tastiera

Per gestire le configurazioni di font e tastiera per il TTY si può scrivere sul file `/etc/vconsole.conf`.

### KEYMAP

Si può abilitare il supporto ad una tastiera specifica tramite la keyword `KEYMAP`, ad esempio per quella italiana:

```bash
KEYMAP=it
```

### FONT

Si può abilitare il supporto per un tipo di font specifico, la lista dei font supportati è nella cartella `/usr/share/kbd/consolefonts/`:

```bash
ls /usr/share/kbd/consolefonts/
```

Una volta selezionato un tipo in particolare si può scrivere nel file di configurazione assegnato a `FONT`, ad esempio per un font adatto eventualmente a schermi con alte risoluzioni potrebbe essere utile utilizzare il font `solar24x32`: 

```bash
FONT=solar24x32
```
