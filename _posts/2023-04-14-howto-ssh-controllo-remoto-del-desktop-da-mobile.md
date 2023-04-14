---
class: post
title: '#howto - SSH: controllo remoto del desktop da mobile - Parte 1'
date: 2023-04-14 07:00
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
- android
---

Qualche volta risulta necessario usare il computer mentre si è fisicamente altrove, ad esempio per controllare lo stato di un download, oppure per verificare a che punto è arrivato [Photorec nel recuperare i file persi](https://github.com/linuxhubit/linuxhub.it/blob/main/_posts/2023-04-07-howto-recupero-file-persi-photorec.md), mentre si è in un'altra stanza.

In questi casi è conveniente instaurare un **collegamento** tra due dispositivi - l'host, a cui ci si vuole connettere, e il client, ossia il dispositivo a cui si ha accesso, come ad esempio uno smartphone Android su cui è installato Termux.

[Vedi anche: Usare il proprio smartphone Android su Linux](https://linuxhub.it/articles/howto-usare-il-proprio-smartphone-su-linux/)

## SSH - Cos'è, in breve

**SSH** ("Secure Shell") è il protocollo più utilizzato per connettersi a un dispositivo remoto in modo sicuro, anche su reti non attendibili, grazie all'utilizzo di autenticazione e crittografia.

Anche se è possibile impostare una password, risulta spesso più conveniente usare una **crittografia a chiave pubblica** (conosciuta anche come crittografia asimmetrica): in breve, client e server concordano anzitempo una coppia di chiavi, una pubblica e una privata (sono un particolare tipo di "password", salvate però in formato binario su file, la cui lunghezza è misurata nell'ordine di centinaia o migliaia di bit).

Durante l'autenticazione, una viene usata solo per criptare e l'altra solo per decriptare, e viceversa.
Nel caso di SSH, la **chiave pubblica** viene liberamente fornita dall'host (o server) ed è usata per crittografare il messaggio da spedire al client.
La **chiave privata** è quella che deve essere custodita attentamente da ciascun client che vorrà connettersi al server SSH e permette di decriptare i messaggi del server.


## Installare SSH (OpenSSH)

**OpenSSH** è un'implementazione open source del protocollo SSH, disponibile sulle principali distribuzioni Linux e non solo.

### Ubuntu
```bash
apt-get install openssh-client openssh-server
```

### Fedora
```bash
dnf install openssh-client openssh-server
```

### Arch Linux
```bash
pacman -S openssh-client openssh
```


## Come generare le chiavi asimmetriche

Per generare le chiavi, è necessario usare `ssh-keygen` da terminale (desktop).

Tuttavia, prima di generare le chiavi, è necessario scegliere l'**algoritmo di cifratura**.

È consigliato scegliere l'algoritmo **Ed25519** (basato sul problema matematico delle curve ellittiche) piuttosto che **RSA** (basato sul problema matematico della fattorizzazione in numeri primi), **DSA** (considerato vulnerabile, ampiamente superato e sempre meno supportato) o **ECDSA** (la cui sicurezza è fin troppo legata alla capacità del sistema di generare numeri casuali, e poi va notato che ci sono anche [sospetti di backdoor inserite volutamente dal NIST](https://blog.cloudflare.com/how-the-nsa-may-have-put-a-backdoor-in-rsas-cryptography-a-technical-primer/)).

**Ed25519** offre il medesimo livello di sicurezza crittografica con chiavi ben più brevi, è più performante, e non risulta vulnerabile a particolari tipi di attacchi che possono essere invece usati contro RSA.
Tuttavia, Ed25519 è stato creato molto dopo RSA, quindi se la compatibilità è un problema (e solitamente non lo è più, almeno non tanto quanto qualche anno fa) allora potrebbe essere necessario ricorrere a RSA.

Per *ed25519*:

```bash
# Genera una chiave Ed25519
ssh-keygen -t ed25519
```

Per rsa:

```bash
# Genera una chiave RSA a 4096 bit (default: 3072 bit)
ssh-keygen -t rsa -b 4096
```

In entrambi i casi, verrà chiesto **dove salvare la coppia di chiavi** e se inserire una **passphrase** (nient'altro che una "password di una password" - nella pratica, la passphrase crittografa la chiave privata, ed è utile a prevenire i rischi di un eventuale accesso non autorizzato ad essa). A meno di specifiche esigenze di sicurezza, la passphrase può essere tranquillamente omessa.

## Configurare la chiave pubblica

Generata la coppia di chiavi, è necessario abilitare la **chiave pubblica** e autorizzare il server SSH ad usarla per accettare nuove connessioni in entrata.

```bash
# Aggiunge la chiave pubblica alla lista delle chiavi autorizzate.
#
# Attenzione ai simboli:
# ">>" è utilizzato per aggiungere alla fine, mentre ">" sovrascrive l'intero contenuto del file.
# ".pub" indica che, tra le due chiavi, si sta scegliendo quella pubblica.
cat '~/.ssh/id_ed25519.pub' >> ~/.ssh/authorized_keys
```

## Avviare il server SSH

Usando Systemd:
```bash
# Avvio per la sessione attuale
systemctl start sshd.service
# Abilitazione generale (si avvia ad ogni futura accensione)
systemctl enable sshd.service
```

Senza Systemd, usando Init:
```bash
# --- Senza Systemd
# Avvio per la sessione attuale
/etc/init.d/sshd start
# Abilitazione generale (si avvia ad ogni futura accensione)
chkconfig sshd on
```

Per effettuare eventuali modifiche, il file di configurazione è `/etc/ssh/sshd_config`.

Ora, il server SSH accetta le connessioni dei dispositivi dotati della giusta chiave **privata**.
Resta solo da configurare il dispositivo Android.


## Configurare la chiave privata e il dispositivo Android

[Vedi anche: Termux - Linux su Android](https://linuxhub.it/articles/howto-termux-linux-su-android/)

Installato Termux, è necessario usare il package manager, `pkg`, per installare OpenSSH.

```bash
pkg update && pkg upgrade && pkg install OpenSSH
```

Installato OpenSSH, bisogna spostare la **chiave privata** sulla memoria interna del dispositivo (va trasferita manualmente).

```bash
# A partire dalle ultime versioni di Android, le applicazioni non hanno più
# automaticamente l'accesso alla memoria interna del dispositivo.
# Qualora non funzionasse, bisogna revocare e ridare i permessi manualmente.
termux-setup-storage

# Ora, per convenzione, la chiave privata andrebbe spostata sotto ~/.ssh.
# Il symlink "~/storage/shared" riporta alla memoria interna del dispositivo Android.
mv ~/storage/shared/Download/id_ed25519 ~/.ssh/
```

A meno che non sia stata inserita una passphrase (in tal caso potrebbe essere conveniente usare anche ssh-agent e ssh-add), dovrebbe ora essere possibile connettersi.


## Connessione

Se i due dispositivi sono connessi alla stessa rete, prima di connettersi, è necessario ottenere sia l'username (usando `whoami`) che l'indirizzo IP locale del server SSH (usando `ip address`; nel caso di IPv4, è solitamente quello che inizia per "`192.168`"):

A questo punto, la connessione può essere finalmente stabilita (sia "`22`" la porta in ascolto, "`~/.ssh/id_ed25519`" il percorso alla chiave privata, "`username`" il nome utente dell'host, "192.168.1.70" l'indirizzo locale):

```bash
ssh -p 22 -I ~/.ssh/id_ed25519 username@192.168.1.70
```

## Per concludere

Per ora è tutto: analizzeremo la parte sul controllo remoto dello schermo del desktop prossimamente, nella seconda parte di questa guida.
