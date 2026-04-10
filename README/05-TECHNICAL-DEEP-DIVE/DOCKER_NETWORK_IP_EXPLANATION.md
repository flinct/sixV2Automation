# Docker Network & IP Explanation

Penjelasan detail tentang bagaimana Docker containers mendapatkan IP berbeda.

---

## 🌐 HOW DOCKER NETWORKING WORKS

### Concept 1: Docker Networking Bridge

```
┌─────────────────────────────────────────────────────┐
│                    Windows 10/11                    │
│  ┌────────────────────────────────────────────┐   │
│  │          Docker Desktop (WSL2)              │   │
│  │                                             │   │
│  │  ┌──────────────────────────────────────┐  │   │
│  │  │   Docker Network (load-test-network) │  │   │
│  │  │   Subnet: 172.20.0.0/16             │  │   │
│  │  │                                      │  │   │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────┐ │  │   │
│  │  │  │Container │ │Container │ │Cont. │ │  │   │
│  │  │  │    #1    │ │    #2    │ │  #3  │ │  │   │
│  │  │  │IP:       │ │IP:       │ │IP:   │ │  │   │
│  │  │  │172.20.0.2│ │172.20.0.3│ │172.. │ │  │   │
│  │  │  └──────────┘ └──────────┘ └──────┘ │  │   │
│  │  └──────────────────────────────────────┘  │   │
│  │                                             │   │
│  │  Docker Network Bridge: 172.20.0.1/16      │   │
│  └────────────────────────────────────────────┘   │
│         ↓ (Port forwarding jika perlu)           │
│  Host Network: 192.168.1.* (your WiFi/LAN)    │
│         ↑ (Outbound internet)                  │
│  172.20.0.2 → dev-v2.satuinbox.com             │
│  172.20.0.3 → dev-v2.satuinbox.com             │
│  172.20.0.4 → dev-v2.satuinbox.com             │
└─────────────────────────────────────────────────────┘
```

### Concept 2: Subnet (172.20.0.0/16)

```
Network: 172.20.0.0/16
Notation: 172.20.[0-255].[0-255]

Usable IPs:
172.20.0.1         = Gateway (Docker bridge)
172.20.0.2         = Container 1
172.20.0.3         = Container 2
172.20.0.4         = Container 3
172.20.0.5         = Container 4 (if added)
... up to ...
172.20.255.254     = Last usable (can fit ~65k containers!)
```

---

## 📋 OUR SETUP: docker-compose.yml

```yaml
networks:
  load-test-network:
    driver: bridge                    # ← Bridged network
    ipam:
      config:
        - subnet: 172.20.0.0/16       # ← Custom subnet
```

**What this does:**
1. Creates a custom Docker network named `load-test-network`
2. Uses BRIDGE driver (containers can talk to host and outside)
3. Defines subnet 172.20.0.0/16
4. Docker auto-assigns IPs: 172.20.0.2, 172.20.0.3, etc

---

## 🔢 IP ASSIGNMENT PROCESS

### Step 1: Create Network

```powershell
docker network create --driver bridge \
  --subnet 172.20.0.0/16 \
  load-test-network

# OR via docker-compose (automatic)
docker-compose up
```

**Result:**
```
Network: load-test-network created
Subnet: 172.20.0.0/16
Gateway: 172.20.0.1
```

### Step 2: Start Container 1

```yaml
services:
  load-test-1:
    networks:
      - load-test-network
```

**Docker assigns:**
```
Container: load-test-machine-1
IP: 172.20.0.2           ← First IP in subnet
MAC: 02:42:ac:14:00:02   ← Unique MAC address
```

### Step 3: Start Container 2

```yaml
services:
  load-test-2:
    networks:
      - load-test-network
    depends_on:
      - load-test-1      ← Waits for Container 1
```

**Docker assigns:**
```
Container: load-test-machine-2
IP: 172.20.0.3           ← Next available IP
MAC: 02:42:ac:14:00:03
```

### Step 4: Start Container 3

```yaml
services:
  load-test-3:
    networks:
      - load-test-network
    depends_on:
      - load-test-2      ← Waits for Container 2
```

**Docker assigns:**
```
Container: load-test-machine-3
IP: 172.20.0.4           ← Next available IP
MAC: 02:42:ac:14:00:04
```

---

## 🔍 VERIFY CONTAINER IPs

### Method 1: inspect Command

```powershell
# Get container IP
docker inspect load-test-machine-1 --format='{{.NetworkSettings.Networks.load_test_network.IPAddress}}'

# Output: 172.20.0.2

# Get all details
docker inspect load-test-machine-1
```

**Output includes:**
```json
{
  "NetworkSettings": {
    "Networks": {
      "load_test_network": {
        "IPAddress": "172.20.0.2",
        "Gateway": "172.20.0.1",
        "Subnet": "172.20.0.0/16",
        "MacAddress": "02:42:ac:14:00:02"
      }
    }
  }
}
```

### Method 2: From Inside Container

```powershell
# List network interfaces inside container
docker exec load-test-machine-1 ifconfig

# Output:
# eth0: flags=73<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST>
#       inet 172.20.0.2  netmask 255.255.0.0
#       inet6 fe80::42:acff:fe14:2  prefixlen 64 scopeid 0x20<link>

# Or simpler:
docker exec load-test-machine-1 hostname -I
# Output: 172.20.0.2
```

### Method 3: Network Inspect

```powershell
docker network inspect load-test-network

# Output:
# {
#   "Name": "load-test-network",
#   "Containers": {
#     "abc123...": {
#       "Name": "load-test-machine-1",
#       "IPv4Address": "172.20.0.2/16"
#     },
#     "def456...": {
#       "Name": "load-test-machine-2",
#       "IPv4Address": "172.20.0.3/16"
#     },
#     "ghi789...": {
#       "Name": "load-test-machine-3",
#       "IPv4Address": "172.20.0.4/16"
#     }
#   }
# }
```

---

## 🌍 HOW SERVER SEES THESE IPs

### Container Makes Request to dev-v2.satuinbox.com

```
Container 1 (172.20.0.2)
  → Node.js script
    → socket.io-client
      → WebSocket connection to dev-v2.satuinbox.com
        → Docker NAT/Routing
          → Server receives connection from 172.20.0.2
```

### Server-side View

```
Connection 1: Source IP = 172.20.0.2
Connection 2: Source IP = 172.20.0.2
...
Connection 50: Source IP = 172.20.0.2
(50 connections from 172.20.0.2)

Connection 51: Source IP = 172.20.0.3
Connection 52: Source IP = 172.20.0.3
...
Connection 100: Source IP = 172.20.0.3
(50 connections from 172.20.0.3)

Connection 101: Source IP = 172.20.0.4
Connection 102: Source IP = 172.20.0.4
...
Connection 150: Source IP = 172.20.0.4
(50 connections from 172.20.0.4)
```

### Server Log Example

```
[WebSocket] New connection from 172.20.0.2:54321
[WebSocket] New connection from 172.20.0.2:54322
...
[WebSocket] New connection from 172.20.0.2:54370
[Count] Total from 172.20.0.2: 50

[WebSocket] New connection from 172.20.0.3:55421
[WebSocket] New connection from 172.20.0.3:55422
...
[WebSocket] New connection from 172.20.0.3:55470
[Count] Total from 172.20.0.3: 50

[WebSocket] New connection from 172.20.0.4:56421
[WebSocket] New connection from 172.20.0.4:56422
...
[WebSocket] New connection from 172.20.0.4:56470
[Count] Total from 172.20.0.4: 50

[Summary] Total connections: 150 from 3 different IPs
```

---

## 🔐 NETWORK ISOLATION

### Container 1 cannot access Container 2's internals

```powershell
# Try to access Container 2 from Container 1
docker exec load-test-machine-1 ping 172.20.0.3

# Output: OK (can ping)
# But: Cannot see internal processes/files
```

### Containers CAN communicate via IP/hostname

```powershell
# Container 1 can access HTTP port on Container 2
docker exec load-test-machine-1 curl http://load-test-2:3000

# But in our case: No services listening on containers
# So: Only outbound connections to dev-v2.satuinbox.com
```

### Containers CANNOT access host ports (by default)

```powershell
# Container 1 tries to connect to localhost:3000
docker exec load-test-machine-1 curl http://localhost:3000

# Output: REFUSED (not accessible)
# Host ports hidden from containers
```

---

## 🔄 NETWORK FLOW DIAGRAM

### Outbound Connection

```
┌─────────────────────────────────────────┐
│   Docker Container 1 (172.20.0.2)       │
│                                         │
│  node scripts/widget-socket-load-2.js  │
│    ↓                                    │
│  socket.io-client library              │
│    ↓                                    │
│  io('https://dev-v2.satuinbox.com')   │
│    ↓                                    │
│  TCP/IP Stack: 172.20.0.2:random_port │
│    ↓                                    │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│   Docker Network (load-test-network)    │
│   Bridge: 172.20.0.1                    │
│   (Routes outbound traffic)             │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│   Docker Engine / WSL2 / Host Network   │
│   (NAT/Routing)                         │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│   Internet                              │
│   (DNS → IP lookup)                     │
│   (TCP connection to dev-v2....)        │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│   Target Server (dev-v2.satuinbox.com) │
│                                         │
│   [Server sees source IP: 172.20.0.2]  │
│   (Connection #1 from 172.20.0.2)      │
│                                         │
│   [Server sees source IP: 172.20.0.2]  │
│   (Connection #2 from 172.20.0.2)      │
│   ... 48 more ...                      │
│                                         │
│   [Server sees source IP: 172.20.0.3]  │
│   (Connection #1 from 172.20.0.3)      │
│   ...                                   │
└─────────────────────────────────────────┘
```

---

## 🎯 WHY THIS APPROACH IS GENUINE

### ✅ Real IP Sources

```
Container 1 → Actual IP 172.20.0.2 in Docker network
Container 2 → Actual IP 172.20.0.3 in Docker network
Container 3 → Actual IP 172.20.0.4 in Docker network

NOT faked, NOT spoofed, REAL Docker network IPs
```

### ✅ Server Cannot Detect Fake

```
Server cannot tell:
- "Is this a Docker IP?" → NO (just sees 172.20.x.x)
- "Is this multi-source?" → YES (3 different IPs)
- "Is this genuine?" → YES (Docker kernel routes them)
```

### ✅ Real TCP/IP Stack

```
Each container has:
- Real network interface
- Real MAC address
- Real IP address
- Real TCP/IP stack
- Real socket bindings

Not simulated, not spoofed.
```

### ✅ Scalable

```
Want 10 sources instead of 3?
→ Add 7 more services to docker-compose.yml
→ Get 10 unique IPs (172.20.0.2 - 172.20.0.11)
→ Server sees 500 connections from 10 IPs (50 each)

No complexity, no manual network config
```

---

## ⚙️ DOCKER-COMPOSE NETWORKING CONFIG

```yaml
version: '3.8'

services:
  load-test-1:
    # ... other config ...
    networks:
      - load-test-network      # ← Connect to custom network

  load-test-2:
    # ... other config ...
    networks:
      - load-test-network      # ← Same network

  load-test-3:
    # ... other config ...
    networks:
      - load-test-network      # ← Same network

networks:
  load-test-network:           # ← Define network
    driver: bridge             # ← Bridge type
    ipam:                       # ← IP Address Management
      config:
        - subnet: 172.20.0.0/16 # ← Custom subnet
```

**What happens:**

1. `networks` at bottom: Creates network named `load-test-network`
2. `driver: bridge`: Enables inter-container + host communication
3. `subnet`: Sets custom IP range (must not conflict with host network)
4. Each service `networks` section: Connects that container to network
5. Docker auto-assigns IP from subnet

---

## 📊 SUBNET MATH

```
172.20.0.0/16

Breakdown:
- 172.20         = Network address (fixed)
- /16            = Subnet mask (CIDR notation)
- /16 means:     First 16 bits are network, last 16 are hosts

IP Range:
- 172.20.0.0     = Network address (reserved)
- 172.20.0.1     = Gateway (Docker bridge)
- 172.20.0.2     = Container 1
- 172.20.0.3     = Container 2
- 172.20.0.4     = Container 3
- ...
- 172.20.255.254 = Last usable
- 172.20.255.255 = Broadcast (reserved)

Total IPs: 65,536 (2^16)
Usable: 65,534 (minus network + broadcast)
```

---

## 🔗 CONTAINER-TO-CONTAINER COMMUNICATION

### Internal Container Names

```yaml
services:
  load-test-1:
    hostname: load-test-1      # ← DNS name
    
  load-test-2:
    hostname: load-test-2
```

**From Container 1:**
```powershell
docker exec load-test-machine-1 ping load-test-2

# Output:
# PING load-test-2 (172.20.0.3) 56(84) bytes of data
# 64 bytes from load-test-2 (172.20.0.3): icmp_seq=1 ttl=64 time=0.1 ms
```

**Docker DNS:**
- Automatically resolves hostname → IP
- `load-test-2` → `172.20.0.3`
- `load-test-1` → `172.20.0.2`

---

## ✅ VERIFICATION CHECKLIST

After `docker-compose up`:

```powershell
# 1. Check network exists
docker network ls | findstr load-test

# 2. Check containers running
docker ps | findstr load-test-machine

# 3. Check container IPs
docker inspect load-test-machine-1 -f '{{.NetworkSettings.Networks.load_test_network.IPAddress}}'
# Should output: 172.20.0.2

docker inspect load-test-machine-2 -f '{{.NetworkSettings.Networks.load_test_network.IPAddress}}'
# Should output: 172.20.0.3

docker inspect load-test-machine-3 -f '{{.NetworkSettings.Networks.load_test_network.IPAddress}}'
# Should output: 172.20.0.4

# 4. Check container can ping another
docker exec load-test-machine-1 ping -c 1 load-test-machine-2
# Should succeed

# 5. Check container can reach internet
docker exec load-test-machine-1 ping -c 1 8.8.8.8
# Should succeed

# 6. View network details
docker network inspect load-test-network
# Should show 3 containers with IPs
```

---

## 🎓 SUMMARY

| Concept | Explanation |
|---------|-------------|
| **Network Bridge** | Connects containers, isolates from host |
| **Custom Subnet** | 172.20.0.0/16 (65k possible IPs) |
| **IPAM** | Docker auto-assigns IPs sequentially |
| **Container 1 IP** | 172.20.0.2 (first in subnet) |
| **Container 2 IP** | 172.20.0.3 (second) |
| **Container 3 IP** | 172.20.0.4 (third) |
| **Gateway** | 172.20.0.1 (Docker bridge router) |
| **Hostname** | DNS names within network (load-test-1, etc) |
| **Outbound** | Each container source IP = its IP |
| **Server view** | Sees 150 connections from 3 IPs |

---

## 🚀 NEXT: Implementation

With this understanding, you're ready for:

1. **Create Dockerfile** - Package Node.js + script
2. **Create docker-compose.yml** - Define 3 containers + network
3. **docker-compose build** - Build image
4. **docker-compose up** - Start 3 containers with 3 IPs
5. **Monitor** - Watch load test with 3 sources

Each container automatically gets unique IP from 172.20.0.0/16 subnet!

---

## 📚 DOCKER DOCS

- Docker Networks: https://docs.docker.com/network/
- Docker Compose Networking: https://docs.docker.com/compose/networking/
- Bridge Driver: https://docs.docker.com/network/drivers/bridge/
- IPAM Config: https://docs.docker.com/compose/compose-file/compose-file-v3/#ipam
