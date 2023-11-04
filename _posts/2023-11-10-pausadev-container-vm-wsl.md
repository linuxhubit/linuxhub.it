---
class: post
title: "#pausadev - Virtual Machine, container e sottosistemi"
date: 2023-11-10 07:00
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
- distobox
---

Sotto un mio recente post di LinkedIn, riguardante il wrapper docker/podman di Luca Di Maio (ovvero distrobox), si era accesa un' interessante discussione sulla differenza tra container e virtual machine, accesa da una persona che non sapeva proprio la differenza.

Quindi oggi volevo proporre un articolo leggero che spiegasse le maggiori differenze. **Non sarà una lezione tecnica**.

## La macchina virtuale

Quando si pensa alla macchina virtuale probabilmente le prime cose che vengono in mente sono VMWare e VirtualBox, due dei principali software di "virtualizzazione". Ma cosa sono?

Sono software che attraverso un processo di, appunto, "virtualizzazione" delle risorse, crea una ambiente isolato che offre le stesse funzioni di un calcolatore fisico.
Questo ovviamente significa che su una macchina virtuale è possibile installare un sistema operativo completo, sul quale eseguire dei programmi come su ogni altro computer reale, consumando le risorse che un pc fisico consumerebbe.

### Vantaggi VM

La virtualizzazione porta diversi vantaggi, di cui:

- Un completo isolamento del sistema operativo virtualizzato rispetto a quello ospitante. Il sistema operativo virtualizzato non è in grado di comunicare, a meno di particolari casi, con il sistema operativo ospitante. Le eventuali eccezioni devono comunque essere "autorizzate" da parte della macchina ospitante.
- Per una singola macchina è possibile, se abbastanza potente, ospitare più macchine virtualizzate.
- Si può installare un sistema operativo totalmente diverso da quello ospitante.
- Tutta la macchina virtuale è generalmente contenuta dentro uno o comunque pochi files, raggruppati generalmente in una cartella. La sua rimozione non lascia tracce sul sistema ospitante.

### Svantaggi VM

La virtualizzazione ha anche diversi punti critici, di cui:

- Utilizzo delle risorse. Delle macchine fisiche poco potenti potrebbero riuscire ad istanziare una sola macchina virtuale o peggio, faticare o presentare instabilità anche una singola istanza.
- Le prestazioni di sistemi virtualizzati sono generalmente peggiori di sistemi fisici.
- Bisogna dedicare una parte delle risorse hardware al processo, questo può causare instabilità nel sistema ospitante e perdita di prestazioni.

#SEGNALIBRO

### Definizioni VM

Alcune definizioni online:

- [Wikipedia](https://it.wikipedia.org/wiki/Macchina_virtuale) 
- [VMWare](https://www.vmware.com/it/topics/glossary/content/virtual-machine.html)
- [Google](https://cloud.google.com/learn/what-is-a-virtual-machine?hl=it)

## Container

Il container come concetto è molto simile alla Virtual Machine e spesso trae in inganno i novizi, ma ha delle differenze importanti.

Se la macchina virtuale tende ad emulare il comportamento di una macchina fisica "*intera*" dall'hardware fino al software, il container condivide le risorse hardware in esecuzione con il sistema ospitante e anche parte del software (come il kernel).

Il container è un pacchetto software "**autosufficienti**" che contengono *tutto il necessario* per far partire un sistema con al suo interno un applicazione, il modo in cui viene fatto varia comunque varia da un *implementazione ad un altra*, infatti esistono diversi modi in cui il concetto di container viene poi effettivamente messo in opera dai vari software che li gestiscono.

### Vantaggi container

I container hanno molti vantaggi:

- Son leggeri, condividono il kernel del sistema operativo e non richiedono un sistema operativo intero per avviare l'applicazione.
- Sono isolati, infatti operano all'interno di uno spazio limitato del sistema operativo ospitante, e non hanno visibilità esterna (a meno degli spazi esplicitamente condivisi).
- Hanno configurazioni portabili, anche se questo punto dipende strettamente dalla tecnologia con il quale si creano i container, questa tecnologia si presta ad essere facilmente trasportata da una macchina ad un altra. A volte basta un file di testo o poco più.

### Svantaggi container

Il più grande svantaggio dei container è n*el suo essere strettamente legato al mondo Linux*. Chiariamoci: questo per chi utilizza un sistema operativo Linux in realtà non è affatto uno svantaggio, tuttavia gli altri sistemi operativi per poterne utilizzare i vantaggi devono snaturarne il concetto, virtualizzando in parte il sistema operativo.

Nelle più recenti versioni del sistema operativo, Windows utilizza l'architettura **WSL 2** (il subsystem) che diminuisce in maniera molto significativa l'overload della virtualizzazione. Su Mac attualmente viene usata una virtual machine rendendo quasi vana la differenza, tuttavia ci sono già soluzioni *sperimentali* che utilizzano il nuovo kit di virtualizzazione hardware creato da Apple.

Per sapere di più su come Docker virtualizza ad esempio i container su Mac e Windows leggere [quest'articolo del sito ufficiale](https://www.docker.com/blog/the-magic-behind-the-scenes-of-docker-desktop/).

### Container vs Docker

Se è vero che docker crea container, *non è altrettanto vero che i container sono docker*. Come già detto il container è una tecnologia che viene poi messa in atto da alcuni software che lo possono "*intendere*" o implementare in maniera diversa tra di loro, tra questi è particolarmente spiccato Docker.

Tuttavia per come concepito tradizionalmente il concetto di "*container Linux*" dovrebbe avere un sistema di init in grado di gestire più processi, dovrebbero quindi essere dei sistemi completi. Invece Docker incoraggia la creazione di più container, che gestiscono un (o meglio dire pochi) processo alla volta, né automatizza la creazione e il loro avvio e li tratta come fossero delle singole applicazioni.

Si può trovare qualche informazione in più sulla pagina di [Red Hat sui container Linux](https://www.redhat.com/en/topics/containers#container-vs-docker).

### Un container...Windows?

In realtà esistono anche dei container "Windows", ovvero che contengono dei mini server Windows con tutti gli applicativi del caso.

Esiste una [documentazione ufficiale di Microsoft](https://learn.microsoft.com/it-it/virtualization/windowscontainers/quick-start/run-your-first-container) con una guida passo passo per creare ed avviare un container con un **nanoserver Windows 2022**.

Ora sicuramente qualcuno si starà chiedendo: "posso avviare un container windows da Linux?"
Se si è compreso a pieno cos'è un container e perché è diverso da una macchina virtuale la risposta viene semplice: No.

Il container condivide il kernel con il sistema operativo ospitante, Linux non ha un kernel Windows di conseguenza **non può eseguire un container Windows**.

### Definizioni Container

Alcune definizioni online:

- [Wikipedia](https://en.wikipedia.org/wiki/Containerization_(computing)) 
- [Docker](https://www.docker.com/resources/what-container/)
- [Google](https://cloud.google.com/learn/what-are-containers?hl=it)
- [Red Hat](https://www.redhat.com/en/topics/containers)

## Il sottosistema WSL

Circa nel 2016 nasceva la prima versione del **Windows Subsystem Linux**, ovvero un sistema di *virtualizzazione integrato in Windows* che permetteva di *eseguire dei binari Linux su sistemi Windows* senza dover creare una macchina virtuale. O meglio si dovrebbe dire senza creare "*un altra macchina virtuale*", infatti per quanto sia leggera ed ottimizzata, WSL ne crea di fatti una che utilizza HyperV.

Microsoft stessa spiega che bisognerebbe utilizzare WSL più che una VM poiché: *"usa meno risorse" di una macchina virtuale, è meglio integrato e ti lascia utilizzare Windows Apps così come strumenti Linux sullo stesso set di files se vuoi*.

**WSL1** utilizzava *un kernel scritto ad hoc da Windows*, la strategia non si è rivelata però particolarmente compatibile ed anzi, introduceva delle forzature che non permettevano di installare qualunque distribuzione Linux si volesse sul proprio sistema.  
È stata quindi introdotta l**a versione 2 di WSL (WSL2)** che utilizza un kernel Linux vero e proprio all'interno di una macchina virtuale gestita da Windows.

Alcune fonti interessanti da leggere:

- [Primo blog ufficiale su WSL](https://blogs.windows.com/windowsdeveloper/2016/03/30/run-bash-on-ubuntu-on-windows/)
- [FAQ ufficiali](https://learn.microsoft.com/en-us/windows/wsl/faq)
