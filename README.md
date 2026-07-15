# The Backend Engineer's Field Library

A landing page tying together fourteen battle-tested playbooks — **14 playbooks, 509 topics, one connected mental model** for the whole modern stack.

🔗 **Live:** https://baluraut.github.io/field-library/

## The fourteen playbooks

| Playbook | Topics | Covers |
| --- | --- | --- |
| [PostgreSQL Pro Playbook](https://baluraut.github.io/postgres-pro-playbook/) | 46 | UPSERT, window functions, JSONB, indexing, tuning |
| [Ruby &amp; Rails Pro Playbook](https://baluraut.github.io/ruby-rails-pro-playbook/) | 104 | 52 Ruby + 52 Rails — language to production |
| [EKS · ECR · CircleCI Playbook](https://baluraut.github.io/eks-ecr-circleci-playbook/) | 60 | Containers → Kubernetes → CI/CD deploys |
| [Linux Playbook](https://baluraut.github.io/linux-playbook/) | 34 | Files, processes, the shell toolbelt, systemd, cgroups |
| [Networking Playbook](https://baluraut.github.io/networking-playbook/) | 26 | IP, TCP/UDP, DNS, TLS, HTTP, firewalls, debugging |
| [MCP Server Playbook](https://baluraut.github.io/mcp-server-playbook/) | 25 | Building MCP servers — primitives, transports, OAuth, trust |
| [Agentic AI Playbook](https://baluraut.github.io/agentic-ai-playbook/) | 30 | LLM agents, the agent loop, RAG, evals &amp; safety |
| [Distributed Systems Playbook](https://baluraut.github.io/distributed-systems-playbook/) | 22 | CAP, consensus, replication, sharding, caching, resilience |
| [Event-Driven Architecture Playbook](https://baluraut.github.io/event-driven-playbook/) | 16 | Queues, streams, Kafka, sagas, outbox, CQRS, DLQs |
| [Node.js &amp; TypeScript Playbook](https://baluraut.github.io/nodejs-typescript-playbook/) | 30 | Event loop, async, streams, the TS type system, shipping |
| [React &amp; TypeScript Playbook](https://baluraut.github.io/react-typescript-playbook/) | 30 | JSX, hooks, rendering, state, typing React, a11y |
| [Application Security Playbook](https://baluraut.github.io/security-playbook/) | 30 | XSS, CSRF, SQLi, access control, SSRF, secrets, TLS, incident response |
| [PostgreSQL Disaster Recovery on AWS](https://baluraut.github.io/postgres-dr-playbook/) | 26 | RPO/RTO, PITR, WAL, pgBackRest, RDS/Aurora, cross-region failover, drills |
| [System Design &amp; Technical Leadership Playbook](https://baluraut.github.io/system-design-leadership-playbook/) | 30 | Scaling, SLOs, tradeoffs, code review, mentoring, RFCs |

## Worked case studies

Six applied, end-to-end case studies — each puts a playbook (or two) to work on a concrete company, with an ASCII topology, an entity (ER) diagram, and a sequence diagram.

| Case study | Applies | The story |
| --- | --- | --- |
| [DR for a 2,000-engineer SaaS on AWS](https://baluraut.github.io/dr-case-study/) | PostgreSQL DR | Tiered Aurora + RDS, immutable cross-account vault, 5 runbooks |
| [Scaling to 1,000,000 req/s](https://baluraut.github.io/scaling-case-study/) | Distributed Systems, System Design | One box → a million req/s; the bottleneck moves to the DB |
| [Anatomy of an IDOR breach](https://baluraut.github.io/security-case-study/) | Application Security | 400k records leaked via broken access control; the IR runbook |
| [The N+1 that took down Black Friday](https://baluraut.github.io/nplus1-case-study/) | Rails, PostgreSQL | A hidden N+1 melts checkout under load; find, fix, capacity-plan |
| [Shipping a production AI agent](https://baluraut.github.io/ai-agent-case-study/) | Agentic AI, MCP | Support agent from demo to safe production; guardrails + evals |
| [Corrupted recommendations restored from backup](https://baluraut.github.io/recdb-recovery-case-study/) | PostgreSQL PITR | A bad script wipes 30k rows; a targeted point-in-time restore |

## Why one library

These aren't fourteen separate subjects — they're one stack seen from fourteen heights, and the playbooks cross-reference each other on purpose: a Rails N+1 becomes a Postgres query plan; a container is a Linux process with a cgroup, so a Kubernetes `OOMKilled` and a bare-metal OOM are the same event; jsonb reappears as `store_accessor`; a CIDR block is a CIDR block whether it's a subnet or a VPC; and a prompt-injection defense is the same least-privilege and input-validation instinct the Application Security playbook teaches as its own layer.

## View locally

Open `index.html` in a browser. Its cards link to the other sites once they're published.

## Publish (GitHub Pages)

Push to a repo named `field-library` (or use it as your root `baluraut.github.io` user page), then **Settings → Pages → Source: `main` / root**.

Each linked playbook must be published under the matching repo name for the cards to resolve.
