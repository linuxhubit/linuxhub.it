---
class: post
title: "#pausadev - Virtual Machine, container e sottosistemi"
date: 2023-11-03 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: false
tags:
- container
- docker
- wsl
- vm
- virtual
---

Sotto un mio recente post di LinkedIn, riguardante il wrapper docker/podman di Luca Di Maio (ovvero distrobox), si era accesa un' interessante discussione sulla differenza tra container e virtual machine, accesa da una persona che non sapeva proprio la differenza.

Quindi oggi volevo proporre un articolo leggero che spiegasse le maggiori differenze. **Non sarà una lezione tecnica**.

## La macchina virtuale

Quando si pensa alla macchina virtuale probabilmente le prime cose che vengono in mente sono VMWare e Virtual Box, i due colossi di questa tecnologia. Ma cosa sono?

Sono software che attraverso un processo di virtualizzazione delle risorse crea una ambiente isolato che offre le stesse funzioni di un calcolatore fisico.  
Questo ovviamente significa che su una macchina virtuale va installato un sistema operativo completo, ci si può avviare dei programmi come su ogni altro computer reale e consuma le risorse che un pc consumerebbe.

### Vantaggi 

La virtualizzazione porta diversi vantaggi:

- Un completo isolamento del sistema operativo virtualizzato rispetto a quello ospitante. Il sistema operativo virtualizzato non è in grado di comunicare, a meno di particolari casi, con il sistema operativo ospitante. Le eventuali eccezioni devono comunque essere "autorizzate" da parte della macchina ospitante.
- Per una singola macchina è possibile (se abbastanza potente) ospitare più macchine ospitanti.
- Si può installare un sistema operativo totalmente diverso da quello ospitante.
- Tutta la macchina virtuale è generalmente contenuta dentro uno o comunque pochi files, raggruppati generalmente in una cartella. La sua rimozione non lascia traccia ne sporcizia
- etc...

### Svantaggi

La virtualizzazione ha anche diversi punti critici:

- È un processo molto pesante che occupa diverse risorse. Delle macchine fisiche poco potenti potrebbero riuscire ad istanziare una sola macchina virtuale o peggio, nessuna.
- Le prestazioni virtuali sono comunque in genere inferiori a quelle fisiche.
- Bisogna dedicare una parte delle risorse hardware al processo, questo può causare instabilità nel sistema ospitante e perdita di prestazioni.

### Definizioni

Alcune definizioni online:

- [Wikipedia](https://it.wikipedia.org/wiki/Macchina_virtuale) 
- [VMWare](https://www.vmware.com/it/topics/glossary/content/virtual-machine.html)
- [Google](https://cloud.google.com/learn/what-is-a-virtual-machine?hl=it)

## Container

Il container come concetto è molto simile alla Virtual Machine e spesso trae in inganno i novizi, ma ha delle differenze importanti. Se la macchina virtuale tende ad emulare il comportamento di una macchina fisica "*intera*" dal software fino all'hardware, il container 


## Un caso particolare: Container senza Linux

## Il sottosistema WSL
