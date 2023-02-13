---
class: post
title: '#howto - Installazione e configurazione di un server Kodi'
date: 2020-06-29
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - fedora
  - github
  - bash
---
In genere è comune per molti archiviare la propria musica e film preferiti su un disco. In questa guida vediamo come sfruttare questi dati archiviati tramite **Kodi**, una piattaforma che ci permette di gestire quei contenuti su più dispositivi e sistemi.

> In questa guida ci sarà innanzitutto un breve tour di Kodi per i neofiti.
> 
> Per i piccoli impazienti, potete saltare direttamente alla sezione [impostare un server remoto](#title10)

## Cos'è Kodi

Kodi è un **centro di gestione multimediale** molto completo: probabilmente lo conoscerete col suo vecchio nome, XBMC (Xbox Media Center), sviluppato inizialmente per la prima console di Microsoft. È un progetto open source supportato ancora oggi, facile da usare e configurare che dà la possibilità di trasformare il proprio PC in un Media Center con tantissime estensioni e utilizzarlo per ascoltare musica, guardare video, visitare siti web, e perché no anche giocare a videogiochi (soprattutto se siete amanti dei vecchi giochi retrò!).

Nella guida si suppone che abbiate installato Kodi su un sistema localizzato in italiano.

> Scaricare materiale protetto da copyright rappresenta un illecito punibile per legge oltre che un'azione a danno della proprietà intellettuale di chi crea quei contenuti.
> La redazione di linux/hub presuppone che tutto il materiale che andrete ad archiviare sia stato ottenuto con la giusta licenza.

## Installazione

Kodi di principio è presente nelle repository delle principali distribuzioni Linux, pertanto non ci dovrebbero essere troppi problemi nell'installarlo.

### Debian, Ubuntu e derivate

Kodi è offerto dalle repository di sistema:

```bash
apt install kodi
```

Ciò nonostante questa non è una versione recente ma possiamo ovviare al problema aggiungendo la repository offerta da *xbmc*:

```bash
add-apt-repository ppa:team-xbmc/xbmc-nightly
apt update
```

e proedere all'installazione come da step precedente.


### Arch Linux
```bash
pacman -S kodi 
```

### Fedora
Kodi è offerto dalla repository *RPM Fusion*, <a href="https://linuxhub.it/articles/howto-fedora-31-post-installazione#title1">leggi qui come abilitarla</a>, successivamente procediamo con l'instalazione:

``` bash
dnf install kodi
```

### Altri sistemi

Nonostante questa guida sia rivolta ai sistemi Linux, Kodi è comunque multipiattaforma e disponibile nativamente per molti sistemi operativi e dispositivi tra cui:

- Windows
- MacOS
- Android/iOS

Per informazioni sul download vi riporto alle fonti ufficiali sul loro [sito](https://kodi.tv/download) e sul loro [GitHub](https://github.com/xbmc/xbmc/blob/master/docs/README.md) per le istruzioni di compilazione.

## Il primo approccio con kodi

La prima schermata di Kodi (generalmente si apre a schermo intero) ricorda un po' le interfacce dei vecchi lettori DVD. Per prima cosa troverete una barra laterale in verticale (nelle vecchie versioni potrebbe esserci una barra orizzontale centrale) ed una serie di opzioni. Il tema di default si chiama **Estuary**, ma non preoccupatevi di questo perchè l'interfaccia è perfettamente personalizzabile.

![Kodi estuary home](/uploads/kodi-server/kodi_estuary_home.png)

La navigazione avviene col mouse o se volete con tastiera. Esistono add-on per utilizzare e configurare anche joystick o altre periferiche. Tutte le impostazioni le troviamo al simbolo della rotellina presente nella nostra barra di navigazione. 

## Aggiungere media

Per aggiungere sorgenti multimediali è necessario andare nel menu corrispettivo. Mettiamo caso di voler aggiungere della musica: andiamo nella sezione Musica, scorriamo il menù fino alla voce "File" e premiamoci sopra.

![seleziona sorgente musicale](/uploads/kodi-server/kodi_file_musica.png)

A questo punto selezioniamo `Aggiungi musica`, poi `Esplora` e infine selezioniamo il percorso sorgente dei nostri contenuti multimediali.

Potete fare lo stesso per Video, Immagini e Giochi.

## Cambiare skin

Nel caso in cui non vi piacesse l'interfaccia di base, sappiate che potete cambiarla senza troppi problemi. Per fare ciò andiamo su `impostazioni`, poi `interfaccia` e infine `Skin`.  

La prima opzione (omonima al menù) vi farà selezionare la skin tra quelle scaricate localmente, mentre "Altro" permette di effettuare il download direttamente dal sistema. Cambiando tema non cambierete solo i colori, **ma l'intera interfaccia**. Alcune skin consentono un livello maggiore di personalizzazione, e consentono anche di cambiare sfondo, colori e caratteri. Il tema sotto proposto si chiama Unity:

![kodi con tema unity](/uploads/kodi-server/kodi_unity_home.png)

Nel menu `impostazioni`, poi `interfaccia` è anche presente un'impostazione per cambiare la Lock Screen o disattivarla del tutto.

## Add-on giochi retrò
Tramite Kodi è possibile giocare diversi titoli retrò gratuiti e con licenza libera, ciò nonostante è importante fare una premessa: tramite questa piattaforma è possibile giocare anche a titoli che richiedono una licenza di acquisto, scaricare rom o binari di giochi, seppur molto vecchi, è una violazione del copyright ed è *punibile per legge*, anche se siamo in possesso della copia fisica di questo.

Innanzitutto, assicuratevi di avere installato gli emulatori già funzionanti sulla vostra macchina per accertarsi di avere tutte le librerie necessarie.

Supponiamo abbiate scelto l'emulatore del SNES: dopo aver scaricato il client, preparate una cartella con dei software non coperti da copyright che volete testare. 

Accedete a `impostazioni` > `Add-on` > `Installa da repository` > `Add-on giochi` > `emulatori`

Scaricate quindi l'add-on per giochi SNES.

![add on snes](/uploads/kodi-server/kodi_add_on_snes.png)

Importante è tenere in considerazione che specialmente per gli emulatori, alcuni add-on sono specifici per la piattaforma per cui si installano.

Nel caso in cui provaste a scaricare i vostri add-on da [qui](https://kodi.tv/addons), selezionateli e quindi scaricateli dal pulsante blu in basso a sinistra. Se il tasto non è abilitato e porta l'eticheta "Undefined", dobbiamo installare l'add-on manualmente da linea di comando.

Su distribuzioni come **Arch Linux**  si trova in *community*:

`pacman -S kodi-addon-game-libretro-snes9x`

mentre per **Ubuntu** consiglio di installare tutti gli addon game:

`apt install kodi kodi-game-*`

Per distribuzioni diverse potrebbe essere diverso anche l'emulatore disponibile sotto forma di add-on.

## Impostare un server remoto

Un'altra delle caratteristiche chiave di Kodi è la possibilità di creare un server accessibile da altri dispositivi. Potete persino proteggerne l'accesso tramite username e password.

Per abilitare l'opzione, accediamo a `impostazioni` > `servizi` > `controllo`.

Selezioniamo `Permetti controllo remoto via HTTP` e immettiamo valori a piacere nei campi:

- porta
- nome utente
- password

Selezioniamo anche l'opzione `permetti controllo remoto da applicazioni su questo dispositivo`.

![impostazioni server](/uploads/kodi-server/kodi_server_settings.png)

Notare che è disponibile anche la personalizzazione dell'interfaccia. Similmente a quanto spiegato nella sezione [nuove skin](#title8), è possibile infatti scaricare e usare delle skin per l'interfaccia web.

Una volta personalizzati i valori, assicurarsi di avere <u>l'indirizzo IP</u> del dispositivo, trovabile anche in `impostazioni` > `info sistema` > `sommario`.

Per verificare le impostazioni, apriamo il browser su un altro device, connettiamoci alla stessa linea (a meno che non abbiate un indirizzo ip pubblico da poter sfruttare con anche un port forwarding adeguato), e digitare quindi nella barra degli indirizzi:

`indirizzo.ip.dispositivo.kodi:portascelta`

Giusto per un esempio concreto, supponendo l'indirizzo IP sia `192.168.1.53` e la porta scelta `9097` scriveremo:

`192.168.1.53:9097`


Ci apparirà quindi il popup con la richiesta dell'username e della password. Inseriamoli, *et voilà*:

![interfaccia web kodi](/uploads/kodi-server/kodi_web_interface.png)

Qui l'esperienza dell'interfaccia di Kodi è ancora più stravolta da tema a tema: ad esempio alcuni temi non si applicano al browser web da cellulare... ma vi serve davvero?

## Collegarsi tramite applicazione

Se il collegamento remoto di Kodi è abilitato possiamo pensare di installare un'applicazione che gestisce Kodi da remoto. 
Tra quelle a me note e da me usate (cellulari Android) ci sono:

- Kore (ufficiale) 
- Yatse

Personalmente preferisco la seconda perchè ha molte più funzionalità, ma spiegherò come collegare la prima.

Per prima cosa installiamo **Kore** sul nostro dispositivo: già dalla prima schermata verrà chiesto di configurare il dispositivo, e la ricerca dovrebbe avvenire in maniera automatica alla pressione del tasto "**Avanti**".

Inseriamo quindi nome utente e password, ed effettuiamo un test della connessione. Se tutto andrà a buon fine, il telecomando sarà connesso a Kodi e potrete utilizzarlo per avviare film, canzoni e altro! 
Potrete navigare il file system per ogni categoria nei drive da voi inseriti, inviare film dallo smartphone a Kodi o viceversa. Facendo coppia con determinati addon come **YouTube** potete persino condividere un link al volo ed eseguirlo invece che sullo smartphone, sul vostro device Kodi!

![Kodi kore app](/uploads/kodi-server/kodi_kore_app.jpg)

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul <a href="https://t.me/linuxpeople">nostro gruppo Telegram</a>.
