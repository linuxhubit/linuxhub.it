---
class: post
title: '#howto - Rigenerazione Automatica delle Chiavi SSH per VM Debian/ubuntu Clonate'
date: 2024-10-25 11:00
layout: post
author: Luigi Smiraglio
author_github: geegeek
coauthor: linuxhubit
coauthor_github: linuxhubit
published: false
tags:
- linux
- virtualizzazione
- ssh
- sicurezza
---

Quando si duplicano macchine virtuali, è comune incontrare il problema delle chiavi SSH duplicate. Queste duplicazioni possono causare conflitti e avvisi di sicurezza durante le connessioni SSH. Questo articolo fornisce una soluzione generale per generare chiavi SSH uniche per ogni macchina clonata, indipendentemente dall'infrastruttura di virtualizzazione utilizzata.

## Indice
1. [Preparazione del Template](#preparazione-del-template)
2. [Rimozione delle Chiavi SSH Esistenti](#rimozione-delle-chiavi-ssh-esistenti)
3. [Configurazione della Rigenerazione](#configurazione-della-rigenerazione)
4. [Creazione del Template](#creazione-del-template)
5. [Clonazione delle Macchine](#clonazione-delle-macchine)
6. [Gestione del File known_hosts](#gestione-del-file-known_hosts)
7. [Automazione](#automazione)

## Preparazione del Template

Prima di creare il template, è fondamentale assicurarsi che le chiavi host SSH esistenti vengano rimosse. Questo processo garantirà che nuove chiavi SSH vengano generate al primo avvio della macchina clonata.

## Rimozione delle Chiavi SSH Esistenti

Esegui il seguente comando sulla macchina template:

```bash
sudo rm /etc/ssh/ssh_host_*
```

## Configurazione della Rigenerazione

### Opzione 1: Utilizzo di cloud-init

1. Installa cloud-init:
```bash
sudo apt-get update
sudo apt-get install cloud-init
```

2. Configura `/etc/cloud/cloud.cfg`:
```yaml
ssh_deletekeys: true
ssh_genkeytypes: ['ed25519', 'rsa']
```

### Opzione 2: Script di Inizializzazione

1. Crea il file `/etc/init.d/regenerate-ssh-keys`:
```bash
#!/bin/bash
### BEGIN INIT INFO
# Provides:          regenerate-ssh-keys
# Required-Start:    $remote_fs
# Required-Stop:
# Default-Start:     2 3 4 5
# Default-Stop:
# Short-Description: Regenerate SSH host keys
### END INIT INFO

case "$1" in
    start)
        if [ ! -f /etc/ssh/ssh_host_ed25519_key ]; then
            dpkg-reconfigure openssh-server
        fi
        ;;
    *)
        echo "Usage: /etc/init.d/regenerate-ssh-keys start"
        exit 1
        ;;
esac

exit 0
```

2. Rendi lo script eseguibile e abilitalo:
```bash
sudo chmod +x /etc/init.d/regenerate-ssh-keys
sudo update-rc.d regenerate-ssh-keys defaults
```

## Creazione del Template

1. Spegni la macchina:
```bash
sudo shutdown -h now
```

2. Crea il template secondo la tua piattaforma:
- **VMware**: Converti la macchina in template
- **VirtualBox**: Esporta come appliance
- **Altre Piattaforme**: Segui le procedure specifiche

## Clonazione delle Macchine

1. Clona la macchina dal template
2. Avvia la macchina clonata
3. Le nuove chiavi SSH verranno generate automaticamente

## Gestione del File known_hosts

Per evitare conflitti con le vecchie chiavi:

```bash
# Rimuovi la vecchia chiave
ssh-keygen -R <indirizzo_IP_o_nome_host>

# Esempio
ssh-keygen -R 10.10.10.100

# Connettiti alla macchina
ssh utente@<indirizzo_IP_o_nome_host>
```

## Automazione

Per ambienti con numerose macchine virtuali, considera l'uso di:
- Ansible
- Puppet
- Chef

Questi strumenti possono automatizzare la configurazione delle chiavi SSH e altre impostazioni iniziali.

## Conclusione

Seguendo questa guida, ogni macchina virtuale clonata avrà una chiave SSH unica, eliminando conflitti e migliorando la sicurezza. Questa soluzione è applicabile a qualsiasi infrastruttura di virtualizzazione e garantisce una gestione efficiente delle macchine virtuali clonate.

---

*Articolo redatto da Luigi Smiraglio*
