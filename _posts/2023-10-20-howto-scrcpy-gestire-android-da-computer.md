---
class: post
title: "#howto - Scrcpy: gestire Android da computer"
date: 2023-10-20 07:00
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
- windows
- macos
- android
---


> NOTA:
>
> Un articolo precedente su SCRCPY è disponibile [a questo indirizzo](https://linuxhub.it/articles/howto-usare-il-proprio-smartphone-su-linux) con informazioni meno aggiornate. Questo articolo ne aggiorna le informazioni sul precedente.

Un computer può essere controllato da Android mediante l'utilizzo di due protocolli, [SSH](https://linuxhub.it/articles/howto-ssh-controllo-remoto-del-desktop-da-mobile/) e [VNC](https://linuxhub.it/articles/howto-vnc-controllo-remoto-del-desktop-da-mobile/).

Anche l'inverso è possibile, come dimostra Scrcpy (contrazione di "screen copy").

Scrcpy permette di trasferire l'audio in uscita dello smartphone al computer, di inviare file via drag & drop, di condividere e registrare lo schermo, di utilizzare il telefono come webcam, di simulare il collegamento di mouse e tastiera, di condividere la clipboard (copia-incolla), e molto altro.

Funziona senza permessi di root, essendo uno strumento che si affida ad [ADB](https://developer.android.com/tools/adb) (Android Debug Bridge).

## Prerequisiti

Per utilizzare Scrcpy è fondamentale:
- su computer, installare ADB;
- su Android, abilitare sia le opzioni sviluppatore che il debug USB (o Wireless).

### ADB

`ADB` in ambienti Linux è una dipendenza già prevista implicitamente e perciò automaticamente installata, solitamente.

Le istruzioni per la sua installazione, lì dove l'installazione manuale sia necessaria, verranno trattate congiuntamente all'installazione di Scrcpy nei prossimi paragrafi.

### Opzioni sviluppatore

I passaggi necessari sono pochi e semplici ma dipendono sia dal dispositivo che dalla versione del sistema operativo.

In genere, per abilitare le impostazioni sviluppatore è sufficiente recarsi nelle impostazioni del dispositivo, raggiungere la schermata sulle informazioni del dispositivo, e individuare la dicitura "Numero build" (o simili) su cui bisogna cliccare sette volte.

La [pagina dedicata](https://developer.android.com/studio/debug/dev-options?hl=it) su [android.com] spiega come attivare le opzioni sviluppatore per alcuni dispositivi.

Essendo un'operazione ordinaria, per conoscere l'esatta procedura per altri dispositivi è sufficiente effettuare una ricerca in rete.

Una volta sbloccata la sezione delle opzioni sviluppatore, bisogna recarvisi per preparare il dispositivo ad essere controllato da un dispositivo terzo.

### Debug USB

Qualora si desideri una connessione via cavo (ideale per raggiungere il massimo delle prestazioni) bisogna abilitare il debug USB (impostazioni sviluppatore).

Sebbene non sia un'operazione necessaria, è possibile verificare che tutto sia andato a buon fine lanciando ADB da terminale:

```bash
adb devices
```

In caso di esito positivo, apparirà una sequenza di caratteri esadecimali (composta da cifre 0-9 e lettere a-f) seguita dall'identificativo del proprio dispositivo quando ve ne sono due o più (altrimenti apparirà un generico "device").

### Debug Wireless

Una connessione senza cavo implica necessariamente un peggioramento delle prestazioni, eppure potrebbe essere più indicata in determinate circostanze (cavi difettosi, necessità di allontanare i dispositivi tra loro, e così via).

Sempre dalle impostazioni sviluppatore, va attivato il debug Wireless.

Si noti che l'opzione wireless è disponibile solo su versioni di Android più recenti (e spesso sui firmware custom), mentre su versioni Android meno recenti (senza root) è obbligatorio collegarsi prima via USB e poi spostarsi su una connessione Wireless (ogni singola volta).

Va chiarito fin da subito che non è compito di ADB crittografare le comunicazioni, pertanto **il traffico è in chiaro** e chiunque sia collegato alla rete può intercettarlo.

Nel caso si voglia proseguire comunque con una connessione wireless non sicura, bisogna inserire dapprima `adb tcpip 5555` (dove `5555` è proprio la porta convenzionalmente usata da ADB in modalità wireless) e poi `adb connect ADDRESS`, dove `ADDRESS` è l'indirizzo del proprio dispositivo.

Qualora non funzionasse, sarà necessario eseguire `adb connect ADDRESS:PORT`, dove `ADDRESS` e `PORT` sono forniti dal dispositivo Android stesso nella schermata di abilitazione del debug wireless.

Se la crittografia è proprio imprescindibile, non si deve necessariamente rinunciare al wireless: lo spiega il prossimo paragrafo.

### ADB via tunnel SSH

Su reti ritenute non sicure, è possibile avviare il server ADB dietro tunnel SSH ([che cos'è?](https://linuxhub.it/articles/howto-ssh-controllo-remoto-del-desktop-da-mobile/#title0)) così da arginare il problema.

Questa soluzione si applica ad esempio nei casi in cui ci si voglia connettere a un dispositivo via Internet, o più semplicemente se ci si vuole accertare che nessun dispositivo avente accesso alla propria LAN possa intercettare tutto il traffico in chiaro.

Istruzioni e maggiori informazioni sono disponibili su [GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/tunnels.md#ssh-tunnel).


## Installazione

Si può installare il software per lo più tramite i vari package manager delle distribuzioni.

### Debian e Ubuntu

Sebbene Scrcpy si possa installare via Apt,

```bash
apt install scrcpy
```

la versione disponibile nei repository (al momento di scrittura) è obsoleta e non supporta nuove funzionalità (come il trasferimento dell'audio).

In tal caso, è **consigliato** installare Scrcpy in altri modi, ad esempio [da sorgente](https://github.com/Genymobile/scrcpy/blob/master/doc/linux.md#latest-version).

### Fedora

```bash
dnf copr enable zeno/scrcpy && dnf install scrcpy
```

### Arch Linux

```bash
pacman -S scrcpy
```

### Windows

L'installazione Windows può essere manuale: qui la [pagina delle release](https://github.com/Genymobile/scrcpy/releases/latest).

In alternativa, Winget, Chocolately e Scoop sono tre package manager disponibili per Windows (sebbene solo il primo sia ufficiale).

Per installare Scrcpy usando [Winget](https://learn.microsoft.com/it-it/windows/package-manager/winget/):

```bash
winget install scrcpy
```

Oppure, con [Chocolately](https://chocolatey.org):

```bash
choco install adb scrcpy
```

Oppure, con [Scoop](https://scoop.sh):
```bash
scoop install adb scrcpy
```

Maggiori informazioni sulla [pagina GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/windows.md).

### MacOS

Si può installare su MacOS tramite Brew:

```bash
brew install android-platform-tools scrcpy
```

Maggiori informazioni sulla [pagina GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/macos.md).

### Altre installazioni (Linux)

Consultare la [pagina GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/linux.md) dedicata.

## Come usare Scrcpy

Nei paragrafi seguenti sono presentati i più frequenti casi di utilizzo di Scrcpy: ad ognuno di essi è stata creata.

## Come condividere lo schermo

È sufficiente invocare `scrcpy`:

```bash
scrcpy
```

In caso di problemi, specie su versioni obsolete di Scrcpy, può essere utile limitare la lunghezza del lato maggiore della risoluzione utilizzando il parametro `-m`:

```bash
scrcpy -m 1920
```

Per disabilitare qualsiasi interazione con il dispositivo (modalità read-only) si può usare la flag `--no-control`:

```bash
scrcpy --no-control
```

Siccome lo schermo viene condiviso su un'altro schermo, potrebbe essere utile spegnere lo schermo fisico e al contempo anche evitare che il telefono vada in stand-by:

```bash
scrcpy --turn-screen-off --stay-awake
```

Scrcpy offre un parametro apposito anche per limitare i frame per secondo (sebbene potrebbe funzionare solo da Android 10 in su):

```bash
scrcpy --max-fps=60
```

Anche il bitrate (la velocità di trasferimento, misurata in bit al secondo) può essere limitato.

Scrcpy consente di agire separatamente sul video e sull'audio (`--video-bit-rate` e `--audio-bit-rate`), e sono supportati i suffissi `K` (1000, mille) e `M` (1000000, un milione):

```bash
scrcpy --audio-bit-rate=16K --video-bit-rate=2M
```

Se si conosce in anticipo quale dovrà essere l’orientamento dello schermo iniziale, questo può essere cambiato:

```bash
scrcpy --lock-video-orientation     # orientamento corrente (default)
scrcpy --lock-video-orientation=0   # orientamento base (verticale)
scrcpy --lock-video-orientation=1   # 90°  (orizzontale)
scrcpy --lock-video-orientation=2   # 180° (verticale, al contrario)
scrcpy --lock-video-orientation=3   # 270° (orizzontale)
```

Per guadagnare un po'di spazio, la barra superiore della finestra può essere rimossa:

```bash
scrcpy --window-borderless
```

Per partire direttamente a schermo intero:

```bash
scrcpy --fullscreen
```

## Scorciatoie da tastiera

Quando la finestra di Scrcpy è in focus, alcune combinazioni di tasti permettono di eseguire determinate azioni.

Di seguito una tabella repilogativa, dove con il tasto `MOD` si intendono sia l'`Alt` sinistro che il tasto Super (solitamente `Windows`) sinistro (si possono usare a propria preferenza: funzionano entrambi e possono essere cambiati con `--shortcut-mod`):

| Azione                                        | Descrizione                                                                        |
|-----------------------------------------------|------------------------------------------------------------------------------------|
| `MOD` + `h` / tasto centrale                  | Tasto Home                                                                         |
| `MOD` + `b` / `MOD` + cancella / tasto destro | tasto Back                                                                         |
| `MOD` + `s`                                   | Tasto App Switch                                                                   |
| `MOD` + `m`                                   | Tasto Menu                                                                         |
| `MOD` + `f`                                   | Entra ed esci dalla modalità a schermo intero                                      |
| `MOD` + `←`                                   | Ruota lo schermo in senso antiorario                                               |
| `MOD` + `→`                                   | Ruota lo schermo in senso orario                                                   |
| `MOD` + `↑`                                   | Alza il volume                                                                     |
| `MOD` + `↓`                                   | Abbassa il volume                                                                  |
| `MOD` + `p`                                   | Accendi e spegni lo schermo (tasto Power)                                          |
| Tasto destro (a schermo spento)               | Accendi lo schermo (tasto Power)                                                   |
| `MOD` + `n`                                   | Abbassa la tendina delle notifiche                                                 |
| `MOD` + `SHIFT` + `n`                         | Alza la tendina delle notifiche                                                    |
| `MOD` + `c`                                   | Copia da Android a computer                                                        |
| `MOD` + `x`                                   | Taglia da Android a computer                                                       |
| `MOD` + `v`                                   | Incolla da computer ad Android                                                     |
| `MOD` + `o`                                   | "Spegni" lo schermo ma preserva la condivisione (risparmia batteria) o riaccendilo |
| `MOD` + `SHIFT` + `o`                         | Riaccendi lo schermo, se precedentemente "spento"                                  |
| `CTRL` + tasto sinistro                       | Fai zoom in o zoom out                                                             |

## Come trasferire l'audio in uscita

> Nota: funziona solo a partire da Scrcpy 2, su Android 11 e superiori.

Per far sì che l'audio sia trasferito dallo smartphone al computer via ADB, a causa delle limitazioni di Android è necessario che lo schermo sia acceso nel momento in cui viene invocato Scrcpy.

Solitamente è sufficiente lanciare `scrcpy` senza alcun altro parametro:

```bash
scrcpy
```

Qualora lo schermo fosse spento o non fosse possibile connettere il flusso audio, Scrcpy fallirà silenziosamente, trasmettendo solo il video.

Per forzare Scrcpy a non partire senza il trasferimento audio, bisogna ricorrere alla flag `--require-audio`:

```bash
scrcpy --require-audio
```

## Come inviare file via drag & drop

Scrcpy consente il trasferimento di file sul dispositivo semplicemente trascinando e rilasciando (drag & drop) i file sulla finestra di Scrcpy.

Scrcpy, di default, salva i file nella cartella dei download, ossia `/sdcard/Download/`. La cartella di destinazione si può modificare grazie al parametro `--push-target` seguita dal percorso della cartella sul dispositivo.

In particolare, quando viene trascinato un file APK, Scrcpy tenterà di installarlo come applicazione.

Qualora questo comportamento non sia desiderato, Scrcpy consente di disabilitarlo (incluso ogni altro tipo di interattività, come quello di mouse e tastiera):

```bash
scrcpy --no-control
```

## Come registrare lo schermo

Il principio di funzionamento di Scrcpy lo rende particolarmente adatto nel caso sia necessario registrare schermate che sarebbero troppo dispendiose per l'accoppiata processore e memoria interna.

Utilizzando Scrcpy, il flusso video viene direttamente trasferito al computer che si occuperà di salvare su disco la registrazione, in modo da non far riportare evidenti perdite di performance sul dispositivo Android.

Nell'esempio seguente, viene fatta partire la registrazione del solo flusso video, escludendo quello audio a causa della flag `--no-audio`:

```bash
scrcpy --no-audio --record=file.mkv
```

## Come utilizzare il telefono come webcam

Grazie ai driver V4L, è possibile creare un dispositivi virtuali, come videocamere, e far loro trasmettere flussi video arbitrari.

Per maggiori informazioni su come iniziare il setup di `v4l2loopback`, un modulo per il kernel Linux necessario per creare una videocamera virtuale, è possibile consultare [questa pagina GitHub](https://github.com/Genymobile/scrcpy/blob/master/doc/v4l2.md).

Una volta terminata la configurazione di v4l2loopback, va istruito Scrcpy a trasmettere il flusso video a `/dev/videoN`, dove `N` è in genere un numero piccolo, solitamente 1 o 2 (consultare `ls /dev/video*`, spesso N è il maggiore tra di essi):

```bash
scrcpy --v4l2-sink=/dev/videoN
```

La finestra di playback può essere disattivata con la flag `--no-video-playback`: qualora si scelga di disattivarla si tenga presente che, se proprio necessario, è sempre possibile controllare cosa stia trasmettendo la propria videocamera utilizzando ffplay, VLC o MPV:

```bash
ffplay -i /dev/videoN
vlc v4l2:///dev/videoN
mpv v4l2:///dev/videoN
```

## Come condividere la clipboard (copia-incolla)

Di default, Scrcpy consente già la sincronizzazione della clipboard tra computer e Android.

Qualora la clipboard non venga sincronizzata (da computer ad Android), potrebbe essere necessario ricorrere al metodo basato su key events, attivabile con la flag `--legacy-clipboard`, oppure utilizzare le scorciatoie da tastiera.

Al contrario, la flag `--no-clipboard-autosync` disabilita questo comportamento, che di default non è sempre desiderabile per motivi di privacy e sicurezza.

## Maggiori informazioni

I sorgenti di Scrcpy sono disponibili su [GitHub](https://github.com/Genymobile/scrcpy), mentre il subreddit dedicato è raggiungibile su [r/scrcpy](https://www.reddit.com/r/scrcpy).
