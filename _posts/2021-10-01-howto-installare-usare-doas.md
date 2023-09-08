---
class: post
title: '#howto - Installazione ed utilizzo di doas' 
date: 2021-10-01 12:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: linuxhub
coauthor_github: linuxhubit
tags: 
- doas 
- ubuntu 
- archlinux 
- fedora
---

Uno dei primi comandi che impariamo sui nostri terminali da utenti linux è `sudo`, ovvero **super user do** (alcuni lo traducono anche con **substitute user do**) che serve fondamentalmente a digitare comandi impersonificando un altro utente in maniera temporanea (per comportamento predefinito, generalmente lo si usa per impersonificare l'utente root). Ma esistono alternative a questo comando? Ecco a voi `doas`.

## Cos'è e a cosa serve doas
Sviluppato nel 2015, doas è un alternativa di sudo utilizzata in ambiente UNIX/BSD sotto licenza ISC (Internet Systems Consortium) con lo scopo di creare uno strumento più sicuro e semplice. 

Al tempo in cui scrivo, doas è ancora supportato da aggiornamenti frequenti, l'ultima release è stata rilasciata qualche settimana fa sul [suo repository principale](https://cvsweb.openbsd.org/src/usr.bin/doas/).

## Perché non usare sudo? La controversia dei bug

Ogni qualvolta esce fuori una nuova vulnerabilità in un generico software è prassi comune iniziare a domandarsi perché si sta utilizzando quel software e non un altro che magari non ha lo stesso numero di falle. `sudo` non è immune da queste chiacchiere da bar (purtroppo).

Voglio spendere qualche minuto del vostro tempo in un ragionamento che potrebbe guidarvi su quelle che sono le vostre scelte in questo ambito.  

Una delle ultime vulnerabilità di gran peso su sudo è stata la **CVE-2021-3156**, anche chiamata *Barone Samedì* (corretta poi nella versione **1.9.5p2** di sudo); proprio in corrispondenza di tale scoperta ho letto molti commenti del tipo: 

> L'ennesima dimostrazione di quanto sia poco sicuro sudo, usiamo doas

Ragionamenti di questo tipo su un software open source sono, a mio parere, totalmente insensati: neanche gli *helloworld* sono esenti da falle idealmente, ogni software che scriviamo è purtroppo soggetto a tutta una serie di considerazioni che sono impossibili da tenere conto mentre lo stiamo scrivendo e questo non ci deve impedire di portarlo a termine, di utilizzarlo o di considerarlo come mediamente sicuro. Ed è proprio in questo contesto che l'open source si distingue dagli altri modelli di pubblicazione del software: più occhi son puntati sul codice sorgente del nostro operato, più falle e problematiche verranno corrette. In sintesi il fatto che venga trovata e corretta una falla non è motivo di allontanarsi da un software, ma è anzi motivo di avvicinarsi ad esso ed essere ancora più sicuri di utilizzarlo. 

Ovviamente questo ragionamento non è assoluto, lo sviluppo sul software preso in considerazione deve essere attivo, non sottovalutare le issue aperti dagli utenti e deve essere progettato in maniera da considerare che la maggior parte della sua vita sarà quella di essere sottoposto a modifiche (quindi facilmente riscrivibile nei suoi singoli moduli).

Ma allontanarsi da un software quando viene scoperto un nuovo bug, scusatemi il francesismo, è una **boiata**.

## Installare doas
`doas` è disponibile su linux tramite il porting **OpenDoas**, e si può installare tramite il repository di github: 

```bash
git clone https://github.com/Duncaen/OpenDoas 
cd OpenDoas 
./configure 
make install
```

### configure
Soffermiamoci però sulla terza istruzione, il `./configure`: questo script fa un controllo di tutte le dipendenze installate o meno sulla vostra distribuzione, ogni riga formata così: 

```
Checking for nomesoftware ...         yes.
```

se tutte le righe riportano la dicitura **yes** siete apposto, altrimenti potreste non essere in grado di installare il software. *Non dovrebbero esserci in realtà problemi di sorta*, il repository si porta alcune dipendenze tipiche da installare, ma se l'istruzione di `make` dovesse fallire, *installate le varie dipendenze della lista* fino a che non risulta soddisfatta la make, aiutandovi ad esempio con il vostro package manager.   

Le dipendenze controllate sono le seguenti: 

```
explicit_bzero
strlcat
strlcpy
errc
verrc
setprogname
readpassphrase
strtonum
reallocarray
execvpe
setresuid
setresgid
setreuid
setregid
closefrom
sysconf
dirfd
fcntl_h
F_CLOSEM
dirent_h
sys_ndir_h
sys_dir_h
ndir_h
login_cap_h
pam_appl_h
```

### Update 
**ATTENZIONE**:

Uno strumento di amministrazione del sistema deve essere sempre aggiornato. Compilare un pacchetto da soli non dà questa garanzia, quindi ogni tanto verificate aggiornamenti con una `git pull` 

### Archlinux 
Gli user di archlinux possono installare opendoas direttamente con pacman: 
```bash
pacman -S opendoas
```

### NIXOS

Cercando in rete pare che ci siano testimonianze del fatto che `doas` non funzioni a dovere su NIXOS per problemi legati al pam (la configurazione delle libreria di autenticazione di sistema)

## Configurazione di doas 
Il file di configurazione principale di doas è `/etc/doas.conf`, possiamo editarlo direttamente con il nostro editor preferito, supponiamo `nano`:

```bash
nano /etc/doas.conf 
```

Il file inizialmente sarà vuoto, da creare.  

Per abilitare un determinato utente ad eseguire comandi impersonificandone un altro bisogna scrivere: 
``` 
permit <nomeutente> as <utentedaimpersonificare>
```

ad esempio per abilitare come root:
``` 
permit <nomeutente> as root
```

per dare accessi di root al nostro utente. 

Più genericamente potete garantire tutti i ermessi all'utente **wheel** ( genericamente il gruppo di utenti che sono abilitati ad usare `sudo`)

```
permit :wheel 
```

Assicuratevi che il file abbia gruppo e permessi di root: 

```
chown root:root /etc/doas.conf 
```

Se avete finito di modificare il file, è buona norma togliere i permessi di scrittura e lettura a tutti: 

```
chmod 0400 /etc/doas.conf
```

Quindi verificate che il file non abbia errori di scrittura: 

```
doas -C /etc/doas.conf && echo "il file non contiene errori" || echo "ops... rileggi il file"
```

Copiate quindi le configurazioni di **pam**:

```
cp /etc/pam.d/sudo /etc/pam.d/doas
```

Se non doveste avere questo file (magari non avete proprio installato sudo, in quei pochi sistemi che permettono di scegliere liberamente cosa installare) il mio file di pam contiene queste informazioni, che potete copiare manualmente: 

```
#%PAM-1.0
auth            include         system-auth
account         include         system-auth
session         include         system-auth
```

## Uso
Quindi proviamo ad usarlo:

```bash
echo "ciao da doas" | doas tee /etc/ciao 
```

quindi:

```bash
cat /etc/ciao 
```

Se in output abbiamo:

```
ciao da doas 
```

Abbiamo impostato tutto correttamente (potete eliminare il file di test con: `doas rm /etc/ciao`)

## Trick

Ecco a voi qualche consiglio per un utilizzo quotidiano di `doas`

### sudo alias

Siete sicuramente ancora troppo abituati ad utilizzare `sudo`, potrebbe aiutarvi impostare un alias [nel vostro file rc](https://linuxhub.it/articles/howto-file-avvio-shell):

```bash
alias sudo="doas "
```

Per farla più simpatica, potreste anche pensare di scrivere su uno script simile: 

```bash
#!/bin/bash
echo "eh-eh-eh, ancora sudo usiamo qua? passa a doas"
doas "$@"
```

e far puntare l'alias allo script

### Abilitare solo specifici comandi o utenti
Il file di configurazione di doas permette configurazioni molto dettagliate, la sintassi completa per ogni riga è: 

```bash
permit|deny [options] identity [as target] [cmd command [args ...]]
```

Abilitiamo un determinato utente ad esempio all'esecuzione di doas solo con il comando `tee`:

```
permit nomeutente as root cmd tee
```

Oppure neghiamo i permessi ad uno specifico utente e solo per uno specifico comando (ad esempio sempre `tee`): 

```bash
deny nomeutente as root cmd tee
```

Potete specificare insieme all'utente il gruppo (o solo il gruppo) scrivendolo dopo il carattere `:`. Ad esempio abilitiamo i permessi a tutti gli utenti del gruppo `wheel`, ma non **paperino**, perché lui ci sta antipatico: 

```bash
permit :wheel
deny paperino
```

### nopass

Aggiungendo alle righe di `doas.conf` l'opzione `nopass`, potete evitare di inserire la password per fare accesso:

```
permit nopass :wheel
```

Pensate che non sia una buona idea dal punto di vista della sicurezza? Concordo con voi, ma che ne pensate di limitare questo comportamento solo a quando ad esempio **aggiornare il sistema o installare pacchetti**? ecco un esempio su pacman: 

```
permit :wheel

permit nopass :wheel cmd pacman
```
