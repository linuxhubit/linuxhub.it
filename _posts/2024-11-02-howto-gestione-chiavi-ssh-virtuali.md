---
class: post
title: '#howto - Rigenerazione Automatica delle Chiavi SSH per VM Debian/ubuntu Clonate'
date: 2024-11-02 07:00
layout: post
author: Luigi Smiraglio
author_github: geegeek
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
tags:
- linux
- virtualizzazione
- ssh
- sicurezza
---

# Cloud-Init su Linux: Rigenerare le Chiavi SSH in Automatico per il Tuo Homelab

*Autore: Luigi Smiraglio*

## Introduzione

Nel mondo degli homelab, è comune utilizzare macchine virtuali clonando un template preconfigurato. Questo metodo, sebbene efficiente, può causare problemi di sicurezza, specialmente con le chiavi SSH duplicate. In questa guida, vedremo come utilizzare **cloud-init** su Debian per rigenerare automaticamente le chiavi SSH al primo avvio di una macchina clonata, garantendo un ambiente più sicuro e affidabile.

## Cos'è `cloud-init`?

`cloud-init` è uno strumento potente per la configurazione automatica delle istanze al primo avvio. Originariamente progettato per ambienti cloud, può essere utilizzato efficacemente anche in ambienti virtualizzati come VMware, Proxmox o nel tuo homelab. Consente di eseguire script e configurazioni iniziali, come la rigenerazione delle chiavi SSH e la personalizzazione della rete.

## Il Problema delle Chiavi SSH Duplicate

Clonando macchine virtuali da un template, tutte le istanze condividono le stesse chiavi SSH. Questo può causare avvisi di sicurezza quando si tenta di connettersi tramite SSH, poiché il client rileva una chiave host già conosciuta con un'impronta digitale diversa. Ad esempio:

```
The authenticity of host '10.290.70.139 (10.290.70.139)' can't be established.
ED25519 key fingerprint is SHA256:bCtJRRv99999999Jshjyintpp/Fl8Z99Vv99Leeimtg.
This host key is known by the following other names/addresses:

~/.ssh/known_hosts:1: [hashed name]
~/.ssh/known_hosts:4: [hashed name]
~/.ssh/known_hosts:5: [hashed name]
~/.ssh/known_hosts:6: [hashed name]
~/.ssh/known_hosts:7: [hashed name]
~/.ssh/known_hosts:8: [hashed name]
~/.ssh/known_hosts:9: [hashed name]
~/.ssh/known_hosts:10: [hashed name]
(1 additional names omitted)
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Questo messaggio indica un potenziale rischio di sicurezza, suggerendo un possibile attacco man-in-the-middle. Rigenerare le chiavi SSH per ogni macchina clonata risolve questo problema, migliorando la sicurezza dell'ambiente.

## Soluzione: Utilizzare `cloud-init` nel Tuo Homelab

Anche se associato ai provider cloud, `cloud-init` può essere configurato per funzionare efficacemente nel tuo homelab. Ecco come implementarlo su una macchina Debian in un ambiente virtualizzato come VMware o Proxmox.

### 1. Installazione e Configurazione di `cloud-init`

#### a. Installare `cloud-init`

Verifica se `cloud-init` è già installato. In caso contrario, installalo con:

```bash
 apt update &&  apt upgrade -y
 apt install cloud-init -y
```

#### b. Configurare `cloud-init` per Rigenerare le Chiavi SSH

Configura `cloud-init` per eliminare e rigenerare le chiavi SSH al primo avvio della macchina clonata.

1. **Modifica il File di Configurazione**:

   Apri `/etc/cloud/cloud.cfg` con un editor di testo:

```bash
 nano /etc/cloud/cloud.cfg
```

2. **Aggiungi o Modifica le Seguenti Linee**:

```yaml
#########################################################
#cloud-config OFF (datasource_list)
# cloud-init per rigenerare le chiavi SSH al primo avvio della macchina template 
#########################################################

# Evita la ricerca di sorgenti dati cloud

datasource_list: [ None ]

# Gestione delle chiavi SSH

ssh_deletekeys: true
ssh_genkeytypes: ['ed25519', 'rsa']

# Disabilita la gestione della rete da parte di cloud-init
network:
  config: disabled
```

   - **`datasource_list: [ None ]`**: Impedisce a `cloud-init` di cercare sorgenti dati cloud, utile per ambienti non cloud.
   - **`ssh_deletekeys: true`**: Elimina le chiavi SSH esistenti.
   - **`ssh_genkeytypes`**: Specifica i tipi di chiavi SSH da generare.
   - **`network`**: Disabilita la gestione della rete da parte di `cloud-init` per evitare conflitti.

3. **Salva e Chiudi il File**.

#### c. Abilitare `cloud-init` all'Avvio

Assicurati che `cloud-init` sia abilitato per eseguire le configurazioni al primo avvio:

```bash
 systemctl enable cloud-init
```

> **Nota:** Non avviare manualmente `cloud-init` con ` systemctl start cloud-init`. Deve essere eseguito automaticamente al primo avvio per funzionare correttamente.

### 2. Preparazione del Template

Prima di trasformare la macchina in un template, è necessario pulire i dati di `cloud-init` e spegnere la macchina. Sebbene `cloud-init` possa rigenerare automaticamente le chiavi SSH in un sistema già configurato, preferisco eliminare manualmente le chiavi host SSH esistenti per garantire che il processo di rigenerazione venga avviato correttamente. Questo perché, al primo accesso SSH, posso indirettamente avere conferma che tale meccanismo stia funzionando.

Esegui il seguente comando sulla macchina template:
```bash
rm /etc/ssh/ssh_host_*
```

## Rimozione delle Chiavi SSH Esistenti

Esegui il seguente comando sulla macchina template:

```bash
rm /etc/ssh/ssh_host_*
```

#### a. Pulizia di `cloud-init`

Pulisci i dati di `cloud-init` per simulare un primo avvio:

```bash
 cloud-init clean
```

#### b. Spegnere la Macchina

Spegni la macchina in modo sicuro:

```bash
 shutdown -h now
```
La macchina è ora pronta per diventare un template.

### 3.a Creazione del Template su VMware

1. **Seleziona la Macchina Spenta**:

   Apri VMware e individua la macchina Debian preparata.

2. **Converti la Macchina in un Template**:

   Segui le procedure specifiche di VMware. Assicurati di:

   - **Disattivare "Connect At Power On"** per la scheda di rete.
   - **Impostare il "MAC Address" su Automatico** per evitare conflitti di rete.

### 3.b Creazione del Template su Proxmox

1. **Seleziona la Macchina Spenta**:

   Apri Proxmox e individua la macchina Debian preparata.

2. **Converti la Macchina in un Template**:

   Segui le procedure specifiche di Proxmox. Assicurati di:

   - **Disattivare l'Avvio Automatico** per la scheda di rete.
   - **Impostare il "MAC Address" su Automatico** per evitare conflitti di rete.
   - **Convertire la VM in un Template**:
     - Clicca con il tasto destro sulla macchina virtuale.
     - Seleziona **"Convert to Template"**.
     - Conferma l'operazione.

   Questo processo creerà un template che potrà essere utilizzato per clonare nuove macchine senza conflitti di rete o chiavi SSH duplicate.

### 4. Clonazione delle Macchine dal Template

Ogni volta che cloni una nuova macchina dal template:

1. **Avvia la Macchina Clonata**:

   Al primo avvio, `cloud-init` rigenererà automaticamente le chiavi SSH.

2. **Verifica le Nuove Chiavi SSH**:

   Controlla le nuove chiavi generate:

```bash
 ls /etc/ssh/ssh_host_*
```

## Conclusione

Utilizzando `cloud-init` nel tuo homelab, automatizzi la rigenerazione delle chiavi SSH per ogni nuova macchina clonata, migliorando la sicurezza e semplificando la gestione delle macchine virtuali. Questa soluzione è adattabile a vari sistemi operativi e piattaforme di virtualizzazione, rendendola estremamente flessibile.

---

## Link

- [Documentazione Ufficiale di cloud-init](https://cloudinit.readthedocs.io/en/latest/index.html)

