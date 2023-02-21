---
class: post
title: '#howto - Termux: Linux su Android'
date: 2023-02-24 08:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor: 
coauthor_github: 
published: false
tags:
- android
- termux
---

Android, il sistema operativo per dispositivi mobili, è divenuto solamente pochi anni fa il più utilizzato al mondo.

Come è ampiamente noto, tra le fondamenta di Android figura anche il kernel Linux, sebbene si tratti di un "fork" sensibilmente diverso dal kernel [LTS](https://www.kernel.org/category/releases.html) ufficiale.

Al [kernel di Android](https://android.googlesource.com/kernel/common) vi lavora Google. Poi, come solitamente accade, questa base viene ripresa da tutti gli altri OEM che effettuano a loro discrezione ulteriori modifiche.

Tuttavia, sebbene Android sia basato sul kernel Linux, diverge sufficientemente da rendere incompatibile l'esecuzione di quei software solitamente disponibili su desktop.


## Cos'è Termux

Termux è un emulatore di terminale per Android che funziona senza richiedere né i permessi di root né setup addizionali.

Termux fornisce un proprio package manager preinstallato, **pkg**, nient'altro che un più comodo frontend del meglio noto **apt**, utilizzato generalmente sulle distribuzioni Linux basate su Debian.
Ma attenzione: **non** significa che un normale pacchetto dpkg sia direttamente installabile su Termux.


### Termux è un emulatore?

Per comprenderne appieno le funzionalità, è importante chiarire in che senso Termux sia un emulatore.

Termux è a tutti gli effetti un emulatore di terminale.

Tuttavia, oltre questo, non si può dire che sia un "emulatore e basta" siccome non ha bisogno di emulare alcuna CPU: semplicemente, i software vengono eseguiti nativamente proprio grazie alla presenza del kernel Linux.

![Termux](https://telegra.ph/file/d35d402b9d128acab9118.jpg)

## Cosa si può fare su Termux

Le possibilità sono (quasi) infinite.

Termux supporta tutte le principali **shell** (Dash, Bash, Zsh, Fish, e non solo), consente di eseguire codice scritto nei più comuni **linguaggi di programmazione** (Python, JavaScript, C, C++, PHP, Java, e così via), connettersi ad altri dispositivi via **SSH**, leggere e modificare file sia della memoria interna che della scheda sd, automatizzare l'esecuzione di script con **crond** (sebbene sia scoraggiato), e molto altro ancora.

I permessi di root, sebbene non fondamentali, permettono di sbloccare potenzialità aggiuntive: ad esempio, modificare file e impostazioni di sistema o interfacciarsi direttamente all'hardware del dispositivo.
Naturalmente questa scelta comporta correre numerosi rischi che, se possibile, sarebbe meglio evitare.


### Quanto differisce Termux e una distro Linux?

Rispetto ad una qualsiasi, ordinaria distro Linux per desktop, Termux ha alcune ma importanti differenze:

- **Termux non segue lo standard FHS** (Filesystem Hierarchy Standard): significa, ad esempio, che la cartella home (~) è /data/data/com.termux/files/home, ovvero non quella che si trova in /home. 
- **Termux usa Bionic libc**, non Glibc, affinché ciascun pacchetto sia compatibile il più possibile con le librerie Android ed il suo kernel.
- **Termux è monoutente**.

Ecco perché è necessario fare il **porting** di ciascun pacchetto prima che possa essere installato ed eseguito su Termux.



### Distribuzioni Linux e applicazioni GUI

È possibile! Grazie all'utilizzo di proot e proot-distro, è possibile avviare interi sistemi operativi con tanto di Window Manager o Desktop Environment.

Termux è solo un terminale, perciò per la visualizzazione dello schermo bisogna affidarsi al protocollo VNC ed utilizzare applicazioni di terze parti, come [RealVNC](https://play.google.com/store/apps/details?id=com.realvnc.viewer.android).

Ovviamente bisogna sempre tener presenti le limitazioni dell'hardware (per le prestazioni) e di Android stesso (ad esempio, non si possono utilizzare le porte inferiori alla 1000: senza root questa limitazione non è aggirabile).

Maggiori informazioni sono fornite sulla [Wiki ufficiale](https://wiki.termux.com/wiki/PRoot).


## Installazione

Termux è disponibile sia sulla pagina [GitHub](https://github.com/termux/termux-app/releases) ufficiale (scelta consigliata) che su [F-Droid](https://f-droid.org/en/packages/com.termux) (dove gli aggiornamenti arrivano con qualche giorno di ritardo).

In passato, Termux è stato disponibile anche sul **Play Store**.
A causa delle (alcune già preesistenti) policy del Play Store e di numerosi cambiamenti nel modo in cui Termux dovrebbe interfacciarsi al kernel, gli sviluppatori hanno optato per nascondere l'applicazione dallo Store, almeno per il momento.
Le motivazioni sono meglio spiegate nel paragrafo seguente.


## Problemi odierni e potenzialmente futuri

Android è un sistema operativo molto sicuro: è difficile, ma non impossibile, che una sola applicazione possa compromettere l'intero sistema.

Questa sicurezza, resa possibile da scelte imposte "benignamente" dall'alto (ovverossia da Google, che coordina lo sviluppo di Android) ha anche un costo. E naturalmente ciò colpisce anche Termux.

In breve, a partire da Android 10, le applicazioni devono necessariamente contenere ogni eseguibile pre-installato nell'APK di installazione.

La scelta in effetti ha un senso logico: un sistema operativo sicuro non dovrebbe consentire alle sue applicazioni di modificare i propri eseguibili a proprio piacimento.
Ogni nuova modifica dovrebbe arrivare con un'aggiornamento dell'applicazione, ossia dell'APK.
Nel caso di Termux, ciò risulta poco pratico.

Al momento, il team di sviluppo ha optato per una soluzione a breve termine.
Da qualche anno è come se Termux, per Android 10 e successivi, funzionasse in modalità "compatibilità", siccome l'applicazione in realtà è compilata per essere eseguita su Android 9 e precedenti.

Ciò implica anche che l'applicazione non possa rimanere visibile sul Play Store (Google impone che sia possibile pubblicare o aggiornare solo le applicazioni compatibili con l'ultima versione di Android rilasciata pubblicamente).

Futuri aggiornamenti di Android potrebbero compromettere definitivamente il funzionamento di Termux, almeno finché l'applicazione rimarrà ancorata a una versione sistema operativo del passato.

Ma questo scenario non è ancora così vicino (passeranno prima molti anni), e sono in corso di valutazione già da diverso tempo alcune soluzioni a lungo termine, che potrebbero consentire all'applicazione di risolvere il problema e, quindi, di ritornare anche sul catalogo del Play Store. [Qui](https://github.com/termux/termux-app/issues/2366) maggiori informazioni.

In ogni caso, Termux rimane un'applicazione dall'enorme potenziale in quanto una delle poche a consentire di prendere davvero in mano il controllo del proprio dispositivo.
