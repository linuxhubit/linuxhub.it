---
class: post
title: '#howto - Installazione di Arch Linux su CPU ARM 64 bit (sperimentale)'
date: 2020-11-25
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  
  - archlinux  
  - rhel  
  - bash  
  - systemd
---
**Arch Linux** è una distribuzione Linux piuttosto apprezzata ed utilizzata dalla community, ma lo sapevate che può girare anche su un processore **ARM**? Questa guida raccoglierà quelle che sono le mie esperienze in merito all'installazione e configurazione di Arch Linux a 64bit su Raspberry Pi 4.

> **Attenzione**: Al momento esistono davvero pochi pacchetti su Arch Linux ARM a 64bit, ci son diversi problemi in fase di installazione e non è per nulla stabile. Consiglio, per chi necessita di un'installazione funzionante o pronta, di usare **la versione 32bit** o meglio ancora **Manjaro a 64bit** che è molto più fornito.

## Download e Flash su SD

Assicuratevi di avere una scheda SD abbastanza capiente per quelle che sono le vostre necessità. Considerate che, a sistema pulito, ci son poco meno di 2 GB già occupati.

Download e flash vanno fatti da un PC funzionante, e nella guida supporremo che il processo avvenga con un sistema operativo Linux.

### Partizionamento e mount

Inserite la vostra schedina SD nel pc, quindi date `fdisk` per modificarne le partizioni. 

> *SUGGERIMENTO*: se si ha poca confidenza con `fdisk`, si può provare ad usare `cfdisk`che propone una comoda interfaccia grafica.

Come prima cosa, diamo `blkid` per sapere su quale dispositivo operare:

```bash
blkid
```

Con l'identificativo a disposizione (supponiamo `/dev/mmcblk0`), utilizzare quindi `fdisk` con i seguenti comandi:

```bash
sudo fdisk /dev/mmcblk0

o 	# Crea una nuova partizione DOS
n	# Aggiunge partizione
p	# Rendila partizione primaria
1	# Numero partizione
# Premi invio
+200M	# Spazio della partizione
t
c

n
p
2
# Premi invio
# Premi invio
w	# Scrivi modifiche
yes
```

Quindi formattiamo le due partizioni appena create:

```bash
# La prima in vfat
mkfs.vfat /dev/mmcblk0p1 -n "ARCH_BOOT" 

# La seconda in ext4
mkfs.ext4 /dev/mmcblk0p2 -L "ARCH_ROOT"
```

Ovviamente potete personalizzare (o non scrivere) i nomi ARCH_ROOT e ARCH_BOOT.

Creiamo due cartelle nel nostro file system e montiamo le due partizioni appena create:

```bash
mkdir root boot
mount /dev/mmcblk0p1 boot
mount /dev/mmcblk0p2 root
```

### Download e flash

Scarichiamo a questo punto l'immagine, e trasferiamone tutto il contenuto nella root:

```bash
wget http://os.archlinuxarm.org/os/ArchLinuxARM-rpi-aarch64-latest.tar.gz

tar -xpf ArchLinuxARM-rpi-aarch64-latest.tar.gz -C root
```

Spostiamo il contenuto della cartella *boot* della root nella partizione di *boot*:

```bash
mv root/boot/* boot
```

Quindi andiamo ad applicare alcune modifiche ai file di boot.

### Modificare i file di boot

Innanzitutto, dando `blkid`, segnamoci gli **UUID** delle due partizioni. Per isolare gli output:
```bash
blkid /dev/mmcblk0p1
blkid /dev/mmcblk0p2
```
Una volta segnati, apriamo con il nostro editor di testo preferito (e con i permessi di amministratore) il file `/etc/fstab` e modifichiamolo come segue:

```bash
UUID=<uuid della partizione di boot>  /boot vfat defaults  0 0

UUID=<uuid partizione di root>  /  ext4  defaults 0 0
```

Cosa più importante, andiamo a modificare il file `boot/boot.txt`, e più esattamente la riga che inizia con `setenv`. Modifichiamola come segue:

```bash
setenv bootargs console=ttyS1,115200 console=tty0 root=UUID=<inserite il vostro UUID della partizione 2> rw rootwait smsc95xx.macaddr="${usbethaddr}"
```

> **Note**: la modifica consiste nell'inserire staticamente la UUID della root, la parte modificata è proprio quella che inizia con `root=...` che passa da `PARTUUID=...` a `UUID=...`.

Ora installiamo sul nostro sistema i tools *uboot*.

```bash
# Su Ubuntu e derivate
apt install u-boot-tools

# Su Arch 
pacman -S uboot-tools

# Su Fedora e derivate
dnf install uboot-tools
```

e diamo il comando seguente (Il punto iniziale è obbligatorio):  

```bash 
cd boot
./mkscr
```

### File config.txt 

Il file di configurazione `boot/config.txt` contiene tutte le impostazioni che vengono applicate fin dall'avvio. Queste includono audio/video/accelerazione hardware etc...

Se il file non c'è, **createlo**.

#### Schermo

Se avete uno schermo HDMI potrebbe essere necessario attivare la safe mode.

Aggiungete quindi la riga:
```bash
hdmi_safe=1
```

nel file di configurazione, salvate e chiudete.

Per impostare le dimensioni di un monitor specifico si inserisce un particolare **group** e quindi una **hdmi_mode**.  Seguendo le tabelle di uno dei link nella sezione [Link-Utili](https://linuxhub.it/articles/howto-installare-archlinux-su-arm-64-bit-sperimentale#title22), si può notare ad esempio che il gruppo 2 e la <u>modalità 83</u> portano ad una risoluzione **1920x1080**.

```properties
hdmi_group=2
hdmi_mode=83
```

#### Config d'esempio

Inoltre, vi condivido le impostazioni del mio **config** (risoluzione a 1600x900 con 24 pixel di overscan):

```properties
enable_uart=1

dtparam=i2c_arm=on

gpu_mem=256
dtoverlay=vc4-fkms-v3d
hdmi_force_hotplug=1

hdmi_ignore_edid=0xa5000080
hdmi_group=2
hdmi_mode=83
disable_overscan=0
overscan_left=24
overscan_right=24
overscan_top=24
overscan_bottom=24
```

#### Config Manjaro

Alternativamente, ecco il config di Manjaro:

```properties
# See /boot/overlays/README for all available options

gpu_mem=64
initramfs initramfs-linux.img followkernel
kernel=kernel8.img
arm_64bit=1
enable_gic=1
disable_overscan=1

#enable sound
dtparam=audio=on
hdmi_drive=2

#enable vc4
dtoverlay=vc4-fkms-v3d
max_framebuffers=2
```

### Troubleshoot: RAM > 4G

Se la memoria del Raspberry Pi è superiore ai 4GB, potreste avere un problema legato al malfunzionamento delle porte USB.

Due sono le possibili soluzioni.

#### Limitare la Ram

Una soluzione potrebbe essere quella di limitare la dimensione della RAM utilizzata scrivendo questa riga nel file **config.txt**:

```properties
total_mem=4000 # Limita la RAM a 3.7 GiB
```

#### Soluzione consigliata

Esistono in realtà delle patch che potete scaricare e inserire nella partizione di *boot* per evitare la limitazione di RAM. Andate su [questo repository](https://github.com/raspberrypi/firmware) e scaricate questi file dalla cartella **boot** :

- [bcm2711-rpi-4-b.dtb](https://github.com/raspberrypi/firmware/blob/master/boot/bcm2711-rpi-4-b.dtb)
- [fixup4.dat](https://github.com/raspberrypi/firmware/blob/master/boot/fixup4.dat)
- [fixup4cd.dat](https://github.com/raspberrypi/firmware/blob/master/boot/fixup4cd.dat)
- [fixup4db.dat](https://github.com/raspberrypi/firmware/blob/master/boot/fixup4db.dat)
- [fixup4x.dat](https://github.com/raspberrypi/firmware/blob/master/boot/fixup4x.dat)
- [start4.elf](https://github.com/raspberrypi/firmware/blob/master/boot/start4.elf)
- [start4cd.elf](https://github.com/raspberrypi/firmware/blob/master/boot/start4cd.elf)
- [start4db.elf](https://github.com/raspberrypi/firmware/blob/master/boot/start4db.elf)
- [start4x.elf](https://github.com/raspberrypi/firmware/blob/master/boot/start4x.elf)

Quindi sostituiteli ai corrispettivi della vostra cartella di boot.
Ora dovrebbe funzionare tutto, se così non dovesse essere, attuate la [prima soluzione](#limitare-la-ram)!

### Fine configurazione

La scheda SD è pronta! Assicuriamoci solo di smontarla correttamente così:

```bash
sync
umount root,boot
```

## Primo Avvio

Per accedere al nostro sistema, dopo aver inserito la scheda SD nel Raspberry, ovviamente, inseriamo nome utente e password (che saranno **root** in entrambi i casi, a meno che non vogliate cambiarle):

Se si ha una tastiera italiana è consigliabile eseguire il comando:

```bash
loadkeys it
```

Se si ha uno schermo HIDPI digitate anche:

```bash
setfont /usr/share/kbd/consolefonts/sun12x22.psfu.gz
```

### Connessione e aggiornamento

Siamo connessi ad internet? Se la risposta è no, usiamo:

```bash
wifi-menu
```

per connetterci e:

```bash
dhpcd
```

per forzare l'assegnamento dell'IP. 

><u>NOTE</u>: Se siamo connessi tramite cavo ethernet, possiamo mandare direttamente il secondo comando.

Quindi aggiorniamo il keyring di pacman:

```bash
pacman-key --init
pacman-key --populate archlinuxarm
```

e aggiorniamo eventualmente la nostra distro con:

```bash
pacman -Syyu
```

### TMP file system

Nel nostro file system una cartella speciale, */tmp*, contiene file e cartelle temporaneamente creati dai programmi per il loro corretto funzionamento. Questa cartella viene montata da *systemd* automaticamente in memoria **RAM** in modo da essere svuotata ogni qual volta il calcolatore viene spento.

È comunque possibile, per quei PC che non hanno un gran quantitativo di memoria disponibile, montare la cartella nello spazio di archiviazione piuttosto.

> *<u>SUGGERIMENTO</u>*: Se installate frequentemente programmi da AUR con un AUR-helper è possibile che quest’ultimo, facendo tante scritture su /tmp, vi saturi facilmente la memoria. Consiglio particolarmente il seguente procedimento ai PC con meno di 8GB di RAM che installeranno quindi molti pacchetti da AUR.

Per disabilitare il montaggio automatico basta dare:

```bash
systemctl mask tmp.mount
```

Bisogna comunque tener conto che disabilitando questo comportamento, il contenuto della cartella dei file temporanei non verrà più cancellato allo spegnimento del dispositivo, va quindi eliminato manualmente.
Si può tornare al comportamento di default specificando manualmente il montaggio in `/etc/fstab`, aggiungendo questa riga al file:

```bash
tmpfs /tmp tmpfs nodev,nosuid 0 0
```

Si può anche specificare una dimensione massima per evitare che la RAM venga monopolizzata dalla sola partizione di file temporanei, facendo un esempio con il limite di 2GB avremmo:

```bash
tmpfs /tmp tmpfs nodev,nosuid,size=2G 0 0
```

Altre interessanti informazioni su **tmpfs** si trovano sulla guida di Arch.

### Configurazioni base

Si scelga un nome personalizzato per vedere in rete il Raspberry Pi:

```bash
echo "NOMEIMPORTANTE" > /etc/hostname
```


Si modifichi la lingua del sistema (si usi il proprio editor preferito, nell'esempio sarà **nano**):

```bash
nano /etc/locale.gen
```

decommentiamo le righe che iniziano con **it_IT** e diamo il comando:

```bash
locale-gen
```

In seguito bisogna generare un buon */etc/locale.conf*. Apriamo quindi con un editor il file:

```bash
nano /etc/locale.conf
```

E digitiamo all'interno:

```bash
LANG=it_IT.UTF-8
LC_COLLATE="C"
LC_TIME="it_IT.UTF-8"
LANGUAGE="it_IT:en_EN:en"
```

Si imposti la mappatura della tastiera del tty (se italiana) con:
```bash
echo "KEYMAP=it" > /etc/vconsole.conf
```

e quindi il fuso orario di sistema con:
```bash
ln -sf /usr/share/zoneinfo/Europe/Rome /etc/localtime
```

Dopo le configurazioni sulla lingua, vi conviene riavviare:

```bash
reboot
```

## Configurazioni e package manager

### Installazione di pacchetti di base

Mancano alcuni pacchetti di base del sistema, e per questo suggerisco di dare:

```bash
pacman -S base base-devel git bash-completion man-db man-pages git xdg-user-dirs linux-aarch64-headers xorg-server xorg-xrefresh xorg-xinit
```

### Driver video

Esistono due driver video che può sfruttare il Raspberry: 

- `xf86-video-fbdev`
- `xf86-video-fbturbo-git`

Per installare il primo (consigliato) diamo:

```bash
pacman -S xf86-video-fbdev
```

### Configurazione utente

Creiamo un nuovo utente cancellando quello già presente nel nostro sistema (utente **alarm**) e mettiamone uno che piace di più a noi:

```bash 
# Cancella vecchio utente
userdel -rf alarm

# Aggiungi un nuovo utente
useradd -m -g users -G
wheel,video,audio,sys,lp,storage,scanner,games,network,disk,input -s /bin/bash
<nome utente>
```

Oppure (*sconsigliato*) cambiamo il nome al precedente:

```bash
usermod -l <nuovo utente> alarm
mv /home/alarm /home/<nuova home>
usermod -d <nuova home> <nuovo utente>
```

indichiamo al programma *sudo* (che ci permette di effettuare operazioni in modalità amministratore) che il nostro utente fa parte del gruppo amministratore, questo tramite visudo:

```bash
# impostiamo prima un editor di testo a noi più amichevole, di default è vi
export EDITOR=<nome editor>
visudo
```

A questo punto esistono due modi di impostare i permessi di amministratore: con richiesta della password (consigliato) e senza richiesta.

Nel primo caso decommentare la riga:

```bash
wheel ALL=(ALL) ALL
```

nel secondo caso decommentare:

```bash
wheel ALL=(ALL) NOPASSWD: ALL
```

Facciamo accesso con il nostro utente con su:

```bash
su <nomeutente>
cd
```

e creiamo le cartelle utente con:

```bash
xdg-user-dirs-update
```

> NOTE: ricordate che è possibile cambiare il nome delle cartelle di base (Immagini, Video ...etc) modificando il corrispettivo in `/home/<nome utente>/.config/user-dirs.dirs` inserendo ad uno ad uno i nomi che desideriamo sostituire. I nomi predefiniti dovrebbero essere quelli della lingua impostata

### Configurare Pacman

Perché Arch Linux? Perchè complicarsi la vita con questa tortura che ti porta a perdere una giornata per l'installazione di un sistema operativo? Le risposte sono tante, ma la prima in assoluto è il gestore di pacchetti **pacman** e tutto ciò che ne deriva, compreso il famoso **AUR: Arch User Repository**.

Prima di tutto abbelliamo il nostro gestore! Sempre con il nostro editor preferito modifichiamo il file `/etc/pacman.conf`, andiamo a decommentare la riga con scritto **Color** e aggiungiamo sotto **ILoveCandy**. 

### AUR-helper

Un AUR-helper cerca per voi e aggiorna (o segnala aggiornamenti) di pacchetti su AUR. Ne esistono diversi tipi, da quelli più semplici che fanno solo la ricerca a quelli più complessi che cercano, gestiscono e aggiornano i pacchetti e anche il sistema al posto di **pacman**. Quest’ultimi son detti anche **pacman-wrapper** ed usano la stessa sintassi di **pacman** in genere. 

>**Attenzione**: Tenete sempre conto che siamo su un architettura ARM e tantissimi pacchetti di AUR non hanno assolutamente alcun supporto.

Supponiamo di volerne installare uno di nome `<nomeaurhelper>` e di cui abbiamo il link del repository (che si può facilmente trovare con una ricerca su internet). Generalmente si installa così:

```bash
git clone https://aur.archlinux.org/<nomeaurhelper>.git
cd <nomeaurhelper>
makepkg -si
```

Installiamone quindi uno: **yay**! Per lo step successivo è **fortemente consigliato** l'accesso con l'utente e non con root.

Per accedere come utente:

```bash
su nomeutente
```

Quindi:

```bash
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

D'ora in poi potete sostituirlo in tutto e per tutto al package manager, l'unica differenza sta nel fatto che cerca i pacchetti anche su **AUR**, questo immenso repository di pacchetti offerti dalla comunità di Archlinux, ci trovate davvero di tutto dentro (*perciò fate comunque attenzione*).

> Note: *yay*, così come la maggior parte degli AUR-helper, non vanno usati come utenti privilegiati (con **sudo** o **l’account root** per intenderci)

Tramite *yay* potete visualizzare la differenza tra versione presente e quella aggiornata del software, oppure visionare e modificare il **PKGBUILD** (una sorta di file che contiene le istruzioni di compilazione del pacchetto, con dipendenze, siti da dove scaricare i binari ed eventualmente potete anche selezionare delle opzioni), questo lo rende uno strumento molto potente! 

## Link Utili

- [Documentazioni **elinux**](https://elinux.org/RPiconfig) : sul file config.txt
- [Template completo di EvilPaul](https://raw.githubusercontent.com/Evilpaul/RPi-config/master/config.txt) del config.txt
- [Wiki ufficiale](https://www.raspberrypi.org/documentation/configuration/config-txt/video.md) sul config.txt video

> Note: Trovate la guida completa e sempre aggiornata su [GitHub](https://github.com/PsykeDady/ArchlinuxARM_installazione)


