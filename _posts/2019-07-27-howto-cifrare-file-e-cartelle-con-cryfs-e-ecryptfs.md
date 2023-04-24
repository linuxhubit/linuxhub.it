---
class: post
title: '#howto - Cifrare file e cartelle con CryFS e ECryptFS'
description: "In questa guida vediamo due metodi per tenere al sicuro i nostri file, nello specifico CryFS e ecryptfs."
date: 2019-07-27
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  
  - bash
---
In questa guida vediamo due metodi per tenere al sicuro i nostri file, nello specifico **CryFS** e **ecryptfs**.

Personalmente, consiglio il primo metodo poiché permette l'interazione con i servizi cloud (come Dropbox), tuttavia se volete sapere ad esempio come cifrare la vostra intera home con il secondo metodo, su [github](https://github.com/PsykeDady/Archlinux_installazione) trovate una sezione nella mia guida di installazione di Archlinux (dovrebbe valere anche per altre distro).

> Consiglio di fare le prime prove con dati di poco rilievo per evitare di comprometterne il contenuto.

## ecryptFS

Iniziamo con **ecryptfs** e supponiamo di dover cifrare la cartella _/percorso/SegretiDiStato_.

Installiamo dunque i pacchetti necessari dal package manager di sistema:

### Debian/Ubuntu e derivate

```bash
apt install ecryptfs-utils keyutils rsync lsof
```

### RHEL/Centos e derivate

```bash
yum install ecryptfs-utils keyutils rsync lsof
```

### Fedora e derivate
```bash
dnf install ecryptfs-utils keyutils rsync lsof
```

### Procedimento 
Procediamo con l'abilitazione del modulo con **modprobe**:

```bash
modprobe ecryptfs
```

Vanno create la cartella da cifrare e una cartella in cui montarla, se non presenti. 

```bash
mkdir /percorsoDaCifrare /percorsoDaMontare
```

rendiamo privata la nostra cartella di interesse:

```bash
chmod 700 -R /percorsoDaCifrare
```

e procediamo con ecryptfs:

```bash
mount -t ecryptfs /percorsoDaCifrare /percorsoDaMontare
```

questo comando servirà anche a decifrare la cartella ogni qual volta vorrete usarla.

Per cifrare e rendere quindi inaccessibile la locazione, digitiamo:

```bash
umount /percorsoDaCifrare
```

Possiamo rendere più semplice l'operazione prendendo l'ultima riga del file **/etc/mtab**:

```bash
tail -1 /etc/mtab
```

copiamo tutte le opzioni che terminano per **ecryptfs** (tranne **ecryptfs_sig**) e creiamo il seguente script:

```bash
mount -t ecryptfs /percorso /percorso -o <tutte le opzioni separate da ,>
```

dopo di ché usate questo script per montare la cartella!

## CryFS

Procediamo con l'installazione di **cryfs**:

### Debian/Ubuntu e derivate

```bash
apt install cryfs
```

### RHEL/Centos e derivate

```bash 
yum install cryfs
```

### Fedora e derivate

```bash
dnf install cryfs
```

Facciamo chiarezza ad alcune definizioni prima di procedere:

-   **mountpoint** è dove scriverete e leggerete i vostri file
-   **basepoint** è dove cryfs salverà le informazioni riguardanti i dati e la cifratura.

Supponendo sempre di dover cifrare **/percorso**, creiamo un'altra locazione da usare come _basepoint_ (consiglio di crearla nascosta)

```bash
mkdir .SDSb 
```

> Possiamo comunque avviare Cryfs senza creare il percorso in anticipo, la creerà lo strumento stesso.

procediamo con:

```bash
cryfs cartellabase cartellamount
```

e nel nostro caso specifico:

```bash
cryfs /percorso
```

ci verrà chiesto se vogliamo le impostazioni di default e quale password vogliamo. Tra le opzioni disponibili ci sono metodo di cifratura, a quanti bit e altro.

Possiamo smontare la locazione con:

```bash
cryfs-umount /percorso
```

Se utilizzate cryfs in combinazione a dropbox, ricordate di inserire dentro la cartella del cloud la directory base e non quella di mount!

```bash
cryfs Dropbox/.cartellabase Altropercorso/cartellaMount
```

così facendo eviterete inutili problematiche di sincronizzazione continua.

Esistono comunque dei tool grafici (come vault di plasma) che consentono di usare questi tool senza doversi appoggiare al terminale, ma conoscere come funzionano e come configurare questi tool vi renderà possibile correggere eventuali errori delle GUI.