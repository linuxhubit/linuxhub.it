---
class: post
title: "#howto - Riavviare in emergenza con REISUB"
date: 2024-09-09 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags:
- emergenza
- bloccato
- linux
---

Esiste una combinazione magica per riavviare in modo forzato il pc su Linux anche se totalmente bloccato. Ecco la combinazione REISUB.

## Magic Sys Req

Il sistema di richieste di sistema Magic (Magic Sys Req) rappresenta una serie di combinazioni di tasti utilizzabili su linux che permette di eseguire alcuni comandi di sistema a prescindere dallo stato in cui si trova, by-passando permessi, gui, e altri aspetti.

Normalmente questo sistema è disabilitato.

> **Attenzione:**
>
> Per accedere al Magic Sys Req è necessario il tasto "R sist", normalmente si trova come alternativa (tasto di secondo livello) al tasto "print"

## Riattivare il Magic Sys Req

È possibile riattivare il sistema in due modi differenti:

- temporaneo: ovvero valido fino a chiusura del pc.
- persistente: valido anche dopo il riavvio.

### Riavvio temporaneo

Per riavviarlo fino a chiusura è possibile scrivere:

```bash
echo "1" | sudo tee /proc/sys/kernel/sysrq
```

Per disattivarlo:

```bash
echo "0" | sudo tee /proc/sys/kernel/sysrq
```

### Riavvio persistente

Per il riavvio persistente è necessario invece modificare il file `/etc/sysctl.conf`

```bash
kernel.sysrq = 1
```

Per disattivare basta eliminare la stessa riga.

## Elenco delle possibili combinazioni

Tramite le Magic Sys Req è possibile dare una varietà di comandi, per l'elenco completo si può fare affidamento anche [alla relativa pagina di wikipedia](https://it.wikipedia.org/wiki/Magic_Sys_Req).


Per eseguire una combinazione bisogna sempre premere i tasti `ALT+RSIST`, inoltre un ulteriore tasto. Di seguito un estratto (anche utile a capire il resto dell'articolo) dei tasti che è possibile premere:

- r: passa la tastiera da modalità "raw" a modalità XLATE (passaggio necessario per dare le altre combinazioni)
- b: Riavvio del sistema
- c: riavvia kexec e produce un dump di sistema
- i: invia il segnale di SIGKILL a tutti i processi eccetto quello di avvio
- j: scongela i file system bloccati
- n: riorganizza le priorità dei processi secondo metodologia Real Time
- u: rimonta tutti i file system in sola lettura
- s sincronizza i file system
- e:invia il segnale SIGTERM a tutti i processi eccetto quello di avvio
- v: ripristina i framebuffer della console

## REISUB

Con l'acronimo REISUB si intende quella sequenza di Magic Sys Req che, se date, riavvia in sicurezza il sistema se totalmente bloccato.

> **ATTENZIONE:**
>
> Scrivete piano le combinazioni! non abbiate fretta, ogni operazione ha un costo in termini di tempo, se fatte velocemente potrebbero non terminare correttamente e potreste perdere dati.

Si analizzino le combinazioni

- r: attiva le combinazioni di tastiera
- e: invia il segnale di SIGTERM
- i: invia il segnale di SIGKILL (più aggressivo)
- s: sincronizza i file system
- u: rimonta i file system in sola lettura
- b: riavvia

Quindi tenendo premuto `ALT+RSIST` e scrivendo in **lenta** successione R,E,I,S,U,B, si riavvierà il sistema (a prescindere dal suo stato).


## Magic Sys Req in remoto

È possibile utilizzare le combinazioni in remoto scrivendo sul file `/proc/sysrq-trigger`. Ad esempio per dare la combinazione con la lettera "i" scrivere:

```bash
echo B | sudo tee /proc/sysrq-trigger
```